import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  FlatList,
  ActivityIndicator,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { max } from "react-native-reanimated";
import petBreeds from "./buy/petBreeds";
import petCategories from "./buy/petCategories";
import currentApplications from "./buy/currentApplications";
import shepherdList from "./buy/dog/shepard/shepherdList";
import shepherdInfo from "./buy/dog/shepard/shepherdInfo";
import shepherdListInfo from "./buy/dog/shepard/shepherdListInfo";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import sellApplication from "./sell/sellApplication";
import currentListings from "./sell/currentListings";
import updateSellApplication from "./sell/updateSellApplication";
import buyApplication from "./buy/buyApplication";
import petProfile from "./sell/petProfile";

const Stack = createStackNavigator();

export default function PetNav() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="petCategories" component={petCategories} />
        <Stack.Screen name="petBreeds" component={petBreeds} />
        <Stack.Screen name="currentApplications" component={currentApplications} />
        <Stack.Screen name="currentListings" component={currentListings} />
        <Stack.Screen name="sellApplication" component={sellApplication}/>
        <Stack.Screen name="petProfile" component={petProfile}/>
        <Stack.Screen name="updateSellApplication" component={updateSellApplication} />
        <Stack.Screen name="shepherdList" component={shepherdList} />
        <Stack.Screen name="shepherdInfo" component={shepherdInfo} />
        <Stack.Screen name="shepherdListInfo" component={shepherdListInfo} />
        <Stack.Screen name="buyApplication" component={buyApplication} />
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
