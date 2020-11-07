import React from "react";
import "react-navigation"
import "react-navigation-props-mapper"
import "@react-navigation/native"
import 'react-navigation-hooks'
import {
    View,
    ScrollView,
    FlatList,
    Text,
    BackHandler,
} from "react-native";
import { Card, } from "react-native-elements";
console.disableYellowBox = true;
import globalStyles from "../styleSheet/styleSheet";

import { sellerDetails } from "../components/sellerInfoComponent";
import { petBuyCard } from "../components/petBuyComponents";
import { db } from "../database/firebase";

export default class homeSellerProfile extends React.Component {
    state = {
        data: [],
        isLoading: true,
        pullToRefresh: false,
    };

    async fetchData() {
        const dataArray = [];
        const seller = this.props.route.params.seller;
        db.collection("users")
            .doc(seller.sellerId)
            .collection("sellList")
            .get()
            .then((doc) => {
                doc.forEach(async (refDoc) => {
                    refDoc.data().list
                        .get()
                        .then(async (listingDoc) => {
                            dataArray.push({
                                sellerName: seller.name,
                                sellerPhoto: seller.photo,
                                sellerInfo: seller.profileText,
                                sellerEmail: seller.email,
                                sellerDob: seller.dob,
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
                        })
                })
            })
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
        const seller = this.props.route.params.seller;
        return (
            <ScrollView>
                {sellerDetails(seller)}
                <View style={{ paddingLeft: 15, paddingTop: 15, paddingBottom: 5 }}>
                    <Text style={globalStyles.pageTitle}>{seller.name}'s Listings</Text>
                </View>
                <View style={{ justifyContent: "center", alignItems: "center", }}>
                    <FlatList
                        style={{ paddingBottom: 10 }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            petBuyCard(item, this.props.navigation)
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        data={this.state.data}
                    />
                </View>
            </ScrollView>
        );
    }
}