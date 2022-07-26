// srс/screens/HomeScreen.js

import React,{useState,useEffect} from 'react';
import {View,Image, Text, StyleSheet,StatusBar} from 'react-native';
// import BLEfunction from "../../components/BLEfunction";
import BLEfunctionMVP from "../../components/BLEmvpFunction";
import Maps from "../../components/Maps";
import MapMVP from "../../components/MapMVP";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {giveMeBalance,mintTheToken} from "../../components/SmartContractFunction";
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = (props) => {
  const [storageData,setStorageData]=useState();
  const [walletBalance, setWalletBallence] = useState(0.00);

  const getData=async()=>{
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      let data = JSON.parse(value);
      const tempBalance = await giveMeBalance(data.wallet.address);
      // mintTheToken(data.wallet.address,500);
      console.log("-----tempbalance -----");
      console.log(tempBalance)
      setStorageData(data);
      setWalletBallence(tempBalance);
    }

  }
  useEffect(() => {
    if(!storageData){
      getData();
      
    }else{

      setTimeout(async() => {
      const tempBalance = await giveMeBalance(storageData.wallet.address);
      console.log("-----tempbalance -----");
      console.log(tempBalance);
      setWalletBallence(tempBalance);
      }, 10000);

    }
    
  }, [storageData,walletBalance])
  
  
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="black"
        barStyle={"dark"}
      />
      <View style={styles.map}>
    {/* <Maps navigation={props.navigation} walletBalance={walletBalance}/> */}
    <MapMVP navigation={props.navigation} walletBalance={walletBalance}/>
    </View>
    
    {/* <BLEfunctionMVP /> */}
    
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
