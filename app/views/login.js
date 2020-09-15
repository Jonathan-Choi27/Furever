import React, { Component } from "react";
import { Button, TextInput, View, StyleSheet, Alert } from "react-native";
import firebase from "firebase";
import db from "./database/firebase";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  onLogin() {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.props.navigation.navigate("Home");
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
            alert("Email address is invalid.");
            break;
          case "auth/user-disabled":
            alert("User is disabled.");
            break;
          case "auth/user-not-found":
            alert("User is not found.");
            break;
          case "auth/wrong-password":
            alert("Password is invalid.");
            break;
        }
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          placeholder={"Email"}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={"Password"}
          secureTextEntry={true}
          style={styles.input}
        />

        <Button
          title={"Login"}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
});
