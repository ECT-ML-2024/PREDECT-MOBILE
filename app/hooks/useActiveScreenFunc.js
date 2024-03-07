import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';

export default useActiveScreenFunc = () => {
    const navigation =useNavigation();
  const FocusedAndBlur = async (enterFunctions,leaveFunctions) => {
    const isFocused = useIsFocused();

    useEffect(() => {
      const enterFunction = ()=>enterFunctions()
    
      const leaveFunction = () =>leaveFunctions();
    
      if (isFocused) {
        enterFunction();
      } else {
        leaveFunction();
      }
    
      const onFocus = () => {
        enterFunction();
      };
      const onBlur = () => {
        leaveFunction();
      };
    
      const unsubscribeFocus = navigation.addListener('focus', onFocus);
      const unsubscribeBlur = navigation.addListener('blur', onBlur);
      return () => {
        unsubscribeFocus();
        unsubscribeBlur()
      };
    }, [isFocused, navigation]);
    
     return 'image';
 };



  return { FocusedAndBlur};
};
