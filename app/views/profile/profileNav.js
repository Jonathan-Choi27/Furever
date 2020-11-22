import React, { useEffect } from "react";
import { BackHandler } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import profileHome from "./profileHome";
import updateProfile from "./updateProfile";
import ProfilePrivacy from "./profilePrivacy";
import ProfileHelp from "./profileHelp";

const Stack = createStackNavigator();

export default function ProfileNav() {
  //Handle back button
  useEffect(() => {
    const backAction = () => {
      onPress: () => null;
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="profileHome" component={profileHome} />
      <Stack.Screen name="updateProfile" component={updateProfile} />
      <Stack.Screen name="profilePrivacy" component={ProfilePrivacy} />
      <Stack.Screen name="profileHelp" component={ProfileHelp} />
    </Stack.Navigator>
  );
}
