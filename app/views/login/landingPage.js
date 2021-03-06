import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import globalStyles from "../styleSheet/styleSheet";
import * as ScreenOrientation from "expo-screen-orientation";

export default class LandingPage extends React.Component {
  //Change To Portrait Mode
  async componentDidMount() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  }
  render() {
    return (
      <View style={globalStyles.landingContainer}>
        <View style={globalStyles.logoContainer}>
          <Image
            style={globalStyles.logo}
            source={{
              uri:
                "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FlogoWithWords.png?alt=media&token=37437e7d-7cb4-43e4-a567-6cfe5f109989",
            }}
          />
        </View>
        <View style={globalStyles.landingButtonsContainer}>
          <Text style={globalStyles.landingTitle}>
            FIND YOUR PERFECT PET TODAY
          </Text>
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
