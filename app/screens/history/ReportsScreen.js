import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import Ionicons from '@expo/vector-icons/Ionicons';

import AppText from '../../components/Text';
import colors from '../../config/colors';

function ReportsScreen({route}) {
    const { sessions,firstName,surname }=route.params;
    const [loading,setLoading]=useState(false);
    const [selected,setSelected]=useState(null);


    async function handleDownload(values){
        setLoading(true);
        
    const htmlContent = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ECT Session Report</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    background-color: #f4f4f4;
                }
                .report-container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    text-align: center;
                    color: #333;
                }
                .section-title {
                    font-size: 18px;
                    color: #555;
                    margin-bottom: 10px;
                    border-bottom: 2px solid #ddd;
                    padding-bottom: 5px;
                }
                .details, .parameters, .notes {
                    margin-bottom: 20px;
                }
                .details p, .parameters p, .notes p {
                    margin: 5px 0;
                    color: #333;
                }
                .notes p {
                    font-style: italic;
                    color: #007BFF;
                }
            </style>
        </head>
        <body>
            <div class="report-container">
                <h1>ELECTROCONVULSIVE THERAPY (ECT) SESSION REPORT</h1>
                
                <div class="details">
                    <div class="section-title">Patient Details</div>
                    <p><strong>Patient Name:</strong> ${firstName} ${surname}</p>
                    <p><strong>Hospital:</strong> Korle-Bu Teaching Hospital</p>
                    <p><strong>Department:</strong> Department of Psychiatry</p>
                </div>
                
                <div class="session-details">
                    <div class="section-title">Session Details</div>
                    <p><strong>Date:</strong> ${values.date.toString().substr(0,10)}</p>
                    <p><strong>Therapist:</strong> ${values.doctorName}</p>
                </div>
                
                <div class="parameters">
                    <div class="section-title">Parameters</div>
                    <p><strong>Current Applied to the Brain:</strong> ${values.CURRENT}mA</p>
                    <p><strong>Frequency Used to Deliver the Current:</strong> ${values.FREQUENCY}Hz</p>
                    <p><strong>Pulse Width:</strong> ${values.PULSE_WIDTH}ms</p>
                    <p><strong>Energy:</strong> ${values.ENERGY}J</p>
                    <p><strong>Body Resistance:</strong> ${values.RESISTANCE}Ω</p>
                    <p><strong>Current Application Duration:</strong> ${values.DURATION_OF_STIMULATION}s</p>
                    <p><strong>Duration of Tonic-Clonic Muscular Activity:</strong> ${values.DURATION_OF_TONIC_CLONIC_MUSCULAR_ACTIVITY}s</p>
                </div>
                
                <div class="notes">
                    <div class="section-title">Therapist's Notes</div>
                    <p>${values.note}</p>
                </div>
            </div>
        </body>
        </html>
    `;
    
  try {
    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    
    await Sharing.shareAsync(uri, { mimeType: 'application/pdf' });
    setLoading(false);
  } catch (error) {
    // console.log(error);
    setLoading(false);
    }
    }
return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : null}
    style={styles.keyboardAvoidingView}>

        <ScrollView contentContainerStyle={styles.container}>

            {sessions.map((item,index)=>(
                <View key={index} style={{backgroundColor:colors.primary,width:'90%',marginVertical:10,borderRadius:10,display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:'5%'}}>
                <View>
                    <AppText><AppText fontWeight='700'>Session number</AppText>. {item?.NO_OF_SESSIONS}</AppText>
                    <AppText>{item.date.toString().substr(0,10)}</AppText>
                </View>
                {loading&& index==selected?(<ActivityIndicator size={25} />):(<Ionicons 
                onPress={()=>{
                    handleDownload(item)
                    setSelected(index)
                    }} name="download-outline" size={25} color={colors.secondary} />)}
            </View>
            ))}

        </ScrollView>
    </KeyboardAvoidingView>
);
}

export default ReportsScreen;
const styles = StyleSheet.create({
    container:{
    flex:1,
    // justifyContent:'center',
    alignItems:'center'
    },
    keyboardAvoidingView: {
        flex: 1,
        // backgroundColor:colors.primary
    },
});