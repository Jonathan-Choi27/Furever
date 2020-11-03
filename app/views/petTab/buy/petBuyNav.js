import React, { useState, useEffect } from "react";
import { StyleSheet, BackHandler, Alert } from "react-native";
import petCategories from "./petCategories";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

export default function PetBuyNav() {
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
        {/* <Stack.Screen name="sellApplication" component={sellApplication} /> */}
        {/* <Stack.Screen name="sellPetProfile" component={sellPetProfile} /> */}
        {/* <Stack.Screen name="updateSellApplication" component={updateSellApplication} /> */}
        {/* <Stack.Screen name="breedList" component={breedList} />
        <Stack.Screen name="breedInfo" component={breedInfo} />
        <Stack.Screen name="buyPetProfile" component={buyPetProfile} />
        <Stack.Screen name="buyApplication" component={buyApplication} />
        <Stack.Screen name="buyerApplicationView" component={buyerApplicationView}/> */}
        {/* <Stack.Screen name="offerApplications" component={offerApplications} />
        <Stack.Screen name="buyerProfile" component={buyerProfile} />
				<Stack.Screen name="sellerProfile" component={buySellerProfile} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}