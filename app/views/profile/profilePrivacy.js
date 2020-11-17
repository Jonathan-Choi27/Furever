import * as React from "react";
import {
  Alert,
  View,
  Image,
  Text,
  BackHandler,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { auth } from "../database/firebase";
import * as firebase from "firebase";
import { Input } from "react-native-elements";
import globalStyles, { primaryColour1, primaryColour2 } from "../styleSheet/styleSheet";
export default class ProfilePrivacy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPassword: "",
      currentPassword: "",
    };
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

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };

  reauthenticate = (currentPassword) => {
    var user = auth.currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  onChangePasswordPress = () => {
    this.reauthenticate(this.state.currentPassword)
      .then(async () => {
        var user = auth.currentUser;
        await user
          .updatePassword(this.state.newPassword)
          .then(() => {
            Alert.alert("Password changed", "Your change was successful.");
            this.setState({ newPassword: "" });
            this.setState({ currentPassword: "" });
          })
          .catch((error) => {
            alert(error);
            this.setState({ newPassword: "" });
            this.setState({ currentPassword: "" });
          });
      })
      .catch((error) => {
        alert(error);
      });
  };

  render() {
    return (
      <View>
        <View
          style={{
            backgroundColor: primaryColour2,
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
                color: "black",
                transform: [{ scaleX: 0.5 }],
              }}
            >
              {`Privacy and Security`}
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
          </View>
        </View>

        <View style={{ marginHorizontal: 50, marginTop: 30 }}>
          <Input
            value={this.state.currentPassword}
            placeholder="Current Password"
            secureTextEntry={true}
            labelStyle={{ color: primaryColour1 }}
            onChangeText={(text) => this.setState({ currentPassword: text })}
            leftIcon={{
              type: "ionicons",
              name: "lock-outline",
              size: 25,
              color: primaryColour1,
              paddingRight: 10,
              paddingLeft: 5,
            }}
          />

          <Input
            value={this.state.newPassword}
            placeholder="New Password"
            secureTextEntry={true}
            labelStyle={{ color: primaryColour1 }}
            onChangeText={(text) => this.setState({ newPassword: text })}
            leftIcon={{
              type: "ionicons",
              name: "lock-outline",
              size: 25,
              color: primaryColour1,
              paddingRight: 10,
              paddingLeft: 5,
            }}
          />
          <View style={globalStyles.applicationButtonsContainer}>
              <TouchableOpacity
                style={globalStyles.buttons}
                onPress={this.onChangePasswordPress}>
                <Text style={globalStyles.buttonsText}>Update</Text>
              </TouchableOpacity>
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
    borderColor: primaryColour2,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    borderRadius: 5,
    height: 40,
  },
  buttonsText: {
    color: primaryColour1,
    fontSize: 18,
    padding: 15,
  },
});
