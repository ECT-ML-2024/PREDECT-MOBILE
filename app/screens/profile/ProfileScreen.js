import React, { useMemo, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import RadioGroup from 'react-native-radio-buttons-group';


import AppText from '../../components/Text';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import register from '../../api/register';
import AppTextInput from '../../components/AppTextInput';
import AppTextInputPassword from '../../components/AppTextInputPassword';
import AppButton from '../../components/AppButton';
import ChangePassword from '../../components/ChangePassword';


const ReviewSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().min(5).required(),
    password: yup.string().min(6).required()
  })

  const setData =[
    {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Male',
        value: 'male'
    },
    {
        id: '2',
        label: 'Female',
        value: 'female'
    }
]

function ProfileScreen(props) {
    const {height,width,user,logIn} =useAuth();
    const [active,setActive]=useState(false);
    const changePasswordApi= useApi(register.changePassword);
    const [errorMsg, setErrorMsg] = useState({msg:"",color:"red"});

    async function handleSubmit({current_password,new_password,code}){
      setActive(true);
      const result = await changePasswordApi.request({new_password,current_password,email:user.email,code});
      
      if(result.status == 201){
          // alert('Password has been reset successfully!');
          setErrorMsg({msg:"Password has been reset successfully!",color:"green"});
          logIn(result.data);
      }else{
          // setErrorMsg({msg:"Wrong password!",color:"red"});
      }
      setTimeout(() => {
          // setErrorMsg({msg:"",color:"red"});
          setActive(false);
      }, 3000);
  }

return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : null}
    style={styles.keyboardAvoidingView}>
      <>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{backgroundColor:colors.primary,width:width*0.95,height:height*0.95,alignItems:'center',paddingTop:'30%',borderRadius:10,marginBottom:'5%'}}>
          <Image style={{width:width*0.2,height:width*0.2,borderRadius:width*0.2}} source={require('../../assets/images/doctors.jpg')}/>
          <Formik
          initialValues={{current_password:"",new_password:"",code:""}}
          // validationSchema={ReviewSchema}
          onSubmit={handleSubmit}
          >
            {(props)=>(<>
                <View style={{width:'95%',marginTop:'5%',}}>
                <AppTextInput placeholder={'Code'} 
            onChangeText={props.handleChange('code')}
            onBlur={props.handleBlur('code')}
            value={props.values.code}
            touched={props.touched.code}
            errors={props.errors.code}/>

                  
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
                <AppButton text={'Update'} width={'95%'} marginTop={'7%'}
                onPress={()=>props.handleSubmit()} active={active}/>
            </>)}</Formik>

        
    </View>

    {/* <ChangePassword/>  */}
    </ScrollView>
    </>
    </KeyboardAvoidingView>
);
}

export default ProfileScreen;
const styles = StyleSheet.create({
    container:{
        paddingVertical:'5%',
        alignItems:'center'
      },
      keyboardAvoidingView: {
        flex: 1,
      },
});