import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import RadioGroup from 'react-native-radio-buttons-group';
import colors from '../config/colors';
import AppTextInputPassword from './AppTextInputPassword';
import AppButton from './AppButton';
import AppText from './Text';
import useAuth from '../auth/useAuth';
import useApi from '../hooks/useApi';
import register from '../api/register';


const ReviewSchema = yup.object({
    new_password: yup.string().min(6).required(),
    current_password: yup.string().min(6).required()
  })



function ChangePassword({navigation}) {
    const {width,logIn,user}=useAuth();
    const [errorMsg, setErrorMsg] = useState({msg:"",color:"red"});
    const changePasswordApi= useApi(register.changePassword);
    const [active,setActive]=useState(false);

    async function handleSubmit({current_password,new_password}){
        setActive(true);
        if(current_password !== user.password){
            setErrorMsg({msg:"Wrong password!",color:"red"});
            setTimeout(() => {
                setErrorMsg({msg:"",color:"red"});
                setActive(false);
            }, 3000);
            return;
        }
        const result = await changePasswordApi.request({password:new_password,code:user.code,email:user.email});
        console.log(result.status)
        if(result.status == 201){
            // alert('Password has been reset successfully!');
            setErrorMsg({msg:"Password has been reset successfully!",color:"green"});
            logIn(result.data,navigation);
        }
        setTimeout(() => {
            setErrorMsg({msg:"",color:"red"});
            setActive(false);
        }, 3000);
    }

return (
    <View style={{backgroundColor:colors.primary,width:width*0.95,alignItems:'center',padding:'5%',borderRadius:10}}>
    <Formik
  initialValues={{current_password:"",new_password:""}}
//   validationSchema={ReviewSchema}
  onSubmit={handleSubmit}
  >
     {(props)=>(<>
        <View style={{width:'95%',}}>
            <AppTextInputPassword placeholder={'Current Password'} 
            onChangeText={props.handleChange('current_password')}
            onBlur={props.handleBlur('current_password')}
            value={props.values.current_password}
            touched={props.touched.current_password}
            errors={props.errors.current_password}/>

            <AppTextInputPassword placeholder={'New Password'} 
            onChangeText={props.handleChange('new_password')}
            onBlur={props.handleBlur('new_password')}
            value={props.values.new_password}
            touched={props.touched.new_password}
            errors={props.errors.new_password}/>
        </View>

        <AppText color={errorMsg.color}>{errorMsg.msg}</AppText>
        <AppButton text={'Update Password'} width={'95%'} marginTop={'5%'} active={active} onPress={props.handleSubmit}/>
</>)}</Formik>

</View>
);
}

export default ChangePassword;
const styles = StyleSheet.create({
container:{
flex:1,
justifyContent:'center',
 alignItems:'center'
}
});