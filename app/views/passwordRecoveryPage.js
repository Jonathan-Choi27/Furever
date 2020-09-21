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
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.buttons}
                  onPress={() => this.onPasswordRecovery(this.state.email)}
                >
                  <Text style={styles.buttonsText}>Send Recovery Email</Text>
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
    "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fdog-1.jpg?alt=media&token=837ad9b6-e404-4e37-861b-707e97178072",
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
    width: 200,
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
    height: 180,
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
