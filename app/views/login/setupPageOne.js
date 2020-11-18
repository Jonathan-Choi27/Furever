import * as React from "react";
import { ActivityIndicator } from "react-native";
import {
  Alert,
  View,
  Image,
  Text,
  BackHandler,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import { Button } from "react-native-paper";
import { CustomInput } from "../components/customInput";
import { Card } from "react-native-elements";
import CategorySelection from "./dropDownCategories";
import { openImagePicker, uploadPhoto } from "../components/imageUpload";
import { db } from "../database/firebase";
import { auth } from "../database/firebase";
import uuid from "react-native-uuid";
import { Avatar, Accessory } from "react-native-elements";
import globalStyles, {
  primaryColour1,
  primaryColour2,
  lightGrey,
  screenWidth,
} from "../styleSheet/styleSheet";

export default class SetupOne extends React.Component {
  state = {
    name: "",
    categoryErr: "",
    locationErr: "",
    category: "",
    location: "",
    profileText: "",
    photo:
      "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FemptyUser.png?alt=media&token=9414c888-2439-4138-a431-46a314a44c03",
    photoUuid: "",
    photoUri:
      "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FemptyUser.png?alt=media&token=9414c888-2439-4138-a431-46a314a44c03",
  };

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    const user = auth.currentUser;
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((user_doc) => {
        this.setState({ name: user_doc.data().name });
      });
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
    var submit = this.validationCheck();
    if (submit == true) {
      // dont set new photo uri if no pic selected or no update
      if (this.state.photo != this.state.photoUri) {
        const photoURL = await uploadPhoto(
          this.state.photoUri,
          this.state.photoUuid
        );

        this.setState({
          photo: photoURL,
        });
      }

      if (!this.state.profileText.trim()) {
        Alert.alert("Input Error", "Profile text cannot be empty");
        return;
      }

      if (!this.state.category.trim()) {
        Alert.alert("Input Error", "Category required.");
        return;
      }

      if (!this.state.location.trim()) {
        Alert.alert("Input Error", "Location required.");
        return;
      }

      const user = auth.currentUser;

      db.collection("users").doc(user.uid).update({
        photo: this.state.photo,
        name: this.state.name,
        profileText: this.state.profileText,
        preferenceCategory: this.state.category,
        preferenceLocation: this.state.location,
      });

      this.props.navigation.replace("Home");
    }
  }

  setPhotoUri = async () => {
    const get_uri = await openImagePicker();
    if (get_uri != null) {
      this.setState({
        photoUuid: uuid.v4(),
        photoUri: get_uri,
      });
    }
  };

  setCategory = (val) => {
    this.setState({
      category: val,
    });
  };

  setLocation = (val) => {
    this.setState({
      location: val,
    });
  };

  locationValidator = () => {
    var bool;
    if (this.state.location == "0" || this.state.location == "") {
      bool = false;
      this.setState({
        locationErr: "Select location",
      });
    } else {
      bool = true;
      this.setState({
        locationErr: "",
      });
    }

    return bool;
  };

  categoryValidator = () => {
    var bool;
    if (this.state.category == "0" || this.state.category == "") {
      bool = false;
      this.setState({
        categoryErr: "Select category",
      });
    } else {
      bool = true;
      this.setState({
        categoryErr: "",
      });
    }

    return bool;
  };


  validationCheck = () => {
    this.categoryValidator();
    this.locationValidator();
    var submit = true;
    return submit;
  };

  render() {
    return (
      <ScrollView>
        <View style={globalStyles.container}>
          <View
            style={{
              backgroundColor: primaryColour1,
              borderBottomRightRadius: 1000,
              borderBottomLeftRadius: 1000,
              transform: [{ scaleX: 2 }],
              overflow: "hidden",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 30,
                  marginTop: 60,
                  color: "#F5F5DC",
                  transform: [{ scaleX: 0.5 }],
                }}
              >
                We are almost there...
              </Text>
            </View>
            <View style={styles.avatarContainer}>
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
                  uri: this.state.photoUri,
                }}
              >
                <Accessory size={45} onPress={this.setPhotoUri} />
              </Avatar>
            </View>
          </View>

          <View style={{ marginTop: 20, width: screenWidth - 20 }}>
            <View>
              <Card containerStyle={{ borderRadius: 10 }}>
                <Text style={globalStyles.cardHeading}>Add Profile Text</Text>
                <CustomInput
                  placeholder="Can be anything about you..."
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

              <Card containerStyle={{ borderRadius: 10 }}>
                <Text style={globalStyles.cardHeading}>
                  Choose a pet preference...
                </Text>
                <CategorySelection
                  setCategory={this.setCategory}
                  categoryErr={this.state.categoryErr}
                  setLocation={this.setLocation}
                  locationErr={this.state.locationErr}
                />
              </Card>
            </View>
            <View
              style={{
                alignItems: "center",
                marginTop: 20,
                marginBottom: 40,
              }}
            >
              <Button
                mode="outlined"
                style={styles.buttons}
                onPress={() => this.handleUpdate()}
              >
                <Text style={styles.buttonsText}> Let's start </Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 50,
    height: 50,
  },
  avatarContainer: {
    marginTop: 20,
    marginBottom: 50,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    transform: [{ scaleX: 0.5 }],
  },
  buttons: {
    borderWidth: 1,
    borderColor: primaryColour2,
    backgroundColor: primaryColour2,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    borderRadius: 5,
    height: 40,
  },
  buttonsText: {
    color: "white",
    fontSize: 18,
    padding: 15,
  },
});
