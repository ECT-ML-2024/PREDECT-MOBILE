import React, { memo, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform,ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons,MaterialIcons,Octicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import RadioGroup from 'react-native-radio-buttons-group';

import AppText from '../../components/Text';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import routes from '../../navigations/routes';
import useApi from '../../hooks/useApi';
import patientApi from '../../api/patient';
import Results from '../../components/Results';
import ScrollUpButton from '../../components/ScrollUpButton';



  
function PatientScreen({navigation,route}) {
  const { patient }=route.params;
  const {width,height,user}=useAuth();
  const getPatientAPi=useApi(patientApi.patient);
  const deletePatientAPi=useApi(patientApi.patientdelete);
  const [sessions,setSessions]=useState([]);
  const [stateData,setStateData]=useState([]);
  const [state, setState] = useState('0');
  const [show,setShow] = useState(false);
  const [active,setActive] = useState(false);


  const scrollViewRef = useRef();
  const previousScrollY = useRef(0);


  const [data,setData]=useState({
    datasets: [
      {
        data: [0,0,0],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Line color
        strokeWidth: 2, // Line width
      },
    ],
  });

  const [data_SpO2,setData_SpO2]=useState({
    datasets: [
      {
        data: [0,0,0],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Line color
        strokeWidth: 2, // Line width
      },
    ],
  });


  useEffect(()=>{
    loadPatient();
  },[]);

  async function loadPatient(){
      const response = await getPatientAPi.request(doctorId="",patient._id);
      if(!response.ok){
        alert(response.data);
        return
      };
      setSessions(response.data);
      loadResults(response.data);
      const newData = [];
      const newData_SpO2 = [];
    
      response.data.forEach(element => {
        const pre_result = element.PRE_Sys_BP / element.PRE_Dia_BP;
        newData.push(pre_result);
        if(element.POST_Sys_BP){
          const post_result = element.POST_Sys_BP / element.POST_Dia_BP;
          newData.push(post_result);
        }
        const pre_result_SpO2 = element.Pre_SpO2;
        newData_SpO2.push(pre_result_SpO2);
        if(element.Post_SpO2){
          const post_result_SpO2 = element.Post_SpO2;
          newData_SpO2.push(post_result_SpO2);
        }
      });
      setData({
        datasets: [
          {
            data: newData.length>0?newData:[0],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Line color
            strokeWidth: 2, // Line width
          },
        ],
      })
      setData_SpO2({
        datasets: [
          {
            data: newData_SpO2.length>0?newData_SpO2:[0],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Line color
            strokeWidth: 2, // Line width
          },
        ],
      })
    // setPatients(response.data);
  }

  async function loadResults(array){
    const newData = [];
    array.forEach((element,index) => {
      newData.push({
        id: index.toString(),
        label: (index+1).toString(),
      })
    });
    setStateData(newData);
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

      // if(currentScrollY > previousScrollY.current && currentScrollY> height*0.2){
      //   navigation.setOptions({
      //     headerTitle: 'Patient sessions history',
      //   });
      // }else{
      //   navigation.setOptions({
      //     headerTitle: 'Patient Details',
      //   });
      // }

      isScrollingUp ? setShow(false): null;
      isScrollingDown ? setShow(true): null;

      // Update the previous scroll position
      previousScrollY.current = currentScrollY;
    };


    async function handleDelete(){
        setActive(true)
        const response = await deletePatientAPi.request(patient._id);
        setActive(false)
        if(response.ok){
          alert('Patient has been deleted successfully!');
          }else{
          alert('Error occured in deleting the patient, try again later!');
        }
        navigation.goBack();
    }

return (
  <KeyboardAvoidingView
  behavior={Platform.OS === "ios" ? "padding" : null}
  style={styles.keyboardAvoidingView}>
    <>
  <ScrollView contentContainerStyle={styles.container}
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={500}
  >
    <View style={{backgroundColor:colors.primary,width:width*0.9,alignItems:'center',padding:'3%',borderRadius:10}}>
        <Image style={{width:width*0.2,height:width*0.2}} source={patient.gender =='Male'?require('../../assets/images/avatar.png'):require('../../assets/images/female-avatar.png')}/>
        <AppText textAlign='center' numberOfLines={1} fontFamily='PoppinsSemiBold' width={'90%'} fontSize={width*0.05}>{patient.firstName} {patient.surname}</AppText>
        <View style={{flexDirection:'row',marginTop:'2%'}}>
            <View style={{flex:1,alignItems:'center'}}>
                <AppText color={colors.mediumDark}>Status</AppText>
                <AppText fontFamily='PoppinsSemiBold'>Old</AppText>
            </View>
            <View style={{flex:1,alignItems:'center',borderLeftWidth:1,borderRightWidth:1}}>
                <AppText color={colors.mediumDark}>Sex</AppText>
                <AppText fontFamily='PoppinsSemiBold'>{patient.gender.toUpperCase()}</AppText>
            </View>
            <View style={{flex:1,alignItems:'center'}}>
                <AppText color={colors.mediumDark}>Age</AppText>
                <AppText fontFamily='PoppinsSemiBold'>{patient.age}</AppText>
            </View>
        </View>
  </View>
  <View style={{flexDirection:'row',justifyContent:'space-between',width:width*0.95}}>
        <View style={{width:width*0.46,backgroundColor:colors.primary,alignItems:'center',padding:'2%',borderRadius:10,marginVertical:'5%'}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
              <AppText fontFamily='PoppinsSemiBold' numberOfLines={1} width={'85%'}>BLOOD PRESSURE</AppText>
              <MaterialCommunityIcons name="brain" size={width*0.07} color="black" />
          </View>
          <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.06} color={colors.secondary}>123<AppText color={colors.mediumDark}>mmHg</AppText></AppText>
          <View >
          
         <LineChart
          data={data}
          width={width*0.42}
          height={width*0.35}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          bezier
          withVerticalLines={false}
        /> 
      </View>
      </View>
          <View style={{width:width*0.46,backgroundColor:colors.primary,alignItems:'center',padding:'2%',borderRadius:10,marginVertical:'5%'}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
              <AppText fontFamily='PoppinsSemiBold'>SpO2</AppText>
              <MaterialCommunityIcons name="brain" size={width*0.07} color="black" />
          </View>
          <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.06} color={colors.secondary}>123<AppText color={colors.mediumDark}>%</AppText></AppText>
          <View>
          <LineChart
            data={data_SpO2}
            width={width*0.42}
            height={width*0.35}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            bezier
            withVerticalLines={false}
          /> 
      </View>
      </View>
    </View>

  <View style={{flexDirection:'row',justifyContent:'space-between',width:width*0.95}}>
      <View style={{width:width*0.46,backgroundColor:colors.primary,alignItems:'center',padding:'2%',borderRadius:10,marginBottom:'3%'}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
          <AppText fontFamily='PoppinsSemiBold'>Stimulation Pulse</AppText>
          <MaterialCommunityIcons name="pulse" size={width*0.07} color="black" />
      </View>
      <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.06} color={colors.secondary}>{sessions[state]?.PRE_STIMULATION_PULSE}<AppText color={colors.mediumDark}>BPM</AppText></AppText>
    
      </View>
      <View style={{width:width*0.46,backgroundColor:colors.primary,alignItems:'center',padding:'2%',borderRadius:10,marginBottom:'3%'}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
          <AppText fontFamily='PoppinsSemiBold'>Respiratory Rate</AppText>
          {/* <MaterialCommunityIcons name="human-male-height-variant" size={width*0.07} color="black" /> */}
      </View>
      <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.06} color={colors.secondary}>{sessions[state]?.PRE_RESPIRATORY_RATE}<AppText color={colors.mediumDark}>BPM</AppText></AppText>
      </View>
  </View>

  <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%',paddingHorizontal:'2%'}}>
  <TouchableOpacity
  onPress={()=>navigation.navigate(routes.HISTORY_TAB,{
      screen:routes.GRAPH,
      params:{sessions:sessions}
  })}
  style={{width:'48%',flexDirection:'row',alignItems:'center',backgroundColor:colors.primary,borderRadius:10,padding:'2%'}}>
    <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.05} color={colors.secondary}>Graphs </AppText>
    <Octicons name="graph" size={width*0.05} color={colors.secondary} />
  </TouchableOpacity>
  <TouchableOpacity
  onPress={()=>navigation.navigate(routes.HISTORY_TAB,{
      screen:routes.REPORTS,
      params:{sessions:sessions,firstName:patient.firstName,surname:patient.surname}
  })}
  style={{width:'48%',flexDirection:'row',alignItems:'center',backgroundColor:colors.primary,borderRadius:10,padding:'2%'}}>
    <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.05} color={colors.secondary}>Reports </AppText>
    <MaterialCommunityIcons name="file-document-outline" size={width*0.05} color={colors.secondary} />
    {/* <Octicons name="graph" size={width*0.05} color={colors.secondary} /> */}
  </TouchableOpacity>
  </View>


    <View style={{backgroundColor:colors.primary,width:'100%',padding:'3%',marginVertical:'5%',borderRadius:10}}>
      <AppText>Choose session</AppText>
      <RadioGroup 
          radioButtons={stateData} 
          onPress={setState}
          selectedId={state}
          layout='row'
          containerStyle={{width:'100%',flexWrap:'wrap'}}
      />
    </View>

    {/* Results */}
     <Results sessions={sessions} state={state}/>
     
     <TouchableOpacity style={{paddingVertical:'3%',paddingHorizontal:'2%',backgroundColor:'red',borderRadius:10,width:width/2,justifyContent:'center',alignItems:'center'}}
     onPress={handleDelete}>
        {active&&<ActivityIndicator size={width*0.07} color={colors.primary}/>}
        {!active&&<AppText color={colors.primary}>Delete Patient</AppText>}
     </TouchableOpacity>
     <View style={{height:'2%',width:width}}></View>
  </ScrollView>
  
  <ScrollUpButton show={show} scrollToTop={scrollToTop}/>
</></KeyboardAvoidingView>
);}

export default memo(PatientScreen);

const styles = StyleSheet.create({
  container:{
    paddingVertical:'5%',
    alignItems:'center'
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  input:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingVertical:'2%',
    borderBottomWidth:0.25,
    borderColor:colors.mediumDark
  }
});