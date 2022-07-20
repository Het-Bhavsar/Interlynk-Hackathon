// srс/screens/HomeScreen.js

import React from 'react';
import {View,Image, Text, StyleSheet,ImageBackground} from 'react-native';
import BLEfunction from "../../components/BLEfunction";
import Maps from "../../components/Maps"
const HomeScreen = (props) => {
  console.log(props);
  const {key,logout,wallet}=props;
  
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
