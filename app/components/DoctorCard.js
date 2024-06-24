import React from 'react';
import { View, StyleSheet,Image,TouchableOpacity, Pressable } from 'react-native';
import useAuth from '../auth/useAuth';
import colors from '../config/colors';
import AppText from './Text';

function DoctorsCard({onPress,item,accept,reject}) {
    const {width}=useAuth();

return (
<TouchableOpacity style={{backgroundColor:colors.primary,width:width*0.9,padding:'3%',marginVertical:'2%',borderRadius:10}} onPress={onPress}>
           <View style={{flexDirection:'row',alignItems:'center'}}>
           <View style={{width:width*0.15,height:width*0.15}}>
                <Image
                style={{width:'100%',height:'100%',borderRadius:width*0.2}}
                source={item.sex=='Male'?require('../assets/images/man.jpg'):require('../assets/images/female.jpg')}/>
            </View>
            <View style={{marginLeft:'5%'}}>
                <AppText fontFamily='PoppinsSemiBold' maxWidth='90%' fontSize={width*0.045}>{item.name}</AppText>
                <AppText minWidth='85%' maxWidth='90%' color={colors.mediumDark}>{item.department}</AppText>
            </View>
           </View>
            {/* <View style={{flexDirection:'row',padding:'2%',justifyContent:'space-between'}}>
                <TouchableOpacity style={{backgroundColor:'#83c466',width:'40%',alignItems:'center',padding:'3%',borderRadius:10}}
                onPress={accept}
                ><AppText fontFamily='PoppinsSemiBold' color={colors.primary}>Accept</AppText></TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:'#e06666',width:'40%',alignItems:'center',padding:'3%',borderRadius:10}}
                onPress={reject}><AppText fontFamily='PoppinsSemiBold' color={colors.primary}>Reject</AppText></TouchableOpacity>
            </View> */}
        </TouchableOpacity>
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