import React from "react";
import "react-navigation";
import "react-navigation-props-mapper";
import "@react-navigation/native";
import "react-navigation-hooks";
import { View, ScrollView, Text, BackHandler } from "react-native";
console.disableYellowBox = true;
import {
  profileInfo,
  sellerInfo,
} from "../components/accessoryProfileComponent";
import { db } from "../database/firebase";
import Icon from "react-native-vector-icons/AntDesign";
import { Button } from "react-native-paper";
import globalStyles, {
  primaryColour1,
  primaryColour2,
  lightGrey,
  lightBlue,
} from "../styleSheet/styleSheet";
import { addItemToCart } from "../components/shopComponents";

export default class shopProfile extends React.Component {
  state = {
    name: "",
    dob: "",
    email: "",
    profileText: "",
    photo: "",
    quantity: 0,
    items: [],
  };

  async fetchData() {
    //Do Nothing
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

  pushItem(item) {
    const itemsArray = [];
    itemsArray.push(item);
    this.setState({ items: [...itemsArray] });
  }

  render() {
    const item = this.props.route.params.item;
    return (
      <View style={{ paddingBottom: 50 }}>
        <ScrollView>
          {profileInfo(item, this.props.navigation)}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 20,
            }}
          >
            <Button
              style={{
                backgroundColor: "primaryColour2",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
                height: 35,
                width: 120,
              }}
              mode="contained"
              onPress={() => addItemToCart(item)}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 12,
                  padding: 5,
                  fontWeight: "bold",
                }}
              >
                Add To Cart
              </Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}
