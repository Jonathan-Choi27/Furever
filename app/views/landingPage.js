import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

export default class LandingPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.titleContainer}>
            <Text style={styles.heading}>WELCOME TO {"\n"} PET SEARCH!</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text style={styles.buttonsText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => this.props.navigation.navigate("Sign Up")}
            >
              <Text style={styles.buttonsText}>Sign Up</Text>
            </TouchableOpacity>
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
    alignItems: "center",
    flexGrow: 1,
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
    flexGrow: 1,
    justifyContent: "center",
    marginTop: 50,
  },
  buttonsContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  buttons: {
    backgroundColor: "#89CFF0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 140,
    marginTop: 30,
    height: 40,
  },
  buttonsText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
});
