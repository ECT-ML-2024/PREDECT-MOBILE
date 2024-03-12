import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import controler from '../controler/controler';
import routes from './routes';
const Stack = createNativeStackNavigator();

const AuthNavigator = () =>{
return(
    <Stack.Navigator>
      <Stack.Screen name={routes.INTRO} component={controler.IntroStackScreen} options={{headerShown:false}}/>
      <Stack.Screen name={routes.GETSTARTED} component={controler.GetStartedStackScreen} options={{headerShown:false}}/>
      <Stack.Screen name={routes.LOGIN} component={controler.LogInStackScreen} options={{headerShown:false}}/>
      <Stack.Screen name={routes.SIGN_UP} component={controler.SignUpStackScreen} options={{headerShown:false}}/>
      <Stack.Screen name={routes.FORGET_PASSWORD} component={controler.ForgetPasswordStackScreen} options={{headerShown:false}}/>
      <Stack.Screen name={routes.NEW_FORGET_PASSWORD} component={controler.NewPasswordStackScreen} options={{headerShown:false}}/>
      <Stack.Screen name={routes.UNAUTHORIZED_USERS} component={controler.UnathorizedUsersStackScreen} options={{headerShown:false}}/>
      <Stack.Screen name={routes.OPT} component={controler.OTPStackScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}
 export default AuthNavigator; 