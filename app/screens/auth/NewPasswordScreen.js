import React, { useState } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import AppText from '../../components/Text';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import useApi from '../../hooks/useApi';
import register from '../../api/register';


const ReviewSchema = yup.object({
    password: yup.string().min(6).required().label('New password'),
    cpassword: yup.string().min(6).required().label('Confirm password')
  })

function NewPasswordScreen({navigation,route}) {
    const {resetCode,code} =route.params;
    const {width,height} =useAuth();
    const changePasswordApi= useApi(register.changePassword);
    const [active,setActive]=useState(false);
    const [errorMsg, setErrorMsg] = useState();



    async function handleSubmit({password,cpassword}){
      console.log(password,resetCode,code)
        setActive(true);
        if(password !== cpassword){
            setErrorMsg('passwords mismatch');
            return
        }
        const result = await changePasswordApi.request({new_password:password,code,resetCode,current_password:""});
        console.log(result.status)
        if(result.status == 201){
            alert('Password has been reset successfully!');
        }
        navigation.goBack();
        setActive(false);
    }
return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : null}
    style={styles.keyboardAvoidingView}><>
  
  <View style={{width:width,height:height*0.1,backgroundColor:colors.primary}}/>
  <ScrollView contentContainerStyle={styles.container}
  >
{/* <View style={styles.container}> */}
    <View style={{width:width*0.9,marginTop:height*0.1}}>
    <View style={{width:width*0.3,height:width*0.3}}>
            <Image style={{width:'100%',height:'100%'}} source={require('../../assets/images/preLogo.png')}/>
        </View>
        <AppText fontSize={width*0.06} width={width*0.4}>Set your new <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.06} color={colors.secondary} > Password</AppText></AppText>

        <AppText>Enter yout new password</AppText>
    </View>

    <Formik
          initialValues={{password:"",cpassword:""}}
          validationSchema={ReviewSchema}
          onSubmit={handleSubmit}
          >
             {(props)=>(<>
                <View style={{width:width*0.9,marginTop:'10%'}}>
                    <AppTextInput placeholder={'New Password'} 
                    onChangeText={props.handleChange('password')}
                    onBlur={props.handleBlur('password')}
                    value={props.values.password}
                    touched={props.touched.password}
                    errors={props.errors.password}/>

                    <AppTextInput placeholder={'Confirm Password'} 
                    onChangeText={props.handleChange('cpassword')}
                    onBlur={props.handleBlur('cpassword')}
                    value={props.values.cpassword}
                    touched={props.touched.cpassword}
                    errors={props.errors.cpassword}/>
                </View>

                <AppText color='red'>{errorMsg}</AppText>
                <AppButton text={'Submit'} width={width*0.9} marginTop={'10%'} onPress={props.handleSubmit}/>
             </>)}</Formik>
             <View style={{width:'100%',height:height*0.18}}/>

</ScrollView>
</>
</KeyboardAvoidingView>
);
}

export default NewPasswordScreen;
const styles = StyleSheet.create({

container:{
    alignItems:'center',
    backgroundColor:colors.primary
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});