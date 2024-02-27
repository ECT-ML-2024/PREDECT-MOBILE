import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import controler from '../controler/controler';
import colors from '../config/colors';
import routes from './routes';

const Stack = createNativeStackNavigator();

const HomeNavigator = ({navigation,route}) =>{
  
  return(
    <Stack.Navigator 
    screenOptions={{
      headerStyle:{
        backgroundColor:colors.primary,
        color:'blue'
      },
      headerTitleAlign:'center'
    }}>
      <Stack.Screen name={routes.HOME} component={controler.HomeStackScreen} options={{headerShown:false}}/>
      <Stack.Screen name={routes.DONE} component={controler.DoneStackScreen} options={{headerShown:false}}/>
      <Stack.Screen name={routes.RESULTS} component={controler.ResultsStackScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

 export default HomeNavigator; 