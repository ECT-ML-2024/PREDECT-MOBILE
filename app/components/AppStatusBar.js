import React from 'react';
import { View, StyleSheet,Platform } from 'react-native';
import useAuth from '../auth/useAuth';
import Constants from 'expo-constants';
import colors from '../config/colors';
import { StatusBar } from 'expo-status-bar';
function AppStatusBar(props) {
    const {width,height}=useAuth();

    if(Platform.OS=='ios'){
        return (
        <View style={{backgroundColor:colors.primary,height:Constants.statusBarHeight}}>
                <StatusBar
                    backgroundColor={colors.primary}
                    // style="light"
                    style="dark"
                  />
              </View>
        );
    }else{
        return (
            <View style={{backgroundColor:colors.primary,width:width,height:Constants.statusBarHeight}}>
                <StatusBar
                style="dark"
            />
            </View>
        )
    }
}

export default AppStatusBar;
const styles = StyleSheet.create({
container:{
flex:1,
justifyContent:'center',
 alignItems:'center'
}
});