import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import HomeNavigator from './homeNavigation';
import HistoryNavigator from './historyNavigation';
import colors from '../config/colors';
import routes from './routes';
import useAuth from '../auth/useAuth';
import NewWorkersNavigator from './newWorkersNavigation';
import CustomDrawerContent from './CustomDrawerContent';
import ProfileNavigator from './profileNavigation';

const Drawer = createDrawerNavigator();


function MyDrawer() {
  const {user} = useAuth();
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
          },
          headerShown:false
      }}>
        <Drawer.Screen name={routes.HOME_TAB} options={{title:'Dashboard'}} component={HomeNavigator} />
        <Drawer.Screen name={routes.HISTORY_TAB} options={{title:'Patients'}} component={HistoryNavigator} />
        {user.admin&&<Drawer.Screen name={routes.NEW_WORKERS_TAB} options={{title:'Doctors'}} component={NewWorkersNavigator} />}
        <Drawer.Screen name={routes.PROFILE_TAB} options={{title:'Profile'}} component={ProfileNavigator} />
      </Drawer.Navigator>
    );
 
}

export default MyDrawer;
