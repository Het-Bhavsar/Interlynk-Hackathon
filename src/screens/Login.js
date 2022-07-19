import { Wallet } from '@ethersproject/wallet';
import Web3Auth, { OPENLOGIN_NETWORK } from '@web3auth/react-native-sdk';
import { Buffer } from 'buffer';
import Constants, { AppOwnership } from 'expo-constants';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View ,ImageBackground,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from "react-native"
import { Button } from "@rneui/themed";
global.Buffer = global.Buffer || Buffer;

const scheme = 'interlynk'; // Or your desired app redirection scheme

const resolvedRedirectUrl =
  Constants.appOwnership == AppOwnership.Expo || Constants.appOwnership == AppOwnership.Guest
    ? Linking.createURL('interlynk', {})
    : Linking.createURL('interlynk', { scheme: scheme });

const Login = ({ onClose }) => {
const navigation = useNavigation();

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
  const [key, setKey] = useState('');
  const [idToken, setIdToken] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [_, setTokenData] = useState(null);
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    web3auth = new Web3Auth(WebBrowser, {
      clientId: 'BI63yeUDhfNOieEldzDkpBnefYTzDKQz52RHFM30hEakeuj18ljStjdMm_V1AQaGSdWoz-S3qMKVgUpiKkz49WE',
      network: OPENLOGIN_NETWORK.TESTNET, // or other networks
  
      whiteLabel: {
        name: "Interlynk",
        logoLight: "URL_TO_APP_LOGO_FOR_LIGHT_THEME",
        logoDark: "URL_TO_APP_LOGO_FOR_DARK_THEME",
        defaultLanguage: "en", // or other language
        dark: true ,// or false,
        theme: {},
      },
  

  
  
    });
  }, []);

  useEffect(() => {
    if (idToken) {
      const tokenDecoded = jwtDecode(idToken);
      setTokenData(tokenDecoded);
    }
  }, [idToken]);

  const resetState = () => {
    setKey('');
    setErrorMsg('');
    setIdToken('');
    setTokenData(null);
  };

  const handleLogin = async () => {
    resetState();
    try {
      const state = await web3auth.login({
        redirectUrl: resolvedRedirectUrl,
      });
      console.log(state);
      let privateKey = state.privKey || '';
      const wallet = new Wallet(privateKey);
      setKey(privateKey || 'no key');
      setWallet(wallet);

      setIdToken((state.userInfo )?.idToken);
      navigation.navigate("Home",{
        key:key,
        wallet:wallet,
        logout:handleLogout
      });
      
    } catch (error) {
      console.error(error);
      setErrorMsg(String(error));
    }
  };

  const handleLogout = async () => {
    try {
      await web3auth.logout({
        redirectUrl: resolvedRedirectUrl,
      });
      resetState();
      navigation.navigate("Login")
    } catch (error) {
      console.error(error);
      setErrorMsg(String(error));
    }
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require("../../assets/Imgaes/gradient.png")}
        style={styles.backgroundImage}
      >
        <Image
          source={require("../../assets/Imgaes/interlynk-logo.png")}
          style={styles.logo}
        />
         <Button
          title={"Login/Create account"}
          buttonStyle={{
            backgroundColor: "#000000",
            borderRadius: 5,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: windowWidth / 4,
            position: "absolute",
            marginTop: windowHeight-350,
          }}
          onPress={handleLogin}
        />
        <Button
          title={"Connect web3 wallet"}
          buttonStyle={{
            backgroundColor: "#000000",
            borderRadius: 5,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: windowWidth / 4,
            position: "absolute",
            marginTop: windowHeight-300,
          }}
          onPress={null}
        />
      {/* {!key && <Button label="Login with Web3Auth" onPress={handleLogin} />} */}
      {/* {!!key && <Button label="Logout" onPress={handleLogout} />} */}
      {/* <Button label="Back" onPress={onClose} /> */}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECF0F1",
  },
  logo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
    marginBottom:'50%'
  },
  backgroundImage: {
    flex: 1,
    alignSelf: "stretch",
    width: null,
  },
});

export default Login;
