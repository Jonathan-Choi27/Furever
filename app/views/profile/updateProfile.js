import * as React from "react";
import { ActivityIndicator, Alert } from "react-native";
import {
  View,
  Image,
  Text,
  BackHandler,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import { CustomInput } from "../components/customInput";
import { Card } from "react-native-elements";
import { openImagePicker, uploadPhoto } from "../components/imageUpload";
import { db, auth } from "../database/firebase";
import uuid from "uuid/v4";
import { Avatar, Accessory } from "react-native-elements";
import globalStyles, {
  primaryColour1,
  primaryColour2,
  screenWidth,
} from "../styleSheet/styleSheet";
import { YellowBox } from 'react-native';

// Not using state persistence or deep link to the screen which accepts functions in params
YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

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
      prevName: profileData.name,
      prevProfileText: profileData.profileText,
    };
  }

  //Handle back button
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

  async handleUpdate() {
    //Dont set new photo uri if no pic selected or no update
    if (this.state.photo != "" && this.state.photo_uri != null) {
      const photoURL = await uploadPhoto(
        this.state.photo,
        this.state.photo_uuid
      );

      this.setState({
        photo: photoURL,
      });
    }

    const user = auth.currentUser;

    db.collection("users")
      .doc(user.uid)
      .update({
        photo: this.state.photo,
        name: this.state.name,
        profileText: this.state.profileText,
      })
      .then(() => {
          Alert.alert("Alert", "Update successful!");
        this.props.route.params.refresh();
        this.props.navigation.goBack();
      });
  }

  setPhotoUri = async () => {
    const get_uri = await openImagePicker();
    if (get_uri != null) {
      this.setState({
        photo_uuid: uuid(),
        photo: get_uri,
      });
    }
  };

  render() {
    return (
      <ScrollView>
        <View
          style={{
            backgroundColor: primaryColour2,
            borderBottomRightRadius: 1000,
            borderBottomLeftRadius: 1000,
            transform: [{ scaleX: 2 }],
            overflow: "hidden",
          }}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 30,
                marginTop: 60,
                color: "#F5F5DC",
                transform: [{ scaleX: 0.5 }],
              }}>
              Edit Profile
            </Text>
          </View>
          <View style={globalStyles.avatarContainer}>
            <View style={{ opacity: 0.1, position: "absolute" }}>
              <Image
                style={{
                  left: 140,
                  width: 750 / 1.7,
                  height: 610 / 1.7,
                }}
                source={{
                  uri:
                    "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FLogoDogWhite.png?alt=media&token=d2ba6451-beeb-4815-8782-a31601436e20",
                }}
              />
            </View>
            <Avatar
              size={150}
              rounded
              renderPlaceholderContent={<ActivityIndicator />}
              source={{
                uri: this.state.photo,
              }}>
              <Accessory size={45} onPress={this.setPhotoUri} />
            </Avatar>
          </View>
        </View>

        <View style={{ marginTop: 20, width: screenWidth }}>
          <View>
            <Card containerStyle={{ borderRadius: 10 }}>
              <Text style={globalStyles.cardHeading}>Edit Display Name</Text>
              <CustomInput
                placeholder={this.state.prevName}
                onChangeText={(name) => this.setState({ name })}
                multiline={true}
                leftIcon={
                  <Icon
                    name="ios-paper"
                    type="ionicon"
                    color={primaryColour1}
                    containerStyle={{ paddingLeft: 7, paddingRight: 10 }}
                  />
                }
              />
            </Card>
            <Card containerStyle={{ borderRadius: 10 }}>
              <Text style={globalStyles.cardHeading}>Edit Profile Text</Text>
              <CustomInput
                placeholder={this.state.prevProfileText}
                onChangeText={(profileText) => this.setState({ profileText })}
                errorMessage={this.state.healthErr}
                multiline={true}
                leftIcon={
                  <Icon
                    name="ios-paper"
                    type="ionicon"
                    color={primaryColour1}
                    containerStyle={{ paddingLeft: 7, paddingRight: 10 }}
                  />
                }
              />
            </Card>
          </View>

          <View style={globalStyles.applicationButtonsContainer}>
            <TouchableOpacity
              style={globalStyles.buttons}
              onPress={() => this.handleUpdate()}>
              <Text style={globalStyles.buttonsText}>UPDATE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}
