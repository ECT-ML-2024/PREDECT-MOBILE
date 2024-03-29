import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import HomeNavigator from './homeNavigation';
import HistoryNavigator from './historyNavigation';
import colors from '../config/colors';
import routes from './routes';
import useAuth from '../auth/useAuth';
import NewWorkersNavigator from './newWorkersNavigation';
import CustomDrawerContent from './CustomDrawerContent';

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
          }
      }}>
        <Drawer.Screen name={routes.HOME_TAB} options={{title:'Home'}} component={HomeNavigator} />
        <Drawer.Screen name={routes.HISTORY_TAB} options={{title:'Patient History'}} component={HistoryNavigator} />
        {user.admin&&<Drawer.Screen name={routes.NEW_WORKERS_TAB} options={{title:'New Doctors'}} component={NewWorkersNavigator} />}
      </Drawer.Navigator>
    );
 
}

export default MyDrawer;
