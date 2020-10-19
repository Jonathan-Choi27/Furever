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

export default class currentApplications extends React.Component {
  state = {
    data: [],
    isLoading: true,
    filteredData: [],
    searchText: "",
    listedData: [],
    uuid: "",
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
            uuid: uuid,
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


  // listedDataSearch = (uuid) => {
  //   this.setState({ uuid: uuid });

  //   let filteredData = this.state.data.filter(function (item) {
  //     return item.uuid.includes(uuid);
  //   });

  //   this.setState({ filteredData: filteredData });
  // };

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
              style={{
                margin: 10,
                height: 50,
                width: 300,
              }}
              placeholder="Search"
              onChangeText={this.searchFunction}
              value={this.state.searchText}
            />
          </View>
    
          {this.state.searchText == "" ? (
            <View style={styles.container}>
                <View style={{
                    backgroundColor: 'red',
                    // flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 50,
                    width: 300,
                    borderRadius: 5,
                    marginBottom: 10,
                }}>
                    <Text style={{textAlign: 'center', padding: 5,}}>No applications have been made yet.</Text>
                </View>
                <Text style={{textAlign: 'center', padding: 5,}}>Try considering:</Text>

              <View style={styles.container}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <Card elevation={5} style={styles.card}>
                      <Card.Cover source={ {uri: item.photo}} />
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
                    this.state.listedData &&
                    this.state.listedData.length > 0
                      ? this.state.listedData
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
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <Card elevation={5} style={styles.card}>
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
