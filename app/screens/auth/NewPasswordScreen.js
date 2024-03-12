import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
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
    password: yup.string().min(6).required(),
    cpassword: yup.string().min(6).required()
  })

function NewPasswordScreen({navigation,route}) {
    const {code,email} =route.params;
    // console.log(email,code)
    const {width} =useAuth();
    const changePasswordApi= useApi(register.changePassword);
    const [password,setPassword]=useState('');
    const [cpassword,setCPassword]=useState('');
    const [active,setActive]=useState(false);
    const [errorMsg, setErrorMsg] = useState();



    async function handleSubmit({password,cpassword}){
        setActive(true);
        if(password !== cpassword){
            setErrorMsg('passwords mismatch');
            return
        }
        const result = await changePasswordApi.request({password,code,email});
        console.log(result.status)
        if(result.status == 201){
            alert('Password has been reset successfully!');
        }
        navigation.goBack();
        setActive(false);
    }
return (
<View style={styles.container}>
    <View style={{width:width*0.9}}>
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

                    <AppTextInput placeholder={'Retype Password'} 
                    onChangeText={props.handleChange('cpassword')}
                    onBlur={props.handleBlur('cpassword')}
                    value={props.values.cpassword}
                    touched={props.touched.cpassword}
                    errors={props.errors.cpassword}/>
                </View>

                <AppText color='red'>{errorMsg}</AppText>
                <AppButton text={'Login'} width={width*0.9} marginTop={'10%'} onPress={props.handleSubmit}/>
             </>)}</Formik>
    
</View>
);
}

export default NewPasswordScreen;
const styles = StyleSheet.create({
container:{
flex:1,
justifyContent:'center',
 alignItems:'center',
 backgroundColor:colors.primary
}
});