import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';



import AppText from '../../components/Text';
import colors from '../../config/colors';
import useAuth from '../../auth/useAuth';
import AppButton from '../../components/AppButton';
import AppTextInput from '../../components/AppTextInput';
import useApi from '../../hooks/useApi';
import predict from '../../api/predict';



function ResultsScreen({route,navigation}) {
    const {width,height}=useAuth();
    const {results} = route.params;
    const updatePredict = useApi(predict.updatePredict);
    const [active,setActive]=useState(false);

    // console.log(results.sectionId)
    async function handleSubmit(values){
        setActive(true);
        let data = {
            ...values,
            sectionId:results.sectionId
        }

        const response = await updatePredict.request(data);
        setActive(false);
        response.ok? alert('Session has been updated successfully!'): alert('Error encounted in updating session try again later!');
    }
return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.keyboardAvoidingView}>
    <ScrollView contentContainerStyle={[styles.container]}>
        <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.05}>ECT Parameters Prediction System</AppText>
        <AppText>Below are the correct parameters to undergo the ECT process.</AppText>
        
        <View style={{marginTop:'5%'}}>
            {/* {data.map((item,index)=>( */}
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:'2%',marginBottom:'5%'}}>
                <AppText fontFamily='PoppinsSemiBold'>CURRENT: </AppText>
                <AppText fontFamily='PoppinsSemiBold'>{results.CURRENT}mA</AppText>
            </View>
            
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:'2%',marginBottom:'5%'}}>
                <AppText fontFamily='PoppinsSemiBold'>FREQUENCY: </AppText>
                <AppText fontFamily='PoppinsSemiBold'>{results.FREQUENCY}Hz</AppText>
            </View>

            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:'2%',marginBottom:'5%'}}>
                <AppText fontFamily='PoppinsSemiBold'>DURATION OF STIMULATION: </AppText>
                <AppText fontFamily='PoppinsSemiBold'>{results.DURATION_OF_STIMULATION.toFixed(2)}s</AppText>
            </View>

            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:'2%',marginBottom:'5%'}}>
                <AppText fontFamily='PoppinsSemiBold'>PULSE WIDTH: </AppText>
                <AppText fontFamily='PoppinsSemiBold'>{results.PULSE_WIDTH.toFixed(2)}ms</AppText>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:'2%',marginBottom:'5%'}}>
                <AppText fontFamily='PoppinsSemiBold'>ENERGY: </AppText>
                <AppText fontFamily='PoppinsSemiBold'>{results.ENERGY.toFixed(2)}J</AppText>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:'2%',marginBottom:'5%'}}>
                <AppText fontFamily='PoppinsSemiBold'>RESISTANCE: </AppText>
                <AppText fontFamily='PoppinsSemiBold'>{results.RESISTANCE.toFixed(2)}Ω</AppText>
            </View>

            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:'2%',marginBottom:'5%'}}>
                <AppText width='80%' fontFamily='PoppinsSemiBold'>DURATION OF TONIC CLONIC MUSCULAR ACTIVITY: </AppText>
                <AppText fontFamily='PoppinsSemiBold'>{results.DURATION_OF_TONIC_CLONIC_MUSCULAR_ACTIVITY.toFixed(2)}s</AppText>
            </View>
            {/* ))} */}
        </View>

        <AppText fontFamily='PoppinsSemiBold' color={colors.secondary} fontSize={width*0.05}>Input actual values</AppText>

        <Formik
          initialValues={{
            note: "",
            duration: "",
            resistance:"",
            current:"",
            frequency:"",
            d_o_s:"",
            pulse_width:"",
            energy:""
        }}
        //   validationSchema={ReviewSchema}
          onSubmit={handleSubmit}
          >
           {(props)=>( <>
            <AppText>Current</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('current')}
                    onBlur={props.handleBlur('current')}
                    value={props.values.current}
                    touched={props.touched.current}
                    errors={props.errors.current}
                    keyboardType='numeric'
                />
            <AppText>Frequency</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('frequency')}
                    onBlur={props.handleBlur('frequency')}
                    value={props.values.frequency}
                    touched={props.touched.frequency}
                    errors={props.errors.frequency}
                    keyboardType='numeric'
                />
            <AppText>Duration Of Stimulation</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('d_o_s')}
                    onBlur={props.handleBlur('d_o_s')}
                    value={props.values.d_o_s}
                    touched={props.touched.d_o_s}
                    errors={props.errors.d_o_s}
                    keyboardType='numeric'
                />
            <AppText>Pulse Width</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('pulse_width')}
                    onBlur={props.handleBlur('pulse_width')}
                    value={props.values.pulse_width}
                    touched={props.touched.pulse_width}
                    errors={props.errors.pulse_width}
                    keyboardType='numeric'
                />
            <AppText>Energy</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('energy')}
                    onBlur={props.handleBlur('energy')}
                    value={props.values.energy}
                    touched={props.touched.energy}
                    errors={props.errors.energy}
                    keyboardType='numeric'
                />         
            <AppText>Resistance</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('resistance')}
                    onBlur={props.handleBlur('resistance')}
                    value={props.values.resistance}
                    touched={props.touched.resistance}
                    errors={props.errors.resistance}
                    keyboardType='numeric'
                />
            <AppText>Duration</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('duration')}
                    onBlur={props.handleBlur('duration')}
                    value={props.values.duration}
                    touched={props.touched.duration}
                    errors={props.errors.duration}
                    keyboardType='numeric'
                />          
            <AppText>Note</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('note')}
                    onBlur={props.handleBlur('note')}
                    value={props.values.note}
                    touched={props.touched.note}
                    errors={props.errors.note}
                />
            <AppButton width='80%' marginTop='5%' alignSelf='center' text={'Update'} onPress={props.handleSubmit} active={active}/>
           </>)}</Formik>


        <AppButton width='80%' marginTop='5%' alignSelf='center' text={'Go Back'} onPress={()=>navigation.goBack()}/>

    </ScrollView>
</KeyboardAvoidingView>
);
}

export default ResultsScreen;
const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.primary,
        // alignItems:'center',
        padding:'5%',
        marginBottom:'10%'
    },
    keyboardAvoidingView: {
        flex: 1,
      },
});