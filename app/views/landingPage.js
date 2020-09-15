import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default class LandingPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Text>Logo Goes Here!</Text>
          <Text>Pet Search</Text>
        </View>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate("Login")}
        />
        <Button
          title="Sign Up"
          onPress={() => this.props.navigation.navigate("Sign Up")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  loginContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  logo: {
    position: "absolute",
    width: 300,
    height: 100,
  },
});
