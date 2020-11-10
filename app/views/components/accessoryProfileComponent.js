import React, { useState } from "react";
import { Text, View, TouchableOpacity, Dimensions, Image } from "react-native";
import { Card, } from "react-native-elements";
import { Button } from "react-native-paper";
import styles from "../styleSheet/styleSheet";
import Icon from 'react-native-vector-icons/AntDesign';
import { darkGreen, green, lightGreen, lightGrey, orange, lightBlue } from "../styleSheet/styleSheet";

const screenWidth = Math.round(Dimensions.get("window").width);

const checkDocuments = (field) => {
  if (field === "") {
    return "No Documents Provided."
  }
  return field;
}

const checkAdditional = (additional) => {
  if (additional === "") {
    return "No Additional Information Provided."
  }
  return additional;
}

export const profileInfo = (item, navigation) => {
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 0 }}>
        {cartTab(item, navigation)}
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: screenWidth, height: 250 }}
            source={{
              uri: item.photo,
            }}
          />
        </View>
        <Card containerStyle={styles.cardContentContainer}>
          <Text
            style={{ fontWeight: "bold", fontSize: 30, color: "black" }}>
            {item.accessoryName}
          </Text>
        </Card>

        <Card containerStyle={styles.cardContentContainer}>
          <Text style={styles.cardHeading}>Item Description</Text>
          <View style={styles.cardContainer}>
            <View style={{ paddingLeft: 1, paddingRight: 15 }}>
                <Text style={styles.contentTextBold}>Price: </Text>
              <Text style={styles.contentTextBold}>Material: </Text>
              <Text style={styles.contentTextBold}>Size: </Text>
              <Text style={styles.contentTextBold}>Colour: </Text>
              {/* <Text style={styles.contentTextBold}>Comments: </Text> */}
            </View>
            <View style={{ flex: 1}}>
              <Text numberOfLines={1} style={styles.contentText}>{item.price}</Text>
              <Text numberOfLines={1} style={styles.contentText}>{item.material}</Text>
              <Text numberOfLines={1} style={styles.contentText}>{item.size}</Text>
              <Text numberOfLines={1} style={styles.contentText}>{item.colour}</Text>
              {/* <Text numberOfLines={1} style={styles.contentText}>{item.comments}</Text> */}
            </View>
          </View>
        </Card>
      </View>
    </View>
  );
};

export const sellerInfo = (seller, navigation) => {
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.cardContentContainer}>
        <Text style={styles.cardHeading}>Seller Information</Text>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, width: 100, justifyContent: 'center', alignItems: 'center', }}>
            <Image
              style={{ height: 40, width: 40, borderRadius: 40 / 2, }}
              source={{
                uri: seller.photo,
              }}
            />
            <Text style={{ textAlign: "center", paddingTop: 5 }}>{seller.name}</Text>
          </View>
          <View style={{ flex: 4, paddingTop: 2, paddingLeft: 10, paddingRight: 10 }}>
            <Text >{seller.profileText}</Text>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
              <Button
                style={{
                  backgroundColor: green,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  height: 25,
                  width: 120
                }}
                mode="contained"
                onPress={() => navigation.navigate("sellerProfile", { seller })}
              >
                <Text style={{
                  color: "#ffffff",
                  fontSize: 12,
                  padding: 5,
                  fontWeight: "bold"
                }}>
                  More Info
                    </Text>
              </Button>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};


