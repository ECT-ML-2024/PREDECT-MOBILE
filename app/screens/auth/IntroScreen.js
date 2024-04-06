import React from 'react';
import { View, StyleSheet, Image,ActivityIndicator } from 'react-native';
import AppText from '../../components/Text';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import routes from '../../navigations/routes';
import Swiper from 'react-native-swiper';


const data=[
    {id:1},
    {id:1},
    {id:1},
]
function IntroScreen({navigation}) {
    const {width,height}=useAuth();
return (
<View style={styles.container}>
    <View style={{justifyContent:'space-between',alignItems:'center',minHeight:height*0.6,width:width,paddingHorizontal:'5%'}}>
    
    <Image source={require('../../assets/images/ect.png')}/>
    
    <AppText fontFamily='PoppinsSemiBold' color={colors.mediumDark} fontSize={width*0.055}><AppText  fontSize={width*0.055} fontFamily='PoppinsSemiBold' color={colors.secondary} children={'ECT'}/> PREDICTOR</AppText>
    
    <Swiper loadMinimalLoader={<ActivityIndicator/>} alwaysBounceVertical style={{height:width*0.54,backgroundColor:colors.primary,paddingVertical:'2%'}} autoplay={true} autoplayTimeout={30} springConfig={{ speed: 1, bounciness: 1 }}
      dot={<View style={{backgroundColor:'rgba(0,0,0,.2)', width: width*0.05, height: width*0.05,borderRadius: width*0.05, marginLeft: width*0.02, marginRight: width*0.02, marginTop: 3, marginBottom: 0,}} />}
      activeDot={<View style={{backgroundColor: colors.secondary, width: width*0.055, height: width*0.055, borderRadius: width*0.05, marginLeft: width*0.02, marginRight: width*0.02, marginTop: 3, marginBottom: 0,}} />}>
       {data.map((item,index)=>{
        // console.log("=>",item.ad_img_path)
        return(
        <View key={index} style={{width:width*.85,alignSelf:'center'}}>
            <AppText style={{textAlign:"center"}}>Unlock the power of prediction with ECT parameters! Discover the insights that elevate your process.</AppText>
        </View>
       )})}        
      </Swiper>
    


    <View style={{width:'100%',flexDirection:'row',justifyContent:'flex-end',alignItems:'center',marginTop:'5%'}}>
        {/* <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.055} color={colors.mediumDark}>SKIP</AppText> */}
      
        {/* <View style={{flexDirection:'row',justifyContent:'space-between',width:'30%'}}>
            <View style={{width:width*0.05,height:width*0.05,borderRadius:width*0.05,backgroundColor:colors.secondary}}/>
            <View style={{width:width*0.05,height:width*0.05,borderRadius:width*0.05,backgroundColor:colors.secondary}}/>
            <View style={{width:width*0.05,height:width*0.05,borderRadius:width*0.05,backgroundColor:colors.secondary}}/>
        </View> */}
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