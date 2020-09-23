import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PetBuy from "./pet_tab/petBuy";
import { TouchableOpacity } from "react-native-gesture-handler";
import PetScreenComponent from "./pet_tab/petScreen";
import buyDogs from "./pet_tab/buyDogs";
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

// function PetScreen() {
//   return (
//           {Pet}
//   );
// }

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
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ black }) => (
            <Icon name={"home"} size={30} color={black} />
          ),
        }}
      />
      <Tab.Screen
        name="Pet"
        // component={PetScreenComponent}PetBuy
        component={PetBuy}
        options={{
          tabBarIcon: ({ black }) => (
            <Icon name={"paw"} size={30} color={black} />
          ),
        }}
      />
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarIcon: ({ black }) => (
            <Icon name={"shopping-basket"} size={30} color={black} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ black }) => (
            <Icon name={"user"} size={30} color={black} />
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
