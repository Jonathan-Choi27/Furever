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
import buyDogs from "./buyDogs";
import petBuySpecies from "./petBuySpecies";
import shepherdList from "./dog_species/shepard/shepherdList";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SellApplicationComponent from "./sellApplication";
import petSellProfile from "./petSellProfile";
import petSell from "./petSell";

const Stack = createStackNavigator();

export default function PetBuy() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="petBuySpecies" component={petBuySpecies} />
        <Stack.Screen name="buyDogs" component={buyDogs} />
        <Stack.Screen
          name="SellApplicationComponent"
          component={SellApplicationComponent}
        />
        <Stack.Screen name="petSell" component={petSell} />
        <Stack.Screen name="petSellProfile" component={petSellProfile} />
        <Stack.Screen name="shepherdList" component={shepherdList} />
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
