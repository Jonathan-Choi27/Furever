import React from "react";
import "react-navigation";
import "react-navigation-props-mapper";
import "@react-navigation/native";
import "react-navigation-hooks";
import { View, ScrollView, Text, BackHandler } from "react-native";
console.disableYellowBox = true;
import { profileInfo } from "../components/accessoryProfileComponent";

export default class accessoryListingProfile extends React.Component {
  //Handle back button
  async componentDidMount() {
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
    return <ScrollView>{profileInfo(item)}</ScrollView>;
  }
}
