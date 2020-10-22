import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import PetNav from "../petTab/petNav";
import firebase from "firebase";
import HomeNav from "./homeNav";
import ProfileNav from "../profile/profileNav"
import { darkGreen, green, lightGreen, orange, lightBlue } from "../styleSheet/styleSheet";

const db = firebase.firestore();
let retrieve_data;
export default class LandingPage extends React.Component {
	render() {
		return <MyTabs />;
	}
}

const Tab = createBottomTabNavigator();

function ShopScreen() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Shop Screen!</Text>
		</View>
	);
}

function MyTabs(props) {
	return (
		<NavigationContainer independent={true}>
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
					activeTintColor: darkGreen,
					inactiveTintColor: green,
					style: { backgroundColor: "#fff" },
				}}>
				<Tab.Screen name="Home" component={HomeNav} />
				<Tab.Screen name="Pet" component={PetNav} />
				<Tab.Screen name="Shop" component={ShopScreen} />
				<Tab.Screen name="Profile" component={ProfileNav} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		margin: 25,
	},
	insideContainer: {
		flex: 2,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
	},
	middleText: {
		fontSize: 20,
		color: "#787878",
	},
});
