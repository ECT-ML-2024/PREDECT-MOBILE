import React, { memo, useMemo, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import RadioGroup from 'react-native-radio-buttons-group';

const ReviewSchema = yup.object({
    PRE_TEMPERATURE: yup.string().label('This').required(),
    POST_TEMPERATURE: yup.string().label('This').required(),
    PRE_STIMULATION_PULSE: yup.string().label('This').required(),
    POST_STIMULATION_PULSE: yup.string().label('This').required(),
    PRE_RESPIRATORY_RATE: yup.string().label('This').required(),
    POST_RESPIRATORY_RATE: yup.string().label('This').required(),
    ARE_YOU_FEELING_BETTER: yup.number().min(0).max(5).label('This').required(),
    POST_STIMULATION_AGGRESSION: yup.number().min(0).max(5).label('This').required(),
    CLOCK: yup.number().min(0).max(3).label('This').required(),
    LANGUAGE: yup.number().min(0).max(2).label('This').required(),
    ORIENTATION: yup.number().min(0).max(6).label('This').required(),
    NO_OF_SESSIONS: yup.number().min(0).label('This').required(),
    PRE_Sys_BP: yup.number().min(0).label('This').required(),
    PRE_Dia_BP: yup.number().min(0).label('This').required(),
    POST_Sys_BP: yup.number().min(0).label('This').required(),
    POST_Dia_BP: yup.number().min(0).label('This').required(),
    Pre_SpO2: yup.number().min(0).label('This').required(),
    Post_SpO2: yup.number().min(0).label('This').required(),
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
    const radioButtons_FirstTimer = useMemo(() => (pickersData.YES_OR_NO), []);
    const [loading,setLoading]=useState(false);
    const [patients,setPatients]=useState();
    const [selectPatient,setSelectPatient]=useState();
    const [name,setName]=useState();
    const [firstTimer,setFirstTimer]=useState(2);
    const [show,setShow]=useState(false);





    const {
        selectedHearingAdequate,onSelectedHearingAdequate,
        GENDER,setGENDER,AGE,setAGE,
        selectedFLUENCY,onSelectedFLUENCY
    } = useInitialStates();

    useActiveScreenFunc().FocusedAndBlur(async ()=>{
        setLoading(true)
        await loadPatients();
        setLoading(false)
    },()=>{
        // console.log("Out!")
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
            firstTimer:firstTimer==1,
            ...values
        }

        if (firstTimer==1){
            delete finalData.ARE_YOU_FEELING_BETTER;
            delete finalData.POST_Dia_BP;
            delete finalData.POST_RESPIRATORY_RATE;
            delete finalData.POST_STIMULATION_AGGRESSION;
            delete finalData.POST_STIMULATION_PULSE;
            delete finalData.POST_Sys_BP;
            delete finalData.POST_TEMPERATURE;
            delete finalData.Post_SpO2;
            delete finalData.NO_OF_SESSIONS;
        }
        // console.log(Object.keys(finalData),finalData);
        // console.log(finalData);
        navigation.navigate(routes.HOME_TAB,{
            screen:routes.SECOND,
            params:{results:finalData}
        })
        actions.resetForm();
        setAGE('')
    }

    function continueFunc(item){
        setAGE(item.age.toString());
        setName(item.firstName);
        setGENDER(item.gender=='Male'?'1':'2');
    }



    
return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.keyboardAvoidingView}>
    <ScrollView contentContainerStyle={styles.container}>
    <View style={{width:width*.3,height:3,borderRadius:10,backgroundColor:colors.secondary,position:'absolute',}}/>
        
        <AppText>Please fill out the fields below before proceeding to the next section.</AppText>
        <Formik
          initialValues={{
            PRE_TEMPERATURE:"",
            POST_TEMPERATURE:"",
            PRE_STIMULATION_PULSE:"",
            POST_STIMULATION_PULSE:"",
            PRE_RESPIRATORY_RATE:"",
            POST_RESPIRATORY_RATE:"",
            ARE_YOU_FEELING_BETTER:"",
            POST_STIMULATION_AGGRESSION:"",
            CLOCK:"",
            LANGUAGE:"",
            ORIENTATION:"",
            NO_OF_SESSIONS:"",
            PRE_Sys_BP:"",
            PRE_Dia_BP:"",
            POST_Sys_BP:"",
            POST_Dia_BP:"",
            Pre_SpO2: "",
            Post_SpO2: "",
        }}
        //   validationSchema={ReviewSchema}
          onSubmit={handleSubmit}
          >
           {(props)=>( <>
        <View style={{marginTop:'5%'}}>
        <AppText color={show?colors.dark:'red'}>Is the patient a first timer?</AppText>
        <RadioGroup 
                radioButtons={radioButtons_FirstTimer} 
                onPress={(data)=>{
                    setFirstTimer(data)
                    setShow(true)
                }}
                selectedId={firstTimer}
                layout='row'
                containerStyle={{marginBottom:'5%'}}
            />
      
        <AppText>Folder Id*</AppText>
        <AppPatientsPicker items={patients} onSelectedItem={setSelectPatient} selectedItem={selectPatient} placeholder={"Select"} disabled={show&&!loading} continueFunc={continueFunc}/>
        
        <AppText>Name</AppText>
        <View style={{width:'100%',backgroundColor:colors.textInputBG,padding:'3.8%',borderRadius:10,justifyContent:'center',marginBottom:'5%'}}>
            <AppText>{name}</AppText>
        </View>
            <View>
                <AppText>Sex</AppText>
                    <RadioGroup 
                    radioButtons={radioButtons_Sex} 
                    onPress={setGENDER}
                    selectedId={GENDER}
                    layout='row'
                    containerStyle={{marginBottom:'10%'}}
                />
            </View>

            <View>
            <AppText>Age</AppText>
                <AppTextInput
                    onChangeText={(text)=>setAGE(text)}
                    value={AGE}
                    keyboardType='numeric'
                    editable={show}
                />
            </View>

            <View>
            <AppText>Pre Temperature</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('PRE_TEMPERATURE')}
                    onBlur={props.handleBlur('PRE_TEMPERATURE')}
                    value={props.values.PRE_TEMPERATURE}
                    touched={props.touched.PRE_TEMPERATURE}
                    errors={props.errors.PRE_TEMPERATURE}
                    keyboardType='numeric'
                    editable={show}
                />
            </View>

            {firstTimer!=1&&<View style={{width:'100%'}}>
            <AppText>Post Temperature</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('POST_TEMPERATURE')}
                    onBlur={props.handleBlur('POST_TEMPERATURE')}
                    value={props.values.POST_TEMPERATURE}
                    touched={props.touched.POST_TEMPERATURE}
                    errors={props.errors.POST_TEMPERATURE}
                    keyboardType='numeric'
                    editable={show}
                />
            </View>}

            <View style={{width:'100%'}}>
            <AppText>Pre Stimulation Pulse</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('PRE_STIMULATION_PULSE')}
                    onBlur={props.handleBlur('PRE_STIMULATION_PULSE')}
                    value={props.values.PRE_STIMULATION_PULSE}
                    touched={props.touched.PRE_STIMULATION_PULSE}
                    errors={props.errors.PRE_STIMULATION_PULSE}
                    keyboardType='numeric'
                    editable={show}
                />  
            </View>

            {firstTimer!=1&&<View style={{width:'100%'}}>
            <AppText>Post Stimulation Pulse</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('POST_STIMULATION_PULSE')}
                    onBlur={props.handleBlur('POST_STIMULATION_PULSE')}
                    value={props.values.POST_STIMULATION_PULSE}
                    touched={props.touched.POST_STIMULATION_PULSE}
                    errors={props.errors.POST_STIMULATION_PULSE}
                    keyboardType='numeric'
                    editable={show}
                />  
            </View>}

            <View style={{width:'100%'}}>
            <AppText>Pre Respiratory Rate</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('PRE_RESPIRATORY_RATE')}
                    onBlur={props.handleBlur('PRE_RESPIRATORY_RATE')}
                    value={props.values.PRE_RESPIRATORY_RATE}
                    touched={props.touched.PRE_RESPIRATORY_RATE}
                    errors={props.errors.PRE_RESPIRATORY_RATE}
                    keyboardType='numeric'
                    editable={show}
                />
            </View>

            {firstTimer!=1&&<View style={{width:'100%'}}>
                <AppText>Post Respiratory Rate</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('POST_RESPIRATORY_RATE')}
                    onBlur={props.handleBlur('POST_RESPIRATORY_RATE')}
                    value={props.values.POST_RESPIRATORY_RATE}
                    touched={props.touched.POST_RESPIRATORY_RATE}
                    errors={props.errors.POST_RESPIRATORY_RATE}
                    keyboardType='numeric'
                    editable={show}
                />
            </View>}

            <View style={{width:'100%'}}>
                <AppText>Clock</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('CLOCK')}
                    onBlur={props.handleBlur('CLOCK')}
                    value={props.values.CLOCK}
                    touched={props.touched.CLOCK}
                    errors={props.errors.CLOCK}
                    keyboardType='numeric'
                    editable={show}
                />
            </View>

            <View style={{width:'100%'}}>
                <AppText>Language</AppText>
                <AppTextInput
                onChangeText={props.handleChange('LANGUAGE')}
                onBlur={props.handleBlur('LANGUAGE')}
                value={props.values.LANGUAGE}
                touched={props.touched.LANGUAGE}
                errors={props.errors.LANGUAGE}
                keyboardType='numeric'
                editable={show}
                />
            </View>

            <View style={{width:'100%'}}>
            <AppText>Fluency</AppText>
                <RadioGroup 
                radioButtons={radioButtons_Fluency} 
                onPress={onSelectedFLUENCY}
                selectedId={selectedFLUENCY}
                layout='row'
                containerStyle={{marginBottom:'10%'}}
            />
            </View>

            <View style={{width:'100%'}}>
            <AppText>Orientation</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('ORIENTATION')}
                    onBlur={props.handleBlur('ORIENTATION')}
                    value={props.values.ORIENTATION}
                    touched={props.touched.ORIENTATION}
                    errors={props.errors.ORIENTATION}
                    keyboardType='numeric'
                    editable={show}
                />
            </View>

            {firstTimer!=1&&<View style={{width:'100%'}}>
                <AppText>Are You Feeling Better?</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('ARE_YOU_FEELING_BETTER')}
                    onBlur={props.handleBlur('ARE_YOU_FEELING_BETTER')}
                    value={props.values.ARE_YOU_FEELING_BETTER}
                    touched={props.touched.ARE_YOU_FEELING_BETTER}
                    errors={props.errors.ARE_YOU_FEELING_BETTER}
                    keyboardType='numeric'
                    editable={show}
                />
            </View>}

            {firstTimer!=1&&<View style={{width:'100%'}}>
            <AppText>Post Stimulation Aggression</AppText>
            <AppTextInput
                onChangeText={props.handleChange('POST_STIMULATION_AGGRESSION')}
                onBlur={props.handleBlur('POST_STIMULATION_AGGRESSION')}
                value={props.values.POST_STIMULATION_AGGRESSION}
                touched={props.touched.POST_STIMULATION_AGGRESSION}
                errors={props.errors.POST_STIMULATION_AGGRESSION}
                keyboardType='numeric'
                editable={show}
            />
            </View>}

            <View style={{width:'100%'}}>
            <AppText>Pre SpO2</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('Pre_SpO2')}
                    onBlur={props.handleBlur('Pre_SpO2')}
                    value={props.values.Pre_SpO2}
                    touched={props.touched.Pre_SpO2}
                    errors={props.errors.Pre_SpO2}
                    keyboardType='numeric'
                    editable={show}
                    />
            </View>

        {firstTimer!=1&&<View style={{width:'100%'}}>
            <AppText>Post SpO2</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('Post_SpO2')}
                    onBlur={props.handleBlur('Post_SpO2')}
                    value={props.values.Post_SpO2}
                    touched={props.touched.Post_SpO2}
                    errors={props.errors.Post_SpO2}
                    keyboardType='numeric'
                    editable={show}
                    />
            </View>}
            {firstTimer!=1&&<View style={{width:'100%'}}>
            <AppText>Number of Session</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('NO_OF_SESSIONS')}
                    onBlur={props.handleBlur('NO_OF_SESSIONS')}
                    value={props.values.NO_OF_SESSIONS}
                    touched={props.touched.NO_OF_SESSIONS}
                    errors={props.errors.NO_OF_SESSIONS}
                    keyboardType='numeric'
                    editable={show}
                />  
            </View>}

            <View style={{width:'100%'}}>
            <AppText>Hearing Adequate</AppText>
                <RadioGroup 
                    radioButtons={radioButtons} 
                    onPress={onSelectedHearingAdequate}
                    selectedId={selectedHearingAdequate}
                    layout='row'
                    containerStyle={{marginBottom:'10%'}}
                />
            </View>
        {/* </View> */}


        <AppText fontFamily='PoppinsSemiBold'>Blood Pressure</AppText>
            {/* <View style={styles.box}> */}
            <View style={{width:'100%'}}>
            <AppText>Pre Systolic pressure</AppText>
            <AppTextInput
                onChangeText={props.handleChange('PRE_Sys_BP')}
                onBlur={props.handleBlur('PRE_Sys_BP')}
                value={props.values.PRE_Sys_BP}
                touched={props.touched.PRE_Sys_BP}
                errors={props.errors.PRE_Sys_BP}
                keyboardType='numeric'
                editable={show}
            />
            </View>
            <View style={{width:'100%'}}>
            <AppText>Pre Diastolic pressure</AppText>
            <AppTextInput
                onChangeText={props.handleChange('PRE_Dia_BP')}
                onBlur={props.handleBlur('PRE_Dia_BP')}
                value={props.values.PRE_Dia_BP}
                touched={props.touched.PRE_Dia_BP}
                errors={props.errors.PRE_Dia_BP}
                keyboardType='numeric'
                editable={show}
            />
            {/* </View> */}
            </View>
            {firstTimer!=1&&<>
            <View style={{width:'100%'}}>
            <AppText>Post Systolic pressure</AppText>
            <AppTextInput
                onChangeText={props.handleChange('POST_Sys_BP')}
                onBlur={props.handleBlur('POST_Sys_BP')}
                value={props.values.POST_Sys_BP}
                touched={props.touched.POST_Sys_BP}
                errors={props.errors.POST_Sys_BP}
                keyboardType='numeric'
                editable={show}
            />
            </View>
            <View style={{width:'100%'}}>
            <AppText>Post Diastolic pressure</AppText>
            <AppTextInput
                onChangeText={props.handleChange('POST_Dia_BP')}
                onBlur={props.handleBlur('POST_Dia_BP')}
                value={props.values.POST_Dia_BP}
                touched={props.touched.POST_Dia_BP}
                errors={props.errors.POST_Dia_BP}
                keyboardType='numeric'
                editable={show}
            />
            </View>
            </>}
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