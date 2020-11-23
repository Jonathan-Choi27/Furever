import React from "react";
import "react-navigation";
import "react-navigation-props-mapper";
import "@react-navigation/native";
import "react-navigation-hooks";
import { View, ScrollView, Text, FlatList, BackHandler } from "react-native";
import globalStyles from "../styleSheet/styleSheet";
import { sellerDetails } from "../components/sellerInfoComponent";
import { accessoryListingCard } from "../components/shopComponents";
import { db } from "../database/firebase";
console.disableYellowBox = true;

export default class shopSellerProfile extends React.Component {
  state = {
    data: [],
    isLoading: true,
    pullToRefresh: false,
  };

  //Fetch Data
  async fetchData() {
    const dataArray = [];
    const seller = this.props.route.params.seller;
    db.collection("users")
      .doc(seller.sellerId)
      .collection("shopSellList")
      .get()
      .then((doc) => {
        doc.forEach(async (refDoc) => {
          refDoc
            .data()
            .list.get()
            .then(async (listingDoc) => {
              dataArray.push({
                accessoryName: listingDoc.data().name,
                category: listingDoc.data().category,
                type: listingDoc.data().type,
                price: listingDoc.data().price,
                photo: listingDoc.data().photoLink,
                description: listingDoc.data().description,
                docId: listingDoc.id,
                uuid: listingDoc.data().uuid,
              });
              this.setState({
                isLoading: false,
                data: [...dataArray],
              });
            });
        });
      });
  }

  //Handle back button
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
    const seller = this.props.route.params.seller;
    return (
      <ScrollView>
        {sellerDetails(seller)}
        <View style={{ paddingLeft: 15, paddingTop: 15, paddingBottom: 5 }}>
          <Text style={[globalStyles.pageTitle, { flex: 1 }]}>
            {seller.name}'s Accessory Listings
          </Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <FlatList
            style={{ paddingBottom: 10 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) =>
              accessoryListingCard(item, this.props.navigation)
            }
            keyExtractor={(item, index) => index.toString()}
            data={this.state.data}
          />
        </View>
      </ScrollView>
    );
  }
}
