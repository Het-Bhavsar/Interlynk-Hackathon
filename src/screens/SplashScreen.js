import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const SplashScreen = (props) => {
  const [authLoaded, setAuthLoaded] = useState(false);
  const [swiperTest, setSwiperTest] = useState(false);
  useEffect(() => {
    setTimeout(async() => {
      
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      // value previously stored
      setAuthLoaded(true);
    }else{
      setSwiperTest(true);
    }


      
      
    }, 2000);
  }, []);

  useEffect(() => {
    //if auth is done then take him to the home screen
    if (authLoaded) {
      props.navigation.navigate("Home");
    }
    if (swiperTest) {
      props.navigation.navigate("Swiper");
      // props.navigation.navigate("Home");
    }
  }, [authLoaded, props.navigation,swiperTest]);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        animated={true}
        backgroundColor="#ECF0F1"
        barStyle={"dark-content"}
      />

      <Image
        source={require("../../assets/Imgaes/splashScreen.png")}
        style={styles.backgroundImage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECF0F1",
  },
  backgroundImage: {
    flex: 1,
    alignSelf: "stretch",
    width: null,
  },
});

export default SplashScreen;
