import React, { memo, useState,useRef } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';


import AppText from '../../components/Text';
import colors from '../../config/colors';
import useAuth from '../../auth/useAuth';
import AppButton from '../../components/AppButton';
import routes from '../../navigations/routes';
import { useInitialStates } from '../../hooks/useStateHook';
import AppPicker from '../../components/AppPicker';
import pickersData from '../../config/pickersData';
import useApi from '../../hooks/useApi';
import predict from '../../api/predict';
import useActiveScreenFunc from '../../hooks/useActiveScreenFunc';
import ScrollUpButton from '../../components/ScrollUpButton';



function SecondScreen({navigation,route}) {
    const {results} = route.params;
    const {width,height}=useAuth();
    const predictApi=useApi(predict.predict);
    const scrollViewRef = useRef();
    const previousScrollY = useRef(0);

    const [active,setActive]=useState(false);
    const [show,setShow] = useState(false);
    // console.log(results)
    



    const {
        selectedTypeOfSimulation,onSelectedTypeOfSimulation,
        selectedOutcome,onSelectedOutcome,
        selectedAnaesthesia,onSelectedAnaesthesia,
        selectedPolarity,onSelectedPolarity,
        selectedPositionRight,onSelectedPositionRight,
        selectedPositionLeft,onSelectedPositionLeft,
        selectedHandedness,onSelectedHandedness,
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
    } = useInitialStates();

    useActiveScreenFunc().FocusedAndBlur(()=>{
        
    },()=>{
        console.log("Out!")
    });

    
    
     
    const handleSubmit =async ()=>{
        setActive(true)
        let finalData = {
            ...results,
            TYPE_OF_STIMULATION: selectedTypeOfSimulation.title,
            OUTCOME: selectedOutcome.title,
            ANAESTHESIA: selectedAnaesthesia.title,
            POLARITY: selectedPolarity.title,
            POSITION_RIGHT: selectedPositionRight.title,
            POSITION_LEFT: selectedPositionLeft.title,
            HANDEDNESS: selectedHandedness.title,
            
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
        
        <View style={{marginTop:'5%'}}>
       

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
        <AppPicker items={pickersData.CURRENT_DIAGNOSES}  onSelectedItem={onSelectedNeurocognitive} selectedItem={selectedNeurocognitive} width='80%'/>

       

        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <AppButton width='30%' backgroundColor={colors.textInputBG} textColor={colors.secondary} text={'Prev'} onPress={()=>navigation.goBack()}/>
            <AppButton width='60%' text={'Submit'}
            onPress={handleSubmit}
            active={active}/>
        </View> 
    </ScrollView>
    <ScrollUpButton show={show} scrollToTop={scrollToTop}/>
        </>
</KeyboardAvoidingView>
);
}

export default memo(SecondScreen);
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