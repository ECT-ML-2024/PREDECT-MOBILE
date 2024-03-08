import React, { memo, useMemo, useState,useRef } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
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
import AppButton from '../../components/AppButton';
import routes from '../../navigations/routes';
import { useInitialStates } from '../../hooks/useStateHook';
import AppPicker from '../../components/AppPicker';
import pickersData from '../../config/pickersData';
import useApi from '../../hooks/useApi';
import predict from '../../api/predict';
import patient from '../../api/patient';
import AppPatientsPicker from '../../components/AppPatientsPicker';
import useActiveScreenFunc from '../../hooks/useActiveScreenFunc';
import ScrollUpButton from '../../components/ScrollUpButton';

const setData =[
    {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Yes',
        value: 'YES'
    },
    {
        id: '2',
        label: 'No',
        value: 'NO'
    }
]

const zeroAndOneData =[
    {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: '0',
        value: '0'
    },
    {
        id: '2',
        label: '1',
        value: '1'
    }
]

function HomeScreen({navigation}) {
    const {width,height}=useAuth();
    const predictApi=useApi(predict.predict);
    const getpatientsApi=useApi(patient.patients);
    const scrollViewRef = useRef();
    const previousScrollY = useRef(0);
    const radioButtons = useMemo(() => (setData), []);
    const radioButtons_DigitSpan = useMemo(() => (zeroAndOneData), []);

    const [active,setActive]=useState(false);
    const [loading,setLoading]=useState(false);
    const [patients,setPatients]=useState();
    const [selectPatient,setSelectPatient]=useState();
    const [show,setShow] = useState(false);


    const {
        selectedTypeOfSimulation,onSelectedTypeOfSimulation,
        selectedOutcome,onSelectedOutcome,
        selectedAnaesthesia,onSelectedAnaesthesia,
        selectedPolarity,onSelectedPolarity,
        selectedPositionRight,onSelectedPositionRight,
        selectedPositionLeft,onSelectedPositionLeft,
        selectedHandedness,onSelectedHandedness,
        selectedVisualImpairment,onSelectedVisualImpairment,
        selectedOsteoporosis,onSelectedOsteoporosis,
        selectedDislocation,onSelectedDislocation,
        selectedMentalRetardation,onSelectedMentalRetardation,
        selectedPedalOedema,onSelectedPedalOedema,
        selectedRespiratoryInfections,onSelectedRespiratoryInfections,
        selectedStroke,onSelectedStroke,
        selectedCognitiveImpairment,onSelectedCognitiveImpairment,
        selectedDrugTreatment,onSelectedDrugTreatment,
        selectedObservations,onSelectedObservations,
        selectedMemory,onSelectedMemory,
        selectedSchizophrenia,onSelectedSchizophrenia,
        selectedDepression,onSelectedDepression,
        selectedBipolar,onSelectedBipolar,
        selectedNeurocognitiveDisorderDementia,onSelectedNeurocognitiveDisorderDementia,
        selectedAnxiety,onSelectedAnxiety,
        selectedSuicide,onSelectedSuicide,
        selectedSchizoaffective,onSelectedSchizoaffective,
        selectedAcuteAndTransientPsychotic,onSelectedAcuteAndTransientPsychotic,
        selectedMania,onSelectedMania,
        selectedDelusional,onSelectedDelusional,
        selectedSeizures,onSelectedSeizures,
        selectedPsychosisNOS,onSelectedPsychosisNOS,
        selectedDepressionNOS,onSelectedDepressionNOS,
        selectedPostpartumDepression,onSelectedPostpartumDepression,
        selectedNeurocognitive,onSelectedNeurocognitive,
        GENDER,setGENDER,AGE,setAGE,
        selectedDIGIT_SPAN_Forward_2_1_8_5_4,onSelectedDIGIT_SPAN_Forward_2_1_8_5_4,
        selectedDIGIT_SPAN_backward_7_4_2,onSelectedDIGIT_SPAN_backward_7_4_2,
        selectedDELAYED_RECALL_FACE,onSelectedDELAYED_RECALL_FACE,
        selectedDELAYED_RECALL_VELVET,onSelectedDELAYED_RECALL_VELVET,
        selectedDELAYED_RECALL_CHURCH,onSelectedDELAYED_RECALL_CHURCH,
        selectedDELAYED_RECALL_DAISY,onSelectedDELAYED_RECALL_DAISY,
        selectedDELAYED_RECALL_RED,onSelectedDELAYED_RECALL_RED,
        selectedFLUENCY,onSelectedFLUENCY
    } = useInitialStates();

    useActiveScreenFunc().FocusedAndBlur(()=>{
        setLoading(true)
        loadPatients();
        setLoading(false)
    },()=>{
        console.log("Out!")
    });

    async function loadPatients(){
        const response =await getpatientsApi.request();
        if(!response.ok){
            alert(response.data);
            return
        }
        setPatients(response.data);
    }
    
     
    const handleSubmit =async (values)=>{
        setActive(true)
        let finalData = {
            AGE:parseInt(AGE),
            TYPE_OF_STIMULATION: selectedTypeOfSimulation.title,
            OUTCOME: selectedOutcome.title,
            ANAESTHESIA: selectedAnaesthesia.title,
            POLARITY: selectedPolarity.title,
            POSITION_RIGHT: selectedPositionRight.title,
            POSITION_LEFT: selectedPositionLeft.title,
            HANDEDNESS: selectedHandedness.title,
            PHYSICAL_DEFORMITY_VISUAL_IMPAIRMENT:setData[selectedVisualImpairment-1].value,
            PHYSICAL_DEFORMITY_OSTEOPOROSIS: setData[selectedOsteoporosis-1].value,
            PHYSICAL_DEFORMITY_DISLOCATION:setData[selectedDislocation-1].value,
            PHYSICAL_DEFORMITY_MENTAL_RETARDATION:setData[selectedMentalRetardation-1].value,
            PHYSICAL_DEFORMITY_PEDAL_OEDEMA:setData[selectedPedalOedema-1].value,
            PHYSICAL_DEFORMITY_RESPIRATORY_INFECTIONS:setData[selectedRespiratoryInfections-1].value,
            PHYSICAL_DEFORMITY_STROKE:setData[selectedStroke-1].value,
            PHYSICAL_DEFORMITY_COGNITIVE_IMPAIRMENT:setData[selectedCognitiveImpairment-1].value,
            DIGIT_SPAN_Forward_2_1_8_5_4:zeroAndOneData[selectedDIGIT_SPAN_Forward_2_1_8_5_4-1].value,
            DIGIT_SPAN_backward_7_4_2:zeroAndOneData[selectedDIGIT_SPAN_backward_7_4_2-1].value,
            DELAYED_RECALL_FACE:zeroAndOneData[selectedDELAYED_RECALL_FACE-1].value,
            DELAYED_RECALL_VELVET:zeroAndOneData[selectedDELAYED_RECALL_VELVET-1].value,
            DELAYED_RECALL_CHURCH:zeroAndOneData[selectedDELAYED_RECALL_CHURCH-1].value,
            DELAYED_RECALL_DAISY:zeroAndOneData[selectedDELAYED_RECALL_DAISY-1].value,
            DELAYED_RECALL_RED:zeroAndOneData[selectedDELAYED_RECALL_RED-1].value,
            FLUENCY:zeroAndOneData[selectedFLUENCY-1].value,
            GENDER:GENDER,
            CURRENT_DRUG_TREATMENT: selectedDrugTreatment.title,
            OBSERVATIONS: selectedObservations.title,
            MEMORY: selectedMemory.title,
            CURRENT_DIAGNOSES_SCHIZOPHRENIA: selectedSchizophrenia.value,
            CURRENT_DIAGNOSES_DEPRESSION: selectedDepression.value,
            CURRENT_DIAGNOSES_BIPOLAR: selectedBipolar.value,
            CURRENT_DIAGNOSES_NEUROCOGNITIVE_DISORDER_DEMENTIA: selectedNeurocognitiveDisorderDementia.value,
            CURRENT_DIAGNOSES_ANXIETY_DISORDER: selectedAnxiety.value,
            CURRENT_DIAGNOSES_SUICIDE: selectedSuicide.value,
            CURRENT_DIAGNOSES_SCHIZOAFFECTIVE: selectedSchizoaffective.value,
            CURRENT_DIAGNOSES_ACUTE_AND_TRANSIENT_PSYCHOTIC_DIS0RDER: selectedAcuteAndTransientPsychotic.value,
            CURRENT_DIAGNOSES_MANIA: selectedMania.value,
            CURRENT_DIAGNOSES_DELUSIONAL_DISORDER: selectedDelusional.value,
            CURRENT_DIAGNOSES_SEIZURES: selectedSeizures.value,
            CURRENT_DIAGNOSES_PSYCHOSIS_NOS: selectedPsychosisNOS.value,
            CURRENT_DIAGNOSES_DEPRESSION_NOS: selectedDepressionNOS.value,
            CURRENT_DIAGNOSES_POSTPARTUM_DEPRESSION: selectedPostpartumDepression.value,
            CURRENT_DIAGNOSES_NEUROCOGNITIVE_DISORDER: selectedNeurocognitive.value,
            PatientID:selectPatient._id,
            ...values
        }

        
        const res = await predictApi.request(finalData);
        if(res.ok){
            navigation.navigate(routes.HOME_TAB,{
                screen:routes.DONE,
                params:{results:res.data}
            });
        }
        setActive(false);
    }

    function continueFunc(item){
        setAGE(item.AGE.toString());
        setGENDER(item.GENDER);
    }


    const scrollToTop = () => {
        // Use the `scrollTo` method to scroll to the top
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
        setTimeout(() => setShow(false), 500);
    };
    
    const handleScroll = (event) => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        const isScrollingUp = currentScrollY < previousScrollY.current && currentScrollY< height;
        const isScrollingDown = currentScrollY > previousScrollY.current && currentScrollY> height*0.8;

        isScrollingUp ?setShow(false): null;
        isScrollingDown ? setShow(true): null;

        // Update the previous scroll position
        previousScrollY.current = currentScrollY;
    };
    
return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.keyboardAvoidingView}><>

    <ScrollView contentContainerStyle={styles.container}
     ref={scrollViewRef}
     onScroll={handleScroll}
     scrollEventThrottle={500}
    >
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
            PSBPB:""
        }}
          validationSchema={ReviewSchema}
          onSubmit={handleSubmit}
          >
           {(props)=>( <>
        <View style={{marginTop:'5%'}}>
        <AppText>Name*</AppText>
        <AppPatientsPicker items={patients} onSelectedItem={setSelectPatient} selectedItem={selectPatient} placeholder={"Select"} disabled={loading} continueFunc={continueFunc}/>
        
        <AppText>Sex</AppText>
        <View style={{width:'60%',flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:'5%'}}>
            <TouchableOpacity style={{width:width*0.2,justifyContent:'center',alignItems:'center',borderRadius:10,padding:"1%",borderWidth:GENDER=='MALE'?2:0,borderColor:colors.secondary,backgroundColor:GENDER=='MALE'?colors.textInputBG:null,}}
            onPress={()=>setGENDER('MALE')}>
                <Fontisto name="male" size={24} color={GENDER=='MALE'?colors.dark:colors.mediumDark} />
                <AppText>Male</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={{width:width*0.2,justifyContent:'center',alignItems:'center',borderRadius:10,padding:"1%",borderColor:colors.secondary,borderWidth:GENDER=='Female'?2:0,backgroundColor:GENDER=='Female'?colors.textInputBG:null}}
            onPress={()=>setGENDER('Female')}>
            <Fontisto name="female" size={24} color={GENDER=='Female'?colors.dark:colors.mediumDark} />
                <AppText>Female</AppText>
            </TouchableOpacity>
        </View>

        <View style={styles.box}>
            <View style={{width:width*0.4}}>
                <AppText>Age</AppText>
                <AppTextInput
                    onChangeText={(text)=>setAGE(text)}
                    value={AGE}
                    width='90%'
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
                    width='90%'
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
                    width='90%'
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
                width='90%'
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
                width='80%'
                padding='6%'
                keyboardType='numeric'
            />
            </View>
            <View style={{width:width*0.4,alignItems:'flex-end'}}>
                <AppText>Fluency</AppText>
                <RadioGroup 
                radioButtons={radioButtons_DigitSpan} 
                onPress={onSelectedFLUENCY}
                selectedId={selectedFLUENCY}
                layout='row'
                containerStyle={{marginBottom:'10%'}}
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
                    width='80%'
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
                    width='90%'
                    padding='7%'
                    keyboardType='numeric'
                />
            </View>
        </View>
        <View style={styles.box}>
            <View style={{width:width*0.5}}>
                <AppText>Are You Feeling Better?</AppText>
                <AppTextInput
                    onChangeText={props.handleChange('ARE_YOU_FEELING_BETTER')}
                    onBlur={props.handleBlur('ARE_YOU_FEELING_BETTER')}
                    value={props.values.ARE_YOU_FEELING_BETTER}
                    touched={props.touched.ARE_YOU_FEELING_BETTER}
                    errors={props.errors.ARE_YOU_FEELING_BETTER}
                    width='80%'
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
                    width='90%'
                    padding='7%'
                    keyboardType='numeric'
                />
            </View>
        </View>
        

        <AppText>Post Stimulation Aggression</AppText>
        <AppTextInput
            onChangeText={props.handleChange('POST_STIMULATION_AGGRESSION')}
            onBlur={props.handleBlur('POST_STIMULATION_AGGRESSION')}
            value={props.values.POST_STIMULATION_AGGRESSION}
            touched={props.touched.POST_STIMULATION_AGGRESSION}
            errors={props.errors.POST_STIMULATION_AGGRESSION}
            width='70%'
            keyboardType='numeric'
        />

        

    <AppText fontFamily='PoppinsSemiBold'>Digit Span</AppText>
        <View style={styles.box}>
            <View style={{width:width*0.45}}>
                <AppText>Forward 2 1 8 5 4</AppText>
                <RadioGroup 
                radioButtons={radioButtons_DigitSpan} 
                onPress={onSelectedDIGIT_SPAN_Forward_2_1_8_5_4}
                selectedId={selectedDIGIT_SPAN_Forward_2_1_8_5_4}
                layout='row'
                containerStyle={{marginBottom:'10%'}}
            />
                
            </View>
            <View style={{width:width*0.45,alignItems:'flex-end'}}>
                <AppText>Backward 7 4 2</AppText>
                <RadioGroup 
                radioButtons={radioButtons_DigitSpan} 
                onPress={onSelectedDIGIT_SPAN_backward_7_4_2}
                selectedId={selectedDIGIT_SPAN_backward_7_4_2}
                layout='row'
                containerStyle={{marginBottom:'10%'}}
            />
            </View>
        </View>

    <AppText fontFamily='PoppinsSemiBold'>Delayed Recall</AppText>
        <View style={styles.box}>
            <View style={{width:width*0.45}}>
                <AppText>Face</AppText>
                <RadioGroup 
                radioButtons={radioButtons_DigitSpan} 
                onPress={onSelectedDELAYED_RECALL_FACE}
                selectedId={selectedDELAYED_RECALL_FACE}
                layout='row'
                containerStyle={{marginBottom:'10%'}}
            />
            </View>
            <View style={{width:width*0.4}}>
                <AppText>Velvet</AppText>
                <RadioGroup 
                radioButtons={radioButtons_DigitSpan} 
                onPress={onSelectedDELAYED_RECALL_VELVET}
                selectedId={selectedDELAYED_RECALL_VELVET}
                layout='row'
                containerStyle={{marginBottom:'10%'}}
            />
            </View>
        </View>

        <View style={styles.box}>
            <View style={{width:width*0.45}}>
            <AppText>Daisy</AppText>
            <RadioGroup 
                radioButtons={radioButtons_DigitSpan} 
                onPress={onSelectedDELAYED_RECALL_DAISY}
                selectedId={selectedDELAYED_RECALL_DAISY}
                layout='row'
                containerStyle={{marginBottom:'10%'}}
            />
            </View>
            <View style={{width:width*0.4}}>
            <AppText>Red</AppText>
                <RadioGroup 
                radioButtons={radioButtons_DigitSpan} 
                onPress={onSelectedDELAYED_RECALL_RED}
                selectedId={selectedDELAYED_RECALL_RED}
                layout='row'
                containerStyle={{marginBottom:'10%'}}
            />
            </View>
        </View>

        <AppText>Delayed Recall Church</AppText>
        <RadioGroup 
            radioButtons={radioButtons_DigitSpan} 
            onPress={onSelectedDELAYED_RECALL_CHURCH}
            selectedId={selectedDELAYED_RECALL_CHURCH}
            layout='row'
            containerStyle={{marginBottom:'10%'}}
        />

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
                width='80%'
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
                width='80%'
                padding='7%'
                keyboardType='numeric'
            />
            </View>
        </View> 

        <AppText>Type of Stimulation</AppText>
        <AppPicker items={pickersData.TYPE_OF_STIMULATION}  onSelectedItem={onSelectedTypeOfSimulation} selectedItem={selectedTypeOfSimulation} width='70%'/>


        <AppText>Outcome</AppText>
        <AppPicker items={pickersData.OUTCOME}  onSelectedItem={onSelectedOutcome} selectedItem={selectedOutcome}/>

        <AppText>Anaesthesia</AppText>
        <AppPicker items={pickersData.ANAESTHESIA}  onSelectedItem={onSelectedAnaesthesia} selectedItem={selectedAnaesthesia}/>

        <AppText>Polarity</AppText>
        <AppPicker items={pickersData.POLARITY}  onSelectedItem={onSelectedPolarity} selectedItem={selectedPolarity} width='50%'/>

        <AppText>Position Right</AppText>
        <AppPicker items={pickersData.POSITION}  onSelectedItem={onSelectedPositionRight} selectedItem={selectedPositionRight} width='70%'/>

        <AppText>Position Left</AppText>
        <AppPicker items={pickersData.POSITION}  onSelectedItem={onSelectedPositionLeft} selectedItem={selectedPositionLeft} width='70%'/>

        <AppText>Handedness</AppText>
        <AppPicker items={pickersData.HANDEDNESS}  onSelectedItem={onSelectedHandedness} selectedItem={selectedHandedness} width='70%'/>

        <AppText fontFamily='PoppinsSemiBold'>Physical Deformity</AppText>
        <View style={styles.box}>
            <View style={{width:width*0.4}}>
            <AppText>Visual Impairment</AppText>
            <RadioGroup 
                radioButtons={radioButtons} 
                onPress={onSelectedVisualImpairment}
                selectedId={selectedVisualImpairment}
                layout='row'
                containerStyle={{marginBottom:'10%',alignSelf:'flex-end'}}
            />
            </View>
            <View style={{width:width*0.4}}>
                <AppText>Osteoporosis</AppText>
                <RadioGroup 
                radioButtons={radioButtons} 
                onPress={onSelectedOsteoporosis}
                selectedId={selectedOsteoporosis}
                layout='row'
                containerStyle={{marginBottom:'5%'}}
            />
            </View>
        </View>

        <View style={styles.box}>
            <View style={{width:width*0.4}}>
            <AppText>Dislocation</AppText>
            <RadioGroup 
                radioButtons={radioButtons} 
                onPress={onSelectedDislocation}
                selectedId={selectedDislocation}
                layout='row'
                containerStyle={{marginBottom:'10%',alignSelf:'flex-end'}}
            />
            </View>
            <View style={{width:width*0.4}}>
            <AppText>Mental Retardation</AppText>
            <RadioGroup 
                radioButtons={radioButtons} 
                onPress={onSelectedMentalRetardation}
                selectedId={selectedMentalRetardation}
                layout='row'
                containerStyle={{marginBottom:'10%',}}
            />
            </View>
        </View>
        <View style={styles.box}>
            <View style={{width:width*0.4}}>
            <AppText>Pedal Oedema</AppText>
            <RadioGroup 
                radioButtons={radioButtons} 
                onPress={onSelectedPedalOedema}
                selectedId={selectedPedalOedema}
                layout='row'
                containerStyle={{marginBottom:'10%',alignSelf:'flex-end'}}
            />

            </View>
            <View style={{width:width*0.45}}>
            <AppText>Respiratory Infections</AppText>
            <RadioGroup 
                radioButtons={radioButtons} 
                onPress={onSelectedRespiratoryInfections}
                selectedId={selectedRespiratoryInfections}
                layout='row'
                containerStyle={{marginBottom:'10%',alignSelf:'flex-end'}}
            />
            </View>
        </View>

        <View style={styles.box}>
            <View style={{width:width*0.4}}>
            <AppText>Stroke</AppText>
            <RadioGroup 
                radioButtons={radioButtons} 
                onPress={onSelectedStroke}
                selectedId={selectedStroke}
                layout='row'
                containerStyle={{marginBottom:'10%',alignSelf:'flex-end'}}
            />


            </View>
            <View style={{width:width*0.45}}>
            <AppText>Cognitive Impairment</AppText>
            <RadioGroup 
                radioButtons={radioButtons} 
                onPress={onSelectedCognitiveImpairment}
                selectedId={selectedCognitiveImpairment}
                layout='row'
                containerStyle={{marginBottom:'10%'}}
            />
            </View>
        </View>
        

        <AppText>Current Drug Treatment</AppText>
        <AppPicker items={pickersData.CURRENT_DRUG_TREATMENT}  onSelectedItem={onSelectedDrugTreatment} selectedItem={selectedDrugTreatment}/>

        <AppText>Observations</AppText>
        <AppPicker items={pickersData.OBSERVATIONS}  onSelectedItem={onSelectedObservations} selectedItem={selectedObservations}/>

        <AppText>Memory</AppText>
        <AppPicker items={pickersData.MEMORY}  onSelectedItem={onSelectedMemory} selectedItem={selectedMemory}/>

        <AppText fontFamily='PoppinsSemiBold'>Current Diagnoses</AppText>
        <AppText>Schizophrenia</AppText>
        <AppPicker items={pickersData.CURRENT_DIAGNOSES}  onSelectedItem={onSelectedSchizophrenia} selectedItem={selectedSchizophrenia}/>

        <AppText>Depression</AppText>
        <AppPicker items={pickersData.CURRENT_DIAGNOSES}  onSelectedItem={onSelectedDepression} selectedItem={selectedDepression}/>

        <AppText>Bipolar</AppText>
        <AppPicker items={pickersData.CURRENT_DIAGNOSES}  onSelectedItem={onSelectedBipolar} selectedItem={selectedBipolar}/>

        <AppText>Neurocognitive Disorder Dementia</AppText>
        <AppPicker items={pickersData.CURRENT_DIAGNOSES}  onSelectedItem={onSelectedNeurocognitiveDisorderDementia} selectedItem={selectedNeurocognitiveDisorderDementia}/>

        <AppText>Anxiety Disorder</AppText>
        <AppPicker items={pickersData.CURRENT_DIAGNOSES}  onSelectedItem={onSelectedAnxiety} selectedItem={selectedAnxiety}/>

        <AppText>Suicide</AppText>
        <AppPicker items={pickersData.CURRENT_DIAGNOSES}  onSelectedItem={onSelectedSuicide} selectedItem={selectedSuicide}/>

        <AppText>Schizoaffective</AppText>
        <AppPicker items={pickersData.CURRENT_DIAGNOSES}  onSelectedItem={onSelectedSchizoaffective} selectedItem={selectedSchizoaffective}/>

        <AppText>Acute and Transient Psychotic Disorder</AppText>
        <AppPicker items={pickersData.CURRENT_DIAGNOSES}  onSelectedItem={onSelectedAcuteAndTransientPsychotic} selectedItem={selectedAcuteAndTransientPsychotic}/>

        <AppText>Mania</AppText>
        <AppPicker items={pickersData.CURRENT_DIAGNOSES}  onSelectedItem={onSelectedMania} selectedItem={selectedMania}/>

        <AppText>Delusional Disorder</AppText>
        <AppPicker items={pickersData.CURRENT_DIAGNOSES}  onSelectedItem={onSelectedDelusional} selectedItem={selectedDelusional}/>

        <AppText>Seizures</AppText>
        <AppPicker items={pickersData.CURRENT_DIAGNOSES}  onSelectedItem={onSelectedSeizures} selectedItem={selectedSeizures}/>

        <AppText>Psychosis NOS</AppText>
        <AppPicker items={pickersData.CURRENT_DIAGNOSES}  onSelectedItem={onSelectedPsychosisNOS} selectedItem={selectedPsychosisNOS}/>

        <AppText>Depression NOS</AppText>
        <AppPicker items={pickersData.CURRENT_DIAGNOSES}  onSelectedItem={onSelectedDepressionNOS} selectedItem={selectedDepressionNOS}/>

        <AppText>Postpartum Depression</AppText>
        <AppPicker items={pickersData.CURRENT_DIAGNOSES}  onSelectedItem={onSelectedPostpartumDepression} selectedItem={selectedPostpartumDepression}/>

        <AppText>Neurocognitive Disorder</AppText>
        <AppPicker items={pickersData.CURRENT_DIAGNOSES}  onSelectedItem={onSelectedNeurocognitive} selectedItem={selectedNeurocognitive}/>

       

        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <AppButton width='30%' backgroundColor={colors.textInputBG} textColor={colors.secondary} text={'Reset'}/>
            <AppButton width='60%' text={'Submit'}
            onPress={props.handleSubmit}
            active={active}
            // onPress={()=>navigation.navigate(routes.HOME_TAB,{
            //     screen:routes.DONE
            // })}
             />
        </View>
        </>)}
        </Formik>
    </ScrollView>
    <ScrollUpButton show={show} scrollToTop={scrollToTop}/>
        </>
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