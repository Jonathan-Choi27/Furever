import { green } from "@material-ui/core/colors";
import { PhonelinkTwoTone } from "@material-ui/icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  FlatList,
  ActivityIndicator,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import { SearchBar } from "react-native-elements";

export default class petBuySpecies extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buySellContainer}>
          <TouchableOpacity
            style={{
              backgroundColor: "#d7e5f7",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: 50,
            }}
            onPress={() => this.props.navigation.navigate("petBuySpecies")}
          >
            <Text>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: 50,
            }}
            onPress={() => this.props.navigation.navigate("petSell")}
          >
            <Text style={{ textAlign: "center" }}> Sell </Text>
          </TouchableOpacity>
        </View>
        <View>
          <SearchBar
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              width: 300,
            }}
            placeholder="Search..."
            lightTheme="true"
          />
        </View>
        <View style={{ height: 50, padding: 10 }}>
          <TouchableOpacity style={styles.viewApplication}>
            <Text style={{ textAlign: "center" }}>View Applications</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categories}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("buyDogs")}
          >
            <View style={styles.iconContainer}>
              <Image
                // style={styles.icon}

                style={{ height: 100, width: 100 }}
                source={{
                  uri:
                    "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Fdog.jpg?alt=media&token=f9aedb1d-d038-4ca9-992d-3bf774693930",
                }}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <Image
                style={{ height: 100, width: 100 }}
                source={{
                  uri:
                    "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Fcat.jpg?alt=media&token=a0ba6ff4-7f46-47fa-8fd7-740b987abba5",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.categories}>
          <TouchableOpacity>
            <View style={styles.iconContainer}>
              <Image
                // style={styles.icon}

                style={{ height: 100, width: 100 }}
                source={{
                  uri:
                    "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Frabbit.jpg?alt=media&token=477edb78-9f2b-4be9-b415-e88bf2b4b0c6",
                }}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <Image
                style={{ height: 100, width: 100 }}
                source={{
                  uri:
                    "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Ffish.jpg?alt=media&token=292f9723-b5a1-4665-8a9c-7ceb7bce12ce",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buySellContainer: {
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  categories: {
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
  },
  iconContainer: {
    padding: 20,
  },
  viewApplication: {
    backgroundColor: "#447ECB",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 200,
  },
});
