import * as React from "react";
import { View, Text } from "react-native";
import LandingPage from "./app/views/landingPage"
import Login from "./app/views/login";
import SignUp from "./app/views/signup";
import Home from "./app/views/home";

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createAppContainer } from "react-navigation";

const Stack = createStackNavigator();

// const AppNavigator = createStackNavigator({
//   LandingPage: {
//     screen: LandingPage
//   },
//   Login: {
//     screen: Login
//   }
// });

// const AppContainer = createAppContainer(AppNavigator);


export default function App() {
  return (

    // <AppContainer />
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="LandingPage" component={LandingPage}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="SignUp" component={SignUp}/>
      <Stack.Screen name="Home" component={Home}/>

    </Stack.Navigator>
  </NavigationContainer>
  );
}
