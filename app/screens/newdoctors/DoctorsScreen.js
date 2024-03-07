import React, { useEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, TextInput, Platform } from 'react-native';
import AppText from '../../components/Text';
import { Ionicons } from '@expo/vector-icons';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import Card from '../../components/Card';
import routes from '../../navigations/routes';
import DoctorsCard from '../../components/DoctorCard';
import useApi from '../../hooks/useApi';
import doctor from '../../api/doctor';



function NewDoctorsScreen({navigation}) {
    const {width}=useAuth();
    const getDoctorsApi= useApi(doctor.doctors);
    const doctorAPi= useApi(doctor.doctor);
    const [ doctors,setDoctors]=useState([]);
   useEffect(()=>{
        handleSubmit();
   },[]);

    async function handleSubmit(){
        const response = await getDoctorsApi.request();
        if(response.ok){
            setDoctors(response.data);
        }
    }

    


    async function handleAccept(id,status){
        let data ={
            status:status,
            doctorId:id
        }
        await doctorAPi.request(data);
        handleSubmit();
    }
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
        {doctors.map((item,index)=>{
            return(
            <DoctorsCard item={item} key={index} onPress={()=>navigation.navigate(routes.HISTORY_TAB,{
                screen:routes.PATIENT
            })}
            accept={()=>handleAccept(item._id,true)}
            reject={()=>handleAccept(item._id,false)}
            />
        )})}
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