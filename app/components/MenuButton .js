import React from 'react';
import { View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../config/colors';
import useApi from '../hooks/useApi';
import useAuth from '../auth/useAuth';

function MenuButton (props) {
    const navigation = useNavigation();
    const {width}=useAuth();

    const handleOpenDrawer = () => {
      navigation.openDrawer();
    };
  
    return (
        <TouchableOpacity style={styles.container}
        onPress={handleOpenDrawer}>
            <AntDesign name="caretright" size={24} color={colors.primary} />
        </TouchableOpacity>
    );
}

export default MenuButton ;
const styles = StyleSheet.create({
container:{
    position:'absolute',
    top:'80%',
    backgroundColor:colors.secondary,
    left:'0%',
    zIndex:2,
    // padding:'2%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:50,
    width:30,
    paddingRight:5,
    borderTopRightRadius:5,
    borderBottomRightRadius:5
}
});