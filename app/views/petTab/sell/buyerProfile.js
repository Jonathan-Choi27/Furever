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
import {buyerInfo, acceptBuyer, rejectBuyer} from "../../components/buyerInfoComponent";
import {onBuyTab} from "../../components/petTabComponents";
import styles from "../../styleSheet/styleSheet";

export default class buyerProfile extends React.Component {
    render() {
        const item = this.props.route.params.item; 
        return (
            <ScrollView>
                {buyerInfo(item)}
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    {acceptBuyer(item, this.props.navigation)}
                    {/* {rejectBuyer(item, this.props.navigation)} */}
                </View>
                
            </ScrollView>
        );
    }
}