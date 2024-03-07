import React from 'react';
import { View, StyleSheet,Image,TouchableOpacity, Pressable } from 'react-native';
import useAuth from '../auth/useAuth';
import colors from '../config/colors';
import AppText from './Text';

function DoctorsCard({onPress,item,accept,reject}) {
    const {width}=useAuth();

return (
<View style={{backgroundColor:colors.primary,width:width*0.9,padding:'3%',marginVertical:'2%',borderRadius:10}} onPress={onPress}>
           <View style={{flexDirection:'row',alignItems:'center'}}>
           <View style={{width:width*0.2,height:width*0.2}}>
                <Image
                style={{width:'100%',height:'100%'}}
                source={item.sex=='male'?require('../assets/images/avatar.png'):require('../assets/images/female-avatar.png')}/>
            </View>
            <View style={{marginLeft:'5%'}}>
                <AppText fontFamily='PoppinsSemiBold' fontSize={width*0.045}>{item.username}</AppText>
                <AppText color={colors.mediumDark}>{item.sex}</AppText>
                <AppText width='88%' color={colors.mediumDark}>mail: {item.email}</AppText>
            </View>
           </View>
            <View style={{flexDirection:'row',padding:'2%',justifyContent:'space-between'}}>
                <TouchableOpacity style={{backgroundColor:'#83c466',width:'40%',alignItems:'center',padding:'3%',borderRadius:10}}
                onPress={accept}
                ><AppText fontFamily='PoppinsSemiBold' color={colors.primary}>Accept</AppText></TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:'#e06666',width:'40%',alignItems:'center',padding:'3%',borderRadius:10}}
                onPress={reject}><AppText fontFamily='PoppinsSemiBold' color={colors.primary}>Reject</AppText></TouchableOpacity>
            </View>
        </View>
);
}

export default DoctorsCard;
const styles = StyleSheet.create({
container:{
flex:1,
justifyContent:'center',
 alignItems:'center'
}
});