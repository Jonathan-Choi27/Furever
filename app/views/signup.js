import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
  Platform,
} from "react-native";
import { CheckBox } from "react-native-elements";

import firebase from "firebase";

export default class SignUp extends React.Component {
  state = {
    name: "",
    email: "",
    confirmPassword: "",
    password: "",
    country: "",
    username: "",
    dob: "",
  };

  submit = () => {
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
      confirmPassword == ""
    ) {
      alert("All input fields required.");
      return false;
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          alert(`Welcome ${this.state.name}, to Pet Search!`);
          this.props.navigation.navigate("Home");
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

    if (password != confirmPassword) {
      alert("Confirm password is invalid.");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <Text style={styles.heading}>WELCOME TO {"\n"} PET SEARCH!</Text>

          <View style={styles.titleContainer}>
            <View style={styles.rectangle}>
              <Text style={styles.titles}>Name:</Text>

              <TextInput
                onChangeText={(name) => this.setState({ name })}
                style={styles.input}
              />
              <Text style={styles.titles}>Date of Birth:</Text>

              <TextInput
                onChangeText={(dob) => this.setState({ dob })}
                style={styles.input}
              />
              <Text style={styles.titles}>Email:</Text>

              <TextInput
                onChangeText={(email) => this.setState({ email })}
                style={styles.input}
              />
              <Text style={styles.titles}>Password:</Text>

              <TextInput
                onChangeText={(password) => this.setState({ password })}
                secureTextEntry={true}
                style={styles.input}
              />
              <Text style={styles.titles}>Confirm Password:</Text>

              <TextInput
                onChangeText={(confirmPassword) =>
                  this.setState({ confirmPassword })
                }
                secureTextEntry={true}
                style={styles.input}
              />

              <CheckBox
                title="Are you a Pet Shop?"
                checked={this.state.checked}
              />

              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  title={"Sign Up"}
                  style={styles.buttons}
                  onPress={this.submit}
                >
                  <Text style={styles.buttonsText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const image = {
  uri:
    "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fdog-2.jpg?alt=media&token=d2186c7b-ae4a-49ed-b826-bc1b3ec3450e",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    left: 0,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    color: "#FFFFFF",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  buttonsContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  buttons: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 100,
    height: 40,
  },
  buttonsText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    backgroundColor: "white",
  },
  rectangle: {
    width: 300,
    height: 530,
    backgroundColor: "#b8d9ff",
    position: "absolute",
    padding: 20,
    zIndex: -1,
  },
  titles: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
