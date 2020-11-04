import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { Avatar, Card, Button, Searchbar } from "react-native-paper";
import { db } from "../../database/firebase";
import { auth } from "../../database/firebase";
import { onBuyTab } from "../../components/petTabComponents";
import globalStyles from "../../styleSheet/styleSheet";
import { petBuyCard } from "../../components/petBuyComponents";
import { buyerApplicationList } from "../../components/buyerApplicationList";
// import { buyerApplicationView } from "../../components/buyerApplicationView";

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

  async componentDidMount() {
    const dataArray = [];
    const user = auth.currentUser;
    const docs = [];

    db.collection("pet_listings")
      .get()
      .then((doc) => {
        doc.forEach(async (listing) => {
          await db
            .collection("pet_listings")
            .doc(listing.id)
            .collection("buyer_applications")
            .where("uuid", "==", user.uid)
            .get()
            .then((doc) => {
              doc.forEach(async (applications) => {
                db.collection("pet_listings")
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
                          photo: listingDoc.data().photo_link,
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
  }

  searchFunction = (searchText) => {
    this.setState({ searchText: searchText });

    let filteredData = this.state.data.filter(function (item) {
      return item.petName.toLowerCase().includes(searchText.toLowerCase());
    });

    this.setState({ filteredData: filteredData });
  };

  render() {
    const { search } = this.state;

    // this.listedDataSearch(auth.getuuid);
    return (
      <View style={globalStyles.container}>
        {/* {onBuyTab(this.props.navigation)} */}
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "stretch",
            }}>
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
                  { paddingLeft: 7, paddingBottom: 10, paddingTop: 3 },
                ]}                                                                                              >
                Your Current Applications
              </Text>
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
