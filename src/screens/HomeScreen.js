// srс/screens/HomeScreen.js

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SwiperComponent from "../../components/Swiper";
const HomeScreen = () => {
  return (
    <View style={styles.root}>
      <Text>Hey boy this is Home screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
