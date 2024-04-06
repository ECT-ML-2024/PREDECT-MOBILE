import React, { useState } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup'


import AppText from '../../components/Text';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import routes from '../../navigations/routes';
import useApi from '../../hooks/useApi';
import auth from '../../api/auth';


const ReviewSchema = yup.object({
    email: yup.string().min(5).required(),
    password: yup.string().min(6).required()
  })

function LogInScreen({navigation}) {
    const {width,height,logIn} =useAuth();
    const loginApi =useApi(auth.login)
    const [active,setActive]=useState(false);

    const handleSubmit = async ({email,password}) =>{
      setActive(true)
      const result = await loginApi.request(email,password);
      if(!result.ok){
        setActive(false);
        alert(result.data)
        return;
      }
      logIn(result.data,navigation);
      setActive(false);
      }
return (
  <KeyboardAvoidingView
  behavior={Platform.OS === "ios" ? "padding" : null}
  style={styles.keyboardAvoidingView}><>

<View style={{width:width,height:height*0.1,backgroundColor:colors.primary}}/>
<ScrollView contentContainerStyle={styles.container}
>
    <View style={{width:width*0.9,marginTop:height*0.1}}>
        <View style={{width:width*0.3,height:width*0.3}}>
            <Image style={{width:'100%',height:'100%'}} source={require('../../assets/images/preLogo.png')}/>
        </View>
        <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.06}>Welcome back.</AppText>
        <AppText color={colors.secondary} fontFamily='PoppinsSemiBold'>Login <AppText >to your Account</AppText></AppText>
    </View>

    <Formik
          initialValues={{email:"", password:""}}
          validationSchema={ReviewSchema}
          onSubmit={handleSubmit}
          >
            {(props)=>(<>
                <View style={{width:width*0.9,marginTop:'10%'}}>
                <AppTextInput placeholder={'Email'}
                    onChangeText={props.handleChange('email')}
                    onBlur={props.handleBlur('email')}
                    value={props.values.email}
                    touched={props.touched.email}
                    errors={props.errors.email}/>

                    <AppTextInput placeholder={'Password'}
                    onChangeText={props.handleChange('password')}
                    onBlur={props.handleBlur('password')}
                    value={props.values.password}
                    touched={props.touched.password}
                    errors={props.errors.password}/>
                    <AppText textAlign={'right'} onPress={()=>navigation.navigate(routes.FORGET_PASSWORD)}>Forgot Password?</AppText>
                </View>
                <AppButton text={'Login'} width={width*0.9} marginTop={'7%'} 
                onPress={props.handleSubmit} active={active}/>
            </>)}</Formik>
 

    <AppText marginTop='5%'>Don’t have an account? <AppText color={colors.secondary}fontFamily='PoppinsSemiBold' onPress={()=>navigation.navigate(routes.SIGN_UP)}>Sign Up</AppText></AppText>
    <View style={{width:'100%',height:height*0.175}}/>

</ScrollView>
</>
</KeyboardAvoidingView>
);
}

export default LogInScreen;
const styles = StyleSheet.create({
// container:{
// flex:1,
//  alignItems:'center',
// justifyContent:'center',
//  backgroundColor:colors.primary
// }
container:{
  alignItems:'center',
  backgroundColor:colors.primary
},
keyboardAvoidingView: {
  flex: 1,
},
});