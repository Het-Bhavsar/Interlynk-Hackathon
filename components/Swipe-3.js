import { Wallet } from "@ethersproject/wallet";
import Web3Auth, { OPENLOGIN_NETWORK } from "@web3auth/react-native-sdk";
import { Buffer } from "buffer";
import Constants, { AppOwnership } from "expo-constants";
import * as Linking from "expo-linking";
import * as WebBrowser from "@toruslabs/react-native-web-browser";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { Button } from "@rneui/themed";
import axios from "axios";
global.Buffer = global.Buffer || Buffer;
import AsyncStorage from "@react-native-async-storage/async-storage";
// Import the required shims
import "@ethersproject/shims";

// Import the ethers library
import { ethers } from 'ethers';
import {API_URL} from '@env';
import { ActivityIndicator } from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const scheme = "web3authexposample"; // Or your desired app redirection scheme
const resolvedRedirectUrl =
  Constants.appOwnership == AppOwnership.Expo ||
  Constants.appOwnership == AppOwnership.Guest
    ? Linking.createURL("web3auth", {})
    : Linking.createURL("web3auth", { scheme: scheme });
    let web3authManager = new Web3Auth(WebBrowser, {
      clientId:
        "BG82--cbUfsRCGM9Tb3ywZaY-U4YX8CYwtoi7uPq99J2zbAS_Efuixiwzqnmht4mLbn_Wg4IJMPQ9sxaq2DtIE4",
      network: OPENLOGIN_NETWORK.TESTNET, // or other networks

      whiteLabel: {
        name: "Interlynk",
        logoLight: "URL_TO_APP_LOGO_FOR_LIGHT_THEME",
        logoDark: "URL_TO_APP_LOGO_FOR_DARK_THEME",
        defaultLanguage: "en", // or other language
        dark: true, // or false,
        theme: {},
      },
    });
    function Swipe3(props) {
  const navigation = useNavigation();
  const [key, setKey] = useState("");
  const [idToken, setIdToken] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [_, setTokenData] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [loading,setLoading] = useState(false);
  // console.log(API_URL);
  useEffect(() => {
    console.log()
    if (idToken) {
      const tokenDecoded = jwtDecode(idToken);
      setTokenData(tokenDecoded);
    }
  }, [idToken]);

  const resetState = () => {
    setKey("");
    setErrorMsg("");
    setIdToken("");
    setTokenData(null);
  };


  // console.log(API_URL);
  const handleCreateCustomeWallet=async()=>{
    resetState();
    setLoading(true);
    try{
    const wallet = await ethers.Wallet.createRandom(provider=API_URL);  
      const customeWalletInfo = {
        key:wallet.privateKey,
        address:wallet.address,
        mnemonic:wallet._mnemonic().phrase
    }
      console.log(customeWalletInfo);
      setKey(wallet.privateKey || "no key");
      setWallet(customeWalletInfo);
      value = {
        key: key,
        wallet: customeWalletInfo,
        loginMethod: "customeWallet"
        

      };
      axios({
        method: "post",
        url: "https://interlynk.herokuapp.com/user",
        data: {
          key: customeWalletInfo.key,
          wallet: customeWalletInfo,
          walletAddres: customeWalletInfo.walletAddres,
          loginMethod: "customeWallet",
          data: [],
        },
      }).then((response) => {
        console.log("user created");
      });
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
      navigation.navigate("Home", {
        key: key,
        wallet: customeWalletInfo,
        loginMethod: "web3auth"
      });}catch (error) {
        console.error(error);
        setErrorMsg(String(error));
      }
        
  }
  const handleWeb3authLogin = async () => {
    resetState();
    setLoading(true);

    try {
   
        console.log("login through web3auth")
      const state = await web3authManager.login({
        redirectUrl: resolvedRedirectUrl,
      });
    
      // console.log(state);
      let privateKey = state.privKey || "";
      const walletInfo = new Wallet(privateKey,provider=API_URL);
      setKey(privateKey || "no key");
      setWallet(walletInfo);
      console.log(walletInfo);
      setIdToken(state.userInfo?.idToken);
      value = {
        key: key,
        wallet: walletInfo,
        userInfo: state,
        loginMethod: "web3auth"

      };
      axios({
        method: "post",
        url: "https://interlynk.herokuapp.com/user",
        data: {
          key: key,
          wallet: walletInfo,
          walletAddres: walletInfo.walletAddres,
          userInfo: state,
          loginMethod: "web3auth",
          data: [],
        },
      }).then((response) => {
        console.log("user created");
      });
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
      navigation.navigate("Home", {
        key: key,
        wallet: walletInfo,
        loginMethod: "web3auth"
      });
    
   
  
  } catch (error) {
    console.error(error);
    setErrorMsg(String(error));
  }
    
    
  };


  return (
    <View style={styles.container}>
      {loading&&<ActivityIndicator  color={'#fff'} />}
      <View style={styles.image1Stack}>
        <Image
          source={require("../assets/Imgaes/transparentLogo.png")}
          resizeMode="contain"
          style={styles.interlynkLogo}
        ></Image>
        <Image
          source={require("../assets/Imgaes/connecting-removebg-preview.png")}
          resizeMode="contain"
          style={styles.connecting}
        ></Image>
      </View>
      <Text style={styles.text}>
        Interlynk uses bluetooth to {"\n"}locate and connect IoT devices around
        you.
      </Text>
      <Button
          title={"Login with web3auth"}
          buttonStyle={{
            backgroundColor: "#000000",
            borderRadius: 5,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: windowWidth / 4,
            position: "absolute",
            marginTop: windowHeight - 250,
          }}
          onPress={handleWeb3authLogin}
        />
        <Button
          title={"Login/Create wallet"}
          loading={loading}
          buttonStyle={{
            backgroundColor: "#000000",
            borderRadius: 5,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: windowWidth / 4,
            position: "absolute",
            marginTop: windowHeight - 200,
          }}
          onPress={handleCreateCustomeWallet}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  interlynkLogo: {
    position: "absolute",
    top: windowHeight/7,
    left: windowWidth/7,
    height: windowHeight/3.5,
    width: windowWidth/1.41
  },
  connecting: {
    top: 0,
    left: windowWidth - 250,
    width: windowWidth-200,
    height: windowHeight-50,
    position: "absolute"
  },
  image1Stack: {
    width: windowWidth-15,
    height: windowHeight/1.5,
    marginTop: 584-windowHeight,
    marginLeft: windowWidth/35
  },
  text: {
    fontFamily: "roboto-500",
    flex: 1, flexWrap: 'wrap',
    color: "rgba(0,0,0,1)",
    fontSize: 24,
    width: 362,
    height: 26,
    textAlign: "center",
    marginTop: 0,
    marginLeft: 6
  },
  materialButtonDark: {
    height: 48,
    width: 313,
    marginTop: 111,
    marginLeft: 31
  },
  materialButtonDark2: {
    height: 48,
    width: 313,
    marginTop: 19,
    marginLeft: 31
  }
});

export default Swipe3;
