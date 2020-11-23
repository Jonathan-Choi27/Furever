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
import { Icon } from "react-native-elements";
import { CustomInput } from "../components/customInput";
import { Card } from "react-native-elements";
import { auth } from "../database/firebase";
import * as firebase from "firebase";
import globalStyles, {
  primaryColour1,
  primaryColour2,
  screenWidth,
} from "../styleSheet/styleSheet";

export default class ProfilePrivacy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPassword: "",
      currentPassword: "",
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

  reauthenticate = (currentPassword) => {
    var user = auth.currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  //Change Password Handler
  onChangePasswordPress = () => {
    if (this.state.currentPassword == this.state.newPassword) {
      Alert.alert(
        "Password Error",
        "You should not reuse the current password as the new password"
      );
      return;
    }
    this.reauthenticate(this.state.currentPassword)
      .then(async () => {
        var user = auth.currentUser;
        await user
          .updatePassword(this.state.newPassword)
          .then(() => {
            Alert.alert("Password changed", "Your change was successful.");
            this.setState({ newPassword: "" });
            this.setState({ currentPassword: "" });
            this.props.navigation.navigate("profileHome");
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
      <ScrollView>
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

          <View style={{ marginTop: 20, width: screenWidth }}>
            <View>
              <Card containerStyle={{ borderRadius: 10 }}>
                <Text style={globalStyles.cardHeading}>Current Password</Text>
                <CustomInput
                  placeholder="Current Password"
                  secureTextEntry={true}
                  onChangeText={(text) =>
                    this.setState({ currentPassword: text })
                  }
                  multiline={false}
                  leftIcon={
                    <Icon
                      name="lock-outline"
                      type="ionicons"
                      color={primaryColour1}
                      containerStyle={{ paddingLeft: 7, paddingRight: 10 }}
                    />
                  }
                />
              </Card>
              <Card containerStyle={{ borderRadius: 10 }}>
                <Text style={globalStyles.cardHeading}>New Password</Text>
                <CustomInput
                  placeholder="New Password"
                  secureTextEntry={true}
                  onChangeText={(text) => this.setState({ newPassword: text })}
                  errorMessage={this.state.healthErr}
                  multiline={false}
                  leftIcon={
                    <Icon
                      name="lock-outline"
                      type="ionicons"
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
                onPress={this.onChangePasswordPress}
              >
                <Text style={globalStyles.buttonsText}>UPDATE</Text>
              </TouchableOpacity>
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
