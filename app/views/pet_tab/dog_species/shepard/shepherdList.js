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
    //loading: true,
  };

  render() {
    // CODE IN INVESTIGATION
    // useEffect(() => {
    //   const listing = db
    //     .collection("pet-sell-list")
    //     .onSnapshot((querySnapshot) => {
    //       const dataArray = [];

    //       querySnapshot.forEach((snapshot) => {
    //         dataArray.push({
    //           title: snapshot.data().name,
    //           uuid: snapshot.data().uuid,
    //         });
    //       });

    //       this.setState({ data: [...dataArray] });
    //       this.setState({ loading: false });
    //     });

    //   // Unsubscribe from events when no longer in use
    //   return () => listing();
    // }, []);

    // if (loading) {
    //   return <ActivityIndicator />;
    // }

    // ALTERNATIVE CODE
    // const dataArray = [];
    // db.collection("pet-sell-list")
    //   .get()
    //   .then((snapshot) => {
    //     snapshot.docs.some((user) => {
    //       dataArray.push({ title: user.data().name, uuid: user.data().uuid });
    //     });
    //     this.setState({
    //       data: [...dataArray],
    //     });
    //   });

    return (
      <View style={styles.container}>
        <View style={styles.buySellContainer}>
          <TouchableOpacity
            style={{
              backgroundColor: "#89CFF0",
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
        </View>
        <Text style={styles.outsideTitle}>German Shepherd</Text>
        <FlatList
          renderItem={({ item }) => (
            <Card>
              <Card.Title
                containerStyle={styles.card}
                image={
                  "https://randomwordgenerator.com/img/picture-generator/54e6dc454e55b10ff3d8992cc12c30771037dbf85254784a73287bd09344_640.jpg"
                }
              >
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
                <Text></Text>
              </View>

              <Text style={{ marginBottom: 10 }}>
                The idea with React Native Elements is more about component
                structure than actual design.
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
});
