import React from "react";
import { Text,StyleSheet } from "react-native";

import useAuth from "../auth/useAuth";
import colors from "../config/colors";

function AppText({ children, numberOfLines,ellipsizeMode,onPress,style, ...otherProps }) {
  const {width}=useAuth();
  return (
    <Text onPress={onPress} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode} style={[styles.mytext, style,{fontSize:width*0.04,fontFamily:'PoppinsRegular',...otherProps}]}>
      {children}
    </Text>
  );
}

export default AppText;

const styles = StyleSheet.create({
  mytext:{
    color:colors.dark
  }
})