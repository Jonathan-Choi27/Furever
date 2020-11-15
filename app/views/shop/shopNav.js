import React, { useState, useEffect } from "react";
import { StyleSheet, BackHandler, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import accessoryListings from "./accessoryListings";
import accessoryListingApplication from "./accessoryListingApplication";
import updateAccessoryListingApplication from "./updateAccessoryListingApplication";
import accessoryCategories from "./accessoryCategories";
import petCategories from "./petCategories";
import accessoryList from "./accessoryList";
import accessoryListingProfile from "./accessoryListingProfile";
import shopProfile from "./shopProfile";
import shopSellerProfile from "./shopSellerProfile";
import shopListingProfile from "./shopListingProfile";
import Cart from "./Cart";
import CheckoutInformation from "./CheckoutInformation";
import accessorySellerProfile from "./accessorySellerProfile";
import CheckoutSummary from "./CheckoutSummary";

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
        <Stack.Screen name="petCategories" component={petCategories} />
        <Stack.Screen name="accessoryCategories" component={accessoryCategories} />
        <Stack.Screen name="accessoryListings" component={accessoryListings} />
        <Stack.Screen name="accessoryListingProfile" component={accessoryListingProfile} />
        <Stack.Screen name="accessoryListingApplication" component={accessoryListingApplication} />
        <Stack.Screen name="updateAccessoryListingApplication" component={updateAccessoryListingApplication} />
        <Stack.Screen name="accessoryList" component={accessoryList} />
        <Stack.Screen name="shopListingProfile" component={shopListingProfile} />
        <Stack.Screen name="sellerProfile" component={shopSellerProfile} />
        <Stack.Screen name="shopProfile" component={shopProfile} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="CheckoutInformation" component={CheckoutInformation} />
        <Stack.Screen name="CheckoutSummary" component={CheckoutSummary} />
        <Stack.Screen name="accessorySellerProfile" component={accessorySellerProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}