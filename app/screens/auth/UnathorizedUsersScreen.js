import React,{useRef} from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

import AppText from '../../components/Text';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';

function UnathorizedUsersScreen(props) {
    const{width}=useAuth();
    const animation = useRef(null);
    
return (
<View style={styles.container}>
<View style={styles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: width,
          height: width,
        }}
        speed={0.7}
        source={require('../../assets/animations/Wait.json')}
      />
      <View style={{width:width,padding:'5%'}}>
      <AppText>Welcome to <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.05} children={'Predect!'} color={colors.secondary}/></AppText>
      <AppText>{`Your access is pending admin approval.\nWe'll notify you via email once approved. Thanks for your patience.`}</AppText>
      </View>
    </View>
</View>
);
}

export default UnathorizedUsersScreen;
const styles = StyleSheet.create({
container:{
flex:1,
justifyContent:'center',
 alignItems:'center'
},
animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

});