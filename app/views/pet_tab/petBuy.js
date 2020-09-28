import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Modal,
} from "react-native";
import {
  Avatar,
  ActivityIndicator,
  Card,
  Button,
  Searchbar,
} from "react-native-paper";
import { db } from "../database/firebase";

export default class petBuy extends React.Component {
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
    const { search } = this.state;
    const [modalVisible, setModalVisible] = useState(false);

      return (
        <ScrollView>
        <View style={styles.container}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Hello World!</Text>

                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          <View style={styles.buySellContainer}>
            <TouchableOpacity
              style={{
                backgroundColor: "#d7e5f7",
                // backgroundColor: Platform.OS === "web" ? 'grey' :'white',
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
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "stretch",
              // height: 50,
              // width: 300,
            }}
          >
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
         <TouchableHighlight
            style={styles.openButton}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text style={styles.textStyle}>Show Modal</Text>
          </TouchableHighlight>
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
                onPress={() => this.props.navigation.replace("petBuy1Dog")}
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
  
            <View style={styles.categories}>
              <TouchableOpacity>
                <View style={styles.iconContainer}>
                  <Image
                    // style={styles.icon}
  
  
                    style={{ height: 100, width: 100 }}
                    source={{
                      uri:
                        "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Fbird.jpg?alt=media&token=a67b1114-553d-40e7-846f-30ea6800efeb",
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
                        "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Fhorse.jpg?alt=media&token=d6a30c93-24b0-4b89-9e83-05c278dee129",
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
                        "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Flizard.jpg?alt=media&token=40a4ae86-978d-413f-9aa0-054c5e8d041f",
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
                        "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Fturtle.jpg?alt=media&token=8008ab6e-1696-4733-b471-e3b5d86ae3d6",
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
    borderRadius: 5,
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
