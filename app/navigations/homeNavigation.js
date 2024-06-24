import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import controler from '../controler/controler';
import colors from '../config/colors';
import routes from './routes';
import MenuButton from '../components/MenuButton ';
import useAuth from '../auth/useAuth';

const Stack = createNativeStackNavigator();

const HomeNavigator = ({navigation,route}) =>{
  const {user}=useAuth();
  return(
    <>
    <MenuButton/>
    <Stack.Navigator 
    screenOptions={{
      headerStyle:{
        backgroundColor:colors.primary,
        color:'blue'
      },
      headerTitleAlign:'center'
    }}>

      {user.admin&&<Stack.Screen name={routes.ADD_PATIENT} component={controler.AdminDashboardStackScreen} options={{headerShown:false}}/>}
      <Stack.Screen name={routes.DASHBOARD} component={controler.DashboardStackScreen} options={{headerShown:false}}/>
      <Stack.Screen name={routes.HOME} component={controler.HomeStackScreen} options={{headerShown:true,headerTitle:'New Diagnosis'}}/>
      <Stack.Screen name={routes.SECOND} component={controler.SecondStackScreen} options={{headerShown:false,animation:'slide_from_right'}}/>
      <Stack.Screen name={routes.THIRD} component={controler.ThirdStackScreen} options={{headerShown:false,animation:'slide_from_right'}}/>
      <Stack.Screen name={routes.DONE} component={controler.DoneStackScreen} options={{headerShown:false}}/>
      <Stack.Screen name={routes.RESULTS} component={controler.ResultsStackScreen} options={{headerShown:false}}/>
      <Stack.Screen name={routes.ADD_DOCTOR} component={controler.AddDoctorStackScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
    </>
  )
}

 export default HomeNavigator; 