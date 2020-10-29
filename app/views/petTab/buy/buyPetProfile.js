import React from "react";
import "react-navigation"
import "react-navigation-props-mapper"
import "@react-navigation/native"
import 'react-navigation-hooks'
import {
    View,
    ScrollView,
    Text,
  } from "react-native";
console.disableYellowBox = true;
import {expressInterest, profileInfo, sellerInfo} from "../../components/petProfileComponents";
import {onBuyTab} from "../../components/petTabComponents";
import { db } from "../../database/firebase";

export default class buyPetProfile extends React.Component {
    state = {
        name: "",
        dob: "",
        email: "",
        isPetShop: false,
        profileText: "",
        photo: ""
     };
     
    async fetchData() {
        const uuid = this.props.route.params.item.uuid;
        db.collection("users")
            .doc(uuid)
            .get()
            .then((doc) => {
                this.setState({
                    name: doc.data().name,
                    dob: doc.data().dob,
                    email: doc.data().email,
                    isPetShop: doc.data().isPetShop,
                    profileText: doc.data().profileText,
                    photo: doc.data().photo,
                });
        });
    };

    async componentDidMount() {
        this.fetchData();
    };
    
    render() {
        const item = this.props.route.params.item;
        return (
            <View style={{paddingBottom: 50}}>
                {onBuyTab(this.props.navigation)}
                <ScrollView>
                    {profileInfo(item)}
                    {sellerInfo(this.state, this.props.navigation)}
                    {expressInterest(item, this.props.navigation)}
                </ScrollView>
            </View>
        );
    }
}