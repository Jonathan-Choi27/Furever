import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  BackHandler,
} from "react-native";
import {
  Avatar,
  Card,
  Button,
  Searchbar,
  ActivityIndicator,
  Modal,
  Provider,
  Portal,
  Checkbox,
} from "react-native-paper";
import { db } from "../../database/firebase";
import { onBuyTab } from "../../components/petTabComponents";
import {
  darkGreen,
  green,
  lightGreen,
  orange,
  lightBlue,
  lightGrey,
} from "../../styleSheet/styleSheet";
import globalStyles from "../../styleSheet/styleSheet";
import { petBuyCard, petBuyCategory } from "../../components/petBuyComponents";

const petInformation = require('./petInformation.json');

export default class petCategories extends React.Component {
  state = {
    data: [],
    isLoading: true,
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
    petCategories: [],
    whiteColour: false,
    goldColour: false,
    greenColour: false,
    blackColour: false,
    rainbowColour: false,
    greyColour: false,
    brownColour: false,
    redColour: false,
    orangeColour: false,
  };

  async componentDidMount() {
    const dataArray = [];
    db.collection("petListings")
      .get()
      .then((doc) => {
        doc.forEach(async (listingDoc) => {
          var uuid = listingDoc.data().uuid;
          var seller_name;
          var seller_photo;
          await db
            .collection("users")
            .doc(uuid)
            .get()
            .then((user_doc) => {
              seller_name = user_doc.data().name;
              seller_photo = user_doc.data().photo;
            })
            .catch((erro) => { });
          dataArray.push({
            sellerName: seller_name,
            sellerPhoto: seller_photo,
            petName: listingDoc.data().name,
            category: listingDoc.data().category,
            breed: listingDoc.data().breed,
            colour: listingDoc.data().colour,
            age: listingDoc.data().age,
            ageOption: listingDoc.data().ageOption,
            gender: listingDoc.data().gender,
            size: listingDoc.data().size,
            location: listingDoc.data().location,
            suburb: listingDoc.data().suburb,
            price: listingDoc.data().price,
            behaviour: listingDoc.data().behaviour,
            health: listingDoc.data().health,
            training: listingDoc.data().training,
            additional: listingDoc.data().additionalInfo,
            photo: listingDoc.data().photoLink,
            uuid: listingDoc.data().uuid,
          });
          this.setState({
            isLoading: false,
            data: [...dataArray],
          });
        });
      });
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.handleBackButtonClick
      );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }
  


  searchFunction = (searchText) => {
    this.setState({ searchText: searchText });

    let filteredData = this.state.data.filter(function (item) {
      return item.petName.toLowerCase().includes(searchText.toLowerCase());
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

      case "whiteColour":
        this.setState({ whiteColour: !this.state.whiteColour });
        break;
      case "goldColour":
        this.setState({ goldColour: !this.state.goldColour });
        break;
      case "greenColour":
        this.setState({ greenColour: !this.state.greenColour });
        break;
      case "blackColour":
        this.setState({ blackColour: !this.state.blackColour });
        break;
      case "rainbowColour":
        this.setState({ rainbowColour: !this.state.rainbowColour });
        break;
      case "greyColour":
        this.setState({ greyColour: !this.state.greyColour });
        break;
      case "brownColour":
        this.setState({ brownColour: !this.state.brownColour });
        break;
      case "redColour":
        this.setState({ redColour: !this.state.redColour });
        break;
      case "orangeColour":
        this.setState({ orangeColour: !this.state.orangeColour });
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


    if (this.state.whiteColour) {
      this.setState({ filterDisplay: true });
      let filteredData = this.state.data.filter(function (item) {
        console.log("here " + item.colour.includes("White"));
        return item.colour.includes("White");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.goldColour) {
      this.setState({ filterDisplay: true });
      let filteredData = this.state.data.filter(function (item) {
        return item.colour.includes("Gold");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.greenColour) {
      this.setState({ filterDisplay: true });
      let filteredData = this.state.data.filter(function (item) {
        return item.colour.includes("Green");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.blackColour) {
      this.setState({ filterDisplay: true });
      let filteredData = this.state.data.filter(function (item) {
        return item.colour.includes("Black");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.rainbowColour) {
      this.setState({ filterDisplay: true });
      let filteredData = this.state.data.filter(function (item) {
        return item.colour.includes("Rainbow");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.greyColour) {
      this.setState({ filterDisplay: true });
      let filteredData = this.state.data.filter(function (item) {
        return item.colour.includes("Grey");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.brownColour) {
      this.setState({ filterDisplay: true });
      let filteredData = this.state.data.filter(function (item) {
        return item.colour.includes("Brown");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.redColour) {
      this.setState({ filterDisplay: true });
      let filteredData = this.state.data.filter(function (item) {
        return item.colour.includes("Red");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.orangeColour) {
      this.setState({ filterDisplay: true });
      let filteredData = this.state.data.filter(function (item) {
        return item.colour.includes("Orange");
      });
      listData = listData.concat(filteredData);
    }

    if (!this.state.dogCheck && !this.state.catCheck && !this.state.birdCheck &&
      !this.state.rabbitCheck && !this.state.fishCheck && !this.state.horseCheck &&
      !this.state.lizardCheck && !this.state.turtleCheck && !this.state.pigCheck &&

      !this.state.whiteColour && !this.state.goldColour && !this.state.greenColour &&
      !this.state.blackColour && !this.state.rainbowColour && !this.state.greyColour &&
      !this.state.brownColour && !this.state.redColour && !this.state.orangeColour
    ) {
      this.setState({ filterDisplay: false });
    }
    this.setState({ filteredData: listData });
  };

  render() {
    const { search } = this.state;

    if (this.state.isLoading) {
      return (
        <View style={globalStyles.activityContainer}>
          <ActivityIndicator size="large" color="#447ECB" />
        </View>
      );
    }
    return (
      <Provider>
        <View style={globalStyles.petContainer}>
          {/* {onBuyTab(this.props.navigation)} */}
          <View style={globalStyles.searchFilterContainer}>
            <Searchbar
              style={globalStyles.searchBar}
              placeholder="Search"
              onChangeText={this.searchFunction}
              value={this.state.searchText}
            />
            <Button
              color={lightGreen}
              onPress={() => {
                this.setState({ visible: true });
              }}
              mode="contained"
              contentStyle={{
                height: 35,
              }}>
              Filter
            </Button>
          </View>

          <View style={{ height: 52 }}>
            <TouchableOpacity
              style={globalStyles.viewApplication}
              onPress={() =>
                this.props.navigation.navigate("currentApplications")
              }>
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}>
                View Applications
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Portal>
              <Modal
                style={{ backgroundColor: "transparent" }}
                visible={this.state.visible}
                onDismiss={() => {
                  this.setState({ visible: false });
                }}>
                <Card elevation={5} style={{ margin: 10 }}>
                  <Card.Content>
                    <ScrollView>
                      <Text>Animal:</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Checkbox.Item
                          theme={{ colors: { primary: darkGreen } }}
                          color={darkGreen}
                          label="Dog"
                          status={this.state.dogCheck ? "checked" : "unchecked"}
                          onPress={() => {
                            this.checkFunction("dogCheck");
                          }}
                        />
                        <Checkbox.Item
                          theme={{ colors: { primary: darkGreen } }}
                          color={darkGreen}
                          label="Fish"
                          status={this.state.fishCheck ? "checked" : "unchecked"}
                          onPress={() => {
                            this.checkFunction("fishCheck");
                          }}
                        />
                        <Checkbox.Item
                          theme={{ colors: { primary: darkGreen } }}
                          color={darkGreen}
                          label="Lizard"
                          status={this.state.lizardCheck ? "checked" : "unchecked"}
                          onPress={() => {
                            this.checkFunction("lizardCheck");
                          }}
                        />
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Checkbox.Item
                          theme={{ colors: { primary: darkGreen } }}
                          color={darkGreen}
                          label="Cat"
                          status={this.state.catCheck ? "checked" : "unchecked"}
                          onPress={() => {
                            this.checkFunction("catCheck");
                          }}
                        />
                        <Checkbox.Item
                          theme={{ colors: { primary: darkGreen } }}
                          color={darkGreen}
                          label="Bird"
                          status={this.state.birdCheck ? "checked" : "unchecked"}
                          onPress={() => {
                            this.checkFunction("birdCheck");
                          }}
                        />
                        <Checkbox.Item
                          theme={{ colors: { primary: darkGreen } }}
                          color={darkGreen}
                          label="Turtle"
                          status={this.state.turtleCheck ? "checked" : "unchecked"}
                          onPress={() => {
                            this.checkFunction("turtleCheck");
                          }}
                        />
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Checkbox.Item
                          theme={{ colors: { primary: darkGreen } }}
                          color={darkGreen}
                          label="Rabbit"
                          status={this.state.rabbitCheck ? "checked" : "unchecked"}
                          onPress={() => {
                            this.checkFunction("rabbitCheck");
                          }}
                        />
                        <Checkbox.Item
                          theme={{ colors: { primary: darkGreen } }}
                          color={darkGreen}
                          label="Horse"
                          status={this.state.horseCheck ? "checked" : "unchecked"}
                          onPress={() => {
                            this.checkFunction("horseCheck");
                          }}
                        />
                        <Checkbox.Item
                          theme={{ colors: { primary: darkGreen } }}
                          color={darkGreen}
                          label="Pig"
                          status={this.state.pigCheck ? "checked" : "unchecked"}
                          onPress={() => {
                            this.checkFunction("pigCheck");
                          }}
                        />
                      </View>

                      {/* Filter for colour  */}
                      <Text>Colour:</Text>

                      <View style={{ flexDirection: "row" }}>
                        <Checkbox.Item
                          theme={{ colors: { primary: darkGreen } }}
                          color={darkGreen}
                          label="White"
                          status={this.state.whiteColour ? "checked" : "unchecked"}
                          onPress={() => {
                            this.checkFunction("whiteColour");
                          }}
                        />
                        <Checkbox.Item
                          theme={{ colors: { primary: darkGreen } }}
                          color={darkGreen}
                          label="Gold"
                          status={this.state.goldColour ? "checked" : "unchecked"}
                          onPress={() => {
                            this.checkFunction("goldColour");
                          }}
                        />
                        <Checkbox.Item
                          theme={{ colors: { primary: darkGreen } }}
                          color={darkGreen}
                          label="Green"
                          status={this.state.greenColour ? "checked" : "unchecked"}
                          onPress={() => {
                            this.checkFunction("greenColour");
                          }}
                        />
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Checkbox.Item
                          theme={{ colors: { primary: darkGreen } }}
                          color={darkGreen}
                          label="Black"
                          status={this.state.blackColour ? "checked" : "unchecked"}
                          onPress={() => {
                            this.checkFunction("blackColour");
                          }}
                        />
                        <Checkbox.Item
                          theme={{ colors: { primary: darkGreen } }}
                          color={darkGreen}
                          label="Rainbow"
                          status={this.state.rainbowColour ? "checked" : "unchecked"}
                          onPress={() => {
                            this.checkFunction("rainbowColour");
                          }}
                        />
                        <Checkbox.Item
                          theme={{ colors: { primary: darkGreen } }}
                          color={darkGreen}
                          label="Grey"
                          status={this.state.greyColour ? "checked" : "unchecked"}
                          onPress={() => {
                            this.checkFunction("greyColour");
                          }}
                        />
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Checkbox.Item
                          theme={{ colors: { primary: darkGreen } }}
                          color={darkGreen}
                          label="Brown"
                          status={this.state.brownColour ? "checked" : "unchecked"}
                          onPress={() => {
                            this.checkFunction("brownColour");
                          }}
                        />
                        <Checkbox.Item
                          theme={{ colors: { primary: darkGreen } }}
                          color={darkGreen}
                          label="Red"
                          status={this.state.redColour ? "checked" : "unchecked"}
                          onPress={() => {
                            this.checkFunction("redColour");
                          }}
                        />
                        <Checkbox.Item
                          theme={{ colors: { primary: darkGreen } }}
                          color={darkGreen}
                          label="Orange"
                          status={this.state.orangeColour ? "checked" : "unchecked"}
                          onPress={() => {
                            this.checkFunction("orangeColour");
                          }}
                        />
                      </View>
                    </ScrollView>
                  </Card.Content>
                  <Card.Actions style={{ justifyContent: "flex-end" }}>
                    <Button
                      color={darkGreen}
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
              <FlatList
                numColumns={1}
                key={1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                  petBuyCard(item, this.props.navigation)
                }
                keyExtractor={(item, index) => index.toString()}
                data={
                  this.state.filteredData && this.state.filteredData.length > 0
                    ? this.state.filteredData
                    : this.state.data
                }
              />
            ) : (
                <View style={globalStyles.petContainer}>
                  {this.state.searchText == "" ? (
                    <View style={globalStyles.petContainer}>
                      <FlatList
                        data={petInformation}
                        columnWrapperStyle={{ justifyContent: "flex-start" }}
                        numColumns={2}
                        key={2}
                        renderItem={({ item }) =>
                          petBuyCategory(item, this.props.navigation)
                        }
                      />
                    </View>
                  ) : (
                      <View style={globalStyles.petContainer}>
                        {this.state.filteredData.length == 0 ? (
                          <View style={globalStyles.petContainer}>
                            <Text style={{ margin: 100 }}>No results found.</Text>
                          </View>
                        ) : (
                            <FlatList
                              showsVerticalScrollIndicator={false}
                              numColumns={1}
                              key={1}
                              renderItem={({ item }) =>
                                petBuyCard(item, this.props.navigation)
                              }
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
          </ScrollView>
        </View>
      </Provider>
    );
  }
}
