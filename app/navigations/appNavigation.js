import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import HomeNavigator from './homeNavigation';
import HistoryNavigator from './historyNavigation';
import { Image, View } from 'react-native';
import AppText from '../components/Text';
import colors from '../config/colors';
import AppButton from '../components/AppButton';
import routes from './routes';
import useAuth from '../auth/useAuth';
import NewWorkersNavigator from './newWorkersNavigation';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const {width}=useAuth();
  return (
    <DrawerContentScrollView {...props}>
      {/* Render user's name */}
      <View style={{ padding: 16,flexDirection:'row',alignItems:'center'}}>
        <Image style={{width:width*0.2,height:width*0.2}} source={require('../assets/images/avatar.png')}/>
        <View style={{marginLeft:'2%'}}>
        <AppText fontFamily='PoppinsSemiBold'>Welcome</AppText>
        <AppText color={colors.secondary} fontFamily='PoppinsSemiBold'>Prince Jaymills</AppText>
        </View>
      </View>
        <AppButton text={'Logout'} width='90%' alignSelf='center' marginBottom='10%'/>
      {/* Default drawer content */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}
    screenOptions={{
        headerTitleAlign:'center',
        headerTitleStyle:{
            color:colors.secondary,
            fontFamily:'PoppinsSemiBold'
        },
        headerStyle:{
          borderBottomWidth:1,
          borderBottomColor:colors.textInputBG
        }
    }}>
      <Drawer.Screen name={routes.HOME_TAB} options={{title:'Home'}} component={HomeNavigator} />
      <Drawer.Screen name={routes.HISTORY_TAB} options={{title:'Patient History'}} component={HistoryNavigator} />
      <Drawer.Screen name={routes.NEW_WORKERS_TAB} options={{title:'New Doctors'}} component={NewWorkersNavigator} />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
