import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import controler from '../controler/controler';
import routes from './routes';
import colors from '../config/colors';

const Stack = createNativeStackNavigator();

const NewWorkersNavigator = ({navigation, route}) =>{

  
return(
    <Stack.Navigator
    screenOptions={{
      headerStyle:{
        backgroundColor:colors.primary,
        color:'blue'
      },
      headerTitleAlign:'center'}}>
      <Stack.Screen name={routes.DOCTORS} component={controler.DoctorsStackScreen} options={{headerShown:false}}/>
       
    </Stack.Navigator>
  )
}
 export default NewWorkersNavigator; 