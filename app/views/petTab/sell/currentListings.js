import React, { useState } from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import { Button } from "react-native-paper";
import { SearchBar } from "react-native-elements";
import firebase from "firebase";
import { AppLoading } from "expo";
import { auth } from "../../database/firebase";
import { onSellTab } from "../../components/petTabComponents";
import globalStyles, { darkGreen } from "../../styleSheet/styleSheet";
import { petSellListingCard } from "../../components/petSellListingComponent";

const db = firebase.firestore();

export default class currentListings extends React.Component {
  state = {
    data: [],
    temp: [],
    lists: null,
    isLoading: true,
    pullToRefresh: false,
    limit: 5,
    lastVisible: null,
  };

  async initialFetchData() {
    const dataArray = [];

    const uid = auth.currentUser.uid;
    //   .orderBy("timestamp")
    let initialQuery = db
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

  async fetchData() {
    console.log("being fetching");
    this.setState({
      data: [],
    });
    const dataArray = [];
    const uid = auth.currentUser.uid;

    // retrieve list of references stored within users
    const referenceData = await db
      .collection("users")
      .doc(uid)
      .collection("sellList")
      .orderBy("timestamp")
      .limit(this.state.limit)
      .get();

    var counter = 0;
    let documentData = referenceData.forEach(async (referenceDoc) => {
      // data can be retrieved by reference_object.get()
      await referenceDoc
        .data()
        .list.get()
        .then((snapshot) => {
          console.log(snapshot.data().name);
          dataArray.push({
            petName: snapshot.data().name,
            category: snapshot.data().category,
            breed: snapshot.data().breed,
            colour: snapshot.data().colour,
            age: snapshot.data().age,
            gender: snapshot.data().gender,
            size: snapshot.data().size,
            location: snapshot.data().location,
            price: snapshot.data().price,
            behaviour: snapshot.data().behaviour,
            health: snapshot.data().health,
            training: snapshot.data().training,
            additionalInfo: snapshot.data().additionalInfo,
            photo: snapshot.data().photo_link,
            doc_id: snapshot.id,
          });
          this.state.data.push(dataArray.pop());
        });

      /* This code disables rendering 1 by 1 --> might be more efficient because it only updates
    state once at the end */
      //   if (referenceData.size - 1 == counter) {
      //     this.setState({
      //       data: [...dataArray],
      //     });
      //   }
      //   counter++;

      // Set last visible - gets overwritten so the last one is always stored.
      this.setState({
        lastVisible: referenceDoc.data().timestamp,
      });
    });
  }

  async fetchMore() {
    const dataArray = [];
    const uid = auth.currentUser.uid;

    // retrieve list of references stored within users
    const referenceData = await db
      .collection("users")
      .doc(uid)
      .collection("sellList")
      .orderBy("timestamp")
      .startAfter(this.state.lastVisible)
      .limit(this.state.limit)
      .get();

    let documentData = referenceData.docs.map(async (referenceDoc) => {
      // data can be retrieved by reference_object.get()
      await referenceDoc
        .data()
        .list.get()
        .then((snapshot) => {
          dataArray.push({
            petName: snapshot.data().name,
            category: snapshot.data().category,
            breed: snapshot.data().breed,
            colour: snapshot.data().colour,
            age: snapshot.data().age,
            gender: snapshot.data().gender,
            size: snapshot.data().size,
            location: snapshot.data().location,
            price: snapshot.data().price,
            behaviour: snapshot.data().behaviour,
            health: snapshot.data().health,
            training: snapshot.data().training,
            additionalInfo: snapshot.data().additionalInfo,
            photo: snapshot.data().photo_link,
            doc_id: snapshot.id,
          });

          this.setState({
            data: this.state.data.concat(dataArray.pop()),
          });
        });
      this.setState({
        lastVisible: referenceDoc.data().timestamp,
      });
    });
  }

  async componentDidMount() {
    this.fetchData();
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
        <View style={[globalStyles.pageTitleContainer, { paddingTop: 15 }]}>
          <Text style={globalStyles.pageTitle}>Current Listings</Text>
          <View>
            <Button
              color={darkGreen}
              onPress={() => this.props.navigation.navigate("sellApplication")}
              contentStyle={{
                height: 30,
              }}
              mode="contained">
              Add New Listing
            </Button>
          </View>
        </View>

        <Button onPress={() => this.fetchMore()}> Fetch </Button>
        <View style={{ paddingTop: 7 }}>
          <FlatList
            style={{ marginBottom: 100 }}
            showsVerticalScrollIndicator={false}
            onRefresh={async () => {
              this.setState({
                pullToRefresh: true,
              });
              //   await this.initialFetchData();
              this.fetchData();
              this.setState({
                pullToRefresh: false,
              });
            }}
            refreshing={this.state.pullToRefresh}
            data={this.state.data}
            renderItem={({ item }) =>
              petSellListingCard(item, this.props.navigation)
            }
            keyExtractor={(item, index) => index.toString()}
            // onEndReached={() => this.fetchMore()}
            // onEndReachedThreshold={0.5}
          />
        </View>
      </View>
    );
  }
}
