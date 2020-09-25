import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {
  Card,
  ListItem,
  Button,
  Icon,
  SearchBar,
  Image,
  Avatar,
} from "react-native-elements";
import { db } from "../../../database/firebase";
export default class shepherdList extends React.Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    // const dataArray = [];
    // db.collection("pet_listings")
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((listingDoc) => {
    //       dataArray.push({
    //         title: listingDoc.data().name,
    //         name: listingDoc.data().seller_name
    //       });
    //     });
    //     this.setState({ data: [...dataArray] });
    //   })
    //   .catch((error) => {
    //     console.log("Error getting document:", error);
    //   });

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
          console.log(seller_name);
          dataArray.push({
            title: listingDoc.data().name,
            name: seller_name,
            photo: listingDoc.data().photo_link,
          });

          this.setState({ data: [...dataArray] });
        });
      });
    console.log(dataArray);
    // console. log(user_id);
  }

  render() {
    return (
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
            onPress={() => this.props.navigation.navigate("petBuySpecies")}
          >
            <Text>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: 50,
            }}
            onPress={() => this.props.navigation.navigate("petSell")}
          >
            <Text style={{ textAlign: "center" }}> Sell </Text>
          </TouchableOpacity>
        </View>
        <View>
          <SearchBar
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              width: 300,
            }}
            placeholder="Search..."
            lightTheme="true"
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>German Shepherd</Text>
            <TouchableOpacity style={styles.titleButton}>
              <Text style={styles.titleButtonsText}>Information</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          renderItem={({ item }) => (
            <Card containerStyle={styles.cardContainer}>
              <Card.Title style={styles.cardTitleContainer}>
                {item.title}
              </Card.Title>
              <View style={styles.cardContentContainer}>
                <Card.Image style={styles.containerImage} source={item.photo} />
                <Text style={styles.containerText}>
                  Age: 123 {"\n"}
                  Gender: 123 {"\n"}
                  Location: Sydney, United States {"\n"}
                  Seller:{" "}
                  <Text style={{ fontWeight: "bold" }}>
                    {item.name.split(" ")[0]}
                  </Text>
                  {"\n"}
                  {
                    <TouchableOpacity style={styles.buttons}>
                      <Text style={styles.buttonsText}>More info</Text>
                    </TouchableOpacity>
                  }
                </Text>
                <Avatar
                  style={styles.avatarContainer}
                  rounded
                  source={{
                    uri:
                      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                  }}
                />
              </View>
            </Card>
          )}
          keyExtractor={(item, index) => index.toString()}
          data={this.state.data}
          extraData={this.state}
        />
      </View>
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
  title: {
    fontSize: 32,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  cardContainer: {
    borderRadius: 4,
  },
  cardContentContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  containerImage: {
    height: 100,
    width: 100,
    marginRight: 2,
  },
  containerText: {
    fontSize: 12,
  },
  titleButton: {
    backgroundColor: "#447ECB",
    borderRadius: 6,
    alignItems: "center",
    width: 120,
    height: 25,
  },
  buttons: {
    backgroundColor: "#447ECB",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    width: 90,
    marginTop: 5,
    height: 30,
  },
  titleButtonsText: {
    color: "white",
    fontSize: 16,
  },
  buttonsText: {
    color: "white",
    fontSize: 15,
  },
  cardTitleContainer: {
    fontSize: 15,
    textAlign: "left",
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#447ECB",
  },
});
