import * as React from "react";
import { View, Image, Text, BackHandler } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { openImagePicker, uploadPhoto } from "../components/ImageUpload";
import { db } from "../database/firebase";
import { auth } from "../database/firebase";
import uuid from "react-native-uuid";

export default class updateProfile extends React.Component {
  constructor(props) {
    super(props);
    const profileData = this.props.route.params.data;

    this.state = {
      name: profileData.name,
      photo: profileData.photo,
      profileText: profileData.profileText,
      photo_uuid: "",
      photo_uri: "",
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

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

  handleBackButtonClick() {
    this.props.navigation.goBack();
    return true;
  }

  async handleUpdate() {
    //   console.log("hi");
    console.log("photo uri" + this.state.photo_uri);
    if (this.state.photo != "" && this.state.photo_uri != null) {
      const photoURL = await uploadPhoto(
        this.state.photo,
        this.state.photo_uuid
      );

      this.setState({
        photo: photoURL,
      });
    }

    // console.log(this.state.photo);

    const user = auth.currentUser;
    // console.log(user.uid);

    db.collection("users").doc(user.uid).update({
      photo: this.state.photo,
      name: this.state.name,
      profileText: this.state.profileText,
    });

    console.log("hi");
    this.props.route.params.refresh();
    this.props.navigation.goBack();
  }

  setPhotoUri = async () => {
    const get_uri = await openImagePicker();

    this.setState({
      photo_uuid: uuid.v4(),
      photo: get_uri,
    });
  };

  // const navigation = props.route.params.navigation;
  render() {
    return (
      <View>
        <View>
          <Text>Update profile</Text>
          <Text> Name </Text>
          <TextInput
            onChangeText={(name) => this.setState({ name })}
            defaultValue={this.state.name}
          />
          <Text> Profile Text </Text>
          <TextInput
            onChangeText={(profileText) => this.setState({ profileText })}
            defaultValue={this.state.profileText}
          />

          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: this.state.photo }}
            // key={this.state.photo_uri}
          />

          <Button onPress={this.setPhotoUri}>
            <Text>Update Profile Photo</Text>
          </Button>

          <Button onPress={() => this.handleUpdate()}>
            <Text> Update </Text>
          </Button>
          {/* <Text>{this.state.profileData.name}</Text> */}
        </View>
      </View>
    );
  }
}
