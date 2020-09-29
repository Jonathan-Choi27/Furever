import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  FlatList,
  ActivityIndicator,
  Platform,
  Dimensions,
  Image,
  Link,
} from "react-native";
import {
  Card,
  ListItem,
  Button,
  Icon,
  SearchBar,
  Avatar,
} from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import { createAppNavigator } from "react-navigation"
import { db } from "../database/firebase";
import test from "./test";

export default class petSell3 extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    data: [],
  };

  async componentDidMount() {
    const dataArray = [];
    this.setState(this.setState({ loader: true }));
    db.collection("pet_listings")
      .get()
      .then((doc) => {
        doc.forEach(async (listingDoc) => {
          dataArray.push({
            name: listingDoc.data().name,
            category: listingDoc.data().category,
            breed: listingDoc.data().breed,
            colour: listingDoc.data().colour,
            age: listingDoc.data().age,
            gender: listingDoc.data().gender,
            // size: listingDoc.data().size,
            location: listingDoc.data().location,
            price: listingDoc.data().price,
            behaviour: listingDoc.data().behaviour,
            health: listingDoc.data().health,
            training: listingDoc.data().training,
            // additional: listingDoc.data().additional,
            photo: listingDoc.data().photo_link,
            // documents: listingDoc.data().documents,
          });
        });
        this.setState({ 
          isLoading: false,
          data: [...dataArray],
          loader: false,
        });
      });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            <View style={styles.boxContainer}>
              <FlatList
                data={this.state.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.viewApplication} onPress={() => this.props.navigation.navigate("test", {item})}> 
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </Card>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  buySellContainer: {
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  titleContainer: {
    alignSelf: "stretch",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  imageContainer: {
    width: 150,
    height: 150,
    backgroundColor: "pink",
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
  fontTitle: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  fontHeading: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardContainer: {
    borderRadius: 4,
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
  },
  cardContentContainer: {
    borderRadius: 4,
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
  },
});
