import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import AppText from '../../components/Text';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';

function OTPScreen(props) {
    const {width} =useAuth();
return (
<View style={styles.container}>
    <View style={{width:width*0.9}}>
        
        <AppText fontSize={width*0.06} width={width*0.4} color={colors.secondary} fontFamily='PoppinsSemiBold'>OTP <AppText fontSize={width*0.06} >your password?</AppText></AppText>
        <AppText>Enter your email address. We will send a verification code to your email.</AppText>
    </View>

    <View style={{width:width*0.9,marginTop:'10%'}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',width:width*0.7,alignSelf:'center'}}>
        <View style={styles.Input}><TextInput style={[styles.text,{fontSize:width*0.05}]} textAlign='center' maxLength={1} placeholder=''/></View>
        <View style={styles.Input}><TextInput style={[styles.text,{fontSize:width*0.05}]} textAlign='center' maxLength={1} placeholder=''/></View>
        <View style={styles.Input}><TextInput style={[styles.text,{fontSize:width*0.05}]} textAlign='center' maxLength={1} placeholder=''/></View>
        <View style={styles.Input}><TextInput style={[styles.text,{fontSize:width*0.05}]} textAlign='center' maxLength={1} placeholder=''/></View>
        </View>
    </View>

    <AppButton text={'Send'} width={width*0.9} marginTop={'15%'}/>


</View>
);
}

export default OTPScreen;
const styles = StyleSheet.create({
container:{
flex:1,
justifyContent:'center',
 alignItems:'center',
 backgroundColor:colors.primary
},
Input:{
    padding:'3%',
    backgroundColor:colors.textInputBG,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center'
},
text:{
    fontFamily:'PoppinsSemiBold',
    color:colors.secondary,
}
});