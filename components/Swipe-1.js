import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
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
      flex: 1
    },
    interlynkLogo: {
      position: "absolute",
      top: windowHeight/7,
      left: windowWidth/7,
      height: windowHeight/3.5,
      width: windowWidth/1.41
    },
    brainLogo: {
      top: 0,
      left: windowWidth - 250,
      width: windowWidth-200,
      height: windowHeight-50,
      position: "absolute"
    },
    imageStack: {
      width: windowWidth-15,
      height: windowHeight/1.5,
      marginTop: 584-windowHeight,
      marginLeft: windowWidth/35
    },
    welcome: {
      fontFamily: "roboto-regular",
      color: "#121212",
      fontSize: 35,
      marginTop: windowHeight /150,
      marginLeft: windowWidth /4
    },
    rect: {
      top: 0,
      width: 333,
      height: 258,
      position: "absolute",
      backgroundColor: "rgba(0,0,0,1)",
      borderWidth: 1,
      borderColor: "#000000",
      borderRadius: 22,
      left: 0
    },
    weDoNotTrackData: {
      fontFamily: "roboto-regular",
      color: "rgba(255,252,252,1)",
      height: 26,
      width: 270,
      fontSize: 20,
      textAlign: "left",
      marginTop: 41,
      marginLeft: 56
    },
    we2: {
      fontFamily: "roboto-regular",
      color: "rgba(255,252,252,1)",
      height: 26,
      width: 270,
      fontSize: 20,
      textAlign: "left",
      marginTop: 14,
      marginLeft: 56
    },
    rect2: {
      top: 139,
      left: 255,
      width: 106,
      height: 47,
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
      height: 35,
      width: 67,
      fontSize: 20
    },
    image5: {
      position: "absolute",
      top: 6,
      left: 49,
      height: 22,
      width: 36
    },
    nextStack: {
      width: 85,
      height: 35,
      marginTop: 7,
      marginLeft: 18,
      backgroundColor:"white"
    },
    rectStack: {
      width: 361,
      height: 258,
      marginTop: 41,
      marginLeft: 14
    }
  });
  

export default Swipe1;
