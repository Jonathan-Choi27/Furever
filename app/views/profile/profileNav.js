import React, { useState, useEffect } from "react";
import { StyleSheet, BackHandler, Alert } from "react-native";
import profileHome from "./profileHome"

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import updateProfile from "./updateProfile";

const Stack = createStackNavigator();

export default function ProfileNav() {
  useEffect(() => {
    const backAction = () => {
      onPress: () => null;
      // onPress: () => BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen 
        name="profileHome" component={profileHome} />
        <Stack.Screen name="updateProfile" component={updateProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
