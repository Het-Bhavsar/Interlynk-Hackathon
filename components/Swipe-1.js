import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function Swipe1(props) {
// console.log("windowHeight",windowHeight);
// console.log("windowWidth",windowWidth);
  return (
    <View style={styles.container}>
      <View style={styles.imageStack}>
        <Image
          source={require("../assets/Imgaes/transparentLogo.png")}
          resizeMode="contain"
          style={styles.interlynkLogo}
        ></Image>
        <Image
          source={require("../assets/Imgaes/brainLogo.png")}
          resizeMode="contain"
          style={styles.brainLogo}
        ></Image>
      </View>
      <Text style={styles.welcome}>Welcome to{"\n"} the Interlynk!</Text>
      <View style={styles.rectStack}>
        <View style={styles.rect}>
          <Text style={styles.weDoNotTrackData}>• We do not track data.</Text>
          <Text style={styles.we2}>
            • Join the network and start earning Interlynk token.
          </Text>
        </View>
        <View style={styles.rect2}>
          <View style={styles.nextStack}>
            <Text style={styles.next}>Next <Icon name="caretright" size={20} color="black" /></Text>
            
          </View>
        </View>
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
    interlynkLogo: {
      position: "absolute",
      alignSelf:'center',
      top: hp('10%'),
      height: hp('30%'),
      width: wp('80%')
    },
    brainLogo: {
      top: 0,
      width: wp('50%'),
      height: hp('90%'),
      position: "absolute"
    },
    imageStack: {
      width:  wp('50%'),
      height: hp('70%'),
      marginTop: hp('0.1%')-150,
    },
    welcome: {
      textAlign:'center',
      alignSelf:'center',
      fontFamily: "roboto-regular",
      color: "#121212",
      fontSize: wp('10%'),
      marginTop: hp('0.1%')-50,
    },
    rect: {
      top: 0,
      width: wp('90%'),
      height: wp('100%'),
      backgroundColor: "rgba(0,0,0,1)",
      borderWidth: 1,
      borderColor: "#000000",
      borderRadius: 22,
    },
    weDoNotTrackData: {
      fontFamily: "roboto-regular",
      color: "rgba(255,252,252,1)",
      width: wp('50%'),
      fontSize: wp('5%'),
      textAlign: "left",
      marginTop: hp('5%'),
      marginLeft: wp('15%')
    },
    we2: {
      fontFamily: "roboto-regular",
      color: "rgba(255,252,252,1)",
      height: hp('50%'),
      width: wp('60%'),
      fontSize: wp('5%'),
      textAlign: "left",
      marginTop: hp('0%'),
      marginLeft: wp('15%')
      
    },
    rect2: {
      top: hp('20%'),
      left: wp('70%'),
      width: wp('70%'),
      height: hp('5%'),
      position: "absolute",
      backgroundColor: "white",
      borderRadius: 11
    },
    next: {
      top: 0,
      left: 0,
      position: "absolute",
      fontFamily: "roboto-regular",
      color: "#121212",
      height: hp('5%'),
      width: wp('20%'),
      fontSize: 20
    },
    
    nextStack: {
      width:wp('1%'),
      height: hp('1%'),
      marginTop: hp('0.5%'),
      marginLeft: wp('5%'),
      backgroundColor:"white"
    },
    rectStack: {
      // width: 390,
      width: wp('90%'),
      marginTop: hp('3%'),
    }
  });
  

export default Swipe1;
