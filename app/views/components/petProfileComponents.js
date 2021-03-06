import React, { useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Linking,
  Alert
} from "react-native";
import { Card, Rating } from "react-native-elements";
import { Button } from "react-native-paper";
import styles from "../styleSheet/styleSheet";
import { primaryColour1, primaryColour2 } from "../styleSheet/styleSheet";

//Get Screen Width
const screenWidth = Math.round(Dimensions.get("window").width);

//Check Documents
const checkDocuments = (field) => {
  if (field === "" || field == undefined) {
    return <Text style={styles.contentText}>No Documents Provided.</Text>;
  }
  return <OpenURLButton url={field} title="Open Document" />;
};

//Open URL
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
    <Button color={primaryColour2} onPress={handlePress}>
      {title}
    </Button>
  );
};

//Check Additional
const checkAdditional = (additional) => {
  if (additional === "") {
    return "No Additional Information Provided.";
  }
  return additional;
};

//Profile Information
export const profileInfo = (item) => {
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 0 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: screenWidth, height: 250 }}
            source={item.photo ? {uri: item.photo} : null}
          />
        </View>
        <Card containerStyle={styles.cardContentContainer}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 30,
              color: "black",
              flex: 1,
            }}
          >
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

//Seller Information
export const sellerInfo = (seller, navigation) => {
  const arr = seller.averageRating;
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.cardContentContainer}>
        <Text style={styles.cardHeading}>{seller.name}'s Information</Text>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{ height: 100, width: 100, borderRadius: 5, marginRight: 5 }}
            source={seller.photo ? {uri: seller.photo} : null}
          />
          <View style={{ flex: 4, paddingLeft: 10, paddingRight: 10 }}>
            <Text numberOfLines={4}>{seller.profileText}</Text>
            <Rating
              imageSize={40}
              startingValue={seller.averageRating}
              ratingColor={primaryColour1}
              ratingBackgroundColor="#EFEFEF"
              type="custom"
              tintColor="white"
              readonly
              style={{ paddingVertical: 10 }}
            />
            <View style={{ flex: 1, flexDirection: "row", paddingTop: 7 }}>
              <View style={{ flex: 0.45, padddingLeft: 3 }}>
                <Button
                  style={{
                    backgroundColor: primaryColour2,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5,
                    height: 25,
                    width: 120,
                  }}
                  mode="contained"
                  onPress={() =>
                    navigation.navigate("sellerProfile", { seller })
                  }
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 12,
                      padding: 3,
                      fontWeight: "bold",
                    }}
                  >
                    More Info
                  </Text>
                </Button>
              </View>
              <View style={{ flex: 0.1 }} />
              <View style={{ flex: 0.45, padddingRight: 3 }}>
                <Button
                  style={{
                    backgroundColor: primaryColour2,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5,
                    height: 25,
                    width: 120,
                  }}
                  mode="contained"
                  onPress={() =>
                    navigation.navigate("reviewApplication", { seller })
                  }
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 12,
                      padding: 3,
                      fontWeight: "bold",
                    }}
                  >
                    Review
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};

//Express Interest
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
