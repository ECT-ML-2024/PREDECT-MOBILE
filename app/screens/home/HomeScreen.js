import React, { memo, useMemo, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import RadioGroup from 'react-native-radio-buttons-group';


const ReviewSchema = yup.object({
    PRE_TEMPERATURE: yup.string().label('This').required(),
    PRE_STIMULATION_PULSE: yup.string().label('This').required(),
    PRE_RESPIRATORY_RATE: yup.string().label('This').required(),
    ARE_YOU_FEELING_BETTER: yup.number().min(0).max(5).label('This').required(),
    POST_STIMULATION_AGGRESSION: yup.number().min(0).max(5).label('This').required(),
    CLOCK: yup.number().min(0).max(3).label('This').required(),
    LANGUAGE: yup.number().min(0).max(2).label('This').required(),
    ORIENTATION: yup.number().min(0).max(6).label('This').required(),
    NO_OF_SESSIONS: yup.number().min(0).label('This').required(),
    PSBPT: yup.number().min(0).label('This').required(),
    PSBPB: yup.number().min(0).label('This').required(),
  });

import AppText from '../../components/Text';
import colors from '../../config/colors';
import useAuth from '../../auth/useAuth';
import AppTextInput from '../../components/AppTextInput';
import routes from '../../navigations/routes';
import { useInitialStates } from '../../hooks/useStateHook';
import pickersData from '../../config/pickersData';
import useApi from '../../hooks/useApi';
import patient from '../../api/patient';
import AppPatientsPicker from '../../components/AppPatientsPicker';
import useActiveScreenFunc from '../../hooks/useActiveScreenFunc';
import AppButtonOP from '../../components/AppButtonOP';


function HomeScreen({navigation}) {
    const {width,height}=useAuth();
    const getpatientsApi=useApi(patient.patients);
    const radioButtons = useMemo(() => (pickersData.YES_OR_NO), []);
    const radioButtons_Fluency = useMemo(() => (pickersData.zeroAndOneData), []);
    const radioButtons_Sex = useMemo(() => (pickersData.setSex), []);
    const [loading,setLoading]=useState(false);
    const [patients,setPatients]=useState();
    const [selectPatient,setSelectPatient]=useState();




    const {
        selectedHearingAdequate,onSelectedHearingAdequate,
        GENDER,setGENDER,AGE,setAGE,
        selectedFLUENCY,onSelectedFLUENCY
    } = useInitialStates();

    useActiveScreenFunc().FocusedAndBlur(()=>{
        setLoading(true)
        loadPatients();
        setLoading(false)
    },()=>{
        console.log("Out!")
        setSelectPatient()
    });

    async function loadPatients(){
        const response =await getpatientsApi.request();
        if(!response.ok){
            alert(response.data);
            return
        }
        setPatients(response.data);
    }
    
     
    const handleSubmit =async (values,actions)=>{
        if(!selectPatient){
            alert('You need to select a patient before you can proceed!')
            return;
        }
        let finalData = {
            AGE:parseInt(AGE),
            FLUENCY:pickersData.zeroAndOneData[selectedFLUENCY-1].value,
            GENDER:pickersData.setSex[GENDER-1].value,
            HEARING_ADEQUATE:pickersData.YES_OR_NO[selectedHearingAdequate-1].value,
            PatientID:selectPatient._id,
            ...values
        }

        navigation.navigate(routes.HOME_TAB,{
            screen:routes.SECOND,
            params:{results:finalData}
        })
        actions.resetForm();
        setAGE('')
    }

    function continueFunc(item){
        setAGE(item.AGE.toString());
        setGENDER(item.GENDER=='MALE'?'1':'2');
    }



    
return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.keyboardAvoidingView}>
    <ScrollView contentContainerStyle={styles.container}>
        <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.05}>ECT Parameters Prediction System</AppText>
        <AppText>Lorem ipsum dolor sit amet, consectetur 
        adipiscing elit. Maecenas at hendrerit lectus, 
        ac pretium mauris.</AppText>
        <Formik
          initialValues={{
            PRE_TEMPERATURE:"",
            PRE_STIMULATION_PULSE:"",
            PRE_RESPIRATORY_RATE:"",
            ARE_YOU_FEELING_BETTER:"",
            POST_STIMULATION_AGGRESSION:"",
            CLOCK:"",
            LANGUAGE:"",
            ORIENTATION:"",
            NO_OF_SESSIONS:"",
            PSBPT:"",
            PSBPB:"",
            Pre_Perfusion_Index: "",
            Pre_SpO2: "",
            FASTING_BLOOD_SUGARS: "",
        }}
          validationSchema={ReviewSchema}
          onSubmit={handleSubmit}
          >
           {(props)=>( <>
        <View style={{marginTop:'5%'}}>
        <AppText>Name*</AppText>
        <AppPatientsPicker items={patients} onSelectedItem={setSelectPatient} selectedItem={selectPatient} placeholder={"Select"} disabled={loading} continueFunc={continueFunc}/>
        

        <View style={styles.box}>
            <View style={{width:width*0.5}}>
            <AppText>Sex</AppText>
                <RadioGroup 
                radioButtons={radioButtons_Sex} 
                onPress={setGENDER}
                selectedId={GENDER}
                layout='row'
                containerStyle={{marginBottom:'10%'}}
            />
            </View>
            <View style={{width:width*0.33,alignItems:'flex-end'}}>
            <AppText>Fluency</AppText>
                <RadioGroup 
                radioButtons={radioButtons_Fluency} 
                onPress={onSelectedFLUENCY}
                selectedId={selectedFLUENCY}
                layout='row'
                containerStyle={{marginBottom:'10%'}}
            />
            </View>
        </View>
        <View style={styles.box}>
            <View style={{width:width*0.4}}>
                <AppText>Age</AppText>
                <AppTextInput
                    onChangeText={(text)=>setAGE(text)}
                    value={AGE}
                    padding='7%'
                    keyboardType='numeric'
                />
            </View>
            <View style={{width:width*0.4,alignItems:'flex-end'}}>
                <AppText>Pre Temperature</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('PRE_TEMPERATURE')}
                    onBlur={props.handleBlur('PRE_TEMPERATURE')}
                    value={props.values.PRE_TEMPERATURE}
                    touched={props.touched.PRE_TEMPERATURE}
                    errors={props.errors.PRE_TEMPERATURE}
                    padding='7%'
                    keyboardType='numeric'
                />
            </View>
        </View>

        <View style={styles.box}>
            <View style={{width:width*0.4}}>
                <AppText>Clock</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('CLOCK')}
                    onBlur={props.handleBlur('CLOCK')}
                    value={props.values.CLOCK}
                    touched={props.touched.CLOCK}
                    errors={props.errors.CLOCK}
                    padding='7%'
                    keyboardType='numeric'
                />
            </View>
            <View style={{width:width*0.4,alignItems:'flex-end'}}>
                <AppText>Language</AppText>
                <AppTextInput
                onChangeText={props.handleChange('LANGUAGE')}
                onBlur={props.handleBlur('LANGUAGE')}
                value={props.values.LANGUAGE}
                touched={props.touched.LANGUAGE}
                errors={props.errors.LANGUAGE}
                padding='7%'
                keyboardType='numeric'
                />
            </View>
        </View>
        <View style={styles.box}>
            <View style={{width:width*0.45}}>
            <AppText>Pre Stimulation Pulse</AppText>
            <AppTextInput
                onChangeText={props.handleChange('PRE_STIMULATION_PULSE')}
                onBlur={props.handleBlur('PRE_STIMULATION_PULSE')}
                value={props.values.PRE_STIMULATION_PULSE}
                touched={props.touched.PRE_STIMULATION_PULSE}
                errors={props.errors.PRE_STIMULATION_PULSE}
                width='90%'
                padding='6%'
                keyboardType='numeric'
            />
            </View>
            <View style={{width:width*0.4,alignItems:'flex-end'}}>
            <AppText>Orientation</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('ORIENTATION')}
                    onBlur={props.handleBlur('ORIENTATION')}
                    value={props.values.ORIENTATION}
                    touched={props.touched.ORIENTATION}
                    errors={props.errors.ORIENTATION}
                    padding='7%'
                    keyboardType='numeric'
                />
            </View>
        </View>
        <View style={styles.box}>
            <View style={{width:width*0.45}}>
                <AppText>Pre Respiratory Rate</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('PRE_RESPIRATORY_RATE')}
                    onBlur={props.handleBlur('PRE_RESPIRATORY_RATE')}
                    value={props.values.PRE_RESPIRATORY_RATE}
                    touched={props.touched.PRE_RESPIRATORY_RATE}
                    errors={props.errors.PRE_RESPIRATORY_RATE}
                    width='90%'
                    padding='6%'
                    keyboardType='numeric'
                />
            </View>
            <View style={{width:width*0.4,alignItems:'flex-end'}}>
            <AppText>No of Sessions</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('NO_OF_SESSIONS')}
                    onBlur={props.handleBlur('NO_OF_SESSIONS')}
                    value={props.values.NO_OF_SESSIONS}
                    touched={props.touched.NO_OF_SESSIONS}
                    errors={props.errors.NO_OF_SESSIONS}
                    padding='7%'
                    keyboardType='numeric'
                />
            </View>
        </View>
        <View style={styles.box}>
            <View style={{width:width*0.4}}>
                <AppText>Are You Feeling Better?</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('ARE_YOU_FEELING_BETTER')}
                    onBlur={props.handleBlur('ARE_YOU_FEELING_BETTER')}
                    value={props.values.ARE_YOU_FEELING_BETTER}
                    touched={props.touched.ARE_YOU_FEELING_BETTER}
                    errors={props.errors.ARE_YOU_FEELING_BETTER}
                    padding='6%'
                    keyboardType='numeric'
                />
            </View>
            <View style={{width:width*0.4,alignItems:'flex-end'}}>
            <AppText>Post Stimulation Aggression</AppText>
        <AppTextInput
            onChangeText={props.handleChange('POST_STIMULATION_AGGRESSION')}
            onBlur={props.handleBlur('POST_STIMULATION_AGGRESSION')}
            value={props.values.POST_STIMULATION_AGGRESSION}
            touched={props.touched.POST_STIMULATION_AGGRESSION}
            errors={props.errors.POST_STIMULATION_AGGRESSION}
            keyboardType='numeric'
            padding='6%'
        />
            </View>
        </View>

        <View style={styles.box}>
            <View style={{width:width*0.4}}>
                <AppText>Pre Perfusion Index</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('Pre_Perfusion_Index')}
                    onBlur={props.handleBlur('Pre_Perfusion_Index')}
                    value={props.values.Pre_Perfusion_Index}
                    touched={props.touched.Pre_Perfusion_Index}
                    errors={props.errors.Pre_Perfusion_Index}
                    padding='6%'
                    keyboardType='numeric'
                />
            </View>
            <View style={{width:width*0.4,alignItems:'flex-end'}}>
            <AppText>Pre_SpO2</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('Pre_SpO2')}
                    onBlur={props.handleBlur('Pre_SpO2')}
                    value={props.values.Pre_SpO2}
                    touched={props.touched.Pre_SpO2}
                    errors={props.errors.Pre_SpO2}
                    keyboardType='numeric'
                    padding='6%'/>
            </View>
        </View>
        
        <View style={styles.box}>
            <View style={{width:width*0.4}}>
                <AppText>Fasting Blood Sugars</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('FASTING_BLOOD_SUGARS')}
                    onBlur={props.handleBlur('FASTING_BLOOD_SUGARS')}
                    value={props.values.FASTING_BLOOD_SUGARS}
                    touched={props.touched.FASTING_BLOOD_SUGARS}
                    errors={props.errors.FASTING_BLOOD_SUGARS}
                    padding='6%'
                    keyboardType='numeric'
                />
            </View>
            <View style={{width:width*0.4,alignItems:'flex-end'}}>
            <AppText>Hearing Adequate</AppText>
                <RadioGroup 
                    radioButtons={radioButtons} 
                    onPress={onSelectedHearingAdequate}
                    selectedId={selectedHearingAdequate}
                    layout='row'
                    containerStyle={{marginBottom:'10%',alignSelf:'flex-end'}}
                />
            </View>
        </View>
        
        <AppText fontFamily='PoppinsSemiBold'>Blood Pressure</AppText>
            <View style={styles.box}>
            <View style={{width:width*0.45}}>
            <AppText>Systolic pressure</AppText>
            <AppTextInput
                onChangeText={props.handleChange('PSBPT')}
                onBlur={props.handleBlur('PSBPT')}
                value={props.values.PSBPT}
                touched={props.touched.PSBPT}
                errors={props.errors.PSBPT}
                width='90%'
                padding='7%'
                keyboardType='numeric'
            />
            </View>
            <View style={{width:width*0.45,alignItems:'flex-end'}}>
            <AppText>Diastolic pressure</AppText>
            <AppTextInput
                onChangeText={props.handleChange('PSBPB')}
                onBlur={props.handleBlur('PSBPB')}
                value={props.values.PSBPB}
                touched={props.touched.PSBPB}
                errors={props.errors.PSBPB}
                width='90%'
                padding='7%'
                keyboardType='numeric'
            />
            </View>
        </View>        

        </View>

        <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
            {/* <AppButton width='30%' backgroundColor={colors.textInputBG} textColor={colors.secondary} text={'Reset'}/> */}
            <AppButtonOP width='60%' text={'Next'} onPress={props.handleSubmit}/>
        </View>
        </>)}
        </Formik>
    </ScrollView>
</KeyboardAvoidingView>
);
}

export default memo(HomeScreen);
const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.primary,
        // alignItems:'center',
        padding:'5%'
    },
    keyboardAvoidingView: {
        flex: 1,
      },
    arrow:{
    padding:'3%',
    backgroundColor:colors.textInputBG,
    borderRadius:10,
    marginHorizontal:'3%',justifyContent:'center',alignItems:'center'
    },
    box:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}
});