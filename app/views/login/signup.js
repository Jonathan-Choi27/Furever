import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { CheckBox } from "react-native-elements";
import firebase from "firebase";
import { db } from "../database/firebase";
import { Input } from "react-native-elements";
import { AppLoading } from "expo";
import * as Font from "expo-font";

export default class SignUp extends React.Component {
  state = {
    name: "",
    email: "",
    confirmPassword: "",
    password: "",
    dob: "",
    isPetShop: false,
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
      // ||
      // !/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i.test(
      //   dob
      // ) ||
      // new Date().getFullYear() - dob.substr(dob.length - 4) < 18 ||
      // !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
      //   email
      // ) ||
      // !/^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/i.test(
      //   name
      // )
    ) {
      alert("All input fields required and must be valid.");
      this.setState({ name: "" });
      this.setState({ email: "" });
      this.setState({ password: "" });
      this.setState({ dob: "" });
      this.setState({ confirmPassword: "" });
      this.setState({ isPetShop: false });
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
                isPetShop: this.state.isPetShop,
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
          switch (error.code) {
            case "auth/email-already-in-use":
              alert(`Email address ${this.state.email} already in use.`);
              break;
            case "auth/invalid-email":
              alert("Email address is invalid.");
              break;
            case "auth/operation-not-allowed":
              alert("Error during sign up.");
              break;
            case "auth/weak-password":
              alert(
                "Password is not strong enough. Add additional characters including special characters and numbers."
              );
              break;
          }
        });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FlogoWithWords.png?alt=media&token=a0ce1a26-d23b-4379-985e-0bbdfd061ee7",
              }}
            />
            <View style={styles.inputContainer}>
              <Input
                placeholder="NAME"
                value={this.state.name}
                onChangeText={(name) => this.setState({ name })}
                leftIcon={{
                  type: "font-awesome",
                  name: "user",
                  size: 20,
                  color: "#447ECB",
                }}
              />
              <Input
                placeholder="DD/MM/YYYY"
                value={this.state.dob}
                onChangeText={(dob) => this.setState({ dob })}
                leftIcon={{
                  type: "font-awesome",
                  name: "calendar",
                  size: 16,
                  color: "#447ECB",
                }}
              />
              <Input
                placeholder="EMAIL"
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
                leftIcon={{
                  type: "font-awesome",
                  name: "envelope",
                  size: 15,
                  color: "#447ECB",
                }}
              />
              <Input
                placeholder="PASSWORD"
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={(password) => this.setState({ password })}
                leftIcon={{
                  type: "font-awesome",
                  name: "lock",
                  size: 23,
                  color: "#447ECB",
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
                  type: "font-awesome",
                  name: "lock",
                  size: 23,
                  color: "#447ECB",
                }}
              />
            </View>

            <CheckBox
              title="Are you a pet shop?"
              checked={this.state.isPetShop}
              onPress={() =>
                this.setState({ isPetShop: !this.state.isPetShop })
              }
            />

            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.buttons} onPress={this.submit}>
                <Text style={styles.buttonsText}>SIGN UP</Text>
              </TouchableOpacity>
              <Text
                style={styles.title}
                onPress={() => this.props.navigation.navigate("Login")}>
                ALREADY HAVE AN ACCOUNT?{" "}
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
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: 30,
  },
  inputContainer: {
    width: 280,
    color: "#447ECB",
  },
  logo: {
    width: 264,
    height: 170,
  },
  logo2: {
    width: 25,
    height: 25,
  },
  title: {
    marginTop: 10,
    textAlign: "center",
    color: "#447ECB",
    padding: 10,
  },
  buttonsContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  buttons: {
    backgroundColor: "#447ECB",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 220,
    marginTop: 10,
    height: 35,
  },
  buttonsText: {
    color: "white",
    fontSize: 15,
  },
});
