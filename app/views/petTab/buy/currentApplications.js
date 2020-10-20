import React, { useEffect } from "react";
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
import {onBuyTab} from "../../components/petTabComponents";
import globalStyles from "../../styleSheet/styleSheet";

export default class currentApplications extends React.Component {
  state = {
    data: [],
    isLoading: true,
    filteredData: [],
    searchText: "",
    listedData: [],
    uuid: "",
    pullToRefresh: false,

  };

  async componentDidMount() {
    const dataArray = [];
    const user = auth.currentUser;
    const docs = [];

    db.collection("pet_listings").get().then((doc) => {
      doc.forEach(async (listing) => {
        await db
            .collection("pet_listings")
            .doc(listing.id)
            .collection("buyer_applications")
            .where("uuid", "==", user.uid)
            .get()
            .then((doc) => {
              doc.forEach(async (applications) => {
                db.collection("pet_listings")
                .where("uuid", "==", listing.data().uuid)
                .get()
                .then((doc) => {

             doc.forEach(async (listingDoc) => {
               if (listingDoc.id == listing.id) {
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
                  dataArray.push({
                    name: seller_name,
                    avatarPhoto: seller_photo,
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
                    doc_id: listingDoc.id,
                  });
                  this.setState({
                    isLoading: false,
                    data: [...dataArray],
                  });
               }
              
              });
            });
          })
        })
      })
    })
  }

  searchFunction = (searchText) => {
    this.setState({ searchText: searchText });

    let filteredData = this.state.data.filter(function (item) {
      return item.petName.toLowerCase().includes(searchText.toLowerCase());
    });

    this.setState({ filteredData: filteredData });
  };

  render() {
    const { search } = this.state;
    // this.listedDataSearch(auth.getuuid);
    return (
      <ScrollView>
        <View style={styles.container}>
          {onBuyTab(this.props.navigation)}
          
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "stretch",
            }}
          >
            <Searchbar
              style={globalStyles.searchBarSingle}
              placeholder="Search"
              onChangeText={this.searchFunction}
              value={this.state.searchText}
            />
          </View>
    
          {this.state.searchText == "" ? (
            <View style={styles.container}>
                
              <Text style={{textAlign: 'center', padding: 5,}}>Your Current Applications:</Text>
              <View style={styles.container}>
              <FlatList
                style={{ paddingBottom: 10 }}
                onRefresh={async () => {
                  this.setState({
                    pullToRefresh: true,
                  });
                  await this.fetchData();
                  this.setState({
                    pullToRefresh: false,
                  });
                }}
                refreshing={this.state.pullToRefresh}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Card elevation={5} style={styles.card}>
                    <Card.Title
                      title={item.petName}
                      subtitle={item.name}
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
                    <View style={{ flexDirection: "row" }}>
                      <View
                        style={{
                          paddingLeft: 10,
                          paddingBottom: 10,
                          paddingTop: 10,
                          paddingRight: 10,
                          width: 170,
                          height: 170,
                        }}
                      >
                        <Image
                          source={{ uri: item.photo }}
                          style={{ aspectRatio: 1, borderRadius: 5 }}
                        />
                      </View>
                      <View
                        style={{
                          flex: 3,
                          justifyContent: "center",
                        }}
                      >
                        <Card.Content>
                          <Text numberOfLines={1} style={{ flex: 1 }}>
                            <Text style={{ fontWeight: "bold" }}>Age: </Text>
                            <Text>{item.age}</Text>
                          </Text>
                          <Text numberOfLines={1} style={{ flex: 1 }}>
                            <Text style={{ fontWeight: "bold" }}>Gender: </Text>
                            <Text>{item.gender}</Text>
                          </Text>
                          <Text numberOfLines={1} style={{ flex: 1 }}>
                            <Text style={{ fontWeight: "bold" }}>Location: </Text>
                            <Text>{item.location}</Text>
                          </Text>
                        </Card.Content>

                        <Card.Actions style={styles.actionCard}>
                          <Button
                            style={styles.bigButton}
                            mode="contained"
                            onPress={() =>
                              this.props.navigation.navigate("buyPetProfile", {
                                item,
                              })
                            }
                          >
                            <Text style={styles.bigButtonText}>More Info</Text>
                          </Button>
                        </Card.Actions>
                      </View>
                    </View>
                  </Card>
                )}
                keyExtractor={(item, index) => index.toString()}
                data={
                  this.state.filteredData && this.state.filteredData.length > 0
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
                style={{ paddingBottom: 10 }}
                onRefresh={async () => {
                  this.setState({
                    pullToRefresh: true,
                  });
                  await this.fetchData();
                  this.setState({
                    pullToRefresh: false,
                  });
                }}
                refreshing={this.state.pullToRefresh}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Card elevation={5} style={styles.card}>
                    <Card.Title
                      title={item.petName}
                      subtitle={item.name}
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
                    <View style={{ flexDirection: "row" }}>
                      <View
                        style={{
                          paddingLeft: 10,
                          paddingBottom: 10,
                          paddingTop: 10,
                          paddingRight: 10,
                          width: 170,
                          height: 170,
                        }}
                      >
                        <Image
                          source={{ uri: item.photo }}
                          style={{ aspectRatio: 1, borderRadius: 5 }}
                        />
                      </View>
                      <View
                        style={{
                          flex: 3,
                          justifyContent: "center",
                        }}
                      >
                        <Card.Content>
                          <Text numberOfLines={1} style={{ flex: 1 }}>
                            <Text style={{ fontWeight: "bold" }}>Age: </Text>
                            <Text>{item.age}</Text>
                          </Text>
                          <Text numberOfLines={1} style={{ flex: 1 }}>
                            <Text style={{ fontWeight: "bold" }}>Gender: </Text>
                            <Text>{item.gender}</Text>
                          </Text>
                          <Text numberOfLines={1} style={{ flex: 1 }}>
                            <Text style={{ fontWeight: "bold" }}>Location: </Text>
                            <Text>{item.location}</Text>
                          </Text>
                        </Card.Content>

                        <Card.Actions style={styles.actionCard}>
                          <Button
                            style={styles.bigButton}
                            mode="contained"
                            onPress={() =>
                              this.props.navigation.navigate("buyPetProfile", {
                                item,
                              })
                            }
                          >
                            <Text style={styles.bigButtonText}>More Info</Text>
                          </Button>
                        </Card.Actions>
                      </View>
                    </View>
                  </Card>
                )}
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
