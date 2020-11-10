import React from "react";
import {
    Text,
    View,
    SafeAreaView,
    Image,
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
        <View>
			<TouchableOpacity onPress={() => navigation.navigate("Cart", {items})}>
                <Image 
                    style={{width: 30, height: 30}}
                    source={{
                      uri: "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fshop%2Fshopping-cart.png?alt=media&token=0d9f90e7-22ac-4800-bf4b-d6f64449c201"
                    }}>
                </Image>
			</TouchableOpacity>
		</View>
    );
}