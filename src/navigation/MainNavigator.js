// src/navigation/MainNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import SplashScreen from "../screens/SplashScreen";
import SwiperComponent from "../../components/Swiper";
import Setting from "../../components/Setting";
import Maps from "../../components/Maps";
const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          options={{ animationEnabled: false, header: () => null ,gestureEnabled: false}}
          component={SplashScreen}
        />
        <Stack.Screen
          name="Swiper"
          options={{ animationEnabled: true, header: () => null }}
          component={SwiperComponent}
        />
        <Stack.Screen
          name="Home"
          options={{ animationEnabled: true, header: () => null }}
          component={HomeScreen}
        /><Stack.Screen
          name="Setting"
          options={{ animationEnabled: true, header: () => null }}
          component={Setting}
        /><Stack.Screen
          name="Map"
          options={{ animationEnabled: true, header: () => null }}
          component={Maps}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
