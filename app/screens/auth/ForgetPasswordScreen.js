// import React, { useState } from 'react';
// import { View, StyleSheet, Image } from 'react-native';
// import AppText from '../../components/Text';
// import useAuth from '../../auth/useAuth';
// import colors from '../../config/colors';
// import AppTextInput from '../../components/AppTextInput';
// import AppButton from '../../components/AppButton';
// import useApi from '../../hooks/useApi';
// import register from '../../api/register';
// import routes from '../../navigations/routes';

// function ForgetPasswordScreen({navigation}) {
//     const {width} =useAuth();
//     const sendCodeApi=useApi(register.sendCode);
//     const [email,setEmail]=useState('');
//     const [active,setActive]=useState(false);

//     async function handleSubmit(){
//         setActive(true);
//         await sendCodeApi.request({email:email})
//         setActive(false);
//         navigation.navigate(routes.OPT,{
//             email:email
//         });
//         setEmail('')
//     }
// return (
// <View style={styles.container}>
//     <View style={{width:width*0.9}}>
        
//         <AppText fontSize={width*0.06} width={width*0.4} color={colors.secondary} fontFamily='PoppinsSemiBold'>Forgot <AppText fontSize={width*0.06} >your password?</AppText></AppText>
//         <AppText>Enter your email address. We will send a verification code to your email.</AppText>
//     </View>

//     <View style={{width:width*0.9,marginTop:'10%'}}>
//         <AppText>Email*</AppText>
//         <AppTextInput placeholder={'onedon@gmail.com'}
        
//         onChangeText={setEmail}
//         value={email}/>
//     </View>

//     <AppButton text={'Send'} width={width*0.9} marginTop={'7%'}
//     active={active}
//     onPress={()=>handleSubmit()}/>


// </View>
// );
// }

// export default ForgetPasswordScreen;
// const styles = StyleSheet.create({
// container:{
// flex:1,
// justifyContent:'center',
//  alignItems:'center',
//  backgroundColor:colors.primary
// }
// });