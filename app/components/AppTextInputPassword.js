import React, { useState } from 'react';
import { View, StyleSheet,TextInput,Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import useAuth from '../auth/useAuth';
import colors from '../config/colors';

function AppTextInputPassword({placeholder,padding='3%',borderRadius=10,textContentType,onChangeText,onBlur,value,touched,errors,keyboardType='default',multiline=false,maxLength,onFocus,...others}) {

    const {width} = useAuth();
    const [secureTextEntry,setSecureTextEntry]=useState(true);

return (
    <>
        <View style={[styles.container,{borderRadius:borderRadius,backgroundColor:colors.textInputBG,...others}]}>
            <TextInput          
                placeholder={placeholder}
                textContentType={textContentType}
                onChangeText={onChangeText}
                onBlur={onBlur}
                value={value}
                style={[styles.textInputBox,{fontSize:width*0.04,color:colors.dark,padding:padding}]}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                multiline={multiline}
                maxLength={maxLength}
                placeholderTextColor={colors.mediumDark}
                onFocus={onFocus}
                />
                <Entypo name={secureTextEntry?"eye-with-line":"eye"} size={24} color={colors.mediumDark} style={{marginRight:'5%'}} onPress={()=>setSecureTextEntry(!secureTextEntry)} />
        </View>
        {/* {touched && errors && <ErrorMessage error={errors}/>} */}
        <Text style={{color:'red',}}>{touched && errors}</Text>
    </>
);
}

export default AppTextInputPassword;
const styles = StyleSheet.create({
container:{
    
    width:'100%', 
    flexDirection:'row',
    alignItems:'center'
},
    textInputBox:{
        flex:1,
        // width:200,
    // paddingHorizontal:10,
    // backgroundColor:'blue',
    // marginRight:20
    marginHorizontal:10
}
});