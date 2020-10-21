import React from "react";
import { auth } from "../database/firebase";
import { View, Image, Text, BackHandler, StyleSheet } from "react-native";
import { darkGreen, green } from "../styleSheet/styleSheet";
import { Avatar, Accessory, Input } from "react-native-elements";
import { ActivityIndicator } from "react-native";
import { Button, TextInput, Card } from "react-native-paper";
export default class SetupOne extends React.Component {
  render() {
    return (
      <View style={styles.loginLogoContainer}>
        <Image
          style={styles.loginLogo}
          source={{
            uri:
              "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FlogoWithWords.png?alt=media&token=ac29597a-9268-419f-8769-fa44ac76a5df",
          }}
        />
        <Text>1/2</Text>
        <Text>Upload Profile Photo</Text>
        <Avatar
          size={150}
          rounded
          renderPlaceholderContent={<ActivityIndicator />}
          source={{}}
        >
          <Accessory size={45} onPress={this.setPhotoUri} />
        </Avatar>
        <Button
          mode="outlined"
          style={styles.buttons}
          onPress={() => this.props.navigation.replace("Setup Two")}
        >
          <Text style={styles.buttonsText}> Next </Text>
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
