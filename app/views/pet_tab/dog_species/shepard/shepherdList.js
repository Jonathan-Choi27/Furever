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
            await db.collection("users").doc(uuid).get().then((user_doc) => {
                 seller_name =  user_doc.data().name;
            })
            console.log(seller_name);
            dataArray.push({
                title: listingDoc.data().name,
                name: seller_name
            })

            this.setState({data: [...dataArray]});
          })
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
            onPress={() => this.props.navigation.navigate("petBuySpecies")}>
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
            onPress={() => this.props.navigation.navigate("petSell")}>
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
        </View>
        <Text style={styles.outsideTitle}>German Shepherd</Text>
        <FlatList
          renderItem={({ item }) => (
            <Card>
              <Card.Title
                containerStyle={styles.card}
                image={
                  "https://randomwordgenerator.com/img/picture-generator/54e6dc454e55b10ff3d8992cc12c30771037dbf85254784a73287bd09344_640.jpg"
                }>
                {item.title}
              </Card.Title>

              <View style={styles.avatarContainer}>
                <Avatar
                  rounded
                  source={{
                    uri:
                      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                  }}
                />
                <Text style={styles.nameTitle}>{item.name}</Text>
              </View>

              <Text style={{ marginBottom: 10 }}>
                Description here, Description here, Description here,Description
                here,Description here
              </Text>
              <Button
                icon={{ name: "code" }}
                backgroundColor="#03A9F4"
                fontFamily="Lato"
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                }}
                title="VIEW NOW"
              />
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
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  outsideTitle: {
    fontSize: 20,
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    fontWeight: "bold",
    padding: 12,
  },
  card: {
    borderRadius: 10,
  },
  avatarContainer: {
    fontWeight: "bold",
  },
  nameTitle: {
    fontWeight: "bold",
  },
});
