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
            style={{
                height: 20,
                margin: 20,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "stretch",
                flexDirection: "row",
            }}
        >
            <Searchbar
                style={{
                    margin: 10,
                    height: 40,
                    width: 250,
                }}
                placeholder="Search"
                onChangeText={this.searchFunction}
                value={this.state.searchText}
            />
            <Button
                color="#447ECB"
                onPress={() => {
                    this.setState({ visible: true });
                }}
                mode="contained"
            >
                Filter
					</Button>
        </View>
    )
}