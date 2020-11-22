import React from "react";
import { Text, View, Image, FlatList, BackHandler } from "react-native";
import { Card, Button, Searchbar } from "react-native-paper";
import firebase from "firebase";
import { auth } from "../../database/firebase";
import globalStyles, {
  primaryColour1,
  primaryColour2,
} from "../../styleSheet/styleSheet";
import { petSellListingCard } from "../../components/petSellListingComponent";

//Firebase firestore
const db = firebase.firestore();

export default class currentListings extends React.Component {
  state = {
    data: [],
    temp: [],
    lists: null,
    isLoading: true,
    isFetchingMore: false,
    pullToRefresh: false,
    limit: 10,
    lastVisible: null,
    filteredData: [],
    searchText: "",
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
      .collection("sellList")
      .orderBy("timestamp")
      .limit(this.state.limit)
      .get();

    let documentData = referenceData.forEach(async (referenceDoc) => {
      //Data can be retrieved by reference_object.get()
      await referenceDoc
        .data()
        .list.get()
        .then((snapshot) => {
          if (snapshot.data() != undefined) {
            dataArray.push({
              petName: snapshot.data().name,
              category: snapshot.data().category,
              breed: snapshot.data().breed,
              colour: snapshot.data().colour,
              age: snapshot.data().age,
              gender: snapshot.data().gender,
              size: snapshot.data().size,
              location: snapshot.data().location,
              suburb: snapshot.data().suburb,
              price: snapshot.data().price,
              behaviour: snapshot.data().behaviour,
              health: snapshot.data().health,
              training: snapshot.data().training,
              additional: snapshot.data().additionalInfo,
              photo: snapshot.data().photoLink,
              documentName: snapshot.data().documentsLink,
              documentUri: snapshot.data().documents_uri,
              doc_id: snapshot.id,
              selfRef: snapshot.data().selfRef,
              userSellListRef: snapshot.data().userSellListRef,
              categorizedListingsRef: snapshot.data().categorizedListingsRef,
            });
            this.state.data.push(dataArray.pop());
          }
        });

      /* This code disables rendering 1 by 1 --> might be more efficient because it only updates
    state once at the end */
      //   if (referenceData.size - 1 == counter) {
      //     this.setState({
      //       data: [...dataArray],
      //     });
      //   }
      //   counter++;

      //Set last visible - gets overwritten so the last one is always stored.
      this.setState({
        lastVisible: referenceDoc.data().timestamp,
      });
    });
  }

  //Fetch More
  async fetchMore() {
    if (!this.state.isFetchingMore) {
      this.setState({
        isFetchingMore: true,
      });
    //   console.log("fetch more");
      const dataArray = [];
      const uid = auth.currentUser.uid;

      //Retrieve list of references stored within users
      const referenceData = await db
        .collection("users")
        .doc(uid)
        .collection("sellList")
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
            if (snapshot.data() != null) {
              dataArray.push({
                petName: snapshot.data().name,
                category: snapshot.data().category,
                breed: snapshot.data().breed,
                colour: snapshot.data().colour,
                age: snapshot.data().age,
                gender: snapshot.data().gender,
                size: snapshot.data().size,
                location: snapshot.data().location,
                suburb: snapshot.data().suburb,
                price: snapshot.data().price,
                behaviour: snapshot.data().behaviour,
                health: snapshot.data().health,
                training: snapshot.data().training,
                additional: snapshot.data().additionalInfo,
                photo: snapshot.data().photoLink,
                documentName: snapshot.data().documentsLink,
                documentUri: snapshot.data().documents_uri,
                selfRef: snapshot,
                userSellListRef: snapshot.data().userSellListRef,
                categorizedListingsRef: snapshot.data().categorizedListingsRef,
                doc_id: snapshot.id,
              });

              this.setState({
                data: this.state.data.concat(dataArray.pop()),
              });
            }
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

  //Handle back button
  async componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.fetchData();
    });

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
    //Do nothing
    return true;
  };

  searchFunction = (searchText) => {
    this.setState({ searchText: searchText });

    let filteredData = this.state.data.filter(function (item) {
      return item.petName.toLowerCase().includes(searchText.toLowerCase());
    });

    this.setState({ filteredData: filteredData });
  };

  render() {
    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.searchFilterContainer}>
          <Searchbar
            style={globalStyles.searchBar}
            placeholder="Search"
            onChangeText={this.searchFunction}
            value={this.state.searchText}
          />
          <Button
            color={primaryColour2}
            onPress={() => {
              this.setState({ visible: true });
            }}
            mode="contained"
            contentStyle={{
              height: 35,
            }}>
            Filter
          </Button>
        </View>
        <View style={[globalStyles.pageTitleContainer, { paddingTop: 10 }]}>
          <Text style={globalStyles.pageTitle}>Current Listings</Text>
          <View>
            <Button
              color={primaryColour1}
              onPress={() => this.props.navigation.navigate("sellApplication")}
              contentStyle={{
                height: 30,
              }}
              mode="contained">
              <Text style={{ color: "white" }}>Add New Listing</Text>
            </Button>
          </View>
        </View>

        <View>
          {this.state.data.length === 0 ? (
            <Text style={{ paddingTop: 30, fontSize: 15, textAlign: "center" }}>
              You have not added any pet listings
            </Text>
          ) : null}
        </View>

        {this.state.searchText == "" ? (
          <View style={{ paddingTop: 7, paddingBottom: 60 }}>
            {/* <Button onPress={() => this.fetchMore()}> Fetch </Button> */}
            <FlatList
              style={{ marginBottom: 50 }}
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
                petSellListingCard(item, this.props.navigation)
              }
              keyExtractor={(item, index) => index.toString()}
              onEndReached={() => this.fetchMore()}
              onEndReachedThreshold={0.5}
            />
          </View>
        ) : (
          <View style={globalStyles.petContainer}>
            {this.state.filteredData.length == 0 ? (
              <View style={globalStyles.petContainer}>
                <Text style={{ margin: 100 }}>No results found.</Text>
              </View>
            ) : (
              <View style={{ paddingTop: 7, paddingBottom: 60 }}>
                <FlatList
                  style={{ marginBottom: 20 }}
                  showsVerticalScrollIndicator={false}
                  numColumns={1}
                  key={1}
                  onRefresh={async () => {
                    this.setState({
                      pullToRefresh: true,
                    });
                    //   await this.initialFetchData();
                    await this.fetchData();
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
                  data={
                    this.state.filteredData &&
                    this.state.filteredData.length > 0
                      ? this.state.filteredData
                      : this.state.data
                  }
                />
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}
