import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup'

import AppText from '../../components/Text';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import useApi from '../../hooks/useApi';
import register from '../../api/register';


const ReviewSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().min(5).required(),
    password: yup.string().min(6).required()
  })

function SignUpScreen({navigation}) {
    const {width,logIn} =useAuth();
    const registerApi =useApi(register.register)
    const [active,setActive]=useState(false);

    const handleSubmit = async ({email,password}) =>{
        // setActive(true)

        const result = await registerApi.request({email,password});
        if(!result.ok){
        //   setActive(false);
        console.log(result.data)
          return 
        //   setLoginFailed(true)
        } 
        // setLoginFailed(false);
        logIn(result.data);
        // setActive(false);
        console.log(result.data)
      }

return (
<View style={styles.container}>
    <View style={{width:width*0.9}}>
        <View style={{width:width*0.3,height:width*0.3}}>
            <Image style={{width:'100%',height:'100%'}} source={require('../../assets/images/preLogo.png')}/>
        </View>
        <AppText fontSize={width*0.06}>Hi, <AppText fontSize={width*0.06} color={colors.secondary} fontFamily='PoppinsSemiBold'>Sign Up</AppText></AppText>
        <AppText>to your New Account</AppText>
    </View>

    <Formik
          initialValues={{email:"", password:""}}
          validationSchema={ReviewSchema}
          onSubmit={handleSubmit}
          >
            {(props)=>(<>
                <View style={{width:width*0.9,marginTop:'10%'}}>
                    <AppTextInput placeholder={'Name'} 
                    onChangeText={props.handleChange('username')}
                    onBlur={props.handleBlur('username')}
                    value={props.values.username}
                    touched={props.touched.username}
                    errors={props.errors.username}/>

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
                </View>

                <AppButton text={'Sign Up'} width={width*0.9} marginTop={'7%'}
                onPress={props.handleSubmit} active={active}/>
            </>)}</Formik>

    <AppText marginTop='5%'>Already have an account? <AppText color={colors.secondary}fontFamily='PoppinsSemiBold' onPress={()=>navigation.goBack()}>Login</AppText></AppText>
</View>
);
}

export default SignUpScreen;
const styles = StyleSheet.create({
container:{
flex:1,
justifyContent:'center',
 alignItems:'center',
 backgroundColor:colors.primary
}
});