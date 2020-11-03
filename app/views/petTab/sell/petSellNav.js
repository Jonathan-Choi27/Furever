import React, { useState, useEffect } from "react";
import { StyleSheet, BackHandler, Alert } from "react-native";

import currentListings from "./currentListings";
import updateSellApplication from "./updateSellApplication";
import offerApplications from "./offerApplications";
import sellApplication from "./sellApplication";
import sellPetProfile from "./sellPetProfile";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function PetSellNav() {
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
        <Stack.Screen name="currentListings" component={currentListings} />
        <Stack.Screen name="updateSellApplication" component={updateSellApplication} />
        <Stack.Screen name="offerApplications" component={offerApplications} />
        <Stack.Screen name="sellApplication" component={sellApplication} />
        <Stack.Screen name="sellPetProfile" component={sellPetProfile} options={{}}/>
        {/* <Stack.Screen name="petBreeds" component={petBreeds} />
        <Stack.Screen name="currentApplications" component={currentApplications} />
        <Stack.Screen name="currentListings" component={currentListings} />
        <Stack.Screen name="breedList" component={breedList} />
        <Stack.Screen name="breedInfo" component={breedInfo} />
        <Stack.Screen name="buyPetProfile" component={buyPetProfile} />
        <Stack.Screen name="buyApplication" component={buyApplication} />
        <Stack.Screen name="buyerApplicationView" component={buyerApplicationView}/>
        <Stack.Screen name="buyerProfile" component={buyerProfile} />
				<Stack.Screen name="sellerProfile" component={buySellerProfile} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}