import { Wallet } from '@ethersproject/wallet';
import Web3Auth, { OPENLOGIN_NETWORK } from '@web3auth/react-native-sdk';
import { Buffer } from 'buffer';
import Constants, { AppOwnership } from 'expo-constants';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

global.Buffer = global.Buffer || Buffer;

const scheme = 'interlynk'; // Or your desired app redirection scheme

const resolvedRedirectUrl =
  Constants.appOwnership == AppOwnership.Expo || Constants.appOwnership == AppOwnership.Guest
    ? Linking.createURL('interlynk', {})
    : Linking.createURL('interlynk', { scheme: scheme });

const Login = ({ onClose }) => {
const navigation = useNavigation();

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
      navigation.navigate("Home");
      
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
    } catch (error) {
      console.error(error);
      setErrorMsg(String(error));
    }
  };

  return (
    <View style={styles.container}>
      <Text>Key: {key || 'N/A'}</Text>
      <Text>Address: {wallet ? wallet.address : 'N/A'}</Text>
      {!!errorMsg && <Text>Error: {errorMsg}</Text>}
      <Text>Linking URL: {resolvedRedirectUrl}</Text>
      {!key && <Button label="Login with Web3Auth" onPress={handleLogin} />}
      {!!key && <Button label="Logout" onPress={handleLogout} />}
      <Button label="Back" onPress={onClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    width: '100%',
  },
});

export default Login;
