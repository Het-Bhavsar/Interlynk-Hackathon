// srс/screens/HomeScreen.js

import React,{useState,useEffect} from 'react';
import {View,Image, Text, StyleSheet,StatusBar} from 'react-native';
// import BLEfunction from "../../components/BLEfunction";
import BLEfunctionMVP from "../../components/BLEmvpFunction";
import Maps from "../../components/Maps";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {giveMeBalance,mintTheToken} from "../../components/SmartContractFunction";
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = () => {
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
    <Maps />
    </View>
    <View style={styles.balanceContainer}>
      <Text style={styles.balanceText}>Your Balance</Text>
      <Text style={styles.balance}>{walletBalance} INT</Text>
    </View>
    <BLEfunctionMVP />
    
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
  balanceContainer:{
    backgroundColor: "rgba(0,0,0,1)",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 27,
    width: windowWidth,
    height: windowHeight
  },
  balanceText:{
    fontFamily: "roboto-regular",
    color: "white",
    fontSize: 25,
    marginTop: windowHeight /20,
    marginLeft: windowWidth /3
  },
  balance:{
    fontFamily: "roboto-regular",
    color: "white",
    fontSize: 25,
    marginTop: windowHeight /40,
    marginLeft: windowWidth/2.5
  }
 
});
export default HomeScreen;
