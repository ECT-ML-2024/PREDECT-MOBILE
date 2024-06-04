import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, FlatList,Image } from 'react-native';
import AppText from './Text';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import AppButton from './AppButton';
import useAuth from '../auth/useAuth';
import colors from '../config/colors';



function AppPatientsPicker({items,placeholder,onSelectedItem,selectedItem,continueFunc,disabled=false,...otherprop}) {
    const [modal,setModal]=useState(false);
    const {width} =useAuth();

    
return (
    <>
   
            <TouchableOpacity
            style={{backgroundColor:colors.textInputBG, padding:'3.5%',marginBottom:"5%",borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderWidth:1,borderColor:colors.primary,...otherprop}}
            disabled={disabled}
            onPress={()=>setModal(true)}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                  <AppText fontSize={15} color={selectedItem ? colors.dark : 'red'} children={selectedItem ? selectedItem._id.toString().substr(15, 21) : placeholder}/>
                </View>
                <MaterialCommunityIcons name="chevron-down" size={20} color={colors.dark} />
            </TouchableOpacity>





            <Modal visible={modal}>
                <View style={{backgroundColor:colors.primary,flex:1}}>
                {/* <AppText children="Hello"/> */}
                <View style={{alignItems:'center',width:width*0.9,alignSelf:'center',marginVertical:'5%'}}>
                <AppButton text="Close" onPress={()=> setModal(false)}/>

                </View>
                <FlatList
                contentContainerStyle={{alignItems:'center'}}
               
                    data={items}
                    // numColumns={2}
                    keyExtractor={(item,index) => index}
                    // extraData={selectedId}
                    renderItem={({ item }) => {
                        return (
                          <TouchableOpacity 
                          onPress={()=>{
                              continueFunc(item);
                              onSelectedItem(item);
                              setModal(false);
                              }}
                          style={{marginVertical:width*0.05,marginHorizontal:width*0.05,alignSelf:'center'}}>
                               {/* <Image source={item.imageUri} style={{width:width*0.28,height:width*0.28,borderRadius:width*0.28,}}/> */}
                               <AppText textAlign="center" children={item._id.toString().substr(15, 21)}/>
                          </TouchableOpacity>
                           
                        );
                      }}
                />
                </View>
            </Modal>
            </>
);
}

export default AppPatientsPicker;
const styles = StyleSheet.create({
container:{
flex:1,
justifyContent:'center',
 alignItems:'center'
},
item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});