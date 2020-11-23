import React from "react";
import {
  Text,
  View,
  FlatList,
  BackHandler,
} from "react-native";
import { Button } from "react-native-paper";
import firebase from "firebase";
import { auth } from "../database/firebase";
import globalStyles, { primaryColour1 } from "../styleSheet/styleSheet";
import { accessoriesListingCard } from "../components/accessoriesListingComponent";

const db = firebase.firestore();

export default class accessoryListings extends React.Component {
  state = {
    data: [],
    lists: null,
    isLoading: true,
    pullToRefresh: false,
    limit: 10,
    lastVisible: null,
    isFetchingMore: false,
  };

  //Fetch Data
  async fetchData() {
    this.setState({
      data: [],
    });
    const dataArray = [];
    const uid = auth.currentUser.uid;

    //Retrieve list of references stored within users
    const referenceData = await db
      .collection("users")
      .doc(uid)
      .collection("shopSellList")
      .orderBy("timestamp")
      .limit(this.state.limit)
      .get();

    let documentData = referenceData.forEach(async (referenceDoc) => {
      //Data can be retrieved by reference_object.get()
      await referenceDoc
        .data()
        .list.get()
        .then((snapshot) => {
          dataArray.push({
            accessoryName: snapshot.data().name,
            category: snapshot.data().category,
            type: snapshot.data().type,
            price: snapshot.data().price,
            description: snapshot.data().description,
            photo: snapshot.data().photoLink,
            docId: snapshot.id,
          });
          this.state.data.push(dataArray.pop());
        });

      //Set last visible - gets overwritten so the last one is always stored.
      this.setState({
        lastVisible: referenceDoc.data().timestamp,
      });
    });
  }

  async fetchMore() {
    if (!this.state.isFetchingMore) {
      this.setState({
        isFetchingMore: true,
      });
      const dataArray = [];
      const uid = auth.currentUser.uid;

      //Retrieve list of references stored within users
      const referenceData = await db
        .collection("users")
        .doc(uid)
        .collection("shopSellList")
        .orderBy("timestamp")
        .startAfter(this.state.lastVisible)
        .limit(this.state.limit)
        .get();

      let documentData = referenceData.docs.map(async (referenceDoc) => {
        //Data can be retrieved by reference_object.get()
        await referenceDoc
          .data()
          .list.get()
          .then((snapshot) => {
            dataArray.push({
              accessoryName: snapshot.data().name,
              category: snapshot.data().category,
              type: snapshot.data().type,
              price: snapshot.data().price,
              description: snapshot.data().description,
              photo: snapshot.data().photoLink,
              docId: snapshot.id,
            });

            this.setState({
              data: this.state.data.concat(dataArray.pop()),
            });
          });

        this.setState({
          lastVisible: referenceDoc.data().timestamp,
        });
      });

      this.setState({
        isFetchingMore: false,
      });
    }
  }

  async componentDidMount() {
    this.fetchData();

    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };

  render() {
    return (
      <View style={globalStyles.container}>
        <View style={[globalStyles.pageTitleContainer, { paddingTop: 15 }]}>
          <Text style={globalStyles.pageTitle}>Accessory Listings</Text>
          <View>
            <Button
              color={primaryColour1}
              onPress={() =>
                this.props.navigation.navigate("accessoryListingApplication")
              }
              contentStyle={{
                height: 30,
              }}
              mode="contained"
            >
              <Text style={{ color: "white" }}>Add Listing</Text>
            </Button>
          </View>
        </View>

        <View style={{ paddingTop: 10, paddingBottom: 60 }}>
          {this.state.data.length === 0 ? (
            <Text
              style={{
                paddingTop: 30,
                fontSize: 15,
                textAlign: "center",
              }}
            >
              You have not added any accessory listings
            </Text>
          ) : (
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
              renderItem={({ item }) =>
                accessoriesListingCard(item, this.props.navigation)
              }
              keyExtractor={(item, index) => index.toString()}
              onEndReached={() => this.fetchMore()}
              onEndReachedThreshold={0.5}
            />
          )}
        </View>
      </View>
    );
  }
}
