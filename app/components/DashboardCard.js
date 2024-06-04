import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import useAuth from '../auth/useAuth';
import colors from '../config/colors';
import AppText from './Text';

function DashboardCard({imegeUrl,title,onPress}) {
    const {width,height}= useAuth()
return (
    <TouchableOpacity style={{width:width*0.4,height:width*0.4,backgroundColor:colors.secondary,borderRadius:10,justifyContent:'center',alignItems:'center'}}
    onPress={onPress}>
    <Image source={imegeUrl} style={{width:'50%',height:'50%'}}/>
    <AppText fontFamily='PoppinsSemiBold' color={colors.primary}>{title}</AppText>
    </TouchableOpacity>
);
}

export default DashboardCard;
const styles = StyleSheet.create({
container:{
flex:1,
justifyContent:'center',
 alignItems:'center'
}
});