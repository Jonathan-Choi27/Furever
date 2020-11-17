import React from "react";
import { auth, db } from "../database/firebase";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Input } from "react-native-elements";
import globalStyles from "../styleSheet/styleSheet";
import { primaryColour1 } from "../styleSheet/styleSheet";

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };

  onLogin() {
    const { email, password } = this.state;

    auth
      .signInWithEmailAndPassword(email, password)
      .then(async (e) => {
        const user = auth.currentUser;
        if (user.emailVerified) {
          var isFirstTime;
          await db
            .collection("users")
            .doc(user.uid)
            .get()
            .then((user_doc) => {
              isFirstTime = user_doc.data().isNewUser;
            });
          if (isFirstTime) {
            this.props.navigation.replace("Setup One");
          } else {
            this.props.navigation.replace("Home");
          }
        } else {
          this.props.navigation.replace("Home");
          alert("Email address is not verified.");
        }
      })
      .catch((error) => {
        alert(error);
      });
    this.setState({ email: "" });
    this.setState({ password: "" });
  }

  onForgotPassword(email) {
    auth
      .sendPasswordResetEmail(email)
      .then((e) => {
        alert(`A password reset email has been sent to ${email}`);
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    return (
      <View style={globalStyles.loginLogoContainer}>
        <Image
          style={globalStyles.loginLogo}
          source={{
            uri:
              "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FlogoWithWords.png?alt=media&token=4d7beb37-6108-4c5c-95a7-5e0e89c4e6d0",
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
          <Input
            placeholder="PASSWORD"
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            secureTextEntry={true}
            leftIcon={{
              type: "ionicons",
              name: "lock-outline",
              size: 25,
              color: primaryColour1,
              paddingRight: 10,
              paddingLeft: 5,
            }}
          />
        </View>
        <View style={globalStyles.loginButtonsContainer}>
          <TouchableOpacity
            style={globalStyles.landingButtons}
            onPress={this.onLogin.bind(this)}
          >
            <Text style={globalStyles.landingButtonsText}>LOGIN</Text>
          </TouchableOpacity>
          <Text
            style={globalStyles.loginTitle}
            onPress={() => this.props.navigation.replace("Forgot Password")}
          >
            FORGOT PASSWORD?
          </Text>
          <Text
            style={globalStyles.loginTitle2}
            onPress={() => this.props.navigation.replace("Sign Up")}
          >
            NO ACCOUNT? <Text style={globalStyles.linkText}>{"SIGN UP"}</Text>
          </Text>
        </View>
      </View>
    );
  }
}
