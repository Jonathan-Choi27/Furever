import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StackNavigator } from "react-navigation";
import sellApplication from "./sell/sellApplication";
import currentListings from "./sell/currentListings";
import updateSellApplication from "./sell/updateSellApplication";
import buyApplication from "./buy/buyApplication";
import sellPetProfile from "./sell/sellPetProfile";
import offerApplications from "./sell/offerApplications";
import buyerProfile from "./sell/buyerProfile";
import buySellerProfile from "./buy/buySellerProfile";
import buyerApplicationView from "../components/buyerApplicationView";
import petBreeds from "./buy/petBreeds";
import petCategories from "./buy/petCategories";
import currentApplications from "./buy/currentApplications";
import breedList from "./buy/breedList";
import breedInfo from "./buy/breedInfo";
import buyPetProfile from "./buy/buyPetProfile";
import reviewApplication from "../components/reviewApplication";
import { primaryColour1 } from "../styleSheet/styleSheet";

//Create Stack and Tab
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function PetTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        indicatorStyle: { backgroundColor: primaryColour1 },
        activeTintColor: primaryColour1,
        inactiveTintColor: "#cccccc",
      }}
    >
      <Tab.Screen name="Buy" component={BuyTab} />
      <Tab.Screen name="Sell" component={currentListings} />
    </Tab.Navigator>
  );
}

function BuyTab() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="petCategories" component={petCategories} />
      <Stack.Screen name="petBreeds" component={petBreeds} />
      <Stack.Screen name="breedList" component={breedList} />
    </Stack.Navigator>
  );
}

//Pet Nav
export default function PetNav() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Tab" component={PetTab} />
        <Stack.Screen name="offerApplications" component={offerApplications} />
        <Stack.Screen
          name="currentApplications"
          component={currentApplications}
        />
        <Stack.Screen name="sellApplication" component={sellApplication} />
        <Stack.Screen name="sellPetProfile" component={sellPetProfile} />
        <Stack.Screen
          name="updateSellApplication"
          component={updateSellApplication}
        />
        <Stack.Screen name="breedInfo" component={breedInfo} />
        <Stack.Screen name="petProfile" component={buyPetProfile} />
        <Stack.Screen name="buyApplication" component={buyApplication} />
        <Stack.Screen
          name="buyerApplicationView"
          component={buyerApplicationView}
        />
        <Stack.Screen name="buyerProfile" component={buyerProfile} />
        <Stack.Screen name="sellerProfile" component={buySellerProfile} />
        <Stack.Screen name="reviewApplication" component={reviewApplication} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
