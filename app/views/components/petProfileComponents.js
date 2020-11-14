import React, { useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Linking,
} from "react-native";
import { Card } from "react-native-elements";
import { Button } from "react-native-paper";
import styles from "../styleSheet/styleSheet";
import {
  darkGreen,
  green,
  lightGreen,
  lightGrey,
  orange,
  lightBlue,
} from "../styleSheet/styleSheet";

const screenWidth = Math.round(Dimensions.get("window").width);

const checkDocuments = (field) => {
  if (field === "") {
    return <Text>No Documents Provided.</Text>;
  }
  return <OpenURLButton url={field} title="Open Document" />;
};

const OpenURLButton = ({ url, title }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <Button
      color={green}
      onPress={handlePress}>
      {title}
    </Button>
  );
};

const checkAdditional = (additional) => {
  if (additional === "") {
    return "No Additional Information Provided."
  }
  return additional;
};

export const profileInfo = (item) => {
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
        <Card containerStyle={styles.cardContentContainer}>
          <Text style={{ fontWeight: "bold", fontSize: 30, color: "black" }}>
            {item.petName}'s Profile
          </Text>
        </Card>

        <Card containerStyle={styles.cardContentContainer}>
          <Text style={styles.cardHeading}>General Information</Text>
          <View style={styles.cardContainer}>
            <View style={{ paddingLeft: 1, paddingRight: 15 }}>
              <Text style={styles.contentTextBold}>Name: </Text>
              <Text style={styles.contentTextBold}>Category: </Text>
              <Text style={styles.contentTextBold}>Breed: </Text>
              <Text style={styles.contentTextBold}>Colour: </Text>
              <Text style={styles.contentTextBold}>Age: </Text>
              <Text style={styles.contentTextBold}>Gender: </Text>
              <Text style={styles.contentTextBold}>Size: </Text>
              <Text style={styles.contentTextBold}>Location: </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} style={styles.contentText}>
                {item.petName}
              </Text>
              <Text numberOfLines={1} style={styles.contentText}>
                {item.category}
              </Text>
              <Text numberOfLines={1} style={styles.contentText}>
                {item.breed}
              </Text>
              <Text numberOfLines={1} style={styles.contentText}>
                {item.colour}
              </Text>
              <Text numberOfLines={1} style={styles.contentText}>
                {item.age} {item.ageOption}
              </Text>
              <Text numberOfLines={1} style={styles.contentText}>
                {item.gender}
              </Text>
              <Text numberOfLines={1} style={styles.contentText}>
                {item.size}
              </Text>
              <Text style={(styles.contentText, { flexShrink: 1 })}>
                {item.suburb}
              </Text>
            </View>
          </View>
        </Card>

        <Card containerStyle={styles.cardContentContainer}>
          <Text style={styles.cardHeading}>Behaviour</Text>
          <Text style={styles.contentText}>{item.behaviour}</Text>
        </Card>

        <Card containerStyle={styles.cardContentContainer}>
          <Text style={styles.cardHeading}>Care, Health, and Feeding</Text>
          <Text style={styles.contentText}>{item.health}</Text>
        </Card>

        <Card containerStyle={styles.cardContentContainer}>
          <Text style={styles.cardHeading}>Training</Text>
          <Text style={styles.contentText}>{item.training}</Text>
        </Card>

        <Card containerStyle={styles.cardContentContainer}>
          <Text style={styles.cardHeading}>Additional Information</Text>
          <Text style={styles.contentText}>
            {checkAdditional(item.additional)}
          </Text>
        </Card>

        <Card containerStyle={styles.cardContentContainer}>
          <Text style={styles.cardHeading}>Documents</Text>
          {checkDocuments(item.documentName)}
        </Card>
      </View>
    </View>
  );
};

export const sellerInfo = (seller, navigation) => {
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.cardContentContainer}>
        <Text style={styles.cardHeading}>{seller.name}'s Information</Text>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{ height: 100, width: 100, borderRadius: 5, marginRight: 5 }}
            source={{
              uri: seller.photo,
            }}
          />
          <View style={{ flex: 4, paddingLeft: 10, paddingRight: 10 }}>
            <Text numberOfLines={4}>{seller.profileText}</Text>
            <View style={{ flex: 1, paddingTop: 7 }}>
              <Button
                style={{
                  backgroundColor: green,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  height: 25,
                  width: 120,
                }}
                mode="contained"
                onPress={() =>
                  navigation.navigate("sellerProfile", { seller })
                }>
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 12,
                    padding: 5,
                    fontWeight: "bold",
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

export const expressInterest = (item, navigation) => {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => navigation.navigate("buyApplication", { item })}>
        <Text style={styles.buttonsText}>EXPRESS INTEREST</Text>
      </TouchableOpacity>
    </View>
  );
};
