import React from "react";
import {Text, View, TouchableOpacity, Image } from "react-native";
import styles from "../styleSheet/styleSheet";


export default class LandingPage extends React.Component {

  render() {
      return (
        <View style={styles.landingContainer}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FlogoWithWords.png?alt=media&token=ac29597a-9268-419f-8769-fa44ac76a5df",
              }}
            />
          </View>
          <View style={styles.landingButtonsContainer}>
            <Text style={styles.landingTitle}>FIND YOUR PERFECT PET TODAY</Text>
            <TouchableOpacity
              style={styles.landingButtons}
              onPress={() => this.props.navigation.replace("Login")}
            >
              <Text style={styles.landingButtonsText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.landingButtons}
              onPress={() => this.props.navigation.replace("Sign Up")}
            >
              <Text style={styles.landingButtonsText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
  }
}