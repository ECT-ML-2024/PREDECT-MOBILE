import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import { BarChart,LineChart  } from 'react-native-chart-kit';

import useAuth from '../auth/useAuth';
import colors from '../config/colors';
import AppText from './Text';


const data1 = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Line color
      strokeWidth: 2, // Line width
    },
  ],
};

function AppBarChart({data,title,yAxisSuffix}) {
    const {width}=useAuth();
return (
    <View style={{width:width*0.95,backgroundColor:colors.primary,alignItems:'center',padding:'2%',borderRadius:10,marginVertical:'2%'}}>
    <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
      <AppText fontFamily='PoppinsSemiBold'>{title}</AppText>
      <MaterialCommunityIcons name="brain" size={width*0.07} color="black" />
    </View>
  <LineChart
    data={data}
    width={width*0.87}
    height={width*0.6}
    yAxisSuffix={yAxisSuffix}
    chartConfig={{
      backgroundGradientFrom: "#fff",
      backgroundGradientTo: "#fff",
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.6,
      decimalPlaces:1,
      useShadowColorFromDataset: false // optional
    }}
    bezier
    verticalLabelRotation={30}
  />
</View>
);
}

export default AppBarChart;
const styles = StyleSheet.create({
container:{
flex:1,
justifyContent:'center',
 alignItems:'center'
}
});