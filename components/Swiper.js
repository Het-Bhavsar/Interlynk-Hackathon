import React,{useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import Swiper from "react-native-swiper";
import { Button } from "@rneui/themed";
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swipe1 from "../components/Swipe-1";
import Swipe2 from "../components/Swipe-2";
import Swipe3 from "../components/Swipe-3";
function SwiperComponent(props) {
const [loading,setLoading]=useState(false)
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        activeDotColor="white"
        loop={false}
        activeDotStyle={{
          width: 15,
          height: 7,
          borderRadius: 7,
          marginRight: 10,
          marginLeft: 10,
        }}
        dotStyle={{
          width: 15,
          height: 7,
          borderRadius: 5,
          borderColor: "#EEEADE",
          borderWidth: 1,
          marginRight: 10,
          marginLeft: 10,
        }}
        paginationStyle={{
          position: "absolute",
          left: 0,
          right: 0,
        }}
      >
        <View style={styles.slide1}>
          <Swipe1/>
        </View>
        <View style={styles.slide2}>
          <Swipe2/>
        </View>
        <View style={styles.slide3}>
          <Swipe3/>
          {/* <ImageBackground
            source={require("../assets/Imgaes/swipe-3.png")}
            style={styles.slide3Image}
          >
            <Button title={'Get Started'}  
            loading={loading}
             buttonStyle={{
                backgroundColor: '#000000',
                borderRadius: 5,
                
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: windowWidth/4,
                position:"absolute",
                marginTop:600
              }}
              onPress={(props) => { setLoading(true);
                navigation.navigate("Login");}}
              
              />
           
          </ImageBackground> */}
        </View>
      </Swiper>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {},
  backgroundImage: {
    flex: 1,
    alignSelf: "stretch",
    width: null,
  },
  slide3Image: {
    flex: 1,
    alignSelf: "stretch",
    width: null,
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide3: {
    flex: 1,
    alignItems: "center",
    alignItems:'center',
    justifyContent:'center'
  },
 
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default SwiperComponent;
