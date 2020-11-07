import React, { useState, useEffect } from "react";
import { StyleSheet, Platform, BackHandler } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import homeListing from "./homePetListing";
import homePetProfile from "./homePetProfile";
import homeSellerProfile from "./homeSellerProfile"
import buyApplication from "../petTab/buy/buyApplication";
import HeaderLogo from "./headerLogo";
import { darkGreen, green, lightGreen, orange, lightBlue } from "../styleSheet/styleSheet";

const Stack = createStackNavigator();

export default function HomeNav() {
	
	useEffect(() => {
		const backAction = () => {
		  onPress: () => null;
		  // onPress: () => BackHandler.exitApp();
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
				<Stack.Screen name="petProfile" component={homePetProfile} options={{headerShown: false}} />
				<Stack.Screen name="buyApplication" component={buyApplication} options={{headerShown: false}} />
				<Stack.Screen name="sellerProfile" component={homeSellerProfile} options={{headerShown: false}} />

			</Stack.Navigator>
		</NavigationContainer>
	);
}
