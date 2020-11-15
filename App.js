import * as React from "react";
import LandingPage from "./app/views/login/landingPage";
import Login from "./app/views/login/login";
import SignUp from "./app/views/login/signup";
import Home from "./app/views/home/home";
import HeaderLogo from "./app/views/home/headerLogo";
import SetupPageOne from "./app/views/login/setupPageOne";
import PasswordRecoveryPage from "./app/views/login/passwordRecoveryPage";
import "react-native-gesture-handler";
import { NavigationContainer, Dimensions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform, StatusBar, View } from "react-native";
const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Pet Search"
            component={LandingPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Sign Up"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              //   title: "Home",
              //   headerStyle: {
              //     backgroundColor: green,
              //   },
              //   headerTitle: <HeaderLogo />,
              //   headerTitleStyle: {
              //     alignSelf: "center",
              //     flex: 1,
              //   },
              //   headerTitleContainerStyle: { left: 0, right: 0 },
              headerLeft: null,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Forgot Password"
            component={PasswordRecoveryPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Setup One"
            component={SetupPageOne}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
