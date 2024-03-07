import React from 'react';
import { View, StyleSheet,TextInput,Text } from 'react-native';
import useAuth from '../auth/useAuth';
import colors from '../config/colors';

function AppTextInput({placeholder,padding='3%',borderRadius=10,textContentType,onChangeText,onBlur,value,touched,errors,secureTextEntry=false,keyboardType='default',multiline=false,maxLength,onFocus,...others}) {

    const {width} = useAuth();
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
        </View>
        {/* {touched && errors && <ErrorMessage error={errors}/>} */}
        <Text style={{color:'red',}}>{touched && errors}</Text>
    </>
);
}

export default AppTextInput;
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