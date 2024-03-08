import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


import useAuth from '../auth/useAuth';
import colors from '../config/colors';

function ScrollUpButton({scrollToTop,show}) {
    const {width,height}=useAuth();
    if(show){
        return (
        <TouchableOpacity style={{width:width*0.13,height:width*0.13,borderRadius:width*0.03,backgroundColor:colors.secondary,zIndex:3,position:'absolute',top:height*0.75,right:'5%',justifyContent:'center',alignItems:'center'}}
              onPress={scrollToTop}>
                <Ionicons name="arrow-up-outline" size={width*0.08} color={colors.primary} />
        </TouchableOpacity>
        );
    }
}

export default ScrollUpButton;
const styles = StyleSheet.create({
container:{
flex:1,
justifyContent:'center',
 alignItems:'center'
}
});