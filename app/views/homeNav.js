import React, { useState } from "react";
import {
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeListing from "./home_petListing";
import HomePetInfo from "./home_petInfo";

const Stack = createStackNavigator();

export default function HomeNav() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="HomeListing" component={HomeListing} /> 
        <Stack.Screen name="HomePetInfo" component={HomePetInfo} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
