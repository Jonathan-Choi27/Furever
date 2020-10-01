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
import petBuy1Dog from "./petBuy1Dog";
import petBuy from "./petBuy";
import petBuy7 from "./petBuy7";
import shepherdList from "./dog_species/shepard/shepherdList";
import shepherdInfo from "./dog_species/shepard/shepherdInfo";
import shepherdListInfo from "./dog_species/shepard/shepherdListInfo";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import petSell1 from "./petSell1";
import petSell3 from "./petSell3";
import petSell from "./petSell";
import petSell4 from "./petSell4";
import petBuy5 from "./petBuy5";
import test from "./test";

const Stack = createStackNavigator();

export default function PetBuyNav() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="petBuy" component={petBuy} />
        <Stack.Screen name="petBuy1Dog" component={petBuy1Dog} />
        <Stack.Screen name="petBuy7" component={petBuy7} />
        <Stack.Screen name="petSell1" component={petSell1}/>
        <Stack.Screen name="petSell" component={petSell} />
        <Stack.Screen name="petSell3" component={petSell3} />
        <Stack.Screen name="petSell4" component={petSell4} />
        <Stack.Screen name="test" component={test} />
        <Stack.Screen name="shepherdList" component={shepherdList} />
        <Stack.Screen name="shepherdInfo" component={shepherdInfo} />
        <Stack.Screen name="shepherdListInfo" component={shepherdListInfo} />
        <Stack.Screen name="petBuy5" component={petBuy5} />
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
