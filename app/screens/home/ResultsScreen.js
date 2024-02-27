import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import AppText from '../../components/Text';
import colors from '../../config/colors';
import useAuth from '../../auth/useAuth';
import AppButton from '../../components/AppButton';



function ResultsScreen({route}) {
    const {width,height}=useAuth();
    const {results} = route.params;
return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.keyboardAvoidingView}>
    <ScrollView contentContainerStyle={[styles.container,{height:height}]}>
        <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.05}>ECT Parameters Prediction System</AppText>
        <AppText>Below are the correct parameters to undergo the ECT process.</AppText>
        
        <View style={{marginTop:'5%'}}>
            {/* {data.map((item,index)=>( */}
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:'2%',marginBottom:'5%'}}>
                <AppText fontFamily='PoppinsSemiBold'>ENERGY: </AppText>
                <AppText fontFamily='PoppinsSemiBold'>{results.ENERGY.toFixed(2)}J</AppText>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:'2%',marginBottom:'5%'}}>
                <AppText fontFamily='PoppinsSemiBold'>CURRENT: </AppText>
                <AppText fontFamily='PoppinsSemiBold'>{results.CURRENT.toFixed(2)}mA</AppText>
            </View>
            
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:'2%',marginBottom:'5%'}}>
                <AppText fontFamily='PoppinsSemiBold'>FREQUENCY: </AppText>
                <AppText fontFamily='PoppinsSemiBold'>{results.FREQUENCY.toFixed(2)}Hz</AppText>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:'2%',marginBottom:'5%'}}>
                <AppText fontFamily='PoppinsSemiBold'>RESISTANCE: </AppText>
                <AppText fontFamily='PoppinsSemiBold'>{results.RESISTANCE.toFixed(2)}Ω</AppText>
            </View>

            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:'2%',marginBottom:'5%'}}>
                <AppText fontFamily='PoppinsSemiBold'>PULSE WIDTH: </AppText>
                <AppText fontFamily='PoppinsSemiBold'>{results.PULSE_WIDTH.toFixed(2)}ms</AppText>
            </View>

            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:'2%',marginBottom:'5%'}}>
                <AppText fontFamily='PoppinsSemiBold'>DURATION OF STIMULATION: </AppText>
                <AppText fontFamily='PoppinsSemiBold'>{results.DURATION_OF_STIMULATION.toFixed(2)}s</AppText>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:'2%',marginBottom:'5%'}}>
                <AppText width='80%' fontFamily='PoppinsSemiBold'>DURATION OF TONIC CLONIC MUSCULAR ACTIVITY: </AppText>
                <AppText fontFamily='PoppinsSemiBold'>{results.DURATION_OF_TONIC_CLONIC_MUSCULAR_ACTIVITY.toFixed(2)}s</AppText>
            </View>
            {/* ))} */}
        </View>

        <AppButton width='80%' alignSelf='center' text={'Done'}/>


    </ScrollView>
</KeyboardAvoidingView>
);
}

export default ResultsScreen;
const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.primary,
        // alignItems:'center',
        padding:'5%'
    },
    keyboardAvoidingView: {
        flex: 1,
      },
});