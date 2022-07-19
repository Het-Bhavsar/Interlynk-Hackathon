// src/navigation/MainNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import SplashScreen from "../screens/SplashScreen";
import Login from "../screens/Login";
import SwiperComponent from "../../components/Swiper";
const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          options={{ animationEnabled: false, header: () => null }}
          component={SplashScreen}
        />
        <Stack.Screen
          name="Swiper"
          options={{ animationEnabled: true, header: () => null }}
          component={SwiperComponent}
        /><Stack.Screen
          name="Login"
          options={{ animationEnabled: true, header: () => null }}
          component={Login}
        />
        <Stack.Screen
          name="Home"
          options={{ animationEnabled: true, header: () => null }}
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
