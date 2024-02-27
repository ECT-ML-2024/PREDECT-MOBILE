import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, TextInput, Platform } from 'react-native';
import AppText from '../../components/Text';
import { Ionicons } from '@expo/vector-icons';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import Card from '../../components/Card';
import routes from '../../navigations/routes';
import DoctorsCard from '../../components/DoctorCard';


const data=[
    {id:1,name:'Christian',sex:'Male'},
    {id:1,name:'Serwaa',sex:'Female'},
    {id:1,name:'Prince',sex:'Male'},
    {id:1,name:'Richard',sex:'Male'},
    {id:1,name:'Gifty',sex:'Female'},
]
function NewDoctorsScreen({navigation}) {
    const {width}=useAuth();
return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.keyboardAvoidingView}>
            <View style={{width:width,backgroundColor:colors.primary}}>
            <View style={{backgroundColor:colors.textInputBG,width:width*0.9,borderRadius:10,padding:'2%',alignSelf:'center',flexDirection:'row',marginVertical:'5%'}}>
            <Ionicons name="search" size={24} color="black" />
            <TextInput placeholder='Name' 
            placeholderTextColor={colors.mediumDark}
            style={{flex:1,marginLeft:'3%',fontSize:width*0.04,color:colors.dark}}/>
            </View>
            </View>
    <ScrollView contentContainerStyle={styles.container}>
        {data.map((item,index)=>(
            <DoctorsCard item={item} key={index} onPress={()=>navigation.navigate(routes.HISTORY_TAB,{
                screen:routes.PATIENT
            })}/>
        ))}
    </ScrollView>
</KeyboardAvoidingView>
);
}

export default NewDoctorsScreen;
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