// srс/screens/HomeScreen.js

import React,{useState} from 'react';
import { Wallet } from '@ethersproject/wallet';
import {View,Image, Text, StyleSheet,ImageBackground} from 'react-native';
import BLEfunction from "../../components/BLEfunction";
import Maps from "../../components/Maps";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = (props) => {
  const {key,logout,wallet}=props;
  const [storageData,setStorageData]=useState();
  const getData=async()=>{
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      let data = JSON.parse(value);
      setStorageData(data);
      
    }

  }
  getData();
  return (
    <View style={styles.container}>
    <Maps />
    {/* <Image
        source={require('../../assets/Imgaes/gradient.png')} 
        style={{ width: '100%', height: 150,  flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36 }}
    /> */}
    <BLEfunction />
  </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: Platform.OS == "ios" ? 20 : 0,
  },
 
});
export default HomeScreen;
