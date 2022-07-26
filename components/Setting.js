import React,{useEffect,useState} from "react";
import { StyleSheet, View, Text,TouchableHighlight,Linking  } from "react-native";
import { Icon } from "@rneui/themed";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';




function Setting(props) {
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
      <View style={styles.iconRow}>
        <TouchableHighlight  onPress={()=>{props.navigation.navigate("Home")}} >
            <View style={styles.flex}>

        <Icon name="chevron-left" style={styles.icon} size={45} color="white"></Icon>
        <Text style={styles.back}>Back</Text>
        </View>
        </TouchableHighlight>
        
      </View>
      <View style={styles.icon2Row}>
      <TouchableHighlight  onPress={()=>{Linking
  .openURL('https://www.interlynk.space/')}} >
            <View style={styles.flex}>
        <Icon name="info" style={styles.icon2 }color="white" size={35}></Icon>
        <Text style={styles.aboutUs}>About us</Text>
        </View>
        </TouchableHighlight>
      </View>
      <View style={styles.icon3Row}>
      <TouchableHighlight  onPress={()=>{Linking
  .openURL('https://www.interlynk.space/faq')}} >
            <View style={styles.flex}>

        <Icon name="message-circle" style={styles.icon3} type='feather' color="white" size={35}></Icon>
        <Text style={styles.faq}>FAQ</Text>
        </View>
        </TouchableHighlight>
      </View>
        <Text style={styles.wallet}>Wallet Address:</Text>
        <TouchableHighlight  onPress={()=>{Linking
  .openURL(`https://mumbai.polygonscan.com/token/0xd114b528639367869c8fee741f820cc8ae060589?a=${storageData&& storageData.wallet.address}`)}} >
        <Text style={styles.walletAddress}>{storageData&& storageData.wallet.address}</Text>
        </TouchableHighlight>
      <Text style={styles.builtwithlove}>Built with ❤️ in India for World 🌍</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    flex:{
        flex:1,
        flexDirection: 'row'
    },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,1)"
  },
  icon: {
    color: "rgba(255,255,255,1)",
    fontSize: 40
  },
  walletAddress:{

    fontFamily: "inter-regular",
    color: "rgba(255,255,255,1)",
    height: 33,
    width: wp('100%'),
    fontSize: 14,
    alignContent:"center",
    marginTop: 6,
  },
  wallet:{

    fontFamily: "inter-regular",
    marginLeft:wp('7%'),
    color: "rgba(255,255,255,1)",
    height: 33,
    width: wp('90%'),
    fontSize: 25,

    marginTop: 6
  },
  back: {
    fontFamily: "inter-regular",
    color: "rgba(255,255,255,1)",
    height: 33,
    width: 95,
    fontSize: 30,
    marginLeft: 8,
    marginTop: 6
  },
  iconRow: {
    height: 43,
    flexDirection: "row",
    marginTop: 62,
    marginLeft: 17,
    marginRight: 215
  },
  icon2: {
    color: "rgba(255,255,255,1)",
    fontSize: 29
  },
  aboutUs: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    height: 44,
    width: 185,
    fontSize: 25,
    marginLeft: 8
  },
  icon2Row: {
    height: 44,
    flexDirection: "row",
    marginTop: 48,
    marginLeft: 28,
    marginRight: 125
  },
  icon3: {
    color: "rgba(255,255,255,1)",
    fontSize: 29
  },
  faq: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    height: 44,
    width: 185,
    fontSize: 25,
    marginLeft: 8
  },
  icon3Row: {
    height: 44,
    flexDirection: "row",
    marginTop: 11,
    marginLeft: 28,
    marginRight: 125
  },
  builtwithlove: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    height: 63,
    width: 255,
    fontSize: 25,
    marginTop: hp('5%'),
    marginLeft: 74,
    fontWeight:"bold"
  }
});

export default Setting;
