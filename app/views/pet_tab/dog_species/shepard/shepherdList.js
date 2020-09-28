import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  Avatar,
  ActivityIndicator,
  Card,
  Button,
  Searchbar,
} from "react-native-paper";
import { db } from "../../../database/firebase";
export default class shepherdList extends React.Component {
  state = {
    data: [],
    isLoading: true,
    filteredData: [],
    searchText: "",
  };

  async componentDidMount() {
    const dataArray = [];
    db.collection("pet_listings")
      .get()
      .then((doc) => {
        doc.forEach(async (listingDoc) => {
          var uuid = listingDoc.data().uuid;
          var seller_name;
          await db
            .collection("users")
            .doc(uuid)
            .get()
            .then((user_doc) => {
              seller_name = user_doc.data().name;
            });
          console.log(seller_name);
          dataArray.push({
            title: listingDoc.data().name,
            name: seller_name,
            photo: listingDoc.data().photo_link,
            age: listingDoc.data().age,
            location: listingDoc.data().location,
            gender: listingDoc.data().gender,
          });
          this.setState({ isLoading: false, data: [...dataArray] });
        });
      });
  }

  searchFunction = (searchText) => {
    this.setState({ searchText: searchText });

    let filteredData = this.state.data.filter(function (item) {
      return item.title.includes(searchText);
    });

    this.setState({ filteredData: filteredData });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activityContainer}>
          <ActivityIndicator size="large" color="#447ECB" />
        </View>
      );
    }
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
            onPress={() => this.props.navigation.replace("petBuy")}
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
        <Searchbar
          style={styles.searchBar}
          placeholder="Search"
          onChangeText={this.searchFunction}
          value={this.state.searchText}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>German Shepherd</Text>
          <Button color="#447ECB" onPress={() => {}} mode="contained">
            Information
          </Button>
        </View>
        <View style={styles.cardContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Card elevation={5} style={styles.card}>
                <Card.Cover source={item.photo} />
                <Card.Title
                  title={item.title}
                  subtitle={item.name}
                  left={(props) => (
                    <Avatar.Image {...props} size={40} source={item.photo} />
                  )}
                />
                <Card.Content>
                  <Text style={styles.cardContentText}>Age: {item.age}</Text>
                  <Text style={styles.cardContentText}>
                    Gender: {item.gender}
                  </Text>
                  <Text style={styles.cardContentText}>
                    Location: {item.location}
                  </Text>
                </Card.Content>
                <Card.Actions>
                  <Button color="#447ECB" onPress={() => {}}>
                    More info
                  </Button>
                </Card.Actions>
              </Card>
            )}
            keyExtractor={(item, index) => index.toString()}
            data={
              this.state.filteredData && this.state.filteredData.length > 0
                ? this.state.filteredData
                : this.state.data
            }
            //extraData={this.state}
          />
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
  activityContainer: {
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
  searchBar: {
    height: 50,
    width: 350,
    margin: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 25,
  },
  cardContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  card: {
    margin: 5,
    width: 340,
  },
  cardContentText: {
    fontWeight: "bold",
  },
});
