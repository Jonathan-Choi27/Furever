import * as React from "react";
import { View, Image, Text, Alert } from "react-native";
import { Button, Card } from "react-native-paper";
import firebase from "firebase";
import globalStyles from "../styleSheet/styleSheet";
console.disableYellowBox = true;

const db = firebase.firestore();

//Delete Pet
const deletePet = async (item) => {
  await item.selfRef.delete();
  await item.userSellListRef.delete();
  await item.categorizedListingsRef.delete();
  Alert.alert("Notification", "Deleted");
};

//Pet Sell Listing Card
export const petSellListingCard = (item, navigation) => {
  return (
    <View style={[globalStyles.cardContentContainer, { marginBottom: 11 }]}>
      <Card elevation={5}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 10.5,
              padding: 10,
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ borderRadius: 5, flexGrow: 1 }}
            />
          </View>

          <View
            style={{
              flex: 17,
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 10,
              paddingLeft: 2,
            }}
          >
            <View>
              <Text numberOfLines={1} style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>Name: </Text>
                <Text>{item.petName}</Text>
              </Text>
              <Text numberOfLines={1} style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>Category: </Text>
                <Text>{item.category}</Text>
              </Text>
              <Text numberOfLines={1} style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>Breed: </Text>
                <Text>{item.breed}</Text>
              </Text>
              <Text numberOfLines={1} style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>Colour: </Text>
                <Text>{item.colour}</Text>
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Button
                style={globalStyles.smallButton}
                onPress={() => navigation.navigate("sellPetProfile", { item })}
              >
                <Text style={globalStyles.smallButtonText}>View</Text>
              </Button>

              <Button
                style={globalStyles.smallButton}
                onPress={() =>
                  navigation.navigate("updateSellApplication", {
                    doc_id: item.doc_id,
                  })
                }
              >
                <Text style={globalStyles.smallButtonText}>Update</Text>
              </Button>

              <Button
                style={globalStyles.smallButton}
                onPress={() => deletePet(item)}
              >
                <Text style={globalStyles.smallButtonText}>Delete</Text>
              </Button>
            </View>
            <View>
              <Button
                style={globalStyles.bigButton}
                onPress={() =>
                  navigation.navigate("offerApplications", {
                    doc_id: item.doc_id,
                  })
                }
              >
                <Text style={globalStyles.bigButtonText}>View Offers</Text>
              </Button>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};
