import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import { LineChart,Grid,ContributionGraph,BarChart  } from 'react-native-chart-kit';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import AppText from '../../components/Text';
import AppBarChart from '../../components/AppBarChart';

const commitsData = [
  { date: "2024-02-02", count: 2 },
  { date: "2024-02-05", count: 2 },
  { date: "2024-02-08", count: 3 },
  { date: "2024-02-11", count: 3 },
  { date: "2024-02-14", count: 3 },
  { date: "2024-02-17", count: 4 },
  { date: "2024-02-21", count: 4 },
  { date: "2024-02-24", count: 5 },
  // { date: "2024-01-06", count: 5 },
  // { date: "2024-01-30", count: 4 },
  // { date: "2024-01-31", count: 3 },
  // { date: "2024-03-01", count: 2 },
  // { date: "2024-04-02", count: 4 },
  // { date: "2024-03-05", count: 2 },
  // { date: "2024-02-30", count: 4 }
];

const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Line color
        strokeWidth: 2, // Line width
      },
    ],
  };

  const data1 = {
    labels: ['1st', '2nd', '3rd', '4th', '5th', '6th'],
    datasets: [
      {
        data: [20, 45, 28, 80, 100, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Line color
        strokeWidth: 2, // Line width
      },
    ],
  }; 

  const list=[
    {id:1},
    // {id:1},
    // {id:1},
    // {id:1},
  ]
function GraphScreen(props) {
    const {width,height}=useAuth();
return (
<ScrollView contentContainerStyle={styles.container}>


<View style={{width:width*0.95,backgroundColor:colors.primary,alignItems:'center',padding:'2%',borderRadius:10,marginVertical:'2%',}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
             <AppText fontFamily='PoppinsSemiBold'>SECTION DAYS</AppText>
             <MaterialCommunityIcons name="brain" size={width*0.07} color="black" />
          </View>
        <ContributionGraph
        values={commitsData}
        endDate={new Date("2024-03-21")}
        numDays={78}
        width={width*0.8}
        height={width*0.57}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 1, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
      />
          </View>
        {/* CURRENT */}
          <AppBarChart data={data1} title={'CURRENT'} yAxisSuffix='A'/>

        {/* ENERGY */}
          <AppBarChart data={data1} title={'ENERGY'} yAxisSuffix='J'/>
        {/* DURATION OF STIMULATION */}
          <AppBarChart data={data1} title={'DURATION OF STIMULATION'} yAxisSuffix='s'/>
        
        {/* PULSE WIDTH */}
          <AppBarChart data={data1} title={'PULSE WIDTH'} yAxisSuffix='mm'/>
        {/* FREQUENCY */}
          <AppBarChart data={data1} title={'FREQUENCY'} yAxisSuffix='Hz'/>

        {/* RESISTANCE */}
          <AppBarChart data={data1} title={'RESISTANCE'} yAxisSuffix='Ω'/>

        {/* DURATION OF TONIC-CLONIC MUSCULAR ACTIVITY */}
          <AppBarChart data={data1} title={'DURATION OF T.C.M. ACTIVITY'} yAxisSuffix='s'/>

      {list.map((item,index)=>(
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
          style={{
          //   marginVertical: 8,
          //   borderRadius: 16,
          }}
        />
        
          </View>
      ))}

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