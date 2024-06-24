import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Image, Platform, KeyboardAvoidingView, ScrollView, TouchableOpacity, Alert,Clipboard } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import RadioGroup from 'react-native-radio-buttons-group';
// import Clipboard from '@react-native-clipboard/clipboard';

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
import doctor from '../../api/doctor';


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

function AddDoctorScreen({navigation}) {
    const {width,height,user} =useAuth();
    const addDoctorApi =useApi(doctor.AddDoctor)
    const [active,setActive]=useState(false);
    const [sex, setSex] = useState();
    const [credentials, setCredentials] = useState();
    const radioButtons = useMemo(() => (setData), []);

    const copyToClipboard = (text) => {
        Clipboard.setString(text);
        Alert.alert('Copied to clipboard', text);
      };
    

    const handleSubmit = async (values) =>{
        setActive(true);

        const result = await addDoctorApi.request({
            ...values,
            sex:setData[sex-1].value
        });
        if(!result.ok){
          setActive(false);
          return;
        };
        setActive(false);
        setCredentials(JSON.parse(result.data))
        alert("Doctor has been added successfully!");
      }

return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.keyboardAvoidingView}>
    <ScrollView contentContainerStyle={styles.container}>

    <View style={{width:width*0.9,justifyContent:'flex-end',marginBottom:'10%'}}>
        <View style={{width:width*0.3,height:width*0.3}}>
            <Image style={{width:'100%',height:'100%'}} source={require('../../assets/images/preLogo.png')}/>
        </View>
        <AppText fontSize={width*0.06}  fontFamily='PoppinsSemiBold'>Add New Doctor</AppText>
    </View>
    {credentials&&<View style={{backgroundColor:'#dcfdd9',marginBottom:'5%',padding:'2%'}}>
        <AppText fontSize={width*0.05} fontFamily='PoppinsSemiBold' color={colors.secondary}>Doctor's credentials</AppText>
        <AppText fontSize={width * 0.04} fontFamily={'PoppinsRegular'}>
          Code:{' '}
            <AppText fontSize={width * 0.05} fontFamily="PoppinsSemiBold" color="green"
            onLongPress={() => copyToClipboard(credentials.doctor.code.toString())}>
              {credentials.doctor.code}
            </AppText>
        </AppText>
        <AppText fontSize={width * 0.04} fontFamily={'PoppinsRegular'}>
          Password:{' '}
            <AppText fontSize={width * 0.05} fontFamily="PoppinsSemiBold" color="green"
            onLongPress={() => copyToClipboard(credentials.password.toString())}>
              {credentials.password}
            </AppText>
        </AppText>
    </View>}


    <Formik
          initialValues={{
            name:"",rank:"",mdc_number:"",hospital:"Korle-Bu Teaching Hospital",department:"Psychiatry"}}
        //   validationSchema={ReviewSchema}
          onSubmit={handleSubmit}
          >
            {(props)=>(<>
                <View style={{width:width*0.9,justifyContent:'center'}}>
                    <AppTextInput placeholder={'Full Name'} 
                    onChangeText={props.handleChange('name')}
                    onBlur={props.handleBlur('name')}
                    value={props.values.name}
                    touched={props.touched.name}
                    errors={props.errors.name}/>

                    <AppText marginLeft = '5%' fontSize={width*0.05} fontFamily='PoppinsSemiBold'>Sex</AppText>
                    <RadioGroup 
                        radioButtons={radioButtons} 
                        onPress={setSex}
                        selectedId={sex}
                        layout='row'
                    />
                   
                    <AppTextInput placeholder={'Rank'} 
                    onChangeText={props.handleChange('rank')}
                    onBlur={props.handleBlur('rank')}
                    value={props.values.rank}
                    touched={props.touched.rank}
                    errors={props.errors.rank} 
                    marginTop={'2%'}/>

                    <AppTextInput placeholder={'MDC Number'} 
                    onChangeText={props.handleChange('mdc_number')}
                    onBlur={props.handleBlur('mdc_number')}
                    value={props.values.mdc_number}
                    touched={props.touched.mdc_number}
                    errors={props.errors.mdc_number}/>
                    
                    <AppTextInput placeholder={'Hospital'} 
                    onChangeText={props.handleChange('hospital')}
                    onBlur={props.handleBlur('hospital')}
                    value={props.values.hospital}
                    touched={props.touched.hospital}
                    errors={props.errors.hospital}/>

                    <AppTextInput placeholder={'Department'} 
                    onChangeText={props.handleChange('department')}
                    onBlur={props.handleBlur('department')}
                    value={props.values.department}
                    touched={props.touched.department}
                    errors={props.errors.department}/>

                </View>

                <AppButton text={'Submit'} width={width*0.9} marginTop={'15%'}
                onPress={props.handleSubmit} active={active}/>
            </>)}</Formik>
    {/* <View style={{width:'100%',height:height*0.18,}}/> */}

</ScrollView>
</KeyboardAvoidingView>
);
}

export default AddDoctorScreen;
const styles = StyleSheet.create({
container:{
    backgroundColor:colors.primary,
    padding:'5%'
},
keyboardAvoidingView: {
    flex: 1,
  },
});