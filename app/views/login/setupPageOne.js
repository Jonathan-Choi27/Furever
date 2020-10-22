import * as React from "react";
import { ActivityIndicator } from "react-native";
import { View, Image, Text, BackHandler, StyleSheet } from "react-native";
import { Button, TextInput, Card } from "react-native-paper";
import { openImagePicker, uploadPhoto } from "../components/ImageUpload";
import { db } from "../database/firebase";
import { auth } from "../database/firebase";
import uuid from "react-native-uuid";
import { Avatar, Accessory, Input } from "react-native-elements";
import { darkGreen, green } from "../styleSheet/styleSheet";

export default class SetupOne extends React.Component {
  state = {
    name: "",
    photo:
      "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FemptyUser.png?alt=media&token=9414c888-2439-4138-a431-46a314a44c03",
    photo_uuid: "",
    photo_uri: "",
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
    // dont set new photo uri if no pic selected or no update
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

    db.collection("users").doc(user.uid).update({
      photo: this.state.photo,
      name: this.state.name,
      profileText: this.state.profileText,
    });

    this.props.navigation.replace("Home");
  }

  setPhotoUri = async () => {
    const get_uri = await openImagePicker();
    if (get_uri != null) {
      this.setState({
        photo_uuid: uuid.v4(),
        photo: get_uri,
      });
    }
  };

  render() {
    return (
      <View>
        <View
          style={{
            backgroundColor: darkGreen,
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
              Upload a profile image
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
                uri: this.state.photo,
              }}
            >
              <Accessory size={45} onPress={this.setPhotoUri} />
            </Avatar>
          </View>
        </View>

        <View style={{ marginHorizontal: 50, marginTop: 30 }}>
          <View>
            <Input
              label="Add Profile Text"
              placeholder="Can be anything about you..."
              labelStyle={{ color: darkGreen }}
              onChangeText={(profileText) => this.setState({ profileText })}
              multiline
            />

            <View style={{ alignItems: "center", marginTop: 25 }}>
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
      </View>
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
    borderColor: green,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    borderRadius: 5,
    height: 40,
  },
  buttonsText: {
    color: darkGreen,
    fontSize: 18,
    padding: 15,
  },
});