import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PetBuyNav from "./pet_tab/petBuyNav";
import { TouchableOpacity } from "react-native-gesture-handler";
import PetScreenComponent from "./pet_tab/petScreen";
import petBuy1Dog from "./pet_tab/petBuy1Dog";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import {
  useFonts,
  Rosario_400Regular,
  Rosario_700Bold,
} from "@expo-google-fonts/rosario";

export default class LandingPage extends React.Component {
  render() {
    return <MyTabs />;
  }
}

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function HomeScreen() {
  let [fontsLoaded] = useFonts({
    Rosario_400Regular,
    Rosario_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Recent Listing</Text>
      <View style={styles.insideContainer}>
        <Text style={styles.middleText}>You haven't made any listings yet</Text>
      </View>
    </View>
  );
}

function ShopScreen() {
  let [fontsLoaded] = useFonts({
    Rosario_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Shop Screen!</Text>
    </View>
  );
}

function ProfileScreen() {
  let [fontsLoaded] = useFonts({
    Rosario_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Page Screen!</Text>
    </View>
  );
}

function BuyScreen() {
  let [fontsLoaded] = useFonts({
    Rosario_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Buy Screen!</Text>
    </View>
  );
}

function MyTabs() {
  let [fontsLoaded] = useFonts({
    Rosario_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home";
            } else if (route.name === "Pet") {
              iconName = focused ? "paw" : "paw";
            } else if (route.name === "Shop") {
              iconName = focused ? "shopping-basket" : "shopping-basket";
            } else if (route.name === "Profile") {
              iconName = focused ? "user" : "user";
            }
            return <Icon name={iconName} size={30} color={color} />;
          },
        })}
        tabBarOptions={{
          showLabel: false,
          activeTintColor: "#447ECB",
          inactiveTintColor: "black",
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Pet" component={PetBuyNav} />
        <Tab.Screen name="Shop" component={ShopScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 25,
  },
  insideContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    // fontWeight: "bold",
    fontFamily: "Rosario_400Regular",
  },
  middleText: {
    fontSize: 20,
    color: "#787878",
    fontFamily: "Rosario_400Regular",
  },
});
