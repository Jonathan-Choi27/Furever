import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { Avatar, Card, Button, Searchbar } from "react-native-paper";
import { db } from "../../database/firebase";
import { auth } from "../../database/firebase";

export default class petBuy7 extends React.Component {
  state = {
    data: [],
    isLoading: true,
    filteredData: [],
    searchText: "",
  };

  async componentDidMount() {
    const dataArray = [];
    const user = auth.currentUser;
    db.collection("pet_listings")
      .get()
      .then((doc) => {
        doc.forEach(async (listingDoc) => {
          var uuid = listingDoc.data().uuid;
          if (uuid != user.uid) {
            var seller_name;
            await db
              .collection("users")
              .doc(uuid)
              .get()
              .then((user_doc) => {
                seller_name = user_doc.data().name;
              });
            dataArray.push({
              title: listingDoc.data().name,
              name: seller_name,
              photo: listingDoc.data().photo_link,
              age: listingDoc.data().age,
              location: listingDoc.data().location,
              gender: listingDoc.data().gender,
            });
            this.setState({ isLoading: false, data: [...dataArray] });
          }
          
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
    return (
      <ScrollView>
        <View style={styles.container}>
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
              onPress={() => this.props.navigation.replace("petCategories")}
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
              onPress={() => this.props.navigation.replace("currentListings")}
            >
              <Text
                style={{ textAlign: "center"}}
              >
                {" "}
                Sell{" "}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "stretch",
            }}
          >
            <Searchbar
              style={{
                margin: 10,
                height: 50,
                width: 300,
              }}
              placeholder="Search"
              onChangeText={this.searchFunction}
              value={this.state.searchText}
            />
          </View>
    
          {this.state.searchText == "" ? (
            <View style={styles.container}>
                <View style={{
                    backgroundColor: 'red',
                    // flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 100,
                    width: 300,
                    borderRadius: 5,
                }}>
                    <Text style={{textAlign: 'center', padding: 5,}}>No applications have been made yet.</Text>
                    <Text style={{textAlign: 'center', padding: 5,}}>Try considering:</Text>

                </View>
              <View style={styles.container}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <Card elevation={5} style={styles.card}>
                      <Card.Cover source={item.photo} />
                      <Card.Title
                        title={item.title}
                        subtitle={item.name}
                        left={(props) => (
                          <Avatar.Image
                            {...props}
                            size={40}
                            source={item.photo}
                          />
                        )}
                      />
                      <Card.Content>
                        <Text style={styles.cardContentText}>
                          Age: {item.age}
                        </Text>
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
                    this.state.filteredData &&
                    this.state.filteredData.length > 0
                      ? this.state.filteredData
                      : this.state.data
                  }
                />
            </View>
            </View>
          ) : (
            <View style={styles.container}>
              {this.state.filteredData.length == 0 ? (
                <View style={styles.container}>
                  <Text style={{ margin: 100 }}>No results found.</Text>
                </View>
              ) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <Card elevation={5} style={styles.card}>
                      <Card.Cover source={item.photo} />
                      <Card.Title
                        title={item.title}
                        subtitle={item.name}
                        left={(props) => (
                          <Avatar.Image
                            {...props}
                            size={40}
                            source={item.photo}
                          />
                        )}
                      />
                      <Card.Content>
                        <Text style={styles.cardContentText}>
                          Age: {item.age}
                        </Text>
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
                    this.state.filteredData &&
                    this.state.filteredData.length > 0
                      ? this.state.filteredData
                      : this.state.data
                  }
                />
              )}
            </View>
          )}
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
