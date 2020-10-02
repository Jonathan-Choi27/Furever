import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PetBuyNav from "./pet_tab/petBuyNav";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import firebase from "firebase";
import HomeNav from "./homeNav"

const db = firebase.firestore();
let retrieve_data;
export default class LandingPage extends React.Component {
  render() {
    return <MyTabs/>;
  }
}

const Tab = createBottomTabNavigator();

function ShopScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Shop Screen!</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile Page Screen!</Text>
    </View>
  );
}

function MyTabs(props) {
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
  },
  middleText: {
    fontSize: 20,
    color: "#787878",
  },
});
