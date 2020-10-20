import React from "react";
import { auth } from "../database/firebase";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Input } from "react-native-elements";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import styles from "../styleSheet/styleSheet";
import { darkGreen, green } from "../styleSheet/styleSheet";

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
        <View style={styles.loginLogoContainer}>
          <Image
            style={styles.loginLogo}
            source={{
              uri:
                "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FlogoWithWords.png?alt=media&token=ac29597a-9268-419f-8769-fa44ac76a5df",
            }}
          />
          <View style={styles.loginInputContainer}>
            <Input
              placeholder="EMAIL"
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })}
              leftIcon={{
                type: "font-awesome",
                name: "envelope",
                size: 15,
                color: darkGreen,
                paddingRight: 10,
                paddingLeft: 5,
              }}
            />
          </View>
          <View style={styles.landingButtonsContainer}>
            <TouchableOpacity
              style={styles.landingButtons}
              onPress={() => this.onPasswordRecovery(this.state.email)}
            >
              <Text style={styles.landingButtonsText}>
                RESET PASSWORD
              </Text>
            </TouchableOpacity>

            <Text
              style={styles.loginTitle}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              BACK TO{" "}
              <Text style={{ fontWeight: "bold" }}>{"LOGIN"}</Text>
            </Text>
          </View>
          <Image
            style={styles.logo2}
            source={{
              uri:
                "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Flogo.svg?alt=media&token=21d331fe-dc33-4021-a632-aeaa3b7cf6c4",
            }}
          />
        </View>
      );
  }
}
