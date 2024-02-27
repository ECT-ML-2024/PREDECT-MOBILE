import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

import AppText from '../../components/Text';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import routes from '../../navigations/routes';


const data = {
    // labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Line color
        strokeWidth: 2, // Line width
      },
    ],
  };

  const list=[
    {id:1},
    {id:1},
  ]

  
function PatientScreen({navigation}) {
    const {width}=useAuth();
return (
<View style={styles.container}>
    <View style={{backgroundColor:colors.primary,width:width*0.9,alignItems:'center',padding:'3%',borderRadius:10}}>
        <Image style={{width:width*0.2,height:width*0.2}} source={require('../../assets/images/avatar.png')}/>
        <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.05}>Pateint Name</AppText>
        <View style={{flexDirection:'row',marginTop:'2%'}}>
            <View style={{flex:1,alignItems:'center'}}>
                <AppText color={colors.mediumDark}>Condition</AppText>
                <AppText fontFamily='PoppinsSemiBold'>Severe</AppText>
            </View>
            <View style={{flex:1,alignItems:'center',borderLeftWidth:1,borderRightWidth:1}}>
                <AppText color={colors.mediumDark}>Sex</AppText>
                <AppText fontFamily='PoppinsSemiBold'>Male</AppText>
            </View>
            <View style={{flex:1,alignItems:'center'}}>
                <AppText color={colors.mediumDark}>Age</AppText>
                <AppText fontFamily='PoppinsSemiBold'>35</AppText>
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
    screen:routes.GRAPH
})}
style={{width:width,paddingLeft:'5%',flexDirection:'row',alignItems:'center'}}>
<AppText fontFamily='PoppinsSemiBold' fontSize={width*0.05}>Past Records</AppText>
<MaterialIcons name="play-arrow" size={width*0.07} color="black" />
</TouchableOpacity>
</View>
);
}

export default PatientScreen;
const styles = StyleSheet.create({
container:{
flex:1,
justifyContent:'center',
 alignItems:'center'
}
});