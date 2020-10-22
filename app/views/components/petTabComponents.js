import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { Searchbar } from "react-native-paper";
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

export const searchBar = () => {
    return (
        <View
            style={StyleSheet.searchFilterContainer}
        >
            <Searchbar
                style={styles.searchBar}
                placeholder="Search"
                onChangeText={this.searchFunction}
                value={this.state.searchText}
            />
            <Button
                color={lightGreen}
                onPress={() => {
                    this.setState({ visible: true });
                }}
                mode="contained"
                contentStyle={{
                    height: 35,
                }}
            >
                Filter
            </Button>
        </View>
    )
}