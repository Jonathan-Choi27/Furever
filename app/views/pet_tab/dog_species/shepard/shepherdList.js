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
  Avatar,
} from "react-native-elements";
import { db } from "../../../database/firebase";
import { auth } from "../../../database/firebase";
export default class shepherdList extends React.Component {
  state = {
    data: [],
  };

  render() {
    const array = [];
    db.collection("pet-sell-list")
      .get()
      .then((snapshot) => {
        snapshot.docs.some((user) => {
          array.push({ title: user.data().name });
        });
        this.setState({
          data: [...array],
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
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={(item, index) => index.toString()}
          data={this.state.data}
          extraData={this.state}
        />
      </View>
    );
  }
}

const Item = ({ title }) => (
  <Card
    containerStyle={styles.card}
    title={title}
    image={
      "https://randomwordgenerator.com/img/picture-generator/54e6dc454e55b10ff3d8992cc12c30771037dbf85254784a73287bd09344_640.jpg"
    }
  >
    <View style={styles.avatarContainer}>
      <Avatar
        rounded
        source={{
          uri:
            "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
        }}
      />
      <Text>Sample Name</Text>
    </View>

    <Text style={{ marginBottom: 10 }}>
      The idea with React Native Elements is more about component structure than
      actual design.
    </Text>
    <Button
      icon={{ name: "code" }}
      backgroundColor="#03A9F4"
      fontFamily="Lato"
      buttonStyle={{
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
      }}
      title="VIEW NOW"
    />
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
  card: {
    borderRadius: 10,
  },
  avatarContainer: {
    fontWeight: "bold",
  },
});
