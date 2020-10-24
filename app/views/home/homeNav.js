import React, { useState } from "react";
import { StyleSheet, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import homeListing from "./homePetListing";
import homePetProfile from "./homePetProfile";
import sellerProfile from "./sellerProfile"
import buyApplication from "../petTab/buy/buyApplication";
import HeaderLogo from "./headerLogo";
import { darkGreen, green, lightGreen, orange, lightBlue } from "../styleSheet/styleSheet";

const Stack = createStackNavigator();

export default function HomeNav() {
	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator>
				<Stack.Screen
					name="homeListing"
					component={homeListing}
					options={{
						title: "Home",
						headerStyle: {
							backgroundColor: green,
						},
						headerTitle: <HeaderLogo/>,
						headerTitleStyle: {
							alignSelf: "center",
							flex: 1,
							paddingBottom: Platform.OS === "web" ? 0 : 5,
						},
						headerTitleContainerStyle: { left: 0, right: 0 },
					}}
				/>
				<Stack.Screen name="homePetProfile" component={homePetProfile} />
				<Stack.Screen name="buyApplication" component={buyApplication} />
				<Stack.Screen name="sellerProfile" component={sellerProfile} />

			</Stack.Navigator>
		</NavigationContainer>
	);
}
