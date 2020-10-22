import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  BackHandler
} from "react-native";
import {
  Avatar,
  Card,
  Button,
  Searchbar,
  ActivityIndicator,
  Modal,
  Chip,
  Provider,
  Portal,
  Checkbox,
} from "react-native-paper";
import { db } from "../../database/firebase";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import {onBuyTab} from "../../components/petTabComponents";
import globalStyles from "../../styleSheet/styleSheet";
import { darkGreen, green, lightGreen, lightGrey, orange, lightBlue } from "../../styleSheet/styleSheet";

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
    db.collection("pet_listings")
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
            name: seller_name,
            avatarPhoto: seller_photo,
            title: listingDoc.data().name,
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

  searchFunction = (searchText) => {
    this.setState({ searchText: searchText });

    let filteredData = this.state.data.filter(function (item) {
      return item.title.toLowerCase().includes(searchText.toLowerCase());
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
            {onBuyTab(this.props.navigation)}

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
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Card elevation={5} style={globalStyles.petCard}>
                    <Card.Cover source={ {uri: item.photo}}/>
                    <Card.Title
                      title={item.title}
                      subtitle={item.name}
                      left={(props) => (
                        <Avatar.Image
                          {...props}
                          size={40}
                          source={{uri: item.photo}}
                        />
                      )}
                    />
                    <Card.Content>
                      <Text style={globalStyles.petCardContentText}>
                        Age: {item.age}
                      </Text>
                      <Text style={globalStyles.petCardContentText}>
                        Gender: {item.gender}
                      </Text>
                      <Text style={globalStyles.petCardContentText}>
                        Location: {item.location}
                      </Text>
                    </Card.Content>
                    <Card.Actions>
                      <Button color={darkGreen} onPress={() => {}}>
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
              />
            ) : (
              <View style={globalStyles.petContainer}>
                {this.state.searchText == "" ? (
                  <View style={globalStyles.petContainer}>
                    <View style={globalStyles.categories}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.replace("shepherdList")
                        }>
                        <View style={globalStyles.breedIconContainer}>
                          <Image
                            style={globalStyles.icon}
                            source={{
                              uri:
                                "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FGermanShepherd.jpg?alt=media&token=83976d43-8ecb-44d9-83cf-280d3eba290d",
                            }}
                          />
                          <Text style={globalStyles.iconText}>German Shepherd</Text>
                        </View>
                      </TouchableOpacity>
                      <View style={globalStyles.breedIconContainer}>
                        <TouchableOpacity>
                          <Image
                            style={globalStyles.icon}
                            source={{
                              uri:
                                "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FMaltese.jpg?alt=media&token=80dd5f30-f73b-4faf-8361-8f744bd7c97d",
                            }}
                          />
                          <Text style={globalStyles.iconText}>Maltese</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={globalStyles.categories}>
                      <TouchableOpacity>
                        <View style={globalStyles.breedIconContainer}>
                          <Image
                            style={globalStyles.icon}
                            source={{
                              uri:
                                "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FCavoodle.jpg?alt=media&token=b5e332b5-796b-4397-978a-746892b36645",
                            }}
                          />
                          <Text style={globalStyles.iconText}>Cavoodle</Text>
                        </View>
                      </TouchableOpacity>
                      <View style={globalStyles.breedIconContainer}>
                        <TouchableOpacity>
                          <Image
                            style={globalStyles.icon}
                            source={{
                              uri:
                                "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FSamoyed.jpg?alt=media&token=361103d9-2478-4577-a114-a4c5841eccd2",
                            }}
                          />
                          <Text style={globalStyles.iconText}>Samoyed</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={globalStyles.categories}>
                      <TouchableOpacity>
                        <View style={globalStyles.breedIconContainer}>
                          <Image
                            style={globalStyles.icon}
                            source={{
                              uri:
                                "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FGoldenRetriever.jpg?alt=media&token=520b3637-9b17-4d8b-93e3-747e0a46ee49",
                            }}
                          />
                          <Text style={globalStyles.iconText}>Golden Retriever</Text>
                        </View>
                      </TouchableOpacity>
                      <View style={globalStyles.breedIconContainer}>
                        <TouchableOpacity>
                          <Image
                            style={globalStyles.icon}
                            source={{
                              uri:
                                "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FPomeranian.jpg?alt=media&token=7ff9a11a-11f8-49f1-aa56-5da7ed2b0082",
                            }}
                          />
                          <Text style={globalStyles.iconText}>Pomeranian</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={globalStyles.categories}>
                      <TouchableOpacity>
                        <View style={globalStyles.breedIconContainer}>
                          <Image
                            style={globalStyles.icon}
                            source={{
                              uri:
                                "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FRottweiler.jpg?alt=media&token=d3d468ff-08d2-40e3-b13d-6e6a1e0a85e1",
                            }}
                          />
                          <Text style={globalStyles.iconText}>Rottweiler</Text>
                        </View>
                      </TouchableOpacity>
                      <View style={globalStyles.breedIconContainer}>
                        <TouchableOpacity>
                            <Image
                              style={globalStyles.icon}
                              source={{
                                uri:
                                  "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FCorgi.jpg?alt=media&token=e189582b-f588-4067-8a75-ce2daf84eae1",
                              }}
                            />
                            <Text style={globalStyles.iconText}>Corgi</Text>
                        </TouchableOpacity>
                      </View>
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
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                          <Card elevation={5} style={globalStyles.petCard}>
                            <Card.Cover source={{uri: item.photo}} />
                            <Card.Title
                              title={item.title}
                              subtitle={item.name}
                              left={(props) => (
                                <Avatar.Image
                                  {...props}
                                  size={40}
                                  source={{uri: item.photo}}
                                />
                              )}
                            />
                            <Card.Content>
                              <Text style={globalStyles.petCardContentText}>
                                Age: {item.age}
                              </Text>
                              <Text style={globalStyles.petCardContentText}>
                                Gender: {item.gender}
                              </Text>
                              <Text style={globalStyles.petCardContentText}>
                                Location: {item.location}
                              </Text>
                            </Card.Content>
                            <Card.Actions>
                              <Button color={darkGreen} onPress={() => {}}>
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
            )}
            </ScrollView>
          </View>
      </Provider>
    );
  }
}
