import React from "react";
import { auth } from "./database/firebase";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };

  onLogin() {
    const { email, password } = this.state;

    auth
      .signInWithEmailAndPassword(email, password)
      .then((e) => {
        const user = auth.currentUser;
        if (user.emailVerified) {
          this.props.navigation.navigate("Home");
        } else {
          this.props.navigation.navigate("Home"); ///////////////////////////////////////////////////////////////////////////////////////////////////
          alert("Email address is not verified.");
        }
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

  onForgotPassword(email) {
    auth
      .sendPasswordResetEmail(email)
      .then((e) => {
        alert(`A password reset email has been sent to ${email}`);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <Text style={styles.heading}>WELCOME TO {"\n"} PET SEARCH!</Text>

          <View style={styles.titleContainer}>
            <View style={styles.rectangle}>
              <Text style={styles.titles}>Email:</Text>
              <TextInput
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
                style={styles.input}
              />
              <Text style={styles.titles}>Password:</Text>
              <TextInput
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
                secureTextEntry={true}
                style={styles.input}
              />
              <Text
                onPress={() =>
                  this.props.navigation.navigate("Forgot Password")
                }
              >
                Forgot Password?
              </Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  title={"Login"}
                  style={styles.buttons}
                  onPress={this.onLogin.bind(this)}
                >
                  <Text style={styles.buttonsText}>Login</Text>
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
    height: 280,
    backgroundColor: "#b8d9ff",
    position: "absolute",
    padding: 20,
    zIndex: 1,
  },
  titles: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
