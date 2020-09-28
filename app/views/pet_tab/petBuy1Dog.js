import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  FlatList,
  Platform,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import {
  Avatar,
  ActivityIndicator,
  Card,
  Button,
  Searchbar,
} from "react-native-paper";
import { db } from "../database/firebase";
// import { ScrollView } from "react-native-gesture-handler";

export default class petBuy1Dog extends React.Component {
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
    console.log(filteredData[0]);
  };

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
            <View>
            <Searchbar
          style={{
            // justifyContent: "center",
            // alignItems: "center",
            // alignSelf: "stretch",
            margin: 10,
            height: 50,
            width: 300,
          }}
          placeholder="Search"
          onChangeText={this.searchFunction}
          value={this.state.searchText}
        />
          </View>
          <View style={{ height: 50, padding: 10 }}>
            <TouchableOpacity style={styles.viewApplication}>
              <Text style={{ textAlign: "center", color: "white" }}>
                View Applications
              </Text>
            </TouchableOpacity>
          </View>

          {this.state.searchText == ''? 
          <View style={styles.container}>
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
          :
        <View style={styles.container}>
          {this.state.filteredData.length == 0 ? 
                      <View style={styles.container}>
                        <Text style={{margin: 100}}>No results found.</Text>
                      </View>
                      :
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
    }
      </View>
          
    }
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
