import React from "react";
import { Text, View, TouchableOpacity, Dimensions, Image } from "react-native";
import { Card, Button } from "react-native-elements";
import styles from "../styleSheet/styleSheet";
import { CustomInput, InputHeader } from "../components/CustomInput";
import { darkGreen, green, lightGreen, lightGrey, orange, lightBlue } from "../styleSheet/styleSheet";
import { SafeAreaView } from "react-native-safe-area-context";

export const profileInfo = (item) => {
  const screenWidth = Math.round(Dimensions.get("window").width);
  const textWidth = (screenWidth - 20) / 2;
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 0 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: screenWidth, height: 250 }}
            source={{
              uri: item.photo,
            }}
          />
        </View>
        <Card containerStyle={{ borderRadius: 10 }}>
          <Text
            style={{ fontWeight: "bold", fontSize: 30, color: "#404040" }}>
            {item.petName}'s Profile
          </Text>
        </Card>
      </View>

      <Card containerStyle={{ borderRadius: 10 }}>
        <InputHeader text="General Information"/>
          <View style={styles.container}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Name:</Text>{" "}
              <Text>{item.petName}</Text>
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Category:</Text>{" "}
              <Text>{item.category}</Text>
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Breed:</Text>{" "}
              <Text>{item.breed}</Text>
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Colour:</Text>{" "}
              <Text>{item.colour}</Text>
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Age:</Text>{" "}
              <Text>{item.age}</Text>
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Gender:</Text>{" "}
              <Text>{item.gender}</Text>
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Size:</Text>{" "}
              <Text>{item.size}</Text>
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Location:</Text>{" "}
              <Text>{item.location}</Text>
            </Text>
          </View>
      </Card>

      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.fontHeading}>Behaviour </Text>
        <View style={styles.line} />
        <Text style={{ paddingBottom: 10 }}>{item.behaviour}</Text>
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.fontHeading}>Care, Health and Feeding </Text>
        <View style={styles.line} />
        <Text style={{ paddingBottom: 10 }}>{item.health}</Text>
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.fontHeading}>Training </Text>
        <View style={styles.line} />
        <Text style={{ paddingBottom: 10 }}>{item.training}</Text>
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.fontHeading}>Additional information </Text>
        <View style={styles.line} />
        <Text style={{ paddingBottom: 10 }}>{item.additional}</Text>
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.fontHeading}>Documents </Text>
        <View style={styles.line} />
      </Card>
    </View>
  );
};

export const sellerInfo = (item) => {
  // fetch data and store into profileData
  return (
      <View>
        <Card containerStyle={styles.cardContainer}>
          <Text style={styles.fontHeading}>Seller Information </Text>
          <View style={styles.line} />

          <View style={{flexDirection: 'row', }}> 
            <View style={{flex: 1, width: 100, justifyContent: 'center', alignItems: 'center',}}>
              <Image
                style={{height: 40, width: 40, borderRadius: 40/ 2}}
                source={{
                  uri: item.sellerPhoto,
                }}
              />
              <Text style={{textAlign: "center", paddingTop: 5}}>{item.sellerName}</Text>
            </View>

            <View style= {{flex: 4, paddingTop: 2, paddingLeft: 10, paddingRight: 10}}>
              <Text>{item.sellerInfo}</Text>
            </View>
              
          </View>
        </Card>
      </View>
  );
};

export const expressInterest = (item, navigation) => {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => navigation.navigate("buyApplication", { item })}
      >
        <Text style={styles.buttonsText}>EXPRESS INTEREST</Text>
      </TouchableOpacity>
    </View>
  );
};
