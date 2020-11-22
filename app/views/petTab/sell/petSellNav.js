import React, { useEffect } from "react";
import { BackHandler } from "react-native";

import currentListings from "./currentListings";
import updateSellApplication from "./updateSellApplication";
import offerApplications from "./offerApplications";
import sellApplication from "./sellApplication";
import sellPetProfile from "./sellPetProfile";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//Create a stack
const Stack = createStackNavigator();

export default function PetSellNav() {
  //Handle back button
  useEffect(() => {
    const backAction = () => {
      onPress: () => null;
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
        }}
      >
        <Stack.Screen name="currentListings" component={currentListings} />
        <Stack.Screen
          name="updateSellApplication"
          component={updateSellApplication}
        />
        <Stack.Screen name="offerApplications" component={offerApplications} />
        <Stack.Screen name="sellApplication" component={sellApplication} />
        <Stack.Screen
          name="sellPetProfile"
          component={sellPetProfile}
          options={{}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
