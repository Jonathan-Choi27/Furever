import React from "react";
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
} from "react-native";
import "react-navigation"
import "react-navigation-props-mapper"
import "@react-navigation/native"
import 'react-navigation-hooks'
import styles from "../styleSheet/styleSheet";

export const onBuyTab = (navigation) => {
    return (
        <View style={styles.buySellContainer}>
            <TouchableOpacity
                style={styles.blueTab}
                onPress={() => navigation.navigate("petCategories")}>
                <Text>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.whiteTab}
                onPress={() => navigation.navigate("currentListings")}>
                <Text style={{ textAlign: "center" }}> Sell </Text>
            </TouchableOpacity>
        </View>
    );
}

export const onSellTab = (navigation) => {
    return (
        <View style={styles.buySellContainer}>
            <TouchableOpacity
                style={styles.whiteTab}
                onPress={() => navigation.navigate("petCategories")}>
                <Text>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.blueTab}
                onPress={() => navigation.navigate("currentListings")}>
                <Text style={{ textAlign: "center" }}> Sell </Text>
            </TouchableOpacity>
        </View>
    );
}