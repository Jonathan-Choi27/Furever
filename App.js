import * as React from "react";
import { View, Text, Image } from "react-native";
import LandingPage from "./app/views/landingPage";
import Login from "./app/views/login";
import SignUp from "./app/views/signup";
import Home from "./app/views/home";
import HeaderLogo from "./app/views/HeaderLogo";

import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Pet Search"
          component={LandingPage}
          options={{
            title: "Pet Search",
            headerStyle: {
              backgroundColor: "#447ECB",
            },
            headerTitle: <HeaderLogo />,
            headerTitleStyle: { alignSelf: "center" },
            // headerBackground: (
            //   <Image source={{
            //     uri:
            //       "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet-search-logo.png?alt=media&token=7b2f7152-027f-4b71-986d-35af8aac12b3",
            //     }} />
            //   )
          }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "Login",
            headerStyle: {
              backgroundColor: "#447ECB",
            },
            headerTitle: <HeaderLogo />,
            headerTitleStyle: { alignSelf: "center" },
            headerTitleContainerStyle: { left: 0, right: 0 },
          }}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignUp}
          options={{
            title: "Sign Up",
            headerStyle: {
              backgroundColor: "#447ECB",
            },
            headerTitle: <HeaderLogo />,
            headerTitleStyle: { alignSelf: "center" },
            headerTitleContainerStyle: { left: 0, right: 0 },
          }}
        />
        <Stack.Screen
          name="Home"
          name="Home"
          component={Home}
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: "#447ECB",
            },
            headerTitle: <HeaderLogo />,
            headerTitleStyle: { alignSelf: "center" },
            headerTitleContainerStyle: { left: 0, right: 0 },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
