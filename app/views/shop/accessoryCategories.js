import React from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  YellowBox,
  BackHandler,
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
import { db } from "../database/firebase";
import {
  accessoryListingCard,
  accessoryCategory,
  getItemList,
} from "../components/shopComponents";
import { cartTab } from "../components/shopTabComponent";
import globalStyles, { primaryColour1, primaryColour2 } from "../styleSheet/styleSheet";

// Ignore virtualized lists warning, fix is out of scope
YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

const accessoryInformation = require("./accessoryInformation.json");

export default class accessoryCateogries extends React.Component {
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
    accessoryTypes: [],
    petCategories: [],
    type1Check: false,
    type2Check: false,
    type3Check: false,
    type4Check: false,
    type5Check: false,
    type6Check: false,
    type7Check: false,
    type8Check: false,
    price1Check: false,
    price2Check: false,
    price3Check: false,
    price4Check: false,
    price5Check: false,
    price6Check: false,
    filterDisplay: false,
  };

  //Fetch Data
  async fetchData() {
    const dataArray = [];
    const petCategoryArray = [];

    db.collection("accessories")
      .get()
      .then((doc) => {
        doc.forEach((listingDoc) => {
          dataArray.push({
            accessoryName: listingDoc.data().name,
            category: listingDoc.data().category,
            type: listingDoc.data().type,
            price: listingDoc.data().price,
            photo: listingDoc.data().photoLink,
            docIdd: listingDoc.id,
          });
          this.setState({
            isLoading: false,
            data: [...dataArray],
          });
        });
      });
  }

  //Handle back button
  async componentDidMount() {
    this.fetchData();
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
  };

  searchFunction = (searchText) => {
    this.setState({ searchText: searchText });

    let filteredData = this.state.data.filter(function (item) {
      return item.accessoryName
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });

    this.setState({ filteredData: filteredData });
  };

  //Check Functionality
  checkFunction = (input) => {
    switch (input) {
      //Animal
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

      //Type
      case "type1Check":
        this.setState({ type1Check: !this.state.type1Check });
        break;
      case "type2Check":
        this.setState({ type2Check: !this.state.type2Check });
        break;
      case "type3Check":
        this.setState({ type3Check: !this.state.type3Check });
        break;
      case "type4Check":
        this.setState({ type4Check: !this.state.type4Check });
        break;
      case "type5Check":
        this.setState({ type5Check: !this.state.type5Check });
        break;
      case "type6Check":
        this.setState({ type6Check: !this.state.type6Check });
        break;
      case "type7Check":
        this.setState({ type7Check: !this.state.type7Check });
        break;
      case "type8Check":
        this.setState({ type8Check: !this.state.type8Check });
        break;

      //Price
      case "price1Check":
        this.setState({ price1Check: !this.state.price1Check });
        break;
      case "price2Check":
        this.setState({ price2Check: !this.state.price2Check });
        break;
      case "price3Check":
        this.setState({ price3Check: !this.state.price3Check });
        break;
      case "price4Check":
        this.setState({ price4Check: !this.state.price4Check });
        break;
      case "price5Check":
        this.setState({ price5Check: !this.state.price5Check });
        break;
      case "price6Check":
        this.setState({ price6Check: !this.state.price6Check });
        break;

      default:
    }
  };

  displayFunction = () => {
    let listData = [];

    //Animal
    if (this.state.dogCheck) {
      this.setState({ filterDisplay: true });
      let filteredData = this.state.data.filter(function (item) {
        return item.category.toLowerCase().includes("dog");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.catCheck) {
      this.setState({ filterDisplay: true });
      let filteredData = this.state.data.filter(function (item) {
        return item.category.toLowerCase().includes("cat");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.rabbitCheck) {
      this.setState({ filterDisplay: true });
      let filteredData = listData.filter(function (item) {
        return item.category.toLowerCase().includes("rabbit");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.fishCheck) {
      this.setState({ filterDisplay: true });
      let filteredData = listData.filter(function (item) {
        return item.category.toLowerCase().includes("fish");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.birdCheck) {
      this.setState({ filterDisplay: true });
      let filteredData = listData.filter(function (item) {
        return item.category.toLowerCase().includes("bird");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.horseCheck) {
      this.setState({ filterDisplay: true });
      let filteredData = listData.filter(function (item) {
        return item.category.toLowerCase().includes("horse");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.lizardCheck) {
      this.setState({ filterDisplay: true });
      let filteredData = listData.filter(function (item) {
        return item.category.toLowerCase().includes("lizard");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.turtleCheck) {
      this.setState({ filterDisplay: true });
      let filteredData = listData.filter(function (item) {
        return item.category.toLowerCase().includes("turtle");
      });
      listData = listData.concat(filteredData);
    }
    if (this.state.pigCheck) {
      this.setState({ filterDisplay: true });
      let filteredData = listData.filter(function (item) {
        return item.category.toLowerCase().includes("pig");
      });
      listData = listData.concat(filteredData);
    }

    //Type
    if (listData.length == 0) {
      if (
        //Animal
        !this.state.dogCheck &&
        !this.state.catCheck &&
        !this.state.birdCheck &&
        !this.state.rabbitCheck &&
        !this.state.fishCheck &&
        !this.state.horseCheck &&
        !this.state.lizardCheck &&
        !this.state.turtleCheck &&
        !this.state.pigCheck
      ) {
        listData = this.state.data;
      }
    }
    var addOn = false;
    if (this.state.type1Check) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.type.toLowerCase().includes("food");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.type.toLowerCase().includes("food");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.type2Check) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.type.toLowerCase().includes("toy");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.type.toLowerCase().includes("toy");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.type3Check) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.type.toLowerCase().includes("apparel");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.type.toLowerCase().includes("apparel");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.type4Check) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.type.toLowerCase().includes("wash");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.type.toLowerCase().includes("wash");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.type5Check) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.type.toLowerCase().includes("bed");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.type.toLowerCase().includes("bed");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.type6Check) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.type.toLowerCase().includes("bowl");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.type.toLowerCase().includes("bowl");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.type7Check) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.type.toLowerCase().includes("home");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.type.toLowerCase().includes("home");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.type8Check) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.cotypelour.toLowerCase().includes("medicine");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.type.toLowerCase().includes("medicine");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }

    //Price
    if (this.state.price1Check) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          if (item.price < 10) {
            return item;
          }
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          if (item.price < 10) {
            return item;
          }
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        } else {
          listData = [];
        }
      }
    }
    if (this.state.price2Check) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          if (item.price < 50) {
            return item;
          }
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          if (item.price < 50) {
            return item;
          }
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        } else {
          listData = [];
        }
      }
    }
    if (this.state.price3Check) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          if (item.price < 100) {
            return item;
          }
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          if (item.price < 100) {
            return item;
          }
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.price4Check) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          if (item.price < 500) {
            return item;
          }
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          if (item.price < 500) {
            return item;
          }
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.price5Check) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          if (item.price < 1000) {
            return item;
          }
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          if (item.price < 1000) {
            return item;
          }
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.price2Check) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          if (item.price > 1000) {
            return item;
          }
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          if (item.price > 1000) {
            return item;
          }
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }

    if (
      //If nothing is checked, don't display filter
      //Animal
      !this.state.dogCheck &&
      !this.state.catCheck &&
      !this.state.birdCheck &&
      !this.state.rabbitCheck &&
      !this.state.fishCheck &&
      !this.state.horseCheck &&
      !this.state.lizardCheck &&
      !this.state.turtleCheck &&
      !this.state.pigCheck &&
      //Type
      !this.state.type1Check &&
      !this.state.type2Check &&
      !this.state.type3Check &&
      !this.state.type4Check &&
      !this.state.type5Check &&
      !this.state.type6Check &&
      !this.state.type7Check &&
      !this.state.type8Check &&
      //Price
      !this.state.price1Check &&
      !this.state.price2Check &&
      !this.state.price3Check &&
      !this.state.price4Check &&
      !this.state.price5Check &&
      !this.state.price6Check
    ) {
      this.setState({ filterDisplay: false });
    }

    this.setState({ filteredData: listData });
  };

  render() {
    const { search } = this.state;
    const items = getItemList();
    const category = this.props.route.params.category;
    if (this.state.isLoading) {
      return (
        <View style={globalStyles.activityContainer}>
          <ActivityIndicator size="large" color={primaryColour2} />
        </View>
      );
    }
    return (
      <Provider>
        <View style={globalStyles.petContainer}>
          <View style={globalStyles.searchFilterContainer}>
            <Searchbar
              style={globalStyles.searchBar}
              placeholder="Search"
              onChangeText={this.searchFunction}
              value={this.state.searchText}
            />
            <Button
              color={primaryColour2}
              onPress={() => {
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
                }}
              >
                <Card elevation={5} style={{ margin: 10 }}>
                  <Card.Content>
                    <ScrollView style={{ height: 450 }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        {/* First filter column */}
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "flex-start",
                          }}
                        >
                          <Text>Animal:</Text>
                          <View style={{ flexDirection: "column" }}>
                            <Checkbox.Item
                              style={{ justifyContent: "flex-end" }}
                              theme={{ colors: { primary: primaryColour1 } }}
                              color={primaryColour1}
                              label="Dog"
                              status={
                                this.state.dogCheck ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                this.checkFunction("dogCheck");
                              }}
                            />
                            <Checkbox.Item
                              style={{ justifyContent: "flex-end" }}
                              theme={{ colors: { primary: primaryColour1 } }}
                              color={primaryColour1}
                              label="Fish"
                              status={
                                this.state.fishCheck ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                this.checkFunction("fishCheck");
                              }}
                            />
                            <Checkbox.Item
                              style={{ justifyContent: "flex-end" }}
                              theme={{ colors: { primary: primaryColour1 } }}
                              color={primaryColour1}
                              label="Lizard"
                              status={
                                this.state.lizardCheck ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                this.checkFunction("lizardCheck");
                              }}
                            />
                          </View>
                          <Text>Type:</Text>
                          <View style={{ flexDirection: "column" }}>
                            <Checkbox.Item
                              style={{ justifyContent: "flex-end" }}
                              theme={{ colors: { primary: primaryColour1 } }}
                              color={primaryColour1}
                              label="Food"
                              status={
                                this.state.type1Check ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                this.checkFunction("type1Check");
                              }}
                            />
                            <Checkbox.Item
                              style={{ justifyContent: "flex-end" }}
                              theme={{ colors: { primary: primaryColour1 } }}
                              color={primaryColour1}
                              label="Wash"
                              status={
                                this.state.type4Check ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                this.checkFunction("type4Check");
                              }}
                            />
                            <Checkbox.Item
                              style={{ justifyContent: "flex-end" }}
                              theme={{ colors: { primary: primaryColour1 } }}
                              color={primaryColour1}
                              label="Home"
                              status={
                                this.state.type7Check ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                this.checkFunction("type7Check");
                              }}
                            />
                          </View>
                          <Text>Price:</Text>
                          <View style={{ flexDirection: "column" }}>
                            <Checkbox.Item
                              style={{ justifyContent: "flex-end" }}
                              theme={{ colors: { primary: primaryColour1 } }}
                              color={primaryColour1}
                              label="<$10"
                              status={
                                this.state.price1Check ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                this.checkFunction("price1Check");
                              }}
                            />
                            <Checkbox.Item
                              style={{ justifyContent: "flex-end" }}
                              theme={{ colors: { primary: primaryColour1 } }}
                              color={primaryColour1}
                              label="<$500"
                              status={
                                this.state.price4Check ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                this.checkFunction("price4Check");
                              }}
                            />
                          </View>
                        </View>

                        {/* Second filter column */}
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "flex-start",
                          }}
                        >
                          <Text> </Text>
                          <View style={{ flexDirection: "column" }}>
                            <Checkbox.Item
                              style={{ justifyContent: "flex-end" }}
                              theme={{ colors: { primary: primaryColour1 } }}
                              color={primaryColour1}
                              label="Cat"
                              status={
                                this.state.catCheck ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                this.checkFunction("catCheck");
                              }}
                            />
                            <Checkbox.Item
                              style={{ justifyContent: "flex-end" }}
                              theme={{ colors: { primary: primaryColour1 } }}
                              color={primaryColour1}
                              label="Bird"
                              status={
                                this.state.birdCheck ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                this.checkFunction("birdCheck");
                              }}
                            />
                            <Checkbox.Item
                              style={{ justifyContent: "flex-end" }}
                              theme={{ colors: { primary: primaryColour1 } }}
                              color={primaryColour1}
                              label="Turtle"
                              status={
                                this.state.turtleCheck ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                this.checkFunction("turtleCheck");
                              }}
                            />
                          </View>
                          <Text> </Text>
                          <View style={{ flexDirection: "column" }}>
                            <Checkbox.Item
                              style={{ justifyContent: "flex-end" }}
                              theme={{ colors: { primary: primaryColour1 } }}
                              color={primaryColour1}
                              label="Toys"
                              status={
                                this.state.type2Check ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                this.checkFunction("type2Check");
                              }}
                            />
                            <Checkbox.Item
                              style={{ justifyContent: "flex-end" }}
                              theme={{ colors: { primary: primaryColour1 } }}
                              color={primaryColour1}
                              label="Bed"
                              status={
                                this.state.type5Check ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                this.checkFunction("type5Check");
                              }}
                            />
                            <Checkbox.Item
                              style={{ justifyContent: "flex-end" }}
                              theme={{ colors: { primary: primaryColour1 } }}
                              color={primaryColour1}
                              label="Medicine"
                              status={
                                this.state.type8Check ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                this.checkFunction("type8Check");
                              }}
                            />
                          </View>

                          <Text> </Text>
                          <View style={{ flexDirection: "column" }}>
                            <Checkbox.Item
                              style={{ justifyContent: "flex-end" }}
                              theme={{ colors: { primary: primaryColour1 } }}
                              color={primaryColour1}
                              label="<$50"
                              status={
                                this.state.price2Check ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                this.checkFunction("price2Check");
                              }}
                            />
                            <Checkbox.Item
                              style={{ justifyContent: "flex-end" }}
                              theme={{ colors: { primary: primaryColour1 } }}
                              color={primaryColour1}
                              label="<$1000"
                              status={
                                this.state.price5Check ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                this.checkFunction("price5Check");
                              }}
                            />
                          </View>
                        </View>

                        {/* Third filter column */}
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "column",
                            justifyContent: "flex-start",
                          }}
                        >
                          <Text> </Text>
                          <View style={{ flexDirection: "column" }}>
                            <Checkbox.Item
                              style={{ justifyContent: "flex-end" }}
                              theme={{ colors: { primary: primaryColour1 } }}
                              color={primaryColour1}
                              label="Rabbit"
                              status={
                                this.state.rabbitCheck ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                this.checkFunction("rabbitCheck");
                              }}
                            />
                            <Checkbox.Item
                              style={{ justifyContent: "flex-end" }}
                              theme={{ colors: { primary: primaryColour1 } }}
                              color={primaryColour1}
                              label="Horse"
                              status={
                                this.state.horseCheck ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                this.checkFunction("horseCheck");
                              }}
                            />
                            <Checkbox.Item
                              style={{ justifyContent: "flex-end" }}
                              theme={{ colors: { primary: primaryColour1 } }}
                              color={primaryColour1}
                              label="Pig"
                              status={
                                this.state.pigCheck ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                this.checkFunction("pigCheck");
                              }}
                            />
                          </View>
                          <Text> </Text>
                          <View style={{ flexDirection: "column" }}>
                            <Checkbox.Item
                              style={{ justifyContent: "flex-end" }}
                              theme={{ colors: { primary: primaryColour1 } }}
                              color={primaryColour1}
                              label="Apparel"
                              status={
                                this.state.type3Check ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                this.checkFunction("type3Check");
                              }}
                            />
                            <Checkbox.Item
                              style={{ justifyContent: "flex-end" }}
                              theme={{ colors: { primary: primaryColour1 } }}
                              color={primaryColour1}
                              label="Bowl"
                              status={
                                this.state.type6Check ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                this.checkFunction("type6Check");
                              }}
                            />
                          </View>
                          <Text style={{ height: 32.5 }}> </Text>
                          <Text> </Text>
                          <Text> </Text>
                          <View style={{ flexDirection: "column" }}>
                            <Checkbox.Item
                              style={{ justifyContent: "flex-end" }}
                              theme={{ colors: { primary: primaryColour1 } }}
                              color={primaryColour1}
                              label="<$100"
                              status={
                                this.state.price3Check ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                this.checkFunction("price3Check");
                              }}
                            />
                            <Checkbox.Item
                              style={{ justifyContent: "flex-end" }}
                              theme={{ colors: { primary: primaryColour1 } }}
                              color={primaryColour1}
                              label="$1000+"
                              status={
                                this.state.price6Check ? "checked" : "unchecked"
                              }
                              onPress={() => {
                                this.checkFunction("price6Check");
                              }}
                            />
                          </View>
                        </View>
                      </View>
                    </ScrollView>
                  </Card.Content>
                  <Card.Actions style={{ justifyContent: "flex-end" }}>
                    <Button
                      color={primaryColour1}
                      onPress={() => {
                        this.displayFunction();
                        this.setState({ visible: false });
                      }}
                    >
                      Done
                    </Button>
                  </Card.Actions>
                </Card>
              </Modal>
            </Portal>

            {this.state.filterDisplay ? (
              <View style={globalStyles.petContainer}>
                {this.state.filteredData.length == 0 ? (
                  //No filtered data
                  <View style={globalStyles.petContainer}>
                    <Text style={{ margin: 100 }}>No results found.</Text>
                  </View>
                ) : (
                  <FlatList
                    numColumns={2}
                    key={1}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) =>
                      accessoryListingCard(item, this.props.navigation)
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
            ) : (
              <View style={globalStyles.petContainer}>
                {this.state.searchText == "" ? (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginLeft: 15,
                        marginRight: 15,
                        paddingBottom: 10,
                        paddingTop: 3,
                      }}
                    >
                      <Text style={globalStyles.pageTitle}>
                        {category.category}
                      </Text>
                      {cartTab(this.props.navigation)}
                    </View>
                    <View style={globalStyles.petContainer}>
                      <FlatList
                        data={accessoryInformation}
                        columnWrapperStyle={{ justifyContent: "flex-start" }}
                        numColumns={2}
                        key={2}
                        renderItem={({ item }) =>
                          accessoryCategory(
                            item,
                            category,
                            this.props.navigation
                          )
                        }
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </View>
                  </View>
                ) : (
                  <View style={globalStyles.petContainer}>
                    {this.state.filteredData.length == 0 ? (
                      <View style={globalStyles.petContainer}>
                        <Text style={{ margin: 100 }}>No results found.</Text>
                      </View>
                    ) : (
                      <FlatList
                        numColumns={2}
                        key={1}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) =>
                          accessoryListingCard(item, this.props.navigation)
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
