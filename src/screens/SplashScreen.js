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
      // setAuthLoaded(true);
      setSwiperTest(true);


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
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#ECF0F1"
        barStyle={"dark-content"}
      />

      <Image
        source={require("../../assets/Imgaes/transparentLogo.png")}
        resizeMode="contain"
        style={styles.image}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor:"white"
  },
  image: {
    width: 343,
    height: 354,
    alignSelf: "center"
  }
});

export default SplashScreen;
