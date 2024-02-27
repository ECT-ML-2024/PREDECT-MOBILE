import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, TextInput, Platform } from 'react-native';
import AppText from '../../components/Text';
import { Ionicons } from '@expo/vector-icons';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import Card from '../../components/Card';
import routes from '../../navigations/routes';


const data=[
    {id:1,sex:'Male'},
    {id:1,sex:'Female'},
    {id:1,sex:'Male'},
    {id:1,sex:'Male'},
    {id:1,sex:'Female'},
]
function PatientsScreen({navigation}) {
    const {width}=useAuth();
return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.keyboardAvoidingView}>
            <View style={{width:width,backgroundColor:colors.primary}}>
            <View style={{backgroundColor:colors.textInputBG,width:width*0.9,borderRadius:10,padding:'2%',alignSelf:'center',flexDirection:'row',marginVertical:'5%'}}>
            <Ionicons name="search" size={24} color="black" />
            <TextInput placeholder='Patient Name' 
            placeholderTextColor={colors.mediumDark}
            style={{flex:1,marginLeft:'3%',fontSize:width*0.04,color:colors.dark}}/>
            </View>
            </View>
    <ScrollView contentContainerStyle={styles.container}>
        {data.map((item,index)=>(
            <Card item={item} key={index} onPress={()=>navigation.navigate(routes.HISTORY_TAB,{
                screen:routes.PATIENT
            })}/>
        ))}
    </ScrollView>
</KeyboardAvoidingView>
);
}

export default PatientsScreen;
const styles = StyleSheet.create({
container:{
// flex:1,
// justifyContent:'center',
 alignItems:'center',
//  backgroundColor:colors.primary
},
keyboardAvoidingView: {
    flex: 1,
    // backgroundColor:colors.primary
  },
});