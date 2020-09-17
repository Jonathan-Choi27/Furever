import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground } from "react-native";
import * as firebase from 'firebase'


// const image = { require: "../images/dog-1.jpg" };
const image = { uri: "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fdog-1.jpg?alt=media&token=837ad9b6-e404-4e37-861b-707e97178072" };

    // const ref = firebase.storage().ref("gs://pet-search-soft3888.appspot.com/images/dog-1.jpg");
    // const url = ref.getDownloadURL();
    // const image = { uri: url};

export default class LandingPage extends React.Component {
  render() {

    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
            <View style={styles.loginContainer}>
          <Text 
            style={styles.heading}>
            WELCOME TO PET SEARCH!</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttons}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text style={styles.buttonsText}>Login</Text>
          </TouchableOpacity>  
          <TouchableOpacity style={styles.buttons}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    left: 0
  },
  loginContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: 48,   
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    color: "#FFFFFF",
    textAlign: "center",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    marginTop: 50
  },
  buttonsContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    // // color: "#666",
    // backgroundColor: "#447ECB",
    // margin: 50,
    // padding: 10,
    // marginBottom: 150,
  },
  buttons: {
    // alignItems: "center",
    // flexGrow: 1,
    // justifyContent: "center",
    backgroundColor: "#89CFF0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 240,
    marginTop: 30,
    height: 40
  },
  buttonsText: {
    color: "#000000",
    fontSize: 16,
  }
});
