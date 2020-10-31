import React, { useState, useEffect } from "react";
import { StyleSheet, BackHandler, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import accessoryListings from "./accessoryListings";
import accessoryListingApplication from "./accessoryListingApplication";
import accessoryCategories from "./accessoryCategories";


const Stack = createStackNavigator();

export default function PetNav() {
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
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="accessoryCategories" component={accessoryCategories} />
        <Stack.Screen name="accessoryListings" component={accessoryListings} />
        <Stack.Screen name="accessoryListingApplication" component={accessoryListingApplication} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}