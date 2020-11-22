import React from "react";
import "react-navigation";
import "react-navigation-props-mapper";
import "@react-navigation/native";
import "react-navigation-hooks";
import { View, ScrollView, BackHandler } from "react-native";
import {
  buyerInfo,
  acceptBuyer,
  rejectBuyer,
} from "../../components/buyerInfoComponent";
import { db } from "../../database/firebase";
console.disableYellowBox = true;

export default class buyerProfile extends React.Component {
  //Back button handler
  componentDidMount() {
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
    const item = this.props.route.params.item;

    let already_accepted = false;

    db.collection("petListings")
      .doc(item.pet_id)
      .collection("buyer_applications")
      .where("is_accepted", "==", true)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        already_accepted = true;
      });

    return (
      <ScrollView>
        {buyerInfo(item)}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {acceptBuyer(item, this.props.navigation)}

          {rejectBuyer(item, this.props.navigation)}
        </View>
      </ScrollView>
    );
  }
}
