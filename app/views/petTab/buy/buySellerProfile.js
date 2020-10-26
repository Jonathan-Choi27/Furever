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

import {sellerDetails} from "../../components/sellerInfoComponent";

export default class buySellerProfile extends React.Component {

    render() {
      const seller = this.props.route.params.seller;
      return (
          <View style={{paddingBottom: 50}}>
              <ScrollView>
                  {sellerDetails(seller)}
              </ScrollView>
          </View>
      );
    }
}