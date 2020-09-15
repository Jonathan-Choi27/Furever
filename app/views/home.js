import * as React from "react";
import {View, Text } from "react-native";

export default class LandingPage extends React.Component {
  render() {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Welcome home!</Text>

        </View>
      );
  }
}