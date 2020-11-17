import * as React from "react";
import { StyleSheet, View, Image, Text, Dimensions } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import globalStyles, {
  primaryColour1,
  primaryColour2,
  lightGrey,
  lightBlue,
} from "../styleSheet/styleSheet";
console.disableYellowBox = true;

export const offerApplicationListingCard = (item, navigation) => {
  const screenWidth = Math.round(Dimensions.get("window").width);
  return (
    <View style={[globalStyles.cardContentContainer, { marginBottom: 11 }]}>
      <Card elevation={5}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              padding: 10,
              justifyContent: "center",
              height: screenWidth / 3,
              width: screenWidth / 3,
              flex: 1,
            }}
          >
            <Image
              source={{ uri: item.buyerPhoto }}
              style={{ borderRadius: 5, flexGrow: 1 }}
            />
          </View>

          <View
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 20,
              paddingLeft: 2,
              justifyContent: "center",
              flex: 2,
            }}
          >
            <View>
              <Text numberOfLines={1} style={{ paddingBottom: 2 }}>
                <Text style={{ fontWeight: "bold" }}>Name: </Text>
                <Text>{item.name}</Text>
              </Text>
              <Text numberOfLines={1} style={{ paddingBottom: 2 }}>
                <Text style={{ fontWeight: "bold" }}>Contact: </Text>
                <Text>{item.contact_number}</Text>
              </Text>
              <Text numberOfLines={1} style={{ paddingBottom: 2 }}>
                <Text style={{ fontWeight: "bold" }}>Email: </Text>
                <Text>{item.email}</Text>
              </Text>
            </View>

            <View>
              <Button
                style={globalStyles.bigButton}
                onPress={() => navigation.navigate("buyerProfile", { item })}
              >
                {item.is_accepted == true ? (
                  <Text style={globalStyles.bigButtonText}>
                    Accepted Application
                  </Text>
                ) : (
                    <Text style={globalStyles.bigButtonText}>
                      View Application
                    </Text>
                  )}
              </Button>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};
