import React, { memo, useMemo, } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';


import AppText from '../../components/Text';
import colors from '../../config/colors';
import useAuth from '../../auth/useAuth';
import AppButton from '../../components/AppButton';
import routes from '../../navigations/routes';
import { useInitialStates } from '../../hooks/useStateHook';
import useActiveScreenFunc from '../../hooks/useActiveScreenFunc';
import AppButtonOP from '../../components/AppButtonOP';

const setData =[
    {
        id: '1',
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
        id: '1',
        label: '0',
        value: '0'
    },
    {
        id: '2',
        label: '1',
        value: '1'
    }
]

function SecondScreen({navigation,route}) {
    const {results} = route.params;
    const {width,height}=useAuth();
    const radioButtons = useMemo(() => (setData), []);
    const radioButtons_DigitSpan = useMemo(() => (zeroAndOneData), []);
    


    const {
        selectedVisualImpairment,onSelectedVisualImpairment,
        selectedOsteoporosis,onSelectedOsteoporosis,
        selectedDislocation,onSelectedDislocation,
        selectedMentalRetardation,onSelectedMentalRetardation,
        selectedPedalOedema,onSelectedPedalOedema,
        selectedRespiratoryInfections,onSelectedRespiratoryInfections,
        selectedStroke,onSelectedStroke,
        selectedCognitiveImpairment,onSelectedCognitiveImpairment,
        
        selectedDIGIT_SPAN_Forward_2_1_8_5_4,onSelectedDIGIT_SPAN_Forward_2_1_8_5_4,
        selectedDIGIT_SPAN_backward_7_4_2,onSelectedDIGIT_SPAN_backward_7_4_2,
        selectedDELAYED_RECALL_FACE,onSelectedDELAYED_RECALL_FACE,
        selectedDELAYED_RECALL_VELVET,onSelectedDELAYED_RECALL_VELVET,
        selectedDELAYED_RECALL_CHURCH,onSelectedDELAYED_RECALL_CHURCH,
        selectedDELAYED_RECALL_DAISY,onSelectedDELAYED_RECALL_DAISY,
        selectedDELAYED_RECALL_RED,onSelectedDELAYED_RECALL_RED,
    } = useInitialStates();


   
    
     
    const handleSubmit =async ()=>{
 
        let finalData = {
            ...results,
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
        }
        navigation.navigate(routes.HOME_TAB,{
            screen:routes.THIRD,
            params:{results:finalData}
        })
    }
    
    
return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.keyboardAvoidingView}>

    <ScrollView contentContainerStyle={styles.container}>
        <View style={{width:width*.6,height:3,borderRadius:10,backgroundColor:colors.secondary,position:'absolute',}}/>
        <AppText>Please fill out the fields below before proceeding to the next section. Note that you can go back, but once you do, you will lose the information on this page.</AppText>
    
        <View style={{marginTop:'5%'}}>
        

        

        

    <AppText fontFamily='PoppinsSemiBold'>Digit Span</AppText>
        <View style={{flexDirection:'row'}}>
            <View style={{width:width*0.5}}>
                <AppText>Forward 2 1 8 5 4</AppText>
                <RadioGroup 
                radioButtons={radioButtons_DigitSpan} 
                onPress={onSelectedDIGIT_SPAN_Forward_2_1_8_5_4}
                selectedId={selectedDIGIT_SPAN_Forward_2_1_8_5_4}
                layout='row'
                containerStyle={{marginBottom:'10%'}}
            />
                
            </View>
            <View style={{width:width*0.45,}}>
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

        <AppText>Church</AppText>
        <RadioGroup 
            radioButtons={radioButtons_DigitSpan} 
            onPress={onSelectedDELAYED_RECALL_CHURCH}
            selectedId={selectedDELAYED_RECALL_CHURCH}
            layout='row'
            containerStyle={{marginBottom:'10%'}}
        />

        
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
                containerStyle={{marginBottom:'5%',alignSelf:'flex-end'}}
            />
            </View>
        </View>
        <View style={styles.box}>
            <View style={{width:width*0.4}}>
            <AppText>Mental Retardation</AppText>
            <RadioGroup 
                radioButtons={radioButtons} 
                onPress={onSelectedMentalRetardation}
                selectedId={selectedMentalRetardation}
                layout='row'
                containerStyle={{marginBottom:'10%',alignSelf:'flex-end'}}
            />            
            </View>
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
        </View>
        <View style={styles.box}>
            <View style={{width:width*0.4}}>
            <AppText>Respiratory Infections</AppText>
            <RadioGroup 
                radioButtons={radioButtons} 
                onPress={onSelectedRespiratoryInfections}
                selectedId={selectedRespiratoryInfections}
                layout='row'
                containerStyle={{marginBottom:'10%',alignSelf:'flex-end'}}
            />
            </View>
            <View style={{width:width*0.4}}>
            <AppText>Cognitive Impairment</AppText>
            <RadioGroup 
                radioButtons={radioButtons} 
                onPress={onSelectedCognitiveImpairment}
                selectedId={selectedCognitiveImpairment}
                layout='row'
                containerStyle={{marginBottom:'10%',alignSelf:'flex-end'}}
            />
            </View>
        </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <AppButton width='30%' backgroundColor={colors.textInputBG} textColor={colors.secondary} text={'Prev'} onPress={()=>navigation.goBack()}/>
            <AppButtonOP width='60%' text={'Next'}
            onPress={handleSubmit}/>
        </View>
    </ScrollView>
    
</KeyboardAvoidingView>
);
}

export default memo(SecondScreen);
const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.primary,
        // alignItems:'center',
        padding:'5%',
        // paddingTop:0,
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
    box:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        // backgroundColor:'red',
        marginBottom:20
}
});