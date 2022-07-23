// srс/screens/HomeScreen.js

import React,{useState,useEffect} from 'react';
import { Wallet } from '@ethersproject/wallet';
import {View,Image, Text, StyleSheet,ImageBackground} from 'react-native';
import BLEfunction from "../../components/BLEfunction";
import Maps from "../../components/Maps";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Interlynk from "../../artifacts/contracts/Interlynk.sol/Interlynk.json";
// Import the required shims
import "@ethersproject/shims";

// Import the ethers library
import { ethers } from 'ethers';

const HomeScreen = (props) => {
  const contractAddress ="0xd114b528639367869C8FeE741f820cc8aE060589";
  

// Specify your own API keys
// Each is optional, and if you omit it the default
// API key for that service will be used.
const provider = new ethers.providers.AlchemyProvider("maticmum", process.env.api_key);

  const contract = new ethers.Contract(contractAddress,Interlynk.abi,provider);
  
  const {key,logout,wallet}=props;
  const [storageData,setStorageData]=useState();
  const getData=async()=>{
    const value = await AsyncStorage.getItem('@storage_Key')
    const balance = await contract.balanceOf("0xf27974264Aa92aEB05c73AC2b0703ed29A0FE97b");
    console.log("-------balance----")
    console.log(ethers.utils.formatEther(balance));
    if(value !== null) {
      let data = JSON.parse(value);
      console.log(data);
      setStorageData(data);
      
    }

  }
  useEffect(() => {
    if(!storageData){
      getData();
    }
    
    
  }, [])
  
  
  return (
    <View style={styles.container}>
    <Maps />
    {/* <Image
        source={require('../../assets/Imgaes/gradient.png')} 
        style={{ width: '100%', height: 150,  flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36 }}
    /> */}
    {/* <BLEfunction /> */}
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
