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

export default class buyDogs extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buySellContainer}>
          <TouchableOpacity
            style={{
              backgroundColor: "#89CFF0",
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
        <View style={styles.categories}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("shepherdList")}
          >
            <View style={styles.iconContainer}>
              <Image
                // style={styles.icon}

                style={{ height: 100, width: 100 }}
                source={{
                  uri:
                    "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Fgerman-shepherd.jpg?alt=media&token=9cd50a0f-7c36-4f10-8b6a-53ea9ee133ab",
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
                    "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Fmaltese.jpg?alt=media&token=151b14ec-f1e1-4234-95eb-603373940110",
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
                    "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Fcavoodle.jpg?alt=media&token=d657d9ab-c4b8-439f-8789-33ddb465060b",
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
                    "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Fsamoyed.jpg?alt=media&token=aeefae65-cd0c-40c6-a0be-86e11444629a",
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
