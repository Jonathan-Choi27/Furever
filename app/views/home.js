import * as React from "react";
// import PetScreenComponent from "./app/view/PetScreenComponent.js";
import { Text, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import PetScreenComponent from "./PetScreenComponent";

export default class LandingPage extends React.Component {
  render() {
    return <MyTabs />;
  }
}

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={styles.container}>
        <Text>Your Recent Application</Text>
        <Text>You haven't made any</Text>
        <Text>Your Recent Listing</Text>
        <Text>You haven't made any</Text>
      </View>
    </View>
  );
}

function PetScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <PetScreenComponent />
    </View>
  );
}

function ShopScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Shop Screen!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings Screen!</Text>
    </View>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 18,
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ black }) => (
            <Icon name={"home"} size={22} color={black} />
          ),
        }}
      />
      <Tab.Screen
        name="Pet"
        component={PetScreen}
        options={{
          tabBarLabel: "Pet",
          tabBarIcon: ({ black }) => (
            <Icon name={"paw"} size={22} color={black} />
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarLabel: "Shop",
          tabBarIcon: ({ black }) => (
            <Icon name={"shopping-basket"} size={22} color={black} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ black }) => (
            <Icon name={"cog"} size={22} color={black} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
