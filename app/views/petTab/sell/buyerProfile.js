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
import {buyerInfo} from "../../components/buyerInfoComponent";
import {onBuyTab} from "../../components/petTabComponents";
import styles from "../../styleSheet/styleSheet";

export default class buyerProfile extends React.Component {
    render() {
        const item = this.props.route.params.item;
        return (
            <View style={{paddingBottom: 50}}>
                {onBuyTab(this.props.navigation)}
                <ScrollView>
                    {buyerInfo(item)}
                    {/* {sellerInfo()}
                    {expressInterest(item, this.props.navigation)} */}
                </ScrollView>
            </View>
        );
    }
}