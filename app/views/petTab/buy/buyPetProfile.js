import React from "react";
import "react-navigation"
import "react-navigation-props-mapper"
import "@react-navigation/native"
import 'react-navigation-hooks'
import {
    View,
    ScrollView,
  } from "react-native";
console.disableYellowBox = true;
import {expressInterest, profileInfo, sellerInfo} from "../../components/petProfileComponents";
import {onBuyTab} from "../../components/petTabComponents";
import styles from "../../styleSheet/styleSheet";

export default class buyPetProfile extends React.Component {
    render() {
        const item = this.props.route.params.item;
        return (
            <View style={{paddingBottom: 50}}>
                {onBuyTab(this.props.navigation)}
                <ScrollView>
                    {profileInfo(item)}
                    {sellerInfo()}
                    {expressInterest(item, this.props.navigation)}
                </ScrollView>
            </View>
        );
    }
}