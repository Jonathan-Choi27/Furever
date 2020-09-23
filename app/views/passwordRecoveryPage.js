import React from "react";
import { auth } from "./database/firebase";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import { Input } from 'react-native-elements';

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
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FlogoWithWords.png?alt=media&token=a0ce1a26-d23b-4379-985e-0bbdfd061ee7" }}
          />
          <View style={styles.inputContainer}>
            <Input
              placeholder='EMAIL'
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })}
              leftIcon={{ type: 'font-awesome', name: 'envelope', size: 15, color: "#2065d4" }}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => this.onPasswordRecovery(this.state.email)}
            >
              <Text style={styles.buttonsText}>SEND PASSWORD RESET EMAIL</Text>
            </TouchableOpacity>

            <Text
              style={styles.title2}
              onPress={() =>
                this.props.navigation.navigate("Login")
              }
            >
              HAVE AN ACCOUNT? <Text style={{ fontWeight: 'bold' }}>
                {'LOGIN'}
              </Text>
            </Text>
          </View>
          <Image
            style={styles.logo2}
            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Flogo.svg?alt=media&token=21d331fe-dc33-4021-a632-aeaa3b7cf6c4" }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  logoContainer: {
    alignItems: 'center',
    // flowGrow: 1,
    justifyContent: 'center',
    top: 180
  },
  inputContainer: {
    width: 280,
    color: "#2065d4"
  },
  logo: {
    width: 264,
    height: 170
  },
  logo2: {
    width: 25,
    height: 25
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
    color: "#2065d4",
    fontFamily: "Helvetica",
    padding: 10,
    fontSize: 16
  },
  title2: {
    marginTop: 10,
    textAlign: 'center',
    color: "#2065d4",
    fontFamily: "Helvetica",
    padding: 10
  },
  buttonsContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  buttons: {
    backgroundColor: "#2065d4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 260,
    marginTop: 10,
    height: 35,
  },
  buttonsText: {
    color: "white",
    fontSize: 15,
    fontFamily: "Helvetica"
  }
});