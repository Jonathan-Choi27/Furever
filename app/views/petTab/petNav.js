import React, { useState, useEffect } from "react";
import { StyleSheet, BackHandler, Alert } from "react-native";
import petBreeds from "./buy/petBreeds";
import petCategories from "./buy/petCategories";
import currentApplications from "./buy/currentApplications";
import breedList from "./buy/breedList";
import breedInfo from "./buy/breedInfo";
import buyPetProfile from "./buy/buyPetProfile";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import sellApplication from "./sell/sellApplication";
import currentListings from "./sell/currentListings";
import updateSellApplication from "./sell/updateSellApplication";
import buyApplication from "./buy/buyApplication";
import sellPetProfile from "./sell/sellPetProfile";
import offerApplications from "./sell/offerApplications";
import buyerProfile from "./sell/buyerProfile";
import buySellerProfile from "./buy/buySellerProfile"

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
        <Stack.Screen name="petBreeds" component={petBreeds} />
        <Stack.Screen name="currentApplications" component={currentApplications} />
        <Stack.Screen name="currentListings" component={currentListings} />
        <Stack.Screen name="sellApplication" component={sellApplication} />
        <Stack.Screen name="sellPetProfile" component={sellPetProfile} />
        <Stack.Screen name="updateSellApplication" component={updateSellApplication} />
        <Stack.Screen name="breedList" component={breedList} />
        <Stack.Screen name="breedInfo" component={breedInfo} />
        <Stack.Screen name="buyPetProfile" component={buyPetProfile} />
        <Stack.Screen name="buyApplication" component={buyApplication} />
        <Stack.Screen name="offerApplications" component={offerApplications} />
        <Stack.Screen name="buyerProfile" component={buyerProfile} />
				<Stack.Screen name="sellerProfile" component={buySellerProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buySellContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  categories: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
  },
  icon: {
    width: 100,
    height: 100,
    padding: 20,
  },
});
