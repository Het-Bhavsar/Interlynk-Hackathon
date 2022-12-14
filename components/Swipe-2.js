import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function Swipe2(props) {
  return (
    <View style={styles.container}>
        <Image
          source={require("../assets/Imgaes/transparentLogo.png")}
          resizeMode="contain"
          style={styles.intnerlynklogo}
        ></Image>
        <Image
          source={require("../assets/Imgaes/gift-transprent.png")}
          resizeMode="contain"
          style={styles.gift}
        ></Image>
      <View style={styles.rect}>
        <Text style={styles.loremIpsum}>Start earning in Interlynk Token:</Text>
        <Text style={styles.loremIpsum2}>
          You earn crypto token everytime you recieve data from your nearby IoT
          devices.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    alignItems:'center',
    flex: 1
  },
  intnerlynklogo: {
      height: hp('30%'),
      width: wp('80%')
  },
  gift: {
    height: 200,
    width: 200
  },
  image1Stack: {
    // width: windowWidth-15,
    // height: windowHeight/1.5,
    // marginTop: 584-windowHeight,
    // marginLeft: windowWidth/35
  },
  rect: {
    width: wp('90%'),
    height: hp('90%'),
    backgroundColor: "rgba(0,0,0,1)",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 20,
    marginTop: hp('5%'),
  },
  loremIpsum: {
    fontFamily: "roboto-regular",
    color: "rgba(255,255,255,1)",
    height: 87,
    width: 258,
    fontSize: 30,
    marginTop: 33,
    marginLeft: 48
  },
  loremIpsum2: {
    fontFamily: "inter-regular",
    color: "rgba(255,255,255,1)",
    height: 135,
    width: 228,
    fontSize: 20,
    marginTop: 19,
    marginLeft: 60
  }
});

export default Swipe2;
