import * as React from "react";
import { View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import { db } from "../database/firebase";
import { auth } from "../database/firebase";
import Profile from "./displayProfile";

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profileData: {},
      editProfile: false,
      defaultProfile: true,
    };
  }

  async componentDidMount() {
    this.fetchData();
  }

  //Fetch data and store into profileData
  async fetchData() {
    const dict = {};
    const user = auth.currentUser;
    await db
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        dict["name"] = doc.data().name;
        dict["photo"] = doc.data().photo;
        dict["profileText"] = doc.data().profileText;
        dict["email"] = doc.data().email;

        this.setState({
          profileData: dict,
        });
      });
  }

  render() {
    return (
      <Profile
        data={this.state.profileData}
        navigation={this.props.navigation}
        //Needed to refresh profile page on update profile
        refresh={() => this.fetchData()}
      />
    );
  }
}
