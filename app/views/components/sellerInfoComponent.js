import React from "react";
import { Text, View, Dimensions, Image } from "react-native";
import { Card } from "react-native-paper";
import { Rating } from "react-native-elements";
import globalStyles, {
  screenWidth,
  primaryColour1,
} from "../styleSheet/styleSheet";

//Seller Details
export const sellerDetails = (seller) => {
  //Get Screen Width
  const screenWidth = Math.round(Dimensions.get("window").width);
  return (
    <View style={globalStyles.container}>
      {/* The seller name title */}
      <Card style={[globalStyles.cardContentContainer, { marginTop: 20 }]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{
              marginLeft: 10,
              marginBottom: 10,
              marginTop: 10,
              paddingRight: 10,
              width: screenWidth / 4,
              height: screenWidth / 4,
              borderRadius: 10,
            }}
            source={{
              uri: seller.photo,
            }}
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 30,
              color: "black",
              marginLeft: 30,
              flex: 1,
            }}>
            {seller.name}'s Profile
          </Text>
        </View>
      </Card>

      <Card style={[globalStyles.cardContentContainer, { marginTop: 20 }]}>
        <View
          style={{
            marginLeft: 10,
            marginBottom: 10,
            marginTop: 10,
            paddingRight: 10,
          }}>
          <Text style={globalStyles.cardHeading}>Personal Information</Text>
          <View style={[globalStyles.cardContainer, { paddingBottom: 5 }]}>
            <View style={{ flex: 0.25 }}>
              <Text style={globalStyles.contentTextBold}>Name: </Text>
              <Text style={globalStyles.contentTextBold}>Email: </Text>
              <Text style={globalStyles.contentTextBold}>Description: </Text>
            </View>
            <View style={{ paddingLeft: 5, flex: 0.75 }}>
              <Text numberOfLines={1} style={globalStyles.contentText}>
                {seller.name}
              </Text>
              <Text numberOfLines={1} style={globalStyles.contentText}>
                {seller.email}
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={globalStyles.contentText}>
                  {seller.profileText}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};

//Review Card
export const reviewCard = (item) => {
  return (
    <Card
      elevation={5}
      style={[globalStyles.cardContentContainer, { marginBottom: 10 }]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          margin: 10,
        }}>
        <View
          style={{
            height: screenWidth / 5,
            width: screenWidth / 5,
            flex: 1,
          }}>
          <Image
            source={{ uri: item.reviewerPhoto }}
            style={{
              borderRadius: 5,
              flex: 1,
            }}
          />
        </View>
        <View
          style={{
            paddingLeft: 15,
            justifyContent: "center",
            flex: 3,
          }}>
          <Text
            style={[
              globalStyles.contentTextBold,
              { paddingBottom: 3, fontSize: 18 },
            ]}>
            {item.reviewerName}
          </Text>
          <Text
            style={{
              fontSize: 11,
              color: "#666666",
            }}>
            {item.timestamp}
          </Text>
          <Text style={[globalStyles.contentText, { flex: 1 }]}>
            {item.review}
          </Text>
          <Rating
            imageSize={30}
            startingValue={item.rating}
            ratingColor={primaryColour1}
            ratingBackgroundColor="#EFEFEF"
            type="custom"
            tintColor="white"
            readonly
            style={{ paddingBottom: 5 }}
          />
        </View>
      </View>
    </Card>
  );
};
