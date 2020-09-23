import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";

export default class LandingPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={{ uri: "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FlogoWithWords.png?alt=media&token=a0ce1a26-d23b-4379-985e-0bbdfd061ee7" }}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Text style={styles.title}>FIND YOUR PERFECT PET TODAY</Text>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={styles.buttonsText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttons}
            onPress={() => this.props.navigation.navigate("Sign Up")}
          >
            <Text style={styles.buttonsText}>SIGN UP</Text>
          </TouchableOpacity>
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
    justifyContent: 'center',
    top: 200
  },
  logo: {
    width: 264,
    height: 170
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
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
    width: 200,
    marginTop: 10,
    height: 35,
  },
  buttonsText: {
    color: "white",
    fontSize: 15,
  }
});
