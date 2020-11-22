import React, { useEffect } from "react";
import { BackHandler } from "react-native";
import petCategories from "./petCategories";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function PetBuyNav() {
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
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="petCategories" component={petCategories} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
