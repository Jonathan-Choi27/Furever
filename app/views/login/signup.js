import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { CheckBox } from "react-native-elements";
import firebase from "firebase";
import { db } from "../database/firebase";
import { Input } from "react-native-elements";
import globalStyles from "../styleSheet/styleSheet";
import { primaryColour1 } from "../styleSheet/styleSheet";

export default class SignUp extends React.Component {
  state = {
    name: "",
    email: "",
    confirmPassword: "",
    password: "",
    dob: "",
    isNewUser: true,
  };

  submit = async () => {
    const {
      dob,
      password,
      phoneNumber,
      email,
      name,
      confirmPassword,
    } = this.state;

    if (
      dob == "" ||
      phoneNumber == "" ||
      password == "" ||
      email == "" ||
      name == "" ||
      confirmPassword == "" ||
      password != confirmPassword
    ) {
      if (
        !/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/i.test(
          name
        )
      ) {
        alert("Name field is invalid.");
        return false;
      }
      if (
        !/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i.test(
          dob
        )
      ) {
        alert("Date of birth is invalid.");
        return false;
      }
      if (new Date().getFullYear() - dob.substr(dob.length - 4) < 18) {
        alert("You must be over 18.");
        return false;
      }
      if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
          email
        )
      ) {
        alert("Email is invalid.");
        return false;
      }
      alert("Password fields must be valid.");
      return false;
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((e) => {
          const user = firebase.auth().currentUser;
          user
            .updateProfile({
              displayName: name,
            })
            .then((e) => {
              db.collection("users").doc(user.uid).set({
                name: this.state.name,
                dob: this.state.dob,
                email: this.state.email,
                isNewUser: this.state.isNewUser,
                uuid: user.uid,
              });
              user.sendEmailVerification();
              alert(
                `An email has been sent, please verify your account at ${email}`
              );
              this.props.navigation.navigate("Login");
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  render() {
    return (
      <View style={globalStyles.signupContainer}>
        <Image
          style={globalStyles.logo2}
          source={{
            uri:
              "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FlogoWithWords.png?alt=media&token=37437e7d-7cb4-43e4-a567-6cfe5f109989",
          }}
        />
        <View style={globalStyles.signupInputContainer}>
          <Input
            placeholder="NAME"
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
            leftIcon={{
              type: "ionicons",
              name: "person-outline",
              size: 25,
              color: primaryColour1,
              paddingRight: 10,
              paddingLeft: 5,
            }}
            errorStyle={{
              height: 0,
            }}
          />
          <Input
            placeholder="DD/MM/YYYY"
            value={this.state.dob}
            onChangeText={(dob) => this.setState({ dob })}
            leftIcon={{
              type: "font-awesome",
              name: "calendar",
              size: 20,
              color: primaryColour1,
              paddingRight: 12,
              paddingLeft: 8,
            }}
            errorStyle={{
              height: 0,
            }}
          />
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
            errorStyle={{
              height: 0,
            }}
          />
          <Input
            placeholder="PASSWORD"
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
            leftIcon={{
              type: "ionicons",
              name: "lock-outline",
              size: 25,
              color: primaryColour1,
              paddingRight: 10,
              paddingLeft: 5,
            }}
            errorStyle={{
              height: 0,
            }}
          />
          <Input
            placeholder="CONFIRM PASSWORD"
            secureTextEntry={true}
            value={this.state.confirmPassword}
            onChangeText={(confirmPassword) =>
              this.setState({ confirmPassword })
            }
            leftIcon={{
              type: "ionicons",
              name: "lock-outline",
              size: 25,
              color: primaryColour1,
              paddingRight: 10,
              paddingLeft: 5,
            }}
            errorStyle={{
              height: 0,
            }}
          />
        </View>

        <TouchableOpacity
          style={globalStyles.landingButtons}
          onPress={this.submit}
        >
          <Text style={globalStyles.landingButtonsText}>SIGN UP</Text>
        </TouchableOpacity>
        <Text
          style={globalStyles.loginTitle}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          ALREADY HAVE AN ACCOUNT?{" "}
          <Text style={globalStyles.linkText}>{"LOGIN"}</Text>
        </Text>
      </View>
    );
  }
}
