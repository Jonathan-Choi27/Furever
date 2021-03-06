import React from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  BackHandler,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { db, auth } from "../../database/firebase";
import globalStyles from "../../styleSheet/styleSheet";
import { petBuyCard } from "../../components/petBuyComponents";
import { buyerApplicationList } from "../../components/buyerApplicationList";

export default class currentApplications extends React.Component {
  state = {
    data: [],
    isLoading: true,
    filteredData: [],
    searchText: "",
    listedData: [],
    uuid: "",
    pullToRefresh: false,
  };

  //Fetch Data
  async componentDidMount() {
    const dataArray = [];
    const user = auth.currentUser;
    const docs = [];

    db.collection("petListings")
      .get()
      .then((doc) => {
        doc.forEach(async (listing) => {
          await db
            .collection("petListings")
            .doc(listing.id)
            .collection("buyer_applications")
            .where("uuid", "==", user.uid)
            .get()
            .then((doc) => {
              doc.forEach(async (applications) => {
                db.collection("petListings")
                  .where("uuid", "==", listing.data().uuid)
                  .get()
                  .then((doc) => {
                    doc.forEach(async (listingDoc) => {
                      if (listingDoc.id == listing.id) {
                        var uuid = listingDoc.data().uuid;
                        var sellerName;
                        var sellerPhoto;
                        await db
                          .collection("users")
                          .doc(uuid)
                          .get()
                          .then((user_doc) => {
                            sellerName = user_doc.data().name;
                            sellerPhoto = user_doc.data().photo;
                          });
                        dataArray.push({
                          buyerWhyWantPet: applications.data().why_want_pet,
                          buyerPreviousPets: applications.data().previous_pets,
                          buyerName: applications.data().name,
                          buyerEmail: applications.data().email,
                          buyerNumber: applications.data().contact_number,
                          buyerAddress: applications.data().address,
                          buyerHouseEnviroment: applications.data()
                            .house_enviroment,
                          buyerLeastDesirableTraits: applications.data()
                            .least_desirable_traits,
                          buyerMostDesirableTraits: applications.data()
                            .most_desirable_traits,
                          buyerIsAccepted: applications.data().is_accepted,
                          sellerName: sellerName,
                          sellerPhoto: sellerPhoto,
                          petName: listingDoc.data().name,
                          category: listingDoc.data().category,
                          breed: listingDoc.data().breed,
                          colour: listingDoc.data().colour,
                          age: listingDoc.data().age,
                          ageOption: listingDoc.data().ageOption,
                          gender: listingDoc.data().gender,
                          size: listingDoc.data().size,
                          location: listingDoc.data().location,
                          suburb: listingDoc.data().suburb,
                          price: listingDoc.data().price,
                          behaviour: listingDoc.data().behaviour,
                          health: listingDoc.data().health,
                          training: listingDoc.data().training,
                          additional: listingDoc.data().additionalInfo,
                          photo: listingDoc.data().photoLink,
                          doc_id: listingDoc.id,
                          uuid: listingDoc.data().uuid,
                        });
                        this.setState({
                          isLoading: false,
                          data: [...dataArray],
                        });
                      }
                    });
                  });
              });
            });
        });
      });

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

  //Search Functionality
  searchFunction = (searchText) => {
    this.setState({ searchText: searchText });

    let filteredData = this.state.data.filter(function (item) {
      return item.petName.toLowerCase().includes(searchText.toLowerCase());
    });

    this.setState({ filteredData: filteredData });
  };

  render() {
    const { search } = this.state;

    return (
      <View style={globalStyles.container}>
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "stretch",
            }}
          >
            <Searchbar
              style={globalStyles.searchBarSingle}
              placeholder="Search"
              onChangeText={this.searchFunction}
              value={this.state.searchText}
            />
          </View>

          {this.state.searchText == "" ? (
            <View style={globalStyles.pageMargin}>
              <Text
                style={[
                  globalStyles.pageTitle,
                  { paddingLeft: 7, paddingBottom: 10, paddingTop: 5 },
                ]}
              >
                Your Current Applications
              </Text>

              <View>
                {this.state.data.length === 0 ? (
                  <Text
                    style={{
                      paddingTop: 30,
                      fontSize: 15,
                      textAlign: "center",
                    }}
                  >
                    You have not submitted any pet applications
                  </Text>
                ) : null}
              </View>

              <FlatList
                style={[{ paddingBottom: 10 }]}
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
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) =>
                  buyerApplicationList(item, this.props.navigation)
                }
                keyExtractor={(item, index) => index.toString()}
                data={
                  this.state.filteredData && this.state.filteredData.length > 0
                    ? this.state.filteredData
                    : this.state.data
                }
              />
            </View>
          ) : (
            <View style={globalStyles.activityContainer}>
              {this.state.filteredData.length == 0 ? (
                <View style={globalStyles.activityContainer}>
                  <Text style={{ margin: 100 }}>No results found.</Text>
                </View>
              ) : (
                <FlatList
                  style={{ paddingBottom: 10 }}
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
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) =>
                    petBuyCard(item, this.props.navigation)
                  }
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
        </ScrollView>
      </View>
    );
  }
}
