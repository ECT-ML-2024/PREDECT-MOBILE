import React,{useRef} from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

import AppText from '../../components/Text';
import useAuth from '../../auth/useAuth';
import colors from '../../config/colors';
import routes from '../../navigations/routes';

function LoadingScreen({navigation}) {
    const{width}=useAuth();
    const animation = useRef(null);
    const moveToFirstScreen=()=>{
      navigation.replace(routes.INTRO);
    }
return (
<View style={styles.container}>
<View style={[styles.animationContainer,{width:width}]}>
      <LottieView
        autoPlay
        loop={false}
        ref={animation}
        style={{
          width: width*.6,
          height: width*.6,
        }}
        onAnimationFinish={moveToFirstScreen}
        // speed={0.9}
        source={require('../../assets/animations/brain2.json')}
      />
    </View>
</View>
);
}

export default LoadingScreen;
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