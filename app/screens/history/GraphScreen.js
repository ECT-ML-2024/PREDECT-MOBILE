import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ContributionGraph  } from 'react-native-chart-kit';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import AppText from '../../components/Text';
import AppBarChart from '../../components/AppBarChart';
import { formatDate, loadData, loadSessionDates } from '../../func/functions';





function GraphScreen({route}) {
  const {sessions}= route.params;

    const {width,height}=useAuth();


    const [commitsData, setCommitsData] = useState([]);
    const [selectedData, setSelectedData] = useState('');
    const [currentData, setCurrentData] = useState({
      labels: [],
      datasets: [
        {
          data: [0],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    });
    const [energyData, setEnergyData] = useState({
      labels: [],
      datasets: [
        {
          data: [0],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    });
    const [durationData, setDurationData] = useState({
      labels: [],
      datasets: [
        {
          data: [0],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    });
    const [pulseWidthData, setPulseWidthData] = useState({
      labels: [],
      datasets: [
        {
          data: [0],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    });
    const [frequencyData, setFrequencyData] = useState({
      labels: [],
      datasets: [
        {
          data: [0],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    });
    const [resistanceData, setResistanceData] = useState({
      labels: [],
      datasets: [
        {
          data: [0],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    });
    const [tonicActivityData, setTonicActivityData] = useState({
      labels: [],
      datasets: [
        {
          data: [0],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    });

    useEffect(()=>{
      loadCurrents();
      loadEnergies();
      loadDurations();
      loadPulseWidth();
      loadFrequency();
      loadResistance();
      loadTonicActivity();
      loadDates();
    },[]);
    

    
    
    function loadCurrents() {
      loadData('CURRENT', setCurrentData,sessions);
    }
    function loadEnergies() {
      loadData('ENERGY', setEnergyData,sessions);
    }
    function loadDurations() {
      loadData('DURATION_OF_STIMULATION', setDurationData,sessions);
    }
    function loadPulseWidth() {
      loadData('PULSE_WIDTH', setPulseWidthData,sessions);
    }
    function loadFrequency() {
      loadData('FREQUENCY', setFrequencyData,sessions);
    }
    function loadResistance() {
      loadData('RESISTANCE', setResistanceData,sessions);
    }
    function loadTonicActivity() {
      loadData('DURATION_OF_TONIC_CLONIC_MUSCULAR_ACTIVITY', setTonicActivityData,sessions);
    }

    function loadDates() {
      loadSessionDates(sessions,setCommitsData);
    }
    
    function getDateOfLast15DaysAgo() {
      // Get the current date
      var currentDate = new Date();
      
      // Subtract 15 days from the current date
      var last15DaysDate = new Date(currentDate);
      last15DaysDate.setDate(currentDate.getDate() + 13);
      
      return last15DaysDate;
    }
    
return (
<ScrollView contentContainerStyle={styles.container}>

    {/* SESSION */}
    <View style={{width:width*0.95,backgroundColor:colors.primary,alignItems:'center',padding:'2%',borderRadius:10,marginVertical:'2%',}}>
              <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                <AppText fontFamily='PoppinsSemiBold'>SESSIONS DAYS - {selectedData}</AppText>
                <MaterialCommunityIcons name="brain" size={width*0.07} color="black" />
              </View>
            <ContributionGraph
            values={commitsData}
            endDate={getDateOfLast15DaysAgo()}
            numDays={54}
            width={width*0.8}
            height={width*0.9}
            squareSize={width*0.1}
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

            }}
            onDayPress={({count,date})=>{
              const formattedDate = formatDate(date);
              setSelectedData(formattedDate);
            }}
          />
    </View>
        {/* CURRENT */}
          <AppBarChart data={currentData} title={'CURRENT'} yAxisSuffix='A'/>

        {/* ENERGY */}
          <AppBarChart data={energyData} title={'ENERGY'} yAxisSuffix='J'/>
        {/* DURATION OF STIMULATION */}
          <AppBarChart data={durationData} title={'DURATION OF STIMULATION'} yAxisSuffix='s'/>
        
        {/* PULSE WIDTH */}
          <AppBarChart data={pulseWidthData} title={'PULSE WIDTH'} yAxisSuffix='mm'/>
        {/* FREQUENCY */}
          <AppBarChart data={frequencyData} title={'FREQUENCY'} yAxisSuffix='Hz'/>

        {/* RESISTANCE */}
          <AppBarChart data={resistanceData} title={'RESISTANCE'} yAxisSuffix='Ω'/>

        {/* DURATION OF TONIC-CLONIC MUSCULAR ACTIVITY */}
          <AppBarChart data={tonicActivityData} title={'DURATION OF T.C.M. ACTIVITY'} yAxisSuffix='s'/>

      {/* {list.map((item,index)=>(
          <View key={index} style={{width:width*0.95,backgroundColor:colors.primary,alignItems:'center',padding:'2%',borderRadius:10,marginVertical:'2%'}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
              <AppText fontFamily='PoppinsSemiBold'>Sat, 16 Nov <AppText children={'7:35pm'} color={colors.mediumDark}/></AppText>
              <MaterialCommunityIcons name="brain" size={width*0.07} color="black" />
          </View>
          <LineChart
          data={data}
          width={width*0.87}
          height={width*0.5}
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: 'red',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 1, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            verticalLabelRotation:0,
          }}
        withVerticalLines={false}
          bezier
        />
        
          </View>
      ))} */}

</ScrollView>
);
}

export default GraphScreen;
const styles = StyleSheet.create({
container:{
// flex:1,
justifyContent:'center',
 alignItems:'center'
}
});