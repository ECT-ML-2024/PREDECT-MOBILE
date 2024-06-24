import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, Platform, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import AppText from '../../components/Text';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import useApi from '../../hooks/useApi';
import register from '../../api/register';
import routes from '../../navigations/routes';


const ReviewSchema = yup.object({
    code: yup.string().min(6).max(6).required().label('Code'),
    resetCode: yup.string().min(6).max(6).required().label('Reset Code')
  })


function OTPScreen({navigation}) {
    const { width,height } = useAuth();
    const [active, setActive] = useState(false);
    const verifyCodeApi=useApi(register.verifyCode);
    const [errorMsg, setErrorMsg] = useState();

    async function handleSubmit(values){
        setActive(true);
        const results =await verifyCodeApi.request({code:values.code,resetCode:values.resetCode});

        if(results.data.status){
            navigation.replace(routes.NEW_FORGET_PASSWORD,{
                resetCode:results.data.resetCode,
                code:values.code
            });
        }else{
            setErrorMsg('code mismatch');
        }

        setActive(false);
    };
    

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.keyboardAvoidingView}><>
      <View style={{width:width,backgroundColor:'red'}}/>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{width:width*0.9,marginTop:height*0.05}}>
            <View style={{width:width*0.3,height:width*0.3}}>
                <Image style={{width:'100%',height:'100%'}} source={require('../../assets/images/preLogo.png')}/>
            </View>
            <AppText fontSize={width*0.06}>Forgot, <AppText fontSize={width*0.06} color={colors.secondary} fontFamily='PoppinsSemiBold'>Password?</AppText></AppText>
            {/* <AppText>to your New Account</AppText> */}
            <AppText style={{color:'red'}}>{errorMsg}</AppText>
        </View>
    
        <Formik
              initialValues={{code:"",resetCode:""}}
              validationSchema={ReviewSchema}
              onSubmit={handleSubmit}>
                {(props)=>(<>
                    <View style={{width:width*0.9,marginTop:'10%'}}>
                    <AppTextInput placeholder={"Code"}
                    onChangeText={props.handleChange('code')}
                    onBlur={props.handleBlur('code')}
                    value={props.values.code}
                    touched={props.touched.code}
                    errors={props.errors.code}
                    keyboardType='numeric'/>
                    
                    <AppTextInput placeholder={"Reset Code"}
                    onChangeText={props.handleChange('resetCode')}
                    onBlur={props.handleBlur('resetCode')}
                    value={props.values.resetCode}
                    touched={props.touched.resetCode}
                    errors={props.errors.resetCode}
                    keyboardType='numeric'/>
                    </View>
    
                    <AppButton text={'Submit'} width={width*0.9} marginTop={'7%'}
                    onPress={props.handleSubmit} />
        </>)}</Formik>
    
        <View style={{width:'100%',height:height*0.4}}/>
    </ScrollView>
    </>
    </KeyboardAvoidingView>
    );
}

export default OTPScreen;

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        backgroundColor:colors.primary
      },
      keyboardAvoidingView: {
        flex: 1,
      },
});