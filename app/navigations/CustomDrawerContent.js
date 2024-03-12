import React from 'react';
import { View, StyleSheet,Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';



import useAuth from '../auth/useAuth';
import AppText from '../components/Text';
import colors from '../config/colors';
import AppButtonOP from '../components/AppButtonOP';
import routes from './routes';

function CustomDrawerContent(props) {
    const {user,width,logOut}=useAuth();
    const navigation = useNavigation();

return (
    <DrawerContentScrollView {...props}>
    {/* Render user's name */}
    <View style={{ padding: 16,flexDirection:'row',alignItems:'center'}}>
      <TouchableOpacity
      onPress={()=>navigation.navigate(routes.HOME_TAB,{
        screen:routes.EDIT_PROFILE
      })}
      >
      <Image style={{width:width*0.2,height:width*0.2}} source={user.sex=='male'?require('../assets/images/avatar.png'):require('../assets/images/female-avatar.png')}/>
      <Feather name="edit-3" size={24} color={colors.primary}  style={{position:'absolute',top:'35%',right:'30%'}}/>
      </TouchableOpacity>
      <View style={{marginLeft:'2%'}}>
      <AppText fontFamily='PoppinsSemiBold'>Welcome</AppText>
      <AppText color={colors.secondary} width={width*0.5} fontFamily='PoppinsSemiBold'>{user.username}</AppText>
      </View>
    </View>
      <AppButtonOP text={'Logout'} width='90%' alignSelf='center' marginBottom='10%'
      onPress={()=>logOut()}
      />
    {/* Default drawer content */}
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);
}

export default CustomDrawerContent;
const styles = StyleSheet.create({

});