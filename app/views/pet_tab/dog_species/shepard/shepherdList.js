import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  Avatar,
  ActivityIndicator,
  Card,
  Button,
  Searchbar,
  Portal,
  Modal,
  Provider,
  Paragraph,
} from "react-native-paper";
import { db } from "../../../database/firebase";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { AppLoading } from "expo";
import * as Font from "expo-font";

let customFonts = {
  Roboto_400Regular,
  Roboto_700Bold,
};
export default class shepherdList extends React.Component {
  state = {
    data: [],
    isLoading: true,
    filteredData: [],
    searchText: "",
    visible: false,
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  async componentDidMount() {
    this._loadFontsAsync();
    const dataArray = [];
    db.collection("pet_listings")
      .where("breed", "==", "German Shepherd")
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
            });
          console.log(seller_name);
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
            doc_id: listingDoc.id
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

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activityContainer}>
          <ActivityIndicator size="large" color="#447ECB" />
        </View>
      );
    }
    if (this.state.fontsLoaded) {
      return (
        <Provider>
          <View style={styles.container}>
            <View style={styles.buySellContainer}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#d7e5f7",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 50,
                }}
                onPress={() => this.props.navigation.replace("petBuy")}
              >
                <Text style={{ fontFamily: "Roboto_400Regular" }}>Buy</Text>
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
                  style={{
                    textAlign: "center",
                    fontFamily: "Roboto_400Regular",
                  }}
                >
                  {" "}
                  Sell{" "}
                </Text>
              </TouchableOpacity>
            </View>
            <Searchbar
              style={styles.searchBar}
              placeholder="Search"
              onChangeText={this.searchFunction}
              value={this.state.searchText}
            />
            <Portal>
              <Modal
                style={{ backgroundColor: "transparent" }}
                visible={this.state.visible}
                onDismiss={() => {
                  this.setState({ visible: false });
                }}
              >
                <Card elevation={5} style={{ margin: 10 }}>
                  <Card.Cover
                    resizeMode={`cover`}
                    source={{
                      uri:
                        "https://www.blackmores.com.au/-/media/paw/articles/talking-breeds-german-shepherds-main.jpg?db=web",
                    }}
                  />
                  <Card.Title
                    style={{ fontFamily: "Roboto_400Regular" }}
                    title="German Shepherd"
                  />
                  <Card.Content>
                    <Paragraph style={{ fontFamily: "Roboto_400Regular" }}>
                      The German shepherd dog is a herding breed known for its
                      courage, loyalty and guarding instincts. This breed makes
                      an excellent guard dog, police dog, military dog, guide
                      dog for the blind and search and rescue dog. For many
                      families, the German shepherd is also a treasured family
                      pet.
                    </Paragraph>
                  </Card.Content>
                  <Card.Actions style={{ justifyContent: "flex-end" }}>
                    <Button
                      color="#447ECB"
                      onPress={() =>
                        this.props.navigation.navigate("shepherdInfo")
                      }
                    >
                      More info
                    </Button>
                  </Card.Actions>
                </Card>
              </Modal>
            </Portal>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>German Shepherd</Text>
              <Button
                labelStyle={{ fontFamily: "Roboto_400Regular" }}
                color="#447ECB"
                onPress={() => {
                  this.setState({ visible: true });
                }}
                mode="contained"
              >
                Information
              </Button>
            </View>
            <View style={styles.cardContainer}>
              <FlatList
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Card elevation={5} style={styles.card}>
                    <Card.Cover
                      source={{
                        uri: item.photo,
                      }}
                    />
                    <Card.Title
                      titleStyle={{ fontFamily: "Roboto_400Regular" }}
                      title={item.title}
                      subtitle={item.name}
                      subtitleStyle={{ fontFamily: "Roboto_400Regular" }}
                      left={(props) => (
                        <Avatar.Image
                          {...props}
                          size={40}
                          source={{
                            uri: item.avatarPhoto,
                          }}
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
                      <Button
                        color="#447ECB"
                        onPress={() =>
                          this.props.navigation.navigate("shepherdListInfo", {
                            item,
                          })
                        }
                      >
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
            </View>
          </View>
        </Provider>
      );
    } else {
      return <AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activityContainer: {
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
  searchBar: {
    height: 50,
    width: 350,
    margin: 10,
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
    fontFamily: "Roboto_400Regular",
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
    fontFamily: "Roboto_700Bold",
  },
});
