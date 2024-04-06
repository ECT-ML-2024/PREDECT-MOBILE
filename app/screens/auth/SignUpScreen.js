import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import RadioGroup from 'react-native-radio-buttons-group';


import AppText from '../../components/Text';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import useApi from '../../hooks/useApi';
import register from '../../api/register';
import routes from '../../navigations/routes';


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
function SignUpScreen({navigation}) {
    const {width,height} =useAuth();
    const registerApi =useApi(register.register)
    const [active,setActive]=useState(false);
    const [sex, setSex] = useState();
    const radioButtons = useMemo(() => (setData), []);

    const handleSubmit = async ({email,password,username}) =>{
        setActive(true);
        if(setData[sex-1] == undefined){
            alert('Please select your Gender!');
            setActive(false);
            return;
        }
        const result = await registerApi.request({email:email.trim(),password:password.trim(),sex:setData[sex-1].value,username:username.trim()});
        if(!result.ok){
          setActive(false);
          return;
        };
        setActive(false);
        alert("Registration was successful. Now you can Login!");
        navigation.navigate(routes.UNAUTHORIZED_USERS);
    }

return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : null}
    style={styles.keyboardAvoidingView}><>
  
  <View style={{width:width,height:height*0.1,backgroundColor:colors.primary}}/>
  <ScrollView contentContainerStyle={styles.container}
  >
{/* <View style={styles.container}> */}
    <View style={{width:width*0.9,marginTop:height*0.05}}>
        <View style={{width:width*0.3,height:width*0.3}}>
            <Image style={{width:'100%',height:'100%'}} source={require('../../assets/images/preLogo.png')}/>
        </View>
        <AppText fontSize={width*0.06}>Hi, <AppText fontSize={width*0.06} color={colors.secondary} fontFamily='PoppinsSemiBold'>Sign Up</AppText></AppText>
        <AppText>to your New Account</AppText>
    </View>

    <Formik
          initialValues={{email:"", password:"",username:""}}
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
                    <RadioGroup 
                        radioButtons={radioButtons} 
                        onPress={setSex}
                        selectedId={sex}
                        layout='row'
                    />
                </View>

                <AppButton text={'Sign Up'} width={width*0.9} marginTop={'7%'}
                onPress={props.handleSubmit} active={active}/>
            </>)}</Formik>

    <AppText marginTop='5%'>Already have an account? <AppText color={colors.secondary}fontFamily='PoppinsSemiBold' onPress={()=>navigation.goBack()}>Login</AppText></AppText>
    <View style={{width:'100%',height:height*0.12}}/>
{/* </View> */}
</ScrollView>
</>
</KeyboardAvoidingView>
);
}

export default SignUpScreen;
const styles = StyleSheet.create({
// container:{
// flex:1,
// justifyContent:'center',
//  alignItems:'center',
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