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
    const {width,user} =useAuth();
    const registerApi =useApi(register.updateUserProfile);
    const [active,setActive]=useState(false);


    const handleSubmit = async ({email,username}) =>{
        setActive(true);
        const result = await registerApi.request({email:email.trim(),username:username.trim(),doctorId:user._id});
        if(!result.ok){
            console.log(result.data)
          setActive(false);
          return;
        };
        setActive(false);
        alert("Account has been updated successful!");
        logIn(result.data)
        // navigation.goBack();
    }

return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : null}
    style={styles.keyboardAvoidingView}>
      <>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{backgroundColor:colors.primary,width:width*0.95,alignItems:'center',padding:'5%',borderRadius:10,marginBottom:'5%'}}>
          <Image style={{width:width*0.2,height:width*0.2,borderRadius:width*0.2}} source={require('../../assets/images/doctors.jpg')}/>
          <Formik
          initialValues={{email:user.email,username:user.username}}
          validationSchema={ReviewSchema}
          onSubmit={handleSubmit}
          >
            {(props)=>(<>
                <View style={{width:'95%',marginTop:'5%',}}>
                    <AppTextInput placeholder={'Name'} 
                    onChangeText={props.handleChange('username')}
                    onBlur={props.handleBlur('username')}
                    value={props.values.username}
                    touched={props.touched.username}
                    errors={props.errors.username}
                    />

                    <AppTextInput placeholder={'Email'}
                    onChangeText={props.handleChange('email')}
                    onBlur={props.handleBlur('email')}
                    value={props.values.email}
                    touched={props.touched.email}
                    errors={props.errors.email}/>

                    
                </View>

                <AppButton text={'Update Profile'} width={'95%'} marginTop={'7%'}
                onPress={props.handleSubmit} active={active}/>
            </>)}</Formik>

        
    </View>

    <ChangePassword/> 
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