import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../config/colors';
import AppText from './Text';
import useAuth from '../auth/useAuth';

const list=[
    {id:1},
    {id:1},
    {id:1},
]
const CURRENT_DIAGNOSES_DATA = [
    { title: "No", value: 0 },
    { title: "1-3 MONTHS", value: 1 },
    { title: "3-6 MONTHS", value: 2 },
    { title: "6-12 MONTHS", value: 3 },
    { title: "1-3 YRS", value: 4 },
    { title: "3 YRS And Above", value: 5 },
  ];
function Results({sessions,state}) {
    const {width}=useAuth();

    function Component(title,item,unit,dec=2){
        return(
            <View style={styles.input}>
                <AppText width='70%' fontFamily='PoppinsSemiBold'>{title}: </AppText>
                <AppText fontFamily='PoppinsSemiBold' color={colors.mediumDark}>{sessions[state ?? 0][item]?.toFixed(dec)}{unit}</AppText>
            </View>
        )
    }
    function Component1(title,item){
        return(
            <View style={[styles.input,{flexWrap:'wrap'}]}>
                <AppText width='70%' fontFamily='PoppinsSemiBold'>{title}: </AppText>
                <AppText fontFamily='PoppinsSemiBold' color={colors.mediumDark}>{sessions[state ?? 0][item]}</AppText>
            </View>
        )
    }
    function Component2(title,item){
        return(
            <View style={[styles.input,{flexWrap:'wrap'}]}>
                <AppText width='70%' fontFamily='PoppinsSemiBold'>{title}: </AppText>
                <AppText fontFamily='PoppinsSemiBold' color={colors.mediumDark}>{CURRENT_DIAGNOSES_DATA[sessions[state ?? 0][item]].title}</AppText>
            </View>
        )
    }
    

    if(sessions.length>0){
        return (
        <View style={{backgroundColor:colors.primary,padding:'2%',borderRadius:10}}>
            <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.05} color={colors.secondary}>PREDICTED VALUES</AppText>
            {Component('Energy','ENERGY','J')}
            {Component('Current','CURRENT','mA')}
            {Component('Frequency','FREQUENCY','Hz')}
            {Component('Resistance','RESISTANCE','Ω')}
            {Component('Pulse Width','PULSE_WIDTH','ms')}
            {Component('Duration Of Stimulation','DURATION_OF_STIMULATION','s')}
            {Component('Duration Of Tonic Clonic Muscular Activity','DURATION_OF_TONIC_CLONIC_MUSCULAR_ACTIVITY','s')}

            <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.05} color={colors.secondary} marginTop='7%'>INPUT VALUES</AppText>
            {Component('Clock','CLOCK','',1)}
            {Component('Fluency', 'FLUENCY', '',0)}
            {Component('Language', 'LANGUAGE', '',0)}
            {Component('Pre Temperature','PRE_TEMPERATURE','°',1)}
            {Component('Pre Stimulation Pulse','PRE_STIMULATION_PULSE','BPM',0)}
            {Component('Pre Respiratory Rate','PRE_RESPIRATORY_RATE','BPM',0)}
            {Component('Pre Perfusion Index','Pre_Perfusion_Index','BPM',2)}
            {Component('Pre SpO2','Pre_SpO2','%',2)}
            {Component('Fasting Blood Sugars','FASTING_BLOOD_SUGARS','mg/dL',2)}
            {Component1('Hearing Adequate', 'HEARING_ADEQUATE')}
            {Component('Are You Feeling Better','ARE_YOU_FEELING_BETTER','',0)}
            {Component('Post Stimulation Aggression','POST_STIMULATION_AGGRESSION','',0)}
            {Component('Digit Span Forward','DIGIT_SPAN_Forward_2_1_8_5_4','',0)}
            {Component('Digit Span Backward','DIGIT_SPAN_backward_7_4_2','',0)}
            {Component('Delayed Recall Face', 'DELAYED_RECALL_FACE', '',0)}
            {Component('Delayed Recall Velvet', 'DELAYED_RECALL_VELVET', '',0)}
            {Component('Delayed Recall Church', 'DELAYED_RECALL_CHURCH', '',0)}
            {Component('Delayed Recall Daisy', 'DELAYED_RECALL_DAISY', '',0)}
            {Component('Delayed Recall Red', 'DELAYED_RECALL_RED', '',0)}
            {Component('Orientation', 'ORIENTATION', '',0)}
            {Component('No Of Sessions', 'NO_OF_SESSIONS', '',0)}

            {Component1('Type Of Stimulation', 'TYPE_OF_STIMULATION')}
            {Component1('Outcome', 'OUTCOME')}
            {Component1('Anaesthesia', 'ANAESTHESIA')}
            {Component1('Polarity', 'POLARITY')}
            {Component1('Position Right', 'POSITION_RIGHT')}
            {Component1('Position Left', 'POSITION_LEFT')}
            {Component1('Handedness', 'HANDEDNESS')}
            {Component1('Current Drug Treatment', 'CURRENT_DRUG_TREATMENT')}
            {Component1('Observations', 'OBSERVATIONS')}
            {Component1('Memory', 'MEMORY')}

            <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.045} color={colors.secondary} marginTop='7%'>Physical Deformity</AppText>
            {Component1('Visual Impairment', 'PHYSICAL_DEFORMITY_VISUAL_IMPAIRMENT')}
            {Component1('Osteoporosis', 'PHYSICAL_DEFORMITY_OSTEOPOROSIS')}
            {Component1('Dislocation', 'PHYSICAL_DEFORMITY_DISLOCATION')}
            {Component1('Mental Retardation', 'PHYSICAL_DEFORMITY_MENTAL_RETARDATION')}
            {Component1('Pedal Oedema', 'PHYSICAL_DEFORMITY_PEDAL_OEDEMA')}
            {Component1('Respiratory Infections', 'PHYSICAL_DEFORMITY_RESPIRATORY_INFECTIONS')}
            {Component1('Stroke', 'PHYSICAL_DEFORMITY_STROKE')}
            {Component1('Cognitive Impairment', 'PHYSICAL_DEFORMITY_COGNITIVE_IMPAIRMENT')}



            <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.045} color={colors.secondary} marginTop='7%'>Current Diagnoses</AppText>
            {Component2('Schizophrenia', 'CURRENT_DIAGNOSES_SCHIZOPHRENIA')}
            {Component2('Depression', 'CURRENT_DIAGNOSES_DEPRESSION')}
            {Component2('Bipolar', 'CURRENT_DIAGNOSES_BIPOLAR')}
            {Component2('Neurocognitive Disorder Dementia', 'CURRENT_DIAGNOSES_NEUROCOGNITIVE_DISORDER_DEMENTIA')}
            {Component2('Anxiety Disorder', 'CURRENT_DIAGNOSES_ANXIETY_DISORDER')}
            {Component2('Suicide', 'CURRENT_DIAGNOSES_SUICIDE')}
            {Component2('Schizoaffective', 'CURRENT_DIAGNOSES_SCHIZOAFFECTIVE')}
            {Component2('Acute And Transient Psychotic Disorder', 'CURRENT_DIAGNOSES_ACUTE_AND_TRANSIENT_PSYCHOTIC_DIS0RDER')}
            {Component2('Mania', 'CURRENT_DIAGNOSES_MANIA')}
            {Component2('Delusional Disorder', 'CURRENT_DIAGNOSES_DELUSIONAL_DISORDER')}
            {Component2('Seizures', 'CURRENT_DIAGNOSES_SEIZURES')}
            {Component2('Psychosis Nos', 'CURRENT_DIAGNOSES_PSYCHOSIS_NOS')}
            {Component2('Depression Nos', 'CURRENT_DIAGNOSES_DEPRESSION_NOS')}
            {Component2('Postpartum Depression', 'CURRENT_DIAGNOSES_POSTPARTUM_DEPRESSION')}

            {Component2('Neurocognitive Disorder', 'CURRENT_DIAGNOSES_NEUROCOGNITIVE_DISORDER')}
                </View>
        );
    }else{
      return null  
    }
}

export default Results;
const styles = StyleSheet.create({
    input:{
        flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:'2%',borderBottomWidth:0.25,borderColor:colors.mediumDark
      }
});




//   PSBPT: 130,
//   PSBPB: 60,