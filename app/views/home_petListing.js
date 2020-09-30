import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
// import HomeCard from "./home_petListing.js";
import firebase from "firebase";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

const db = firebase.firestore();

const HomeCard = (props) => (
  <View style={styles.card}>
    <Card elevation={5} styles={styles.card}>
      <Image source={{ uri: props.photo_uri }} style={styles.image} />
      <Text numberOfLines={1} style={styles.title}>{props.name}</Text>
      <Text numberOfLines={1} style={styles.subtext}>
        <Text>{props.breed}</Text>
        <Text> | </Text>
        <Text>{props.location}</Text>
      </Text>
    </Card>
  </View>
);

export default class HomeListing extends React.Component {
  state = {
    data: [],
    isLoading: true,
  };

  async componentDidMount() {
    const dataArray = [];

    db.collection("pet_listings")
      .get()
      .then((doc) => {
        doc.forEach((listingDoc) => {
          dataArray.push({
            pet_name: listingDoc.data().name,
            location: listingDoc.data().location,
            breed: listingDoc.data().breed,
            photo_uri: listingDoc.data().photo_link,
          });
          this.setState({
            isLoading: false,
            data: [...dataArray],
          });
        });
      });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activityContainer}>
          <ActivityIndicator size="large" color="#447ECB" />
        </View>
      );
    }
    return (
      <FlatList
        data={this.state.data}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        numColumns={2}
        renderItem={({ item }) => (
          <HomeCard
            name={item.pet_name}
            breed={item.breed}
            location={item.location}
            photo_uri={item.photo_uri}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  card: {
    margin: 10,
    flex: 0.5,
    marginLeft: 9,
    marginRight: 9,
  },
  image: {
    aspectRatio: 1,
  },
  title: {
    marginLeft: 8,
    marginTop: 8,
    marginBottom: 8,
    fontWeight: "bold",
    fontSize: 14.5,
    color: "#447ECB",
  },
  subtext: {
    paddingLeft: 8,
    paddingTop: 8,
    marginBottom: 8,
    fontSize: 12,
    borderTopWidth: 0.5,
  },
  activityContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
