import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AppText from '../../components/Text';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import routes from '../../navigations/routes';

function IntroScreen({navigation}) {
    const {width,height}=useAuth();
return (
<View style={styles.container}>
    <View style={{justifyContent:'space-between',alignItems:'center',minHeight:height*0.6,width:width,paddingHorizontal:'5%'}}>
    <Image source={require('../../assets/images/ect.png')}/>
    
    <AppText fontFamily='PoppinsSemiBold' color={colors.mediumDark} fontSize={width*0.055}><AppText  fontSize={width*0.055} fontFamily='PoppinsSemiBold' color={colors.secondary} children={'ECT'}/> PREDICTOR</AppText>
    
    <AppText style={{textAlign:"center"}}>Unlock the power of prediction with ECT parameters! Discover the insights that elevate your process.</AppText>


    <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:'5%'}}>
        <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.055} color={colors.mediumDark}>SKIP</AppText>
      
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'30%'}}>
            <View style={{width:width*0.05,height:width*0.05,borderRadius:width*0.05,backgroundColor:colors.secondary}}/>
            <View style={{width:width*0.05,height:width*0.05,borderRadius:width*0.05,backgroundColor:colors.secondary}}/>
            <View style={{width:width*0.05,height:width*0.05,borderRadius:width*0.05,backgroundColor:colors.secondary}}/>
        </View>
        <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.055} color={colors.secondary} onPress={()=>navigation.navigate(routes.GETSTARTED)}>NEXT</AppText>
    </View>
    </View>
</View>
);
}

export default IntroScreen;
const styles = StyleSheet.create({
container:{
flex:1,
justifyContent:'center',
 alignItems:'center',
 backgroundColor:colors.primary
}
});