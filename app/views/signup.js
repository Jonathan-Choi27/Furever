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
import firebase from "firebase";

export default class SignUp extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
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
      firstName,
      lastName,
    } = this.state;

    if (
      dob == "" ||
      phoneNumber == "" ||
      password == "" ||
      email == "" ||
      firstName == "" ||
      lastName == ""
    ) {
      alert("All input fields required.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          alert(`Welcome ${firstName}, to Pet Search!`);
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
            default:
              alert(error.message);
              break;
          }
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 30 }}>Sign Up</Text>

        <TextInput
          onChangeText={(firstName) => this.setState({ firstName })}
          placeholder="First Name"
          style={inputStyle.container}
        />
        <TextInput
          onChangeText={(lastName) => this.setState({ lastName })}
          placeholder="Last Name"
          style={inputStyle.container}
        />

        <TextInput
          onChangeText={(password) => this.setState({ password })}
          placeholder="Password"
          secureTextEntry={true}
          style={inputStyle.container}
        />

        <TextInput
          onChangeText={(email) => this.setState({ email })}
          placeholder="Email"
          style={inputStyle.container}
        />

        <TextInput
          onChangeText={(dob) => this.setState({ dob })}
          placeholder="Date of Birth"
          style={inputStyle.container}
        />

        <TextInput
          onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
          placeholder="Phone Number"
          style={inputStyle.container}
        />

        <Button title="Sign Up" onPress={this.submit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const inputStyle = StyleSheet.create({
  container: {
    backgroundColor: "#efefef",
    padding: 10,
    width: "70%",
    marginTop: 10,
    fontSize: 18,
  },
});
