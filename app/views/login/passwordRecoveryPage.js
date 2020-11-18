import React from "react";
import { auth } from "../database/firebase";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Input } from "react-native-elements";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import globalStyles from "../styleSheet/styleSheet";
import { primaryColour1, primaryColour2 } from "../styleSheet/styleSheet";

export default class PasswordRecoveryPage extends React.Component {
  state = {
    email: "",
  };

  onPasswordRecovery(email) {
    auth
      .fetchSignInMethodsForEmail(email)
      .then((signInMethod) => {
        if (signInMethod.length) {
          auth.sendPasswordResetEmail(email).then((sentEmail) => {
            alert(
              `An email has been sent, please reset your account password at ${email}`
            );
          });
          this.props.navigation.navigate("Login");
        } else {
          alert("Email address is invalid.");
        }
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
            alert("Email address is invalid.");
            break;
        }
      });
  }

  render() {
    return (
      <View style={globalStyles.loginLogoContainer}>
        <Image
          style={globalStyles.loginLogo}
          source={{
            uri:
              "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FlogoWithWords.png?alt=media&token=37437e7d-7cb4-43e4-a567-6cfe5f109989",
          }}
        />
        <View style={globalStyles.loginInputContainer}>
          <Input
            placeholder="EMAIL"
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            leftIcon={{
              type: "ionicons",
              name: "mail-outline",
              size: 25,
              color: primaryColour1,
              paddingRight: 10,
              paddingLeft: 5,
            }}
          />
        </View>
        <View style={globalStyles.landingButtonsContainer}>
          <TouchableOpacity
            style={globalStyles.landingButtons}
            onPress={() => this.onPasswordRecovery(this.state.email)}
          >
            <Text style={globalStyles.landingButtonsText}>RESET PASSWORD</Text>
          </TouchableOpacity>

          <Text
            style={globalStyles.loginTitle}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            BACK TO <Text style={globalStyles.linkText}>{"LOGIN"}</Text>
          </Text>
        </View>
        <Image
          style={globalStyles.logo2}
          source={{
            uri:
              "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Flogo.svg?alt=media&token=21d331fe-dc33-4021-a632-aeaa3b7cf6c4",
          }}
        />
      </View>
    );
  }
}
