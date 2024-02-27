import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AppText from '../../components/Text';
import useAuth from '../../auth/useAuth';
import AppButton from '../../components/AppButton';
import colors from '../../config/colors';
import routes from '../../navigations/routes';

function DoneScreen({navigation,route}) {
    const {width} =useAuth();
    const {results} = route.params;
return (
<View style={styles.container}>
    <View style={{flex:1,justifyContent:'center'}}>
    <Image source={require('../../assets/images/done.png')}/> 
    <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.06}>Prediction Complete!</AppText>

    </View>
    <AppButton text={'See Results'} width='80%'
    onPress={()=>navigation.navigate(routes.HOME_TAB,{
        screen:routes.RESULTS,
        params:{results:results}
    })}
    />
</View>
);
}

export default DoneScreen;
const styles = StyleSheet.create({
container:{
flex:1,
justifyContent:'center',
 alignItems:'center',
 paddingVertical:'10%',
 backgroundColor:colors.primary
}
});