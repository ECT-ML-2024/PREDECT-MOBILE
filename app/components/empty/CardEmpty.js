import React from 'react';
import { View, StyleSheet,Image,TouchableOpacity } from 'react-native';
import useApi from '../../hooks/useApi';
import AppText from '../Text';
import colors from '../../config/colors';

function CardEmpty({onPress}) {
    const {width}=useAuth();
return (
<View style={[styles.container,{width:width*0.9,}]}>
            <View style={[styles.box1,{width:width*0.15,height:width*0.15,}]}>
                <View style={{width:width*0.15,height:width*0.15,borderRadius:width*0.15,backgroundColor:colors.textInputBG,marginBottom:3}}/>
                <View style={{width:'90%',height:20,backgroundColor:colors.textInputBG}}/>
            </View>
            <View style={{marginLeft:'5%'}}>
                <View style={{width:width*0.4,height:20,backgroundColor:colors.textInputBG}}/>
                <View style={{width:width*0.2,height:20,marginVertical:'5%',backgroundColor:colors.textInputBG}}/>
                <View style={{width:width*0.3,height:20,backgroundColor:colors.textInputBG}}/>
            </View>
        </View>
);
}

export default CardEmpty;
const styles = StyleSheet.create({
container:{
    backgroundColor:colors.primary,
    flexDirection:'row',
    alignItems:'center',
    padding:'3%',
    marginVertical:'2%',
    borderRadius:10
},
box1:{
    justifyContent:'center',
    alignItems:'center'}
});