import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Image, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import RadioGroup from 'react-native-radio-buttons-group';


import AppText from '../../components/Text';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import AppTextInput from '../../components/AppTextInput';
import AppButton from '../../components/AppButton';
import useApi from '../../hooks/useApi';
import register from '../../api/register';
import routes from '../../navigations/routes';
import patient from '../../api/patient';
import useActiveScreenFunc from '../../hooks/useActiveScreenFunc';


const ReviewSchema = yup.object({
    NAME: yup.string().required().label("Name"),
    AGE: yup.string().required().label("Age"),
  })

  
  const setData =[
    {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Male',
        value: 'MALE'
    },
    {
        id: '2',
        label: 'Female',
        value: 'Female'
    }
]
function AddPatientScreen({navigation}) {
    const {width,height,user} =useAuth();
    const addPatientApi =useApi(patient.addPatient)
    const [active,setActive]=useState(false);
    const [sex, setSex] = useState();
    const radioButtons = useMemo(() => (setData), []);


    const handleSubmit = async ({NAME,AGE}) =>{
        setActive(true);

        const result = await addPatientApi.request({NAME:NAME.trim(),AGE,GENDER:setData[sex-1].value,doctorId:user._id});
        if(!result.ok){
          setActive(false);
          return;
        };
        setActive(false);
        alert("Registration was successful. Now you can add patients records!");
      }

     useActiveScreenFunc() .FocusedAndBlur(()=>{},()=>{
        navigation.goBack();
     })
return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.keyboardAvoidingView}>
    <ScrollView contentContainerStyle={styles.container}>

    <View style={{width:width*0.9,height:height*0.2,justifyContent:'flex-end',marginVertical:'10%'}}>
        <View style={{width:width*0.3,height:width*0.3}}>
            <Image style={{width:'100%',height:'100%'}} source={require('../../assets/images/preLogo.png')}/>
        </View>
        <AppText fontSize={width*0.06}  fontFamily='PoppinsSemiBold'>Add New Patient</AppText>
    </View>


    <Formik
          initialValues={{NAME:"", AGE:"",}}
          validationSchema={ReviewSchema}
          onSubmit={handleSubmit}
          >
            {(props)=>(<>
                <View style={{width:width*0.9,height:height*0.25,justifyContent:'center'}}>
                    <AppTextInput placeholder={'Name'} 
                    onChangeText={props.handleChange('NAME')}
                    onBlur={props.handleBlur('NAME')}
                    value={props.values.NAME}
                    touched={props.touched.NAME}
                    errors={props.errors.NAME}/>

                    <AppTextInput placeholder={'Age'}
                    onChangeText={props.handleChange('AGE')}
                    onBlur={props.handleBlur('AGE')}
                    value={props.values.AGE}
                    touched={props.touched.AGE}
                    errors={props.errors.AGE}
                    keyboardType='numeric'/>

                    <RadioGroup 
                        radioButtons={radioButtons} 
                        onPress={setSex}
                        selectedId={sex}
                        layout='row'
                    />
                </View>

                <AppButton text={'Submit'} width={width*0.9} marginTop={'15%'}
                onPress={props.handleSubmit} active={active}/>
            </>)}</Formik>
    <View style={{width:'100%',height:height*0.18,}}/>

</ScrollView>
</KeyboardAvoidingView>
);
}

export default AddPatientScreen;
const styles = StyleSheet.create({
container:{
    backgroundColor:colors.primary,
    padding:'5%'
},
keyboardAvoidingView: {
    flex: 1,
  },
});