import * as React from "react";
import { View, Text } from "react-native";
import LandingPage from "./app/views/landingPage";
import Login from "./app/views/login";
import SignUp from "./app/views/signup";
import Home from "./app/views/home";

import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Pet Search" component={LandingPage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Sign Up" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
