import React, { useEffect, useMemo, useState } from 'react';
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



  const list=[
    {id:1},
    {id:1},
  ]
  const stateData =[
    {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Show Graph',
        value: 'Graph'
    },
    {
        id: '2',
        label: 'Show Values',
        value: 'Values'
    }
]

  
function PatientScreen({navigation,route}) {
  const { patient }=route.params;
  const {width,user}=useAuth();
  const getPatientAPi=useApi(patientApi.patient);
  // const [newData,setNewData]=useState([0]);
  const [sessions,setSessions]=useState([]);
  const [stateData,setStateData]=useState([]);
  const [state, setState] = useState();
  // const radioButtons = useMemo(() => (stateData), []);
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
    // console.log(radioButtons)
  },[]);

  async function loadPatient(){
      const response = await getPatientAPi.request(doctorId="",patient._id);
      if(!response.ok){
        alert(response.data);
        return
      }
      // console.log(response.data)
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
      console.log(index)
      newData.push({
        id: index.toString(),
        label: index.toString(),
        // value: index.toString()
      })
    });
    setStateData(newData);
  }

return (
  <KeyboardAvoidingView
  behavior={Platform.OS === "ios" ? "padding" : null}
  style={styles.keyboardAvoidingView}>
<ScrollView contentContainerStyle={styles.container}>
{/* <View style={styles.container}> */}
    <View style={{backgroundColor:colors.primary,width:width*0.9,alignItems:'center',padding:'3%',borderRadius:10}}>
        <Image style={{width:width*0.2,height:width*0.2}} source={require('../../assets/images/avatar.png')}/>
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
    </View>
<View style={{flexDirection:'row',justifyContent:'space-between',width:width*0.9}}>
    {list.map((item,index)=>(
        <View key={index} style={{width:width*0.43,backgroundColor:colors.primary,alignItems:'center',padding:'2%',borderRadius:10,marginVertical:'5%'}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
            {index==0?(<AppText fontFamily='PoppinsSemiBold'>SYS</AppText>):(<AppText fontFamily='PoppinsSemiBold'>DIA</AppText>)}
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
    ))}
</View>

<View style={{flexDirection:'row',justifyContent:'space-between',width:width*0.9}}>
    {list.map((item,index)=>(
        <View key={index} style={{width:width*0.43,backgroundColor:colors.primary,alignItems:'center',padding:'2%',borderRadius:10,marginVertical:'3%'}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
            <AppText fontFamily='PoppinsSemiBold'>Pulse</AppText>
            {index==0&&<MaterialCommunityIcons name="pulse" size={width*0.07} color="black" />}
            {index!=0&&<MaterialCommunityIcons name="human-male-height-variant" size={width*0.07} color="black" />}
        </View>
        <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.06} color={colors.secondary}>123<AppText color={colors.mediumDark}>mmHg</AppText></AppText>
       
        </View>
    ))}
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
    {sessions.length>0 &&<View style={{backgroundColor:colors.primary,padding:'2%',borderRadius:10}}>
            <View style={styles.input}>
                <AppText fontFamily='PoppinsSemiBold'>ENERGY: </AppText>
                <AppText fontFamily='PoppinsSemiBold'>{sessions[state??0].ENERGY.toFixed(2)}J</AppText>
            </View>
            <View style={styles.input}>
                <AppText fontFamily='PoppinsSemiBold'>CURRENT: </AppText>
                <AppText fontFamily='PoppinsSemiBold'>{sessions[state??0].CURRENT.toFixed(2)}mA</AppText>
            </View>
            
            <View style={styles.input}>
                <AppText fontFamily='PoppinsSemiBold'>FREQUENCY: </AppText>
                <AppText fontFamily='PoppinsSemiBold'>{sessions[state??0].FREQUENCY.toFixed(2)}Hz</AppText>
            </View>
            <View style={styles.input}>
                <AppText fontFamily='PoppinsSemiBold'>RESISTANCE: </AppText>
                <AppText fontFamily='PoppinsSemiBold'>{sessions[state??0].RESISTANCE.toFixed(2)}Ω</AppText>
            </View>

            <View style={styles.input}>
                <AppText fontFamily='PoppinsSemiBold'>PULSE WIDTH: </AppText>
                <AppText fontFamily='PoppinsSemiBold'>{sessions[state??0].PULSE_WIDTH.toFixed(2)}ms</AppText>
            </View>

            <View style={styles.input}>
                <AppText fontFamily='PoppinsSemiBold'>DURATION OF STIMULATION: </AppText>
                <AppText fontFamily='PoppinsSemiBold'>{sessions[state??0].DURATION_OF_STIMULATION.toFixed(2)}s</AppText>
            </View>
            <View style={styles.input}>
                <AppText width='80%' fontFamily='PoppinsSemiBold'>DURATION OF TONIC CLONIC MUSCULAR ACTIVITY: </AppText>
                <AppText fontFamily='PoppinsSemiBold'>{sessions[state??0].DURATION_OF_TONIC_CLONIC_MUSCULAR_ACTIVITY.toFixed(2)}s</AppText>
            </View>
        </View>}
{/* </View> */}
</ScrollView>
</KeyboardAvoidingView>
);
}

export default PatientScreen;
const styles = StyleSheet.create({
container:{
  padding:'5%'
},
keyboardAvoidingView: {
  flex: 1,
},
input:{
  flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:'2%',borderBottomWidth:0.25,borderColor:colors.mediumDark
}
});