import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AppText from '../../components/Text';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';

function NewPasswordScreen(props) {
    const {width} =useAuth();
return (
<View style={styles.container}>
    <View style={{width:width*0.9}}>
        <AppText fontSize={width*0.06} width={width*0.4}>Set your new <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.06} color={colors.secondary} > Password</AppText></AppText>

        <AppText>Enter yout new password</AppText>
    </View>

    <View style={{width:width*0.9,marginTop:'10%'}}>
        <AppTextInput placeholder={'New Password'}/>
        <AppTextInput placeholder={'Retype Password'}/>
    </View>

    <AppButton text={'Login'} width={width*0.9} marginTop={'10%'}/>
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