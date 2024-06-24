import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Image, Platform, KeyboardAvoidingView, ScrollView, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import RadioGroup from 'react-native-radio-buttons-group';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign,Ionicons,MaterialIcons } from '@expo/vector-icons';

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
import AppPicker from '../../components/AppPicker';
import pickersData from '../../config/pickersData';
import { useInitialStates } from '../../hooks/useStateHook';


const ReviewSchema = yup.object({
    NAME: yup.string().required().label("Name"),
    AGE: yup.string().required().label("Age"),
  })

  
  const setData =[
    {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Male',
        value: 'Male'
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

    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [date, setDate] = useState(new Date(Date.now()));


    const {selectedReligion,onSelectedReligion,
        selectedEducation,onSelectedEducation}=useInitialStates()
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const getDate = () => {
        showDatepicker();
    };




    const handleSubmit = async (values) =>{
        setActive(true);

        const result = await addPatientApi.request({
            ...values,
            dob:date,
            gender:setData[sex-1].value,
            religion:selectedReligion.title,
            education:selectedEducation.title
        });
        if(!result.ok){
          setActive(false);
          return;
        };
        setActive(false);
        alert("Registration was successful. Now you can add patients records!");
      }

    //  useActiveScreenFunc() .FocusedAndBlur(()=>{},()=>{
    //     // navigation.goBack();
    //  })
return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.keyboardAvoidingView}>
    <ScrollView contentContainerStyle={styles.container}>

    <View style={{width:width*0.9,justifyContent:'flex-end',marginBottom:'10%'}}>
        <View style={{width:width*0.3,height:width*0.3}}>
            <Image style={{width:'100%',height:'100%'}} source={require('../../assets/images/preLogo.png')}/>
        </View>
        <AppText fontSize={width*0.06}  fontFamily='PoppinsSemiBold'>Add New Patient</AppText>
    </View>


    <Formik
          initialValues={{
            firstName:"",surname:"",address:"",occupation:"",telephone:"",ethnicity:""}}
        //   validationSchema={ReviewSchema}
          onSubmit={handleSubmit}
          >
            {(props)=>(<>
                <View style={{width:width*0.9,justifyContent:'center'}}>
                    <AppTextInput placeholder={'First Name'} 
                    onChangeText={props.handleChange('firstName')}
                    onBlur={props.handleBlur('firstName')}
                    value={props.values.firstName}
                    touched={props.touched.firstName}
                    errors={props.errors.firstName}/>
                   
                    <AppTextInput placeholder={'Surname'} 
                    onChangeText={props.handleChange('surname')}
                    onBlur={props.handleBlur('surname')}
                    value={props.values.surname}
                    touched={props.touched.surname}
                    errors={props.errors.surname}/>

                    <AppTextInput placeholder={'Address'} 
                    onChangeText={props.handleChange('address')}
                    onBlur={props.handleBlur('address')}
                    value={props.values.address}
                    touched={props.touched.address}
                    errors={props.errors.address}/>
                    
                    <AppTextInput placeholder={'Occupation'} 
                    onChangeText={props.handleChange('occupation')}
                    onBlur={props.handleBlur('occupation')}
                    value={props.values.occupation}
                    touched={props.touched.occupation}
                    errors={props.errors.occupation}/>
                    
                    <AppTextInput placeholder={'Telephone'} 
                    onChangeText={props.handleChange('telephone')}
                    onBlur={props.handleBlur('telephone')}
                    value={props.values.telephone}
                    touched={props.touched.telephone}
                    errors={props.errors.telephone}
                    keyboardType='numeric'
                    />

                    <AppTextInput placeholder={'Ethnicity'} 
                    onChangeText={props.handleChange('ethnicity')}
                    onBlur={props.handleBlur('ethnicity')}
                    value={props.values.ethnicity}
                    touched={props.touched.ethnicity}
                    errors={props.errors.ethnicity}/>

                    <AppText>Religion</AppText>
                    <AppPicker items={pickersData.religion}  onSelectedItem={onSelectedReligion} selectedItem={selectedReligion} />

                    <AppText>Highest education attainment</AppText>
                    <AppPicker items={pickersData.education}  onSelectedItem={onSelectedEducation} selectedItem={selectedEducation} />
                    

                    <AppText marginLeft = '5%' fontSize={width*0.05} fontFamily='PoppinsSemiBold'>Sex</AppText>
                    <RadioGroup 
                        radioButtons={radioButtons} 
                        onPress={setSex}
                        selectedId={sex}
                        layout='row'
                    />

                <View style={{ width: '100%' }}>
                    <AppText textAlign='left'>Select your date</AppText>
                </View>
                <View style={{ backgroundColor: colors.textInputBG, width: '100%', paddingLeft: 25, marginVertical: '3%', padding: '3%', borderRadius: width * 0.03 }}>
                    <Pressable onPress={getDate} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <AppText>{date.toString().substring(0, 15)}</AppText>
                        <MaterialIcons name="date-range" size={24} color={colors.dark} />
                    </Pressable>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                            maximumDate={new Date()}
                        />
                    )}
                </View>

                </View>

                <AppButton text={'Submit'} width={width*0.9} marginTop={'15%'}
                onPress={props.handleSubmit} active={active}/>
            </>)}</Formik>
    {/* <View style={{width:'100%',height:height*0.18,}}/> */}

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