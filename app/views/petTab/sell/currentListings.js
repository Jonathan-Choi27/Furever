import React from "react";
import { Text, View, Image, FlatList } from "react-native";
import { Card, Button, Searchbar } from "react-native-paper";
import firebase from "firebase";
import { auth } from "../../database/firebase";
import { onSellTab } from "../../components/petTabComponents";
import globalStyles, {
  darkGreen,
  lightGreen,
} from "../../styleSheet/styleSheet";
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
    filteredData: [],
    searchText: "",
  };

  async fetchData() {
    console.log("begin fetching");
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

  // todo make it so cant fetch whilst fetching
  async fetchMore() {
    console.log("fetch more");
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

  searchFunction = (searchText) => {
    this.setState({ searchText: searchText });

    let filteredData = this.state.data.filter(function (item) {
      return item.petName.toLowerCase().includes(searchText.toLowerCase());
    });

    this.setState({ filteredData: filteredData });
  };

  homeCard = (item) => (
    <View style={styles.card}>
      <Card
        elevation={5}
        styles={styles.card}
        onPress={() => this.props.navigation.navigate("petProfile", { item })}>
        <Image source={{ uri: item.photo }} style={styles.image} />
        <Text numberOfLines={1} style={styles.title}>
          {item.petName}
        </Text>
      </Card>
    </View>
  );
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
        {/* {onSellTab(this.props.navigation)} */}
        <View style={globalStyles.searchFilterContainer}>
          <Searchbar
            style={globalStyles.searchBar}
            placeholder="Search"
            onChangeText={this.searchFunction}
            value={this.state.searchText}
          />
          <Button
            color={lightGreen}
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
                {/* <FlatList
                  style={{ marginBottom: 100 }}
                  showsVerticalScrollIndicator={false}
                  numColumns={1}
                  key={1}
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
                  data={
                    this.state.filteredData &&
                    this.state.filteredData.length > 0
                      ? this.state.filteredData
                      : this.state.data
                  }
                /> */}
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}
