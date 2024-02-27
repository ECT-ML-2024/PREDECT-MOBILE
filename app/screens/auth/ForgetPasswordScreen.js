import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AppText from '../../components/Text';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';

function ForgetPasswordScreen(props) {
    const {width} =useAuth();
return (
<View style={styles.container}>
    <View style={{width:width*0.9}}>
        
        <AppText fontSize={width*0.06} width={width*0.4} color={colors.secondary} fontFamily='PoppinsSemiBold'>Forgot <AppText fontSize={width*0.06} >your password?</AppText></AppText>
        <AppText>Enter your email address. We will send a verification code to your email.</AppText>
    </View>

    <View style={{width:width*0.9,marginTop:'10%'}}>
        <AppText>Email*</AppText>
        <AppTextInput placeholder={'onedon@gmail.com'}/>
    </View>

    <AppButton text={'Send'} width={width*0.9} marginTop={'7%'}/>


</View>
);
}

export default ForgetPasswordScreen;
const styles = StyleSheet.create({
container:{
flex:1,
justifyContent:'center',
 alignItems:'center',
 backgroundColor:colors.primary
}
});