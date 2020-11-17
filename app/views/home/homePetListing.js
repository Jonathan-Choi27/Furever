import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView,
  BackHandler,
} from "react-native";
import firebase from "firebase";
import { auth } from "../database/firebase";
import {
  Button,
  Searchbar,
  Modal,
  Provider,
  Portal,
  Checkbox,
  Banner,
  Card,
} from "react-native-paper";
import {
  primaryColour1,
  primaryColour2,
  lightGrey,
  lightBlue,
} from "../styleSheet/styleSheet";
import globalStyles from "../styleSheet/styleSheet";
import { homeListingCard } from "../components/homePetListingComponents"

const db = firebase.firestore();

export default class HomePetListing extends React.Component {
  state = {
    data: [],
    limit: 12,
    lastVisible: null,
    loading: false,
    refreshing: false,
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
    bannerVisible: true,
    checkNewUser: false,
    whiteColour: false,
    goldColour: false,
    greenColour: false,
    blackColour: false,
    rainbowColour: false,
    greyColour: false,
    brownColour: false,
    redColour: false,
    orangeColour: false,
    nswCheck: false,
    vicCheck: false,
    qldCheck: false,
    waCheck: false,
    saCheck: false,
    tasCheck: false,
    actCheck: false,
    ntCheck: false,
  };

  async initialFetchData() {
    // this.setState({
    //   loading: true,
    // });

    const dataArray = [];

    let initialQuery = await db
      .collection("petListings")
      .orderBy("timestamp")
      //   .endAt(this.state.lastVisible)
      .limit(this.state.limit);

    let documentSnapshots = await initialQuery.get();

    let documentData = documentSnapshots.docs.map((listingDoc) => {
      //   console.log(listingDoc.id);
      dataArray.push({
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
        documentName: listingDoc.data().documentsLink,
        documentUri: listingDoc.data().documents_uri,
        uuid: listingDoc.data().uuid,
        doc_id: listingDoc.id
      });

      this.setState({
        lastVisible: listingDoc.data().timestamp,
      });
    });

    this.setState({
      isLoading: false,
      data: [...dataArray],
    });

    const user = auth.currentUser;
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((user_doc) => {
        this.setState({
          checkNewUser: user_doc.data().isNewUser,
        });
      });
  }

  async fetchMore() {
    // this.setState({
    //     loading: true,
    //   });

    const dataArray = [];

    let initialQuery = await db
      .collection("petListings")
      .orderBy("timestamp")
      .startAfter(this.state.lastVisible)
      .limit(this.state.limit);

    let documentSnapshots = await initialQuery.get();

    let documentData = documentSnapshots.docs.map((listingDoc) => {
      dataArray.push({
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
        documentName: listingDoc.data().documents,
        documentUri: listingDoc.data().documents_uri,
        uuid: listingDoc.data().uuid,
      });

      this.setState({
        lastVisible: listingDoc.data().timestamp,
      });
    });

    this.setState({
      // isLoading: false,
      data: this.state.data.concat(dataArray),
    });
  }

  async componentDidMount() {
    this.initialFetchData();

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
    // do nothing
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

      // Colour
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

      //Location
      case "nswCheck":
        this.setState({ nswCheck: !this.state.nswCheck });
        break;
      case "vicCheck":
        this.setState({ vicCheck: !this.state.vicCheck });
        break;
      case "qldCheck":
        this.setState({ qldCheck: !this.state.qldCheck });
        break;
      case "waCheck":
        this.setState({ waCheck: !this.state.waCheck });
        break;
      case "saCheck":
        this.setState({ saCheck: !this.state.saCheck });
        break;
      case "ntCheck":
        this.setState({ ntCheck: !this.state.ntCheck });
        break;
      default:
    }
  };

  displayFunction = () => {
    // let listData = this.state.data;
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

    //Colour
    if (listData.length == 0) {
      if (
        //Animal
        !this.state.dogCheck && !this.state.catCheck && !this.state.birdCheck &&
        !this.state.rabbitCheck && !this.state.fishCheck && !this.state.horseCheck &&
        !this.state.lizardCheck && !this.state.turtleCheck && !this.state.pigCheck) {
        // console.log(!this.state.dogCheck + " " + !this.state.catCheck);
        listData = this.state.data;
      }
    }
    var addOn = false;
    if (this.state.whiteColour) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.colour.toLowerCase().includes("white");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.colour.toLowerCase().includes("white");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.goldColour) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.colour.toLowerCase().includes("gold");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.colour.toLowerCase().includes("gold");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.greenColour) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.colour.toLowerCase().includes("primaryColour2");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.colour.toLowerCase().includes("primaryColour2");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.blackColour) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.colour.toLowerCase().includes("black");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.colour.toLowerCase().includes("black");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.rainbowColour) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.colour.toLowerCase().includes("rainbow");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.colour.toLowerCase().includes("rainbow");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.greyColour) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.colour.toLowerCase().includes("grey");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.colour.toLowerCase().includes("grey");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.brownColour) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.colour.toLowerCase().includes("brown");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.colour.toLowerCase().includes("brown");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.redColour) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.colour.toLowerCase().includes("red");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.colour.toLowerCase().includes("red");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.orangeColour) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.colour.toLowerCase().includes("orange");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.colour.toLowerCase().includes("orange");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }

    //Location
    // if (listData.length == 0) {
    //   listData = this.state.data;
    // }
    if (this.state.nswCheck) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.location.toLowerCase().includes("nsw");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.location.toLowerCase().includes("nsw");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.vicCheck) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.location.toLowerCase().includes("vic");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.location.toLowerCase().includes("vic");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.qldCheck) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.location.toLowerCase().includes("qld");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.location.toLowerCase().includes("qld");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.waCheck) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.location.toLowerCase().includes("wa");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.location.toLowerCase().includes("wa");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.saCheck) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.location.toLowerCase().includes("sa");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.location.toLowerCase().includes("sa");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.tasCheck) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.location.toLowerCase().includes("tas");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.location.toLowerCase().includes("tas");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.actCheck) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.location.toLowerCase().includes("act");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.location.toLowerCase().includes("act");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }
    if (this.state.ntCheck) {
      this.setState({ filterDisplay: true });
      if (addOn) {
        let filteredData = this.state.data.filter(function (item) {
          return item.location.toLowerCase().includes("nt");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = listData.concat(filteredData);
        }
      } else {
        let filteredData = listData.filter(function (item) {
          return item.location.toLowerCase().includes("nt");
        });
        if (filteredData.length > 0) {
          addOn = true;
          listData = filteredData;
        }
      }
    }

    if (
      //Animal
      !this.state.dogCheck && !this.state.catCheck && !this.state.birdCheck &&
      !this.state.rabbitCheck && !this.state.fishCheck && !this.state.horseCheck &&
      !this.state.lizardCheck && !this.state.turtleCheck && !this.state.pigCheck &&

      //Colour
      !this.state.whiteColour && !this.state.goldColour && !this.state.greenColour &&
      !this.state.blackColour && !this.state.rainbowColour && !this.state.greyColour &&
      !this.state.brownColour && !this.state.redColour && !this.state.orangeColour &&

      //Location
      !this.state.nswCheck && !this.state.vicCheck && !this.state.qldCheck &&
      !this.state.waCheck && !this.state.saCheck && !this.state.tasCheck &&
      !this.state.actCheck && !this.state.ntCheck
    ) {
      this.setState({ filterDisplay: false });
    }

    this.setState({ filteredData: listData });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activityContainer}>
          <ActivityIndicator size="large" color={primaryColour2} />
        </View>
      );
    }

    let newNotice;
    if (this.state.checkNewUser) {
      const user = auth.currentUser;
      newNotice = (
        <Banner
          style={{ color: primaryColour1 }}
          visible={this.state.bannerVisible}
          actions={[
            {
              label: "Close",
              onPress: () => this.setState({ bannerVisible: false }),
            },
          ]}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Welcome to Furever, we hope you have a wonderful experience! - The
            Furever Team
          </Text>
        </Banner>
      );
      db.collection("users").doc(user.uid).update({
        isNewUser: false,
      });
    }
    return (
      <Provider>
        {newNotice}
        <View style={styles.container}>
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
              }}>
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
                  <ScrollView style={{ height: 450 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-start" }}>
                      {/* First filter column */}
                      <View style={{ flex: 1, flexDirection: 'column', justifyContent: "flex-start" }}>
                        <Text>Animal:</Text>
                        <View style={{ flexDirection: "column" }}>
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="Dog"
                            status={this.state.dogCheck ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("dogCheck");
                            }}
                          />
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="Fish"
                            status={this.state.fishCheck ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("fishCheck");
                            }}
                          />
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="Lizard"
                            status={this.state.lizardCheck ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("lizardCheck");
                            }}
                          />
                        </View>
                        <Text>Colour:</Text>
                        <View style={{ flexDirection: "column" }}>
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="White"
                            status={this.state.whiteColour ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("whiteColour");
                            }}
                          />
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="Gold"
                            status={this.state.goldColour ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("goldColour");
                            }}
                          />
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="Green"
                            status={this.state.greenColour ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("greenColour");
                            }}
                          />
                        </View>
                        <Text>Location:</Text>
                        <View style={{ flexDirection: "column" }}>
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="NSW"
                            status={this.state.nswCheck ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("nswCheck");
                            }}
                          />
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="VIC"
                            status={this.state.vicCheck ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("vicCheck");
                            }}
                          />
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="QLD"
                            status={this.state.qldCheck ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("qldCheck");
                            }}
                          />
                        </View>
                      </View>

                      {/* Second filter column */}
                      <View style={{ flex: 1, flexDirection: 'column', justifyContent: "flex-start" }}>
                        <Text> </Text>
                        <View style={{ flexDirection: "column" }}>
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="Cat"
                            status={this.state.catCheck ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("catCheck");
                            }}
                          />
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="Bird"
                            status={this.state.birdCheck ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("birdCheck");
                            }}
                          />
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="Turtle"
                            status={this.state.turtleCheck ? "checked" : "unchecked"}
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
                            label="Black"
                            status={this.state.blackColour ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("blackColour");
                            }}
                          />
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="Rainbow"
                            status={this.state.rainbowColour ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("rainbowColour");
                            }}
                          />
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="Grey"
                            status={this.state.greyColour ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("greyColour");
                            }}
                          />
                        </View>
                        <Text> </Text>
                        <View style={{ flexDirection: "column" }}>
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="WA"
                            status={this.state.waCheck ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("waCheck");
                            }}
                          />
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="SA"
                            status={this.state.saCheck ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("saCheck");
                            }}
                          />
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="TAS"
                            status={this.state.tasCheck ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("tasCheck");
                            }}
                          />
                        </View>
                      </View>
                      {/* Third filter column */}
                      <View style={{ flex: 1, flexDirection: 'column', justifyContent: "flex-start" }}>
                        <Text> </Text>
                        <View style={{ flexDirection: "column" }}>
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="Rabbit"
                            status={this.state.rabbitCheck ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("rabbitCheck");
                            }}
                          />
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="Horse"
                            status={this.state.horseCheck ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("horseCheck");
                            }}
                          />
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="Pig"
                            status={this.state.pigCheck ? "checked" : "unchecked"}
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
                            label="Brown"
                            status={this.state.brownColour ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("brownColour");
                            }}
                          />
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="Red"
                            status={this.state.redColour ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("redColour");
                            }}
                          />
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="Orange"
                            status={this.state.orangeColour ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("orangeColour");
                            }}
                          />
                        </View>
                        <Text> </Text>
                        <View style={{ flexDirection: "column" }}>
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="ACT"
                            status={this.state.actCheck ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("actCheck");
                            }}
                          />
                          <Checkbox.Item
                            style={{ justifyContent: "flex-end" }}
                            theme={{ colors: { primary: primaryColour1 } }}
                            color={primaryColour1}
                            label="NT"
                            status={this.state.ntCheck ? "checked" : "unchecked"}
                            onPress={() => {
                              this.checkFunction("ntCheck");
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
                    }}>
                    Done
                  </Button>
                </Card.Actions>
              </Card>
            </Modal>
          </Portal>
          {this.state.filterDisplay ? (
            <View style={styles.container}>
              {this.state.filteredData.length == 0 ? (
                <View style={styles.container}>
                  <Text style={{ margin: 100 }}>No results found.</Text>
                </View>
              ) : (
                  <FlatList
                    data={this.state.data}
                    columnWrapperStyle={{ justifyContent: "flex-start" }}
                    numColumns={3}
                    onRefresh={async () => {
                      this.setState({
                        pullToRefresh: true,
                      });
                      await this.initialFetchData();
                      this.setState({
                        pullToRefresh: false,
                      });
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={this.state.pullToRefresh}
                    renderItem={({ item }) => (homeListingCard(item, this.props.navigation))}
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
              <View style={styles.container}>
                {this.state.searchText == "" ? (
                  <View style={styles.container}>
                    <FlatList
                      data={this.state.data}
                      columnWrapperStyle={{ justifyContent: "flex-start" }}
                      numColumns={3}
                      onRefresh={async () => {
                        this.setState({
                          pullToRefresh: true,
                        });
                        await this.initialFetchData();
                        this.setState({
                          pullToRefresh: false,
                        });
                      }}
                      keyExtractor={(item, index) => index.toString()}
                      refreshing={this.state.pullToRefresh}
                      renderItem={({ item }) => (homeListingCard(item, this.props.navigation))}
                      onEndReached={() => this.fetchMore()}
                      onEndReachedThreshold={0.5}
                    />
                    {/* <Button onPress={() => this.fetchMore()}> test </Button> */}
                  </View>
                ) : (
                    <View style={styles.container}>
                      {this.state.filteredData.length == 0 ? (
                        //No results found from search
                        <View style={globalStyles.petContainer}>
                          <Text style={{ margin: 100 }}>No results found.</Text>
                        </View>
                      ) : (


                          <FlatList
                            data={this.state.data}
                            columnWrapperStyle={{ justifyContent: "space-between" }}
                            numColumns={3}
                            onRefresh={async () => {
                              this.setState({
                                pullToRefresh: true,
                              });
                              await this.initialFetchData();
                              this.setState({
                                pullToRefresh: false,
                              });
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            refreshing={this.state.pullToRefresh}
                            renderItem={({ item }) => (homeListingCard(item, this.props.navigation))}
                            keyExtractor={(item, index) => index.toString()}
                            data={
                              this.state.filteredData && this.state.filteredData.length > 0
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
    backgroundColor: "#F7F8FA",
  },
  activityContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
