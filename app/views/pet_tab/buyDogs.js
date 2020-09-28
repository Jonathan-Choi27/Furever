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
  ScrollView
} from "react-native";
import { SearchBar } from "react-native-elements";
// import { ScrollView } from "react-native-gesture-handler";

export default class buyDogs extends React.Component {
  render() {
    return (
      <ScrollView>
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
            onPress={() => this.props.navigation.replace("petBuySpecies")}
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
            onPress={() => this.props.navigation.replace("petSell")}
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
            onPress={() => this.props.navigation.replace("shepherdList")}
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

        <View style={styles.categories}>
          <TouchableOpacity>
            <View style={styles.iconContainer}>
              <Image
                // style={styles.icon}

                style={{ height: 100, width: 100 }}
                source={{
                  uri:
                    "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Fgolden-retriever.jpg?alt=media&token=612010ce-0525-498b-9178-37970e587a79",
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
                    "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Fpomeranian.jpg?alt=media&token=42e10aaf-7d43-4ade-a5fe-6ca69b8bc076",
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
                    "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Frottweiler.jpg?alt=media&token=36be150b-0632-43e9-9e20-21f066de6847",
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
                    "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Fcorgi.jpg?alt=media&token=a67c9e09-87a1-4f89-810f-800242c6e45c",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </ScrollView>
      
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
