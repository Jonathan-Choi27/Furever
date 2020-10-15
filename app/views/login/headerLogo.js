import React, { Component } from "react";
import { Image } from "react-native";

export default class HeaderLogo extends Component {
  render() {
    return (
      <Image
        source={{
          uri:
            "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FLogo-White.png?alt=media&token=3711a4e5-8dd0-4c91-a886-e590f97f17ae",
        }}
        style={{
          flex: 1,
          flexDirection: "row",
          width: 180,
          height: 23,
        }}
      />
    );
  }
}
