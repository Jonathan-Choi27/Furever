import React from "react";
import "react-navigation";
import "react-navigation-props-mapper";
import "@react-navigation/native";
import "react-navigation-hooks";
import { ScrollView, BackHandler } from "react-native";
import {
  expressInterest,
  profileInfo,
  sellerInfo,
} from "../components/petProfileComponents";
import { db } from "../database/firebase";

export default class homePetProfile extends React.Component {
  state = {
    name: "",
    dob: "",
    email: "",
    profileText: "",
    photo: "",
    sellerId: "",
  };

  //Fetch Data
  async fetchData() {
    const uuid = this.props.route.params.item.uuid;
    db.collection("users")
      .doc(uuid)
      .get()
      .then((doc) => {
        //Calculate Average
        const arr = doc.data().averageRating;
        let avg;
        if (arr == undefined) {
          avg = 0;
        } else {
          let sum = 0;
          for (let i = 0; i < arr.length; i++) {
            sum += arr[i];
          }
          avg = sum / arr.length;
        }

        this.setState({
          name: doc.data().name,
          dob: doc.data().dob,
          email: doc.data().email,
          profileText: doc.data().profileText,
          photo: doc.data().photo,
          averageRating: avg,
          sellerId: uuid,
        });
      });
  }

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

  render() {
    const item = this.props.route.params.item;
    return (
      <ScrollView>
        {profileInfo(item)}
        {sellerInfo(this.state, this.props.navigation)}
        {expressInterest(item, this.props.navigation)}
      </ScrollView>
    );
  }
}
