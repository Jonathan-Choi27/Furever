import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PetBuyNav from "./pet_tab/petBuyNav";
import { TouchableOpacity } from "react-native-gesture-handler";
import PetScreenComponent from "./pet_tab/petScreen";
import petBuy1Dog from "./pet_tab/petBuy1Dog";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import firebase from "firebase";
import HomeListing from "./home_petListing.js"
import HomeNav from "./homeNav.js"

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

const db = firebase.firestore();
let retrieve_data;
export default class LandingPage extends React.Component {
  render() {
    return <MyTabs/>;
  }
}

const Tab = createBottomTabNavigator();

// function HomeScreen(props) {
//   let [fontsLoaded] = useFonts({
//     Roboto_400Regular,
//     Roboto_700Bold,
//   });

//   if (!fontsLoaded) {
//     return <AppLoading />;
//   }

//   return <HomeListing />;
// }

function ShopScreen() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
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
    Roboto_400Regular,
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

function MyTabs(props) {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
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
          activeTintColor: "white",
          inactiveTintColor: "#9e9e9e",
          style: { backgroundColor: "#447ECB" },
        }}>
        <Tab.Screen name="Home" component={HomeNav} />
        {/* <Tab.Screen name="Home" children={() => <HomeScreen data={props.data}/>}/> */}
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
    fontFamily: "Roboto_400Regular",
  },
  middleText: {
    fontSize: 20,
    color: "#787878",
    fontFamily: "Roboto_400Regular",
  },
});
