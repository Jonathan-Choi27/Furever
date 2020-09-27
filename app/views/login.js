import React from "react";
import { auth } from "./database/firebase";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Input } from "react-native-elements";

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
          this.props.navigation.replace("Home");
        } else {
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
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
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
              onChangeText={(password) => this.setState({ password })}
              secureTextEntry={true}
              leftIcon={{
                type: "font-awesome",
                name: "lock",
                size: 23,
                color: "#447ECB",
              }}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.buttons}
              onPress={this.onLogin.bind(this)}
            >
              <Text style={styles.buttonsText}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.title}
              onPress={() => this.props.navigation.replace("Forgot Password")}
            >
              FORGOT PASSWORD?
            </Text>

            <Text
              style={styles.title2}
              onPress={() => this.props.navigation.replace("Sign Up")}
            >
              NO ACCOUNT?{" "}
              <Text style={{ fontWeight: "bold" }}>{"SIGN UP"}</Text>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    top: 180,
  },
  inputContainer: {
    width: 280,
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
    fontSize: 16,
  },
  title2: {
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
