import React, { Component } from "react";

import { View, Image, Header } from "react-native";
import Logo from "../../images/pet-search-logo.png";

export default class HeaderLogo extends Component {
  render() {
    return (
      // <View>
        <Image
          source={{
            uri:
              "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet-search-logo.png?alt=media&token=7b2f7152-027f-4b71-986d-35af8aac12b3",
          }}
          style={{
            flexDirection: "row",
            width: 100,
            height: 100,
          }}
        />      
      // </View>
    );
  }
}