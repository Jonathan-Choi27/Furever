import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  BackHandler
} from "react-native";
import {
  Button,
} from "react-native-paper";
import firebase from "firebase";
import { auth } from "../database/firebase";
import globalStyles, {darkGreen} from "../styleSheet/styleSheet";
import {accessoriesListingCard} from "../components/accessoriesListingComponent";

const db = firebase.firestore();

export default class accessoryListings extends React.Component {
  state = {
    data: [],
    lists: null,
    isLoading: true,
    pullToRefresh: false,
    limit: 6,
    lastVisible: null,
  };

  async fetchData() {
    const dataArray = [];
    const uid = auth.currentUser.uid;

    db.collection("accessories")
      .where("uuid", "==", uid)
      .get()
      .then((doc) => {
        doc.forEach((listingDoc) => {
          dataArray.push({
            accessoryName: listingDoc.data().name,
            category: listingDoc.data().category,
            type: listingDoc.data().type,
            price: listingDoc.data().price,
            photo: listingDoc.data().photoLink,
            docId: listingDoc.id,
          });

          this.setState({
            isLoading: false,
            data: [...dataArray],
          });
        });
      });
  }

  async componentDidMount() {
    this.fetchData();
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  
  };
  
  
  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
        
  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  render() {
    return (
      <View style={globalStyles.container}>
        <View style={[globalStyles.pageTitleContainer, {paddingTop: 15}]}>
          <Text style={globalStyles.pageTitle}>Accessory Listings</Text>
          <View>
            <Button
              color={darkGreen}
              onPress={() => this.props.navigation.navigate("accessoryListingApplication")}
              contentStyle={{
                height: 30,
              }}
              mode="contained"
            >
              Add New Listing
            </Button>
          </View>
        </View>

        <View style={{paddingTop: 10, paddingBottom: 60}}>
          <FlatList
            showsVerticalScrollIndicator={false}
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
            data={this.state.data}
            renderItem={({ item }) => (
              accessoriesListingCard(item, this.props.navigation)
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}