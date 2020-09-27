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

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //       text: '',
  //   }
  // }

  // static navigationOptions = {
  //   titleID: 'Movies',
  // };

  componentDidMount() {
    const dataArray = [];
    db.collection("pet_listings")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((listingDoc) => {
          dataArray.push({
            title: listingDoc.data().name,
          });
        });
        this.setState({ data: [...dataArray] });
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  _onPressItem(item) {
    this.props.navigation.navigate('Test', {
      titleID: "hello!"
    });
  }

  //   _onPressItem = (title) => { 
  //     this.props.navigation.navigate('Test', {
  //         titleID: item.title,
  //     })
  //  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.buySellContainer}>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: 50,
              }}
              onPress={() => this.props.navigation.replace("petBuy")}
            >
              <Text>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#d7e5f7",
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

          <View style={styles.titleContainer}>
            <Text style={styles.fontTitle}> Marshmallow's Profile </Text>
            <Text style={styles.fontHeading}> General Information </Text>
          </View>

          <Card containerStyle={styles.cardContainer}>
            <View style={styles.cardContentContainer}>
              <View>
                <View style={styles.imageContainer}></View>
                <Text style={{ textAlign: "center", paddingTop: 5 }}>
                  <Text style={{ fontWeight: "bold" }}>Price:</Text>{" "}
                  <Text>$7,000</Text>
                </Text>
              </View>
              <View style={{ paddingLeft: 15 }}>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>Name:</Text>{" "}
                  <Text>Marshmallow</Text>
                </Text>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>Category:</Text>{" "}
                  <Text>Dog</Text>
                </Text>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>Breed:</Text>{" "}
                  <Text>Samoyed</Text>
                </Text>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>Colour:</Text>{" "}
                  <Text>White</Text>
                </Text>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>Age:</Text>{" "}
                  <Text>3 months</Text>
                </Text>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>Gender:</Text>{" "}
                  <Text>Female</Text>
                </Text>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>Size:</Text>{" "}
                  <Text>Small</Text>
                </Text>
                <Text>
                  <Text style={{ fontWeight: "bold" }}>Location:</Text>{" "}
                  <Text>Sydney, NSW</Text>
                </Text>
              </View>
            </View>
          </Card>

          <Card containerStyle={styles.cardContainer}>
            <View style={styles.boxContainer}>
              <Text style={styles.fontHeading}>General Information </Text>
              <FlatList
                data={this.state.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.viewApplication} onPress={() => this.props.navigation.navigate("test", {titleID: 'Hello!'})}> 
                    {/* style={styles.viewApplication} onPress={() => this._onPressItem(item)}> */}
                    <Text>{item.title}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </Card>

          {/* <View style={{ height: 50, paddingBottom: 20 }}>
            <TouchableOpacity style={styles.viewApplication}>
              <Text style={{ textAlign: "center", padding: 10 }}>
                View Profile
              </Text> */}
          {/* onPress={() => this.props.navigation.navigate("petSell3")}
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    );
  }
}

const DetailsScreen = ({ route, navigation }) => {
  const { itemId } = route.params;
  const { otherParam } = route.params;
  return (
    <View></View>
  );
};

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
