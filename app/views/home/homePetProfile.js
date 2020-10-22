import React from "react";
import "react-navigation"
import "react-navigation-props-mapper"
import "@react-navigation/native"
import 'react-navigation-hooks'
import {
    ScrollView
} from "react-native";
import {expressInterest, profileInfo, sellerInfo} from "../components/petProfileComponents";

export default class homePetProfile extends React.Component {
    render() {
        const item = this.props.route.params.item;
        return (
            <ScrollView>
                {profileInfo(item, this.closeModal)}
                {sellerInfo(item)}
                {expressInterest(item, this.props.navigation)}
            </ScrollView>
        );
    }
}