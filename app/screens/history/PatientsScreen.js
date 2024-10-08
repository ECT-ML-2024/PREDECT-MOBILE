import React, { useEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, TextInput, Platform, TouchableOpacity } from 'react-native';
import AppText from '../../components/Text';
import { Ionicons,Entypo } from '@expo/vector-icons';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import Card from '../../components/Card';
import routes from '../../navigations/routes';
import patient from '../../api/patient';
import useApi from '../../hooks/useApi';
import useActiveScreenFunc from '../../hooks/useActiveScreenFunc';
import CardEmpty from '../../components/empty/CardEmpty';

const list = [
    {id:1},
    {id:1},
    {id:1},
    {id:1},
]

function PatientsScreen({navigation}) {
    const {width}=useAuth();
    const getpatientsApi=useApi(patient.patients);
    const [patients,setPatients]=useState([]);
    const [active,setActive]=useState(false);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useActiveScreenFunc().FocusedAndBlur(()=>{
        setActive(true);
        loadPatients();
    },()=>{})

    function sortByFirstName(patients) {
        return patients.sort((a, b) => {
            let nameA = a.firstName.toLowerCase();
            let nameB = b.firstName.toLowerCase();
            
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
    }

    async function loadPatients(){
        const response =await getpatientsApi.request();
        if(!response.ok){
            alert(response.data);
            setActive(false);
            return
        }

        setActive(false);
        var sortedList =sortByFirstName(response.data);
        setPatients(sortedList);
        setFilteredPatients(response.data);
    }

    const handleSearch = (text) => {
        setSearchQuery(text);
        const filtered = patients.filter(doctor =>
            doctor.firstName.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredPatients(filtered);
    }
return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.keyboardAvoidingView}>
            <View style={{width:width,backgroundColor:colors.primary}}>
            <View style={{backgroundColor:colors.textInputBG,width:width*0.9,borderRadius:10,padding:'2%',alignSelf:'center',flexDirection:'row',marginVertical:'5%'}}>
            <Ionicons name="search" size={24} color="black" />
            <TextInput placeholder='Patient Name' 
            onChangeText={handleSearch}
            value={searchQuery}
            placeholderTextColor={colors.mediumDark}
            style={{flex:1,marginLeft:'3%',fontSize:width*0.04,color:colors.dark}}/>
            </View>
            </View>
    <ScrollView contentContainerStyle={styles.container}>
        {filteredPatients.map((item,index)=>{
            return(
            <Card item={item} key={index} onPress={()=>navigation.navigate(routes.HISTORY_TAB,{
                screen:routes.PATIENT,
                params:{patient:item}
            })}/>
        )})}
        {active&&list.map((item,index)=>{
            return(
                <CardEmpty key={index}/>
        )})}
        
    </ScrollView>
    <TouchableOpacity style={[styles.button,{width:width*0.2,height:width*0.2,borderRadius:width/2,}]}
    onPress={()=>navigation.navigate(routes.HISTORY_TAB,{
        screen:routes.ADD_PATIENT
    })}>
        <Entypo name="plus" size={width*0.1} color={colors.primary} />
    </TouchableOpacity>
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
  button:{
    backgroundColor: 'red', // Set the background color of the container
    shadowColor: '#000',     // Shadow color for iOS
    shadowOffset: { width: 0, height: 0 }, // Shadow offset (x, y) for iOS
    shadowOpacity: 0.1,      // Shadow opacity for iOS
    shadowRadius: 2,         // Shadow radius for iOS
    elevation:5,            // Elevation for Android (controls shadow)
    padding:'2%',flexDirection:'row',alignItems:'center',
    backgroundColor:colors.secondary,
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top:'85%',
    right:'5%'
}
});