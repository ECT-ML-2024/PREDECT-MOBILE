import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import controler from '../controler/controler';
import routes from './routes';
import colors from '../config/colors';
import MenuButton from '../components/MenuButton ';

const Stack = createNativeStackNavigator();

const HistoryNavigator = ({navigation, route}) =>{

  
return(
  <>
    <MenuButton/>
    <Stack.Navigator
    screenOptions={{
      headerStyle:{
        backgroundColor:colors.primary,
        color:'blue'
      },
      headerTitleAlign:'center',
      headerTitle:"History"}}>
      <Stack.Screen name={routes.PATIENTS} component={controler.PatientsStackScreen} options={{headerShown:true,headerTitle:'List of Patients'}}/>
      <Stack.Screen name={routes.PATIENT} component={controler.PatientStackScreen} options={{headerShown:true,headerTitle:'Patient Report'}}/>
      <Stack.Screen name={routes.GRAPH} component={controler.GraphStackScreen} options={{headerShown:true,headerTitle:'Historical Graphs'}}/>
      <Stack.Screen name={routes.ADD_PATIENT} component={controler.AddPatientStackScreen} options={{headerShown:false}}/>
       
    </Stack.Navigator>
    </>
  )
}
 export default HistoryNavigator; 