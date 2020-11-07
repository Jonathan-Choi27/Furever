import React from "react";
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import { Searchbar } from "react-native-paper";
import "react-navigation"
import "react-navigation-props-mapper"
import "@react-navigation/native"
import 'react-navigation-hooks'
import styles from "../styleSheet/styleSheet";
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import globalStyles from "../styleSheet/styleSheet";
import { getItemList } from "../components/shopComponents";


export const cartTab = (itemList, navigation) => {
    const items = getItemList();
    return (
        <View style={{paddingLeft: 100, paddingRight: 10}}>
			<TouchableOpacity onPress={() => navigation.navigate("Cart", {items})}>
			    <AntDesign name={"shoppingcart"} size={40} color={"green"} />
			</TouchableOpacity>
		</View>
    );
}