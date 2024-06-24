import React from 'react';
import { View, StyleSheet,Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';



import useAuth from '../auth/useAuth';
import AppText from '../components/Text';
import colors from '../config/colors';
import AppButtonOP from '../components/AppButtonOP';

function CustomDrawerContent(props) {
    const {user,width,logOut}=useAuth();
    const navigation = useNavigation();

return (
    <DrawerContentScrollView {...props}>
    {/* Render user's name */}
    <View style={{ padding: 16,flexDirection:'row',alignItems:'center'}}>
      <Image style={{width:width*0.2,height:width*0.2,borderRadius:width*0.2}} source={require('../assets/images/doctors.jpg')}/>
      
      <View style={{marginLeft:'2%'}}>
      <AppText fontFamily='PoppinsSemiBold'>Welcome</AppText>
      <AppText color={colors.secondary} width={width*0.5} fontFamily='PoppinsSemiBold'>{user.name}</AppText>
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