import React from "react";
import {Text, View, TouchableOpacity, Image } from "react-native";
import globalStyles from "../styleSheet/styleSheet";


export default class LandingPage extends React.Component {

  render() {
      return (
        <View style={globalStyles.landingContainer}>
          <View style={globalStyles.logoContainer}>
            <Image
              style={globalStyles.logo}
              source={{
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FlogoWithWords.png?alt=media&token=4d7beb37-6108-4c5c-95a7-5e0e89c4e6d0",
              }}
            />
          </View>
          <View style={globalStyles.landingButtonsContainer}>
            <Text style={globalStyles.landingTitle}>FIND YOUR PERFECT PET TODAY</Text>
            <TouchableOpacity
              style={globalStyles.landingButtons}
              onPress={() => this.props.navigation.replace("Login")}
            >
              <Text style={globalStyles.landingButtonsText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.landingButtons}
              onPress={() => this.props.navigation.replace("Sign Up")}
            >
              <Text style={globalStyles.landingButtonsText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
  }
}