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
import { Avatar, Button, Card, Title, Paragraph, Searchbar, Modal, Chip, Provider, Portal, Checkbox, } from "react-native-paper";

const db = firebase.firestore();

export default class HomeListing extends React.Component {

  state = {
    data: [],
    isLoading: true,
    pullToRefresh: false,
    filteredData: [],
    searchText: "",
    visible: false,
    dogCheck: false,
    catCheck: false,
    rabbitCheck: false,
    fishCheck: false,
    birdCheck: false,
    horseCheck: false,
    lizardCheck: false,
    turtleCheck: false,
    pigCheck: false,
    filterDisplay: false,
  };

  async fetchData() {
    const dataArray = [];

    db.collection("pet_listings")
      .get()
      .then((doc) => {
        doc.forEach((listingDoc) => {
          dataArray.push({
            petName: listingDoc.data().name,
            category: listingDoc.data().category,
            breed: listingDoc.data().breed,
            colour: listingDoc.data().colour,
            age: listingDoc.data().age,
            gender: listingDoc.data().gender,
            size: listingDoc.data().size,
            location: listingDoc.data().location,
            price: listingDoc.data().price,
            behaviour: listingDoc.data().behaviour,
            health: listingDoc.data().health,
            training: listingDoc.data().training,
            additional: listingDoc.data().additionalInfo,
            photo: listingDoc.data().photo_link,
          });
          this.setState({
            isLoading: false,
            data: [...dataArray],
          });
        });
      });
  }

  async componentDidMount() {
    this.fetchData();
  }

  searchFunction = (searchText) => {
    this.setState({ searchText: searchText });

    let filteredData = this.state.data.filter(function (item) {
      return item.petName.includes(searchText);
    });

    this.setState({ filteredData: filteredData });
  };

  checkFunction = (input) => {
    switch (input) {
      case "dogCheck":
        this.setState({ dogCheck: !this.state.dogCheck });
        break;
      case "catCheck":
        this.setState({ catCheck: !this.state.catCheck });
        break;
      case "rabbitCheck":
        this.setState({ rabbitCheck: !this.state.rabbitCheck });
        break;
      case "fishCheck":
        this.setState({ fishCheck: !this.state.fishCheck });
        break;
      case "birdCheck":
        this.setState({ birdCheck: !this.state.birdCheck });
        break;
      case "horseCheck":
        this.setState({ horseCheck: !this.state.horseCheck });
        break;
      case "lizardCheck":
        this.setState({ lizardCheck: !this.state.lizardCheck });
        break;
      case "turtleCheck":
        this.setState({ catCturtleCheckheck: !this.state.turtleCheck });
        break;
      case "pigCheck":
        this.setState({ pigCheck: !this.state.pigCheck });
        break;
      default:
    }
  };

  displayFunction = () => {
    let listData = [];
    if (this.state.dogCheck) {
      this.setState({ filterDisplay: true });
      let filteredData = this.state.data.filter(function (item) {
        return item.category.includes("dog");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.catCheck) {
      this.setState({ filterDisplay: true });
      let filteredData = this.state.data.filter(function (item) {
        return item.category.includes("cat");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.rabbitCheck) {
      this.setState({ filterDisplay: true });
      let filteredData = this.state.data.filter(function (item) {
        return item.category.includes("rabbit");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.fishCheck) {
      this.setState({ filterDisplay: true });
      let filteredData = this.state.data.filter(function (item) {
        return item.category.includes("fish");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.birdCheck) {
      this.setState({ filterDisplay: true });
      let filteredData = this.state.data.filter(function (item) {
        return item.category.includes("bird");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.horseCheck) {
      this.setState({ filterDisplay: true });
      let filteredData = this.state.data.filter(function (item) {
        return item.category.includes("horse");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.lizardCheck) {
      this.setState({ filterDisplay: true });
      let filteredData = this.state.data.filter(function (item) {
        return item.category.includes("lizard");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.turtleCheck) {
      this.setState({ filterDisplay: true });
      let filteredData = this.state.data.filter(function (item) {
        return item.category.includes("turtle");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.pigCheck) {
      this.setState({ filterDisplay: true });
      let filteredData = this.state.data.filter(function (item) {
        return item.category.includes("pig");
      });
      listData = listData.concat(filteredData);
    }

    if (!this.state.dogCheck && !this.state.catCheck && !this.state.birdCheck) {
      this.setState({ filterDisplay: false });
    }
    this.setState({ filteredData: listData });
  };

  homeCard = (item) => (
    <View style={styles.card}>
      <Card
        elevation={5}
        styles={styles.card}
        onPress={() =>
          this.props.navigation.navigate("homePetProfile", { item })
        }>
        <Image source={{ uri: item.photo }} style={styles.image} />
        <Text numberOfLines={1} style={styles.title}>
          {item.petName}
        </Text>
        <Text numberOfLines={1} style={styles.subtext}>
          <Text>{item.breed}</Text>
          <Text> | </Text>
          <Text>{item.location}</Text>
        </Text>
      </Card>
    </View>
  );

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activityContainer}>
          <ActivityIndicator size="large" color="#447ECB" />
        </View>
      );
    }
    return (


      <Provider>
        <View style={styles.container}>
          <View
            style={{
              height: 20,
              margin: 20,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "stretch",
              flexDirection: "row",
            }}>
            <Searchbar
              style={{
                margin: 10,
                height: 40,
                width: 250,
              }}
              placeholder="Search"
              onChangeText={this.searchFunction}
              value={this.state.searchText}
            />
            <Button
              color="#447ECB"
              onPress={() => {
                this.setState({ visible: true });
              }}
              mode="contained">
              Filter
                </Button>
          </View>
          <Portal>
            <Modal
              style={{ backgroundColor: "transparent" }}
              visible={this.state.visible}
              onDismiss={() => {
                this.setState({ visible: false });
              }}>
              <Card elevation={5} style={{ margin: 10 }}>
                <Card.Content>
                  <Text>Animal:</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Checkbox.Item
                      label="Dog"
                      status={this.state.dogCheck ? "checked" : "unchecked"}
                      onPress={() => {
                        this.checkFunction("dogCheck");
                      }}
                    />
                    <Checkbox.Item
                      label="Fish"
                      status={this.state.fishCheck ? "checked" : "unchecked"}
                      onPress={() => {
                        this.checkFunction("fishCheck");
                      }}
                    />
                    <Checkbox.Item
                      label="Lizard"
                      status={
                        this.state.lizardCheck ? "checked" : "unchecked"
                      }
                      onPress={() => {
                        this.checkFunction("lizardCheck");
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Checkbox.Item
                      label="Cat"
                      status={this.state.catCheck ? "checked" : "unchecked"}
                      onPress={() => {
                        this.checkFunction("catCheck");
                      }}
                    />
                    <Checkbox.Item
                      label="Bird"
                      status={this.state.birdCheck ? "checked" : "unchecked"}
                      onPress={() => {
                        this.checkFunction("birdCheck");
                      }}
                    />
                    <Checkbox.Item
                      label="Turtle"
                      status={
                        this.state.turtleCheck ? "checked" : "unchecked"
                      }
                      onPress={() => {
                        this.checkFunction("turtleCheck");
                      }}
                    />
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Checkbox.Item
                      label="Rabbit"
                      status={
                        this.state.rabbitCheck ? "checked" : "unchecked"
                      }
                      onPress={() => {
                        this.checkFunction("rabbitCheck");
                      }}
                    />
                    <Checkbox.Item
                      label="Horse"
                      status={this.state.horseCheck ? "checked" : "unchecked"}
                      onPress={() => {
                        this.checkFunction("horseCheck");
                      }}
                    />
                    <Checkbox.Item
                      label="Pig"
                      status={this.state.pigCheck ? "checked" : "unchecked"}
                      onPress={() => {
                        this.checkFunction("pigCheck");
                      }}
                    />
                  </View>
                </Card.Content>
                <Card.Actions style={{ justifyContent: "flex-end" }}>
                  <Button
                    onPress={() => {
                      this.displayFunction();
                      this.setState({ visible: false });
                    }}>
                    Done
                    </Button>
                </Card.Actions>
              </Card>
            </Modal>
          </Portal>
          {this.state.filterDisplay ? (
            <View style={styles.container}>

              <FlatList
                data={this.state.data}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                numColumns={2}
                onRefresh={async () => {
                  this.setState({
                    pullToRefresh: true,
                  });
                  await this.fetchData();
                  this.setState({
                    pullToRefresh: false,
                  });
                }}
                keyExtractor={(item, index) => index.toString()}
                refreshing={this.state.pullToRefresh}
                renderItem={({ item }) => (
                  this.homeCard(item)
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
          ) : (
              <View style={styles.container}>
                {this.state.searchText == "" ? (
                  <View style={styles.container}>
                    <FlatList
                      data={this.state.data}
                      columnWrapperStyle={{ justifyContent: "space-between" }}
                      numColumns={2}
                      onRefresh={async () => {
                        this.setState({
                          pullToRefresh: true,
                        });
                        await this.fetchData();
                        this.setState({
                          pullToRefresh: false,
                        });
                      }}
                      keyExtractor={(item, index) => index.toString()}
                      refreshing={this.state.pullToRefresh}
                      renderItem={({ item }) => (
                        this.homeCard(item)
                      )}
                    />
                  </View>

                ) : (
                    <View style={styles.container}>
                      {this.state.filteredData.length == 0 ? (
                        <View style={styles.container}>
                          <Text style={{ margin: 100 }}>No results found.</Text>
                        </View>
                      ) : (
                          <FlatList
                            data={this.state.data}
                            columnWrapperStyle={{ justifyContent: "space-between" }}
                            numColumns={2}
                            onRefresh={async () => {
                              this.setState({
                                pullToRefresh: true,
                              });
                              await this.fetchData();
                              this.setState({
                                pullToRefresh: false,
                              });
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            refreshing={this.state.pullToRefresh}
                            renderItem={({ item }) => (
                              this.homeCard(item)
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
            )}
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    aspectRatio: 1,
  },
  title: {
    marginLeft: 8,
    marginTop: 5,
    marginBottom: 5,
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
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  cardContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  card: {
    margin: 7,
    width: 180,
  },
  cardContentText: {
    fontWeight: "bold",
  },
});