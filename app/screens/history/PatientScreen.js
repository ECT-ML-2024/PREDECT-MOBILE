import React, { memo, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
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
  const [sessions,setSessions]=useState([]);
  const [stateData,setStateData]=useState([]);
  const [state, setState] = useState('0');
  const [show,setShow] = useState(false);
  const scrollViewRef = useRef();
  const previousScrollY = useRef(0);

  const [data,setData]=useState({
    datasets: [
      {
        data: [0],
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
      const newData = [0];
    
      response.data.forEach(element => {
        const result = element.PSBPT / element.PSBPB;
        newData.push(result);
      });
      setData({
        datasets: [
          {
            data: newData,
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
        label: index.toString(),
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

      isScrollingUp ? setShow(false): null;
      isScrollingDown ? setShow(true): null;

      // Update the previous scroll position
      previousScrollY.current = currentScrollY;
    };


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
        <Image style={{width:width*0.2,height:width*0.2}} source={patient.GENDER =='MALE'?require('../../assets/images/avatar.png'):require('../../assets/images/female-avatar.png')}/>
        <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.05}>{patient.NAME}</AppText>
        <View style={{flexDirection:'row',marginTop:'2%'}}>
            <View style={{flex:1,alignItems:'center'}}>
                <AppText color={colors.mediumDark}>Condition</AppText>
                <AppText fontFamily='PoppinsSemiBold'>Severe</AppText>
            </View>
            <View style={{flex:1,alignItems:'center',borderLeftWidth:1,borderRightWidth:1}}>
                <AppText color={colors.mediumDark}>Sex</AppText>
                <AppText fontFamily='PoppinsSemiBold'>{patient.GENDER.toUpperCase()}</AppText>
            </View>
            <View style={{flex:1,alignItems:'center'}}>
                <AppText color={colors.mediumDark}>Age</AppText>
                <AppText fontFamily='PoppinsSemiBold'>{patient.AGE}</AppText>
            </View>
        </View>
    <View style={{flexDirection:'row',justifyContent:'space-between',width:width*0.95}}>
        <View style={{width:width*0.46,backgroundColor:colors.primary,alignItems:'center',padding:'2%',borderRadius:10,marginVertical:'5%'}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
              <AppText fontFamily='PoppinsSemiBold'>SYS</AppText>
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
              <AppText fontFamily='PoppinsSemiBold'>DIA</AppText>
              <MaterialCommunityIcons name="brain" size={width*0.07} color="black" />
          </View>
          <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.06} color={colors.secondary}>123<AppText color={colors.mediumDark}>mmHg</AppText></AppText>
          <View>
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
    </View>
  </View>


  <View style={{flexDirection:'row',justifyContent:'space-between',width:width*0.95}}>
      <View style={{width:width*0.46,backgroundColor:colors.primary,alignItems:'center',padding:'2%',borderRadius:10,marginVertical:'3%'}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
          <AppText fontFamily='PoppinsSemiBold'>Stimulation Pulse</AppText>
          <MaterialCommunityIcons name="pulse" size={width*0.07} color="black" />
      </View>
      <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.06} color={colors.secondary}>{sessions[state]?.PRE_STIMULATION_PULSE}<AppText color={colors.mediumDark}>BPM</AppText></AppText>
    
      </View>
      <View style={{width:width*0.46,backgroundColor:colors.primary,alignItems:'center',padding:'2%',borderRadius:10,marginVertical:'3%'}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
          <AppText fontFamily='PoppinsSemiBold'>Respiratory Rate</AppText>
          {/* <MaterialCommunityIcons name="human-male-height-variant" size={width*0.07} color="black" /> */}
      </View>
      <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.06} color={colors.secondary}>{sessions[state]?.PRE_RESPIRATORY_RATE}<AppText color={colors.mediumDark}>BPM</AppText></AppText>
      </View>
  </View>

  <TouchableOpacity
  onPress={()=>navigation.navigate(routes.HISTORY_TAB,{
      screen:routes.GRAPH,
      params:{sessions:sessions}
  })}
  style={{width:width,paddingLeft:'5%',flexDirection:'row',alignItems:'center'}}>
    <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.05}>Past Records</AppText>
    <MaterialIcons name="play-arrow" size={width*0.07} color="black" />
  </TouchableOpacity>

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