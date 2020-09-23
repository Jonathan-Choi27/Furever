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
} from "react-native";
import {
  Card,
  ListItem,
  Button,
  Icon,
  SearchBar,
  Image,
} from "react-native-elements";
import { db } from "../../../database/firebase";
import { auth } from "../../../database/firebase";
export default class shepherdList extends React.Component {
  state = {
    listings: [],
  };
  render() {
    db.collection("pet-sell-list")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((user) => {
          this.state.listings.push({
            id: "1121212",
            title: user.data().name,
          });
        });
      });
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
        <Text style={styles.outsideTitle}>German Shepherd</Text>
        <FlatList
          data={this.state.listings}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={(item, index) => index.toString()}
          extraData={this.state}
        />
      </View>
    );
  }
}

const Item = ({ title }) => (
  <Card>
    <Card.Title>{title}</Card.Title>
    <Card.Divider />
    <Card.Image
      source={{
        uri:
          "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Flogo.svg?alt=media&token=21d331fe-dc33-4021-a632-aeaa3b7cf6c4",
      }}
    >
      <Text style={{ marginBottom: 10 }}>
        The idea with React Native Elements is more about component structure
        than actual design.
      </Text>
      <Button
        icon={<Icon name="code" color="#ffffff" />}
        buttonStyle={{
          borderRadius: 0,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 0,
        }}
        title="More info"
        onPress={() => console.log(DATA)}
      />
    </Card.Image>
  </Card>
);

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
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  outsideTitle: {
    fontSize: 20,
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    fontWeight: "bold",
    padding: 12,
  },
});
