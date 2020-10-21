import React from "react";
import { auth } from "../database/firebase";
import { View, Image, Text, BackHandler, StyleSheet } from "react-native";
import { darkGreen, green } from "../styleSheet/styleSheet";
import { Avatar, Accessory, Input } from "react-native-elements";
import { ActivityIndicator } from "react-native";
import { Button, TextInput, Card } from "react-native-paper";

export default class SetupTwo extends React.Component {
  render() {
    return (
      <View style={styles.loginLogoContainer}>
        <Text>2/2</Text>
        <Button
          mode="outlined"
          style={styles.buttons}
          onPress={() => this.props.navigation.replace("Home")}
        >
          <Text style={styles.buttonsText}> Finalise </Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    borderWidth: 1,
    borderColor: green,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    borderRadius: 5,
    height: 40,
  },
  buttonsText: {
    color: darkGreen,
    fontSize: 18,
    padding: 15,
  },
});
