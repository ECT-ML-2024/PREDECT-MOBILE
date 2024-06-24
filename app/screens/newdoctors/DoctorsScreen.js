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
import CardEmpty from '../../components/empty/CardEmpty';
import useActiveScreenFunc from '../../hooks/useActiveScreenFunc';

const list = [
    {id:1},
    {id:1},
    {id:1},
    {id:1},
]

function DoctorsScreen({navigation}) {
    const {width}=useAuth();
    const getDoctorsApi= useApi(doctor.doctors);
    const doctorAPi= useApi(doctor.doctor);
    const [ doctors,setDoctors]=useState([]);
    const [active,setActive]=useState(false);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');



useActiveScreenFunc().FocusedAndBlur(()=>{
        handleSubmit();
    },()=>{})
    
    async function handleSubmit(){
        setActive(true);
        const response = await getDoctorsApi.request();
        if(response.ok){
            setDoctors(response.data);
            setFilteredDoctors(response.data);
        }
        setActive(false);
    }

    


    async function handleAccept(id,status){
        let data ={
            status:status,
            doctorId:id
        }
        await doctorAPi.request(data);
        handleSubmit();
    }

    const handleSearch = (text) => {
        setSearchQuery(text);
        const filtered = doctors.filter(doctor =>
            doctor.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredDoctors(filtered);
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
            onChangeText={handleSearch}
            value={searchQuery}
            style={{flex:1,marginLeft:'3%',fontSize:width*0.04,color:colors.dark}}/>
            </View>
            </View>
    <ScrollView contentContainerStyle={styles.container}>
        {filteredDoctors.map((item,index)=>{
            return(
            <DoctorsCard item={item} key={index}
            accept={()=>handleAccept(item._id,true)}
            reject={()=>handleAccept(item._id,false)}
            />
        )})}
        {active&&list.map((item,index)=>{
            return(
                <CardEmpty key={index}/>
        )})}
    </ScrollView>
</KeyboardAvoidingView>
);
}

export default DoctorsScreen;
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