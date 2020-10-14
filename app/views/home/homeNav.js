import React, { useState } from "react";
import {
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import homeListing from "./homePetListing";
import homePetProfile from "./homePetProfile";

const Stack = createStackNavigator();

export default function HomeNav() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="homeListing" component={homeListing} />
        <Stack.Screen name="homePetProfile" component={homePetProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
