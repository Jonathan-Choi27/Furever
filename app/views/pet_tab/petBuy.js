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
import { Avatar, Card, Button, Searchbar,   ActivityIndicator,  Modal, Chip,  Provider, Portal, } from "react-native-paper";
import { db } from "../database/firebase";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { AppLoading } from "expo";

let customFonts = {
  Roboto_400Regular,
  Roboto_700Bold,
};

export default class petBuy extends React.Component {
    state = {
    data: [],
    isLoading: true,
    filteredData: [],
    searchText: "",
    visible: false,
    fontsLoaded: false,
    filterCheck: [],
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

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
        //   console.log(seller_name);
          dataArray.push({
            title: listingDoc.data().name,
            name: seller_name,
            category: listingDoc.data().category,
            photo: listingDoc.data().photo_link,
            age: listingDoc.data().age,
            location: listingDoc.data().location,
            gender: listingDoc.data().gender,
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

  filterFunction = (input) => {
    this.state.filterCheck;
    if (this.state.filterCheck.includes(input)) {
      //delete it from filterCheck
    } else {
      this.state.filterCheck.push({input});
    }
    console.log(this.state.filterCheck.toString());
  }

    render() {
      const { search } = this.state;
      if (this.state.isLoading) {
        return (
          <View style={styles.activityContainer}>
            <ActivityIndicator size="large" color="#447ECB" />
          </View>
        );
      }
      // if (this.state.fontsLoaded) {
      return (
        <Provider>
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
                onPress={() => this.props.navigation.replace("petBuy")}
              >
                <Text style={{ fontFamily: " Roboto_400Regular" }}>Buy</Text>
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
                <Text
                  style={{ textAlign: "center", fontFamily: "Roboto_400Regular" }}
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
                flexDirection: "row",
              }}
            >
              <Searchbar
                style={{
                  margin: 10,
                  height: 50,
                  width: 250,
                }}
                placeholder="Search"
                onChangeText={this.searchFunction}
                value={this.state.searchText}
              />
              <Button
                labelStyle={{ fontFamily: "Roboto_400Regular" }}
                color="#447ECB"
                onPress={() => {
                  this.setState({ visible: true });
                }}
                mode="contained"
              >Filter</Button>
            </View>
            <View style={{ height: 50, padding: 10 }}>
              <TouchableOpacity style={styles.viewApplication}
                                onPress={() => this.props.navigation.replace("petBuy7")}
                                >
                <Text style={{ textAlign: "center", color: "white" }}>
                  View Applications
                </Text>
              </TouchableOpacity>
              
            </View>
            <Portal>

            <Modal
                style={{ backgroundColor: "transparent",}}
                visible={this.state.visible}
                onDismiss={() => {
                  this.setState({ visible: false });
                }}
              >
                <Card elevation={5} style={{ margin: 10 }}>
                  <Card.Content>
                    <Text>Animal:</Text>
                    <View style={{flexDirection: 'row' }}>
                      <Chip icon="information" onPress={() => this.filterFunction('Dog')}>Dog</Chip>
                      <Chip icon="information" onPress={() => this.filterFunction('Fish')}>Fish</Chip>
                      <Chip icon="information" onPress={() => this.filterFunction('Lizard')}>Lizard</Chip>
                    </View>
                    <View style={{flexDirection: 'row' }}>
                      <Chip icon="information" onPress={() => this.filterFunction('Cat')}>Cat</Chip>
                      <Chip icon="information" onPress={() => this.filterFunction('Bird')}>Bird</Chip>
                      <Chip icon="information" onPress={() => this.filterFunction('Turtle')}>Turtle</Chip>
                    </View>
                    <View style={{flexDirection: 'row' }}>
                      <Chip icon="information" onPress={() => this.filterFunction('Rabbit')}>Rabbit</Chip>
                      <Chip icon="information" onPress={() => this.filterFunction('Horse')}>Horse</Chip>
                      <Chip icon="information" onPress={() => this.filterFunction('Pig')}>Pig</Chip>
                    </View>
                    <Text>Colour:</Text>
                    <View style={{flexDirection: 'row' }}>
                      <Chip icon="information" onPress={() => this.filterFunction('Dog')}>Dog</Chip>
                      <Chip icon="information" onPress={() => this.filterFunction('Dog')}>Fish</Chip>
                      <Chip icon="information" onPress={() => this.filterFunction('Dog')}>Lizard</Chip>
                    </View>
                    <View style={{flexDirection: 'row' }}>
                      <Chip icon="information" onPress={() => this.filterFunction('Dog')}>Cat</Chip>
                      <Chip icon="information" onPress={() => this.filterFunction('Dog')}>Bird</Chip>
                      <Chip icon="information" onPress={() => this.filterFunction('Dog')}>Turtle</Chip>
                    </View>
                    <View style={{flexDirection: 'row' }}>
                      <Chip icon="information" onPress={() => this.filterFunction('Dog')}>Rabbit</Chip>
                      <Chip icon="information" onPress={() => this.filterFunction('Dog')}>Horse</Chip>
                      <Chip icon="information" onPress={() => this.filterFunction('Dog')}>Pig</Chip>
                    </View>
                    <Text>Location:</Text>
                    <View style={{flexDirection: 'row' }}>
                      <Chip icon="information" onPress={() => this.filterFunction('Dog')}>Dog</Chip>
                      <Chip icon="information" onPress={() => this.filterFunction('Dog')}>Fish</Chip>
                      <Chip icon="information" onPress={() => this.filterFunction('Dog')}>Lizard</Chip>
                    </View>
                    <View style={{flexDirection: 'row' }}>
                      <Chip icon="information" onPress={() => this.filterFunction('Dog')}>Cat</Chip>
                      <Chip icon="information" onPress={() => this.filterFunction('Dog')}>Bird</Chip>
                      <Chip icon="information" onPress={() => this.filterFunction('Dog')}>Turtle</Chip>
                    </View>
                    <View style={{flexDirection: 'row' }}>
                      <Chip icon="information" onPress={() => this.filterFunction('Dog')}>Rabbit</Chip>
                      <Chip icon="information" onPress={() => this.filterFunction('Dog')}>Horse</Chip>
                      <Chip icon="information" onPress={() => this.filterFunction('Dog')}>Pig</Chip>
                    </View>
                  </Card.Content>
                </Card>
              </Modal>
              </Portal>

            {this.state.searchText == "" ? (
              <View style={styles.container}>
                <View style={styles.categories}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.replace("petBuy1Dog")}
                  >
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
