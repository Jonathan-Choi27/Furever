import React from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  BackHandler
} from "react-native";
import {
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
import {onBuyTab} from "../../components/petTabComponents";
import globalStyles from "../../styleSheet/styleSheet";
import { darkGreen, green, lightGreen, lightGrey, orange, lightBlue } from "../../styleSheet/styleSheet";
import { petBuyCard, petBuyBreed } from "../../components/petBuyComponents";

export default class petBreeds extends React.Component {

  state = {
    data: [],
    isLoading: true,
    filteredData: [],
    searchText: "",
    visible: false,
    fontsLoaded: false,
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
            .catch((erro) => {});
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
      default:
    }
    console.log(this.state.dogCheck);
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

  render() {
    const { search } = this.state;
    const category = this.props.route.params.item;
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
            <View
              style={globalStyles.searchFilterContainer}
            >
              <Searchbar
                style={globalStyles.searchBar}
                placeholder="Search"
                onChangeText={this.searchFunction}
                value={this.state.searchText}
              />
              <Button
                color={lightGreen}
                onPress={() =>  {
                  this.setState({ visible: true });
                }}
                mode="contained"
                contentStyle={{
                  height: 35,
                }}
              >
                Filter
              </Button>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
            <Portal>
              <Modal
                style={{ backgroundColor: "transparent" }}
                visible={this.state.visible}
                onDismiss={() => {
                  this.setState({ visible: false });
                }}>
                <Card elevation={5} style={{margin: 10}}>
                  <Card.Content>
                    <Text>Animal:</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Checkbox.Item
                        theme={{colors: {primary: darkGreen}}}
                        color={darkGreen}
                        label="Dog"
                        status={this.state.dogCheck ? "checked" : "unchecked"}
                        onPress={() => {
                          this.checkFunction("dogCheck");
                        }}
                      />
                      <Checkbox.Item
                        theme={{colors: {primary: darkGreen}}}
                        color={darkGreen}
                        label="Fish"
                        status={this.state.fishCheck ? "checked" : "unchecked"}
                        onPress={() => {
                          this.checkFunction("fishCheck");
                        }}
                      />
                      <Checkbox.Item
                        theme={{colors: {primary: darkGreen}}}
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
                        theme={{colors: {primary: darkGreen}}}
                        color={darkGreen}
                        label="Cat"
                        status={this.state.catCheck ? "checked" : "unchecked"}
                        onPress={() => {
                          this.checkFunction("catCheck");
                        }}
                      />
                      <Checkbox.Item
                        theme={{colors: {primary: darkGreen}}}
                        color={darkGreen}
                        label="Bird"
                        status={this.state.birdCheck ? "checked" : "unchecked"}
                        onPress={() => {
                          this.checkFunction("birdCheck");
                        }}
                      />
                      <Checkbox.Item
                        theme={{colors: {primary: darkGreen}}}
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
                        theme={{colors: {primary: darkGreen}}}
                        color={darkGreen}
                        label="Rabbit"
                        status={this.state.rabbitCheck ? "checked" : "unchecked"}
                        onPress={() => {
                          this.checkFunction("rabbitCheck");
                        }}
                      />
                      <Checkbox.Item
                        theme={{colors: {primary: darkGreen}}}
                        color={darkGreen}
                        label="Horse"
                        status={this.state.horseCheck ? "checked" : "unchecked"}
                        onPress={() => {
                          this.checkFunction("horseCheck");
                        }}
                      />
                      <Checkbox.Item
                        theme={{colors: {primary: darkGreen}}}
                        color={darkGreen}
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
                numColumns = {1}
                key={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  petBuyCard(item, this.props.navigation)
                )}
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
                      data={category.breeds}
                      columnWrapperStyle={{ justifyContent: "flex-start" }}
                      numColumns={2}
                      key={2}
                      renderItem={({ item }) => (
                        petBuyBreed(item, category.category, this.props.navigation)
                      )}
                      keyExtractor={(item, index) => index.toString()}
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
                        numColumns = {1}
                        key={1}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                          petBuyCard(item, this.props.navigation)
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
            </ScrollView>
          </View>
      </Provider>
    );
  }
}
