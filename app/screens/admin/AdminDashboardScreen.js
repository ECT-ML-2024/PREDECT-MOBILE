import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AppText from '../../components/Text';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import DashboardCard from '../../components/DashboardCard';
import routes from '../../navigations/routes';

function AdminDashboardScreen({navigation}) {
    const {width,height,user}=useAuth();
    console.log(user);
return (
<View style={styles.container}>

    <View style={{width:width,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:colors.primary,paddingHorizontal:'5%',
        height:height*0.1
    }}>
        <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.05} width='80%' numberOfLines={1}>Hello, {user.name}</AppText>
        <Image style={{width:width*0.15,height:width*0.15,borderRadius:width*0.15}} source={require('../../assets/images/doctors.jpg')}/>
    </View>

    <View style={{width:width,backgroundColor:colors.primary,height:height*0.25,justifyContent:'center',alignItems:'center'}}>
    <View style={[styles.button,{width:width*0.9,height:height*0.2}]}>
        <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.05} color={colors.primary}>ECT Parameters Prediction System</AppText>
    </View>
    </View>
    



    <ScrollView contentContainerStyle={{width:width*0.9,flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap',rowGap:width*0.05,padding:'5%',paddingTop:'10%',paddingBottom:'5%',backgroundColor:colors.primary,height:height*0.65,width:width}}>
    <DashboardCard imegeUrl={require('../../assets/images/doctors.jpg')} title={'Doctors'}
    onPress={()=>navigation.navigate(routes.DOCTORS_TAB,{
        screen:routes.DOCTORS
    })}/>
    <DashboardCard imegeUrl={require('../../assets/images/documents.png')} title={'Add Doctor'}
    onPress={()=>navigation.navigate(routes.HOME_TAB,{
        screen:routes.ADD_DOCTOR
    })}/>
    <DashboardCard imegeUrl={require('../../assets/images/avatar.png')} title={'Profile'}
    onPress={()=>navigation.navigate(routes.PROFILE_TAB,{
        screen:routes.PROFILE
    })}/>
    
    </ScrollView>
</View>
);
}

export default AdminDashboardScreen;
const styles = StyleSheet.create({
container:{
flex:1,
justifyContent:'flex-start',
 alignItems:'center'
},
button:{
    shadowColor: '#000',    
    shadowOffset: { width: 0, height: 0 }, 
    shadowOpacity: 0.1,      
    shadowRadius: 2,       
    elevation:5,  
    backgroundColor:colors.secondary,
    borderRadius:10,justifyContent:'center',
    alignItems:'center',padding:'3%'
}
});