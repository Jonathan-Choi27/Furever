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
      return item.title.includes(searchText);
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

  render() {
    const { search } = this.state;
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
            {onBuyTab(this.props.navigation)}

            <View
              style={{
                  height: 20,
                  margin:30,
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
            <View style={{ height: 30, marginBottom: 15, }}>
              <TouchableOpacity
                style={styles.viewApplication}
                onPress={() => this.props.navigation.replace("currentApplications")}>
                <Text style={{ textAlign: "center", color: "white" }}>
                  View Applications
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView>

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
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Card elevation={5} style={styles.card}>
                    <Card.Cover source={{ uri: item.photo }} />
                    <Card.Title
                      title={item.title}
                      subtitle={item.name}
                      left={(props) => (
                        <Avatar.Image
                          {...props}
                          size={40}
                          source={{ uri:item.avatarPhoto}}
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
                  this.state.filteredData && this.state.filteredData.length > 0
                    ? this.state.filteredData
                    : this.state.data
                }
              />
            ) : (
              <View style={styles.container}>
                {this.state.searchText == "" ? (
                  <View style={styles.container}>
                    <View style={styles.categories}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.replace("petBreeds")
                        }>
                        <View style={styles.iconContainer}>
                          <Image
                            style={styles.icon}
                            source={{
                              uri:
                                "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FdogIcon.jpg?alt=media&token=93b3d467-e37f-4c41-b0a2-e6540755a2e4",
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                      <View style={styles.iconContainer}>
                        <TouchableOpacity>
                          <Image
                            style={styles.icon}
                            source={{
                              uri:
                                "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FCatIcon.jpg?alt=media&token=d3988923-a7a4-465b-b0f3-68cf5aba56aa",
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={styles.categories}>
                      <TouchableOpacity>
                        <View style={styles.iconContainer}>
                          <Image
                            style={styles.icon}
                            source={{
                              uri:
                                "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FRabbitIcon.jpg?alt=media&token=4bf665e6-64de-46c3-8f32-35bf335f0ee7",
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                      <View style={styles.iconContainer}>
                        <TouchableOpacity>
                          <Image
                            style={styles.icon}
                            source={{
                              uri:
                                "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FFishIcon.jpg?alt=media&token=bddda5c1-6e1f-41e2-9f74-b9deed452fff",
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={styles.categories}>
                      <TouchableOpacity>
                        <View style={styles.iconContainer}>
                          <Image
                            style={styles.icon}
                            source={{
                              uri:
                                "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FBirdIcon.jpg?alt=media&token=f1dce94e-9ad6-40ee-947b-6013ec62c23a",
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                      <View style={styles.iconContainer}>
                        <TouchableOpacity>
                          <Image
                            style={styles.icon}
                            source={{
                              uri:
                                "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FHorseIcon.jpg?alt=media&token=387260b4-09ba-42f7-abdd-d9481454ec06",
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={styles.categories}>
                      <TouchableOpacity>
                        <View style={styles.iconContainer}>
                          <Image
                            style={styles.icon}
                            source={{
                              uri:
                                "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FLizardIcon.jpg?alt=media&token=6da22d0c-a534-4c41-b99f-4d507481b41c",
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                      <View style={styles.iconContainer}>
                        <TouchableOpacity>
                          <Image
                            style={styles.icon}
                            source={{
                              uri:
                                "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FTurtleIcon.jpg?alt=media&token=2e0b1354-5f26-47e1-bf50-b6b5956f402c",
                            }}
                          />
                        </TouchableOpacity>
                      </View>
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
                            <Card.Cover source={{ uri: item.photo }} />
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
            )}
            </ScrollView>

          </View>
      </Provider>
    );
    // } else {
    //   return <AppLoading />;
    // }
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
  },
  cardContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  card: {
    margin: 10,
    flex: 0.5,
    marginLeft: 9,
    marginRight: 9,
  },
  image: {
    aspectRatio: 1,
  },
  title: {
    marginLeft: 8,
    marginTop: 8,
    marginBottom: 8,
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

  iconContainer: {
    padding: 20,
  },
  icon: {
    height: 150,
    width: 150,
    borderRadius: 10,
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
  activityContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
