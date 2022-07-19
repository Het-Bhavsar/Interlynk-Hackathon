// srс/screens/HomeScreen.js

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BLEfunction from "../../components/BLEfunction";
import Maps from "../../components/Maps"
const HomeScreen = (props) => {
  const {key,logout,wallet}=props;
  
  console.log(props)
  return (
    <View style={styles.container}>
    <Maps />
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
