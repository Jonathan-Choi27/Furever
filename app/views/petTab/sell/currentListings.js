import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  Button,
} from "react-native-paper";
import { SearchBar } from "react-native-elements";
import firebase from "firebase";
import { AppLoading } from "expo";
import SelfPetListing from "./petListing";
import { auth } from "../../database/firebase";
import { onSellTab } from "../../components/petTabComponents";
import globalStyles, {darkGreen} from "../../styleSheet/styleSheet";

const db = firebase.firestore();

export default class currentListings extends React.Component {
  state = {
    data: [],
    lists: null,
    isLoading: true,
    pullToRefresh: false,
    limit: 6,
    lastVisible: null,
  };

  async initialFetchData() {
    const dataArray = [];

    const uid = auth.currentUser.uid;
    //   .orderBy("timestamp")
    let initialQuery = await db
      .collection("pet_listings")
      .where("uuid", "==", uid)
      .orderBy("timestamp")
      .limit(this.state.limit);

    let documentSnapshots = await initialQuery.get();

    let documentData = documentSnapshots.docs.map((listingDoc) => {
      dataArray.push({
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
        additionalInfo: listingDoc.data().additionalInfo,
        photo: listingDoc.data().photo_link,
        doc_id: listingDoc.id,
      });

      this.setState({
        lastVisible: listingDoc.data().timestamp,
      });
    });

    this.setState({
      isLoading: false,
      data: [...dataArray],
    });
    // db.collection("pet_listings")
    //   .where("uuid", "==", user.uid)
    //   .get()
    //   .then((doc) => {
    //     doc.forEach((listingDoc) => {
    //       // console.log(listingDoc.data());
    //       dataArray.push({
    //         petName: listingDoc.data().name,
    //         category: listingDoc.data().category,
    //         breed: listingDoc.data().breed,
    //         colour: listingDoc.data().colour,
    //         age: listingDoc.data().age,
    //         gender: listingDoc.data().gender,
    //         size: listingDoc.data().size,
    //         location: listingDoc.data().location,
    //         price: listingDoc.data().price,
    //         behaviour: listingDoc.data().behaviour,
    //         health: listingDoc.data().health,
    //         training: listingDoc.data().training,
    //         additionalInfo: listingDoc.data().additionalInfo,
    //         photo: listingDoc.data().photo_link,
    //         doc_id: listingDoc.id,
    //       });

    //       this.setState({
    //         isLoading: false,
    //         data: [...dataArray],
    //       });
    //     });
    //   });
  }

  async fetchMore() {
    const dataArray = [];
    console.log("fetch more!");
    const uid = auth.currentUser.uid;
    let initialQuery = await db
      .collection("pet_listings")
      .where("uuid", "==", uid)
      .orderBy("timestamp")
      .startAfter(this.state.lastVisible)
      .limit(this.state.limit);

    let documentSnapshots = await initialQuery.get();

    let documentData = documentSnapshots.docs.map((listingDoc) => {
      dataArray.push({
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
        additionalInfo: listingDoc.data().additionalInfo,
        photo: listingDoc.data().photo_link,
        doc_id: listingDoc.id,
      });

      this.setState({
        lastVisible: listingDoc.data().timestamp,
      });
    });

    this.setState({
      // isLoading: false,
      data: this.state.data.concat(dataArray),
    });
  }

  async componentDidMount() {
    this.initialFetchData();
  }

  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <View style={styles.activityContainer}>
    //       <ActivityIndicator size="large" color="#447ECB" />
    //     </View>
    //   );
    // }
    return (
      <View style={globalStyles.container}>
        {onSellTab(this.props.navigation)}

        <View style={[globalStyles.pageTitleContainer, {paddingTop: 15}]}>
          <Text style={globalStyles.pageTitle}>Current Listings</Text>
          <View>
            <Button
              color={darkGreen}
              onPress={() => this.props.navigation.navigate("sellApplication")}
              contentStyle={{
                height: 30,
              }}
              mode="contained"
            >
              Add New Listing
            </Button>
          </View>
        </View>

        <View style={{paddingBottom: 220}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            onRefresh={async () => {
              this.setState({
                pullToRefresh: true,
              });
              await this.initialFetchData();
              this.setState({
                pullToRefresh: false,
              });
            }}
            refreshing={this.state.pullToRefresh}
            data={this.state.data}
            renderItem={({ item }) => (
              <SelfPetListing
                petName={item.petName}
                category={item.category}
                breed={item.breed}
                colour={item.colour}
                age={item.age}
                gender={item.gender}
                size={item.size}
                location={item.location}
                price={item.price}
                behaviour={item.behaviour}
                health={item.health}
                training={item.training}
                additional={item.additionalInfo}
                photo={item.photo}
                doc_id={item.doc_id}
                navigation={this.props.navigation}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => this.fetchMore()}
            onEndReachedThreshold={1}
          />
        </View>
      </View>
    );
  }
}
