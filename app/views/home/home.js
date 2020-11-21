import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import PetNav from "../petTab/petNav";
import HomeNav from "./homeNav";
import ProfileNav from "../profile/profileNav";
import ShopNav from "../shop/shopNav";
import { primaryColour1 } from "../styleSheet/styleSheet";

export default class LandingPage extends React.Component {
  render() {
    return <MyTabs />;
  }
}

//Initialize the Bottom Tab Navigator
const Tab = createBottomTabNavigator();

//Create the tabs
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "md-home" : "md-home";
          } else if (route.name === "Pet") {
            iconName = focused ? "md-paw" : "md-paw";
          } else if (route.name === "Shop") {
            iconName = focused ? "md-basket" : "md-basket";
          } else if (route.name === "Profile") {
            iconName = focused ? "md-person" : "md-person";
          }
          return <Icon name={iconName} size={30} color={color} />;
        },
      })}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: primaryColour1,
        inactiveTintColor: "#cccccc",
        style: { backgroundColor: "#fff" },
      }}
    >
      <Tab.Screen name="Home" component={HomeNav} />
      <Tab.Screen name="Pet" component={PetNav} />
      <Tab.Screen name="Shop" component={ShopNav} />
      <Tab.Screen name="Profile" component={ProfileNav} />
    </Tab.Navigator>
  );
}
