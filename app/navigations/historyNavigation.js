import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import controler from '../controler/controler';
import routes from './routes';
import colors from '../config/colors';

const Stack = createNativeStackNavigator();

const HistoryNavigator = ({navigation, route}) =>{

  
return(
    <Stack.Navigator
    screenOptions={{
      headerStyle:{
        backgroundColor:colors.primary,
        color:'blue'
      },
      headerTitleAlign:'center'}}>
      <Stack.Screen name={routes.PATIENTS} component={controler.PatientsStackScreen} options={{headerShown:false}}/>
      <Stack.Screen name={routes.PATIENT} component={controler.PatientStackScreen} options={{headerShown:false}}/>
      <Stack.Screen name={routes.GRAPH} component={controler.GraphStackScreen} options={{headerShown:false}}/>
       
    </Stack.Navigator>
  )
}
 export default HistoryNavigator; 