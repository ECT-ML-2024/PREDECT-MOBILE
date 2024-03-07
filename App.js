import 'react-native-gesture-handler';
import { useState,useEffect,useCallback } from 'react';
import { Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import {jwtDecode} from 'jwt-decode';
import * as SplashScreen from 'expo-splash-screen';
import {useNetInfo} from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';


import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage';
import OfflineNotice from './app/components/OfflineNotice';
import NewPasswordScreen from './app/screens/auth/NewPasswordScreen';
import MyDrawer from './app/navigations/appNavigation';
import AuthNavigator from './app/navigations/authNavigator';

export default function App() {
  const window = Dimensions.get('window');
  const [width,setWidth] = useState(window.width);
  const [height,setHeight] = useState(window.height);
  const [user,setUser]=useState();
  const [isReady,setIsReady]= useState(false);

  const NetInfo = useNetInfo();
  let [fontsLoaded] = useFonts({
    "PoppinsRegular":require('./app/assets/fonts/Poppins-Regular.ttf'),
    "PoppinsSemiBold":require('./app/assets/fonts/Poppins-SemiBold.ttf'),
  });

  



  const restoreToken = async ()=>{
   const token = await authStorage.getToken();
    if(!token) return;
    console.log(jwtDecode(token))
    setUser(jwtDecode(token).doctor);
  }
  useEffect(() => {
    async function prepare() {
        try {
            await SplashScreen.preventAutoHideAsync();
            await restoreToken();
        } catch (error) {
            // console.log("Error loading app", error);
        } finally {
            setIsReady(true);
        }
    }
    prepare();
}, []);

const onNavigationContainerReady = useCallback(async () => {
  // console.log(isReady && fontsLoaded);
    if (isReady && fontsLoaded) await SplashScreen.hideAsync();
}, [isReady]);



if (!isReady) return null;
if (!fontsLoaded) return null;

  return (
    <AuthContext.Provider value={{user,setUser,width,height, }}>
     {/* <ThemeProvider> */}
      {/* <OfflineNotice/> */}
     <NavigationContainer onReady={onNavigationContainerReady}>
      {/* <AppStatusBar/> */}
      {/* <MyDrawer/> */}
      {user ? <MyDrawer width={width}/>: <AuthNavigator/>}
     </NavigationContainer>

     <OfflineNotice/>
     {/* </ThemeProvider> */}
    </AuthContext.Provider>
  );
}