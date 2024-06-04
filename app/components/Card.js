import React from 'react';
import { View, StyleSheet,Image,TouchableOpacity } from 'react-native';
import useAuth from '../auth/useAuth';
import colors from '../config/colors';
import AppText from './Text';

function Card({onPress,item}) {
    const {width}=useAuth();
return (
<TouchableOpacity style={{backgroundColor:colors.primary,width:width*0.9,flexDirection:'row',alignItems:'center',padding:'3%',marginVertical:'2%',borderRadius:10}} onPress={onPress}>
            <View style={{width:width*0.15,height:width*0.15,justifyContent:'center',alignItems:'center'}}>
                <Image
                style={{width:'100%',height:'100%'}}
                source={item.gender=='Male'?require('../assets/images/avatar.png'):require('../assets/images/female-avatar.png')}/>
                <AppText color={colors.mediumDark}>{item.gender.toUpperCase()}</AppText>
            </View>
            <View style={{marginLeft:'5%'}}>
                <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.045}>{item.firstName}</AppText>
                <AppText color={colors.mediumDark}>{item.age} years</AppText>
                <AppText color={colors.mediumDark}>Last visit: {item.lastVisit.toString().substr(0,10)}</AppText>
            </View>
        </TouchableOpacity>
);
}

export default Card;
const styles = StyleSheet.create({
container:{
flex:1,
justifyContent:'center',
 alignItems:'center'
}
});