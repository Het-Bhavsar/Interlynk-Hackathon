// srс/screens/HomeScreen.js

import React,{useState,useEffect} from 'react';
import {View,Image, Text, StyleSheet,StatusBar} from 'react-native';
// import BLEfunction from "../../components/BLEfunction";
import BLEfunctionMVP from "../../components/BLEmvpFunction";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {giveMeBalance,mintTheToken} from "../../components/SmartContractFunction";
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = (props) => {
  const [storageData,setStorageData]=useState();
  
  const getData=async()=>{
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      let data = JSON.parse(value);
   
      setStorageData(data);
    }

  }
  useEffect(() => {
    if(!storageData){
      getData();
      
    }
    
  }, [storageData])
  
  
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="black"
        barStyle={"dark"}
      />
      <View style={styles.map}>
    <BLEfunctionMVP navigation={props.navigation} />
    </View>
    
    
  </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: Platform.OS == "ios" ? 20 : 0,
  },
  map:{
    width:windowWidth,
    height:windowHeight-189
  },
  
 
});
export default HomeScreen;
