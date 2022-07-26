import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Alert,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
  Animated,
  Image
} from "react-native";
import LottieView from 'lottie-react-native';

function CustomMarker() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  //     // Will change fadeAnim value to 1 in 5 seconds
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 5000
      }).start();
  
   
  
    return (
      <Animated.View
      style={[
        styles.marker,
        {
          // Bind opacity to animated value
          opacity: fadeAnim
        }
      ]}
    > 
         <Image source={require('../assets/Imgaes/Icon_Transparent.png')} style={{height: 40, width:40 }} />
       </Animated.View>
    // <LottieView source={require('../assets/animation.json')} autoPlay loop />
    );
  }
  //styles for our custom marker.
  const styles = StyleSheet.create({
    
    marker: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        elevation: 10,
      },
      
  });
  export default CustomMarker;