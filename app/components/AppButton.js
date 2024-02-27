import React from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import AppText from './Text';
import colors from '../config/colors';
import useAuth from '../auth/useAuth';

function AppButton({text,textColor,onPress,active,...others}) {
    const {width}=useAuth();
return (
<TouchableOpacity style={[styles.container,{...others}]} onPress={onPress}>
    {!active&&<AppText fontFamily='PoppinsSemiBold' fontSize={width*0.05} color={textColor??colors.primary}>{text}</AppText>}
    {active&&<ActivityIndicator size={width*0.08} color={colors.primary}/>}
</TouchableOpacity>
);
}

export default AppButton;
const styles = StyleSheet.create({
container:{
justifyContent:'center',
 alignItems:'center',
 backgroundColor:colors.secondary,
 width:'100%',
 padding:'3%',
 borderRadius:10
}
});