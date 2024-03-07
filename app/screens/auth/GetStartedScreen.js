import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AppText from '../../components/Text';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import AppButton from '../../components/AppButton';
import routes from '../../navigations/routes';
import AppButtonOP from '../../components/AppButtonOP';

function GetStartedScreen({navigation}) {
    const {width,height}=useAuth();
return (
<View style={styles.container}>
    <View style={{justifyContent:'space-between',alignItems:'center',minHeight:height*0.6,width:width,paddingHorizontal:'5%'}}>
    <Image source={require('../../assets/images/ect.png')}/>
    
    <AppText fontFamily='PoppinsSemiBold' color={colors.mediumDark} fontSize={width*0.055}><AppText  fontSize={width*0.055} fontFamily='PoppinsSemiBold' color={colors.secondary} children={'ECT'}/> PREDICTOR</AppText>
    
    <AppText style={{textAlign:"center"}}>Unlock the power of prediction with ECT parameters! Discover the insights that elevate your process.</AppText>


    <View style={{width:'100%',marginTop:'5%',}}>
        <AppButtonOP text={'Get Started'} onPress={()=>navigation.navigate(routes.LOGIN)}/>
    </View>
    </View>
</View>
);
}

export default GetStartedScreen;
const styles = StyleSheet.create({
container:{
flex:1,
justifyContent:'center',
 alignItems:'center',
 backgroundColor:colors.primary
}
});