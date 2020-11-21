import * as React from "react";
import { View, Image, Text } from "react-native";
import { Button, Card } from "react-native-paper";
import firebase from "firebase";
import globalStyles from "../styleSheet/styleSheet";
console.disableYellowBox = true;

const db = firebase.firestore();

//Delete Accessory
const deleteAccessory = (docId) => {
  const deleteItemId = docId;
  db.collection("accessories")
    .doc(deleteItemId)
    .delete()
    .then(function () {
      alert("Accessory deleted.");
    })
    .catch(function (error) {
      alert("Error removing document: ", error);
    });
};

//Accessory Listing Card
export const accessoriesListingCard = (item, navigation) => {
  return (
    <View style={[globalStyles.cardContentContainer, { marginBottom: 11 }]}>
      <Card elevation={5}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 8,
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
                <Text>{item.accessoryName}</Text>
              </Text>
              <Text numberOfLines={1} style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>Category: </Text>
                <Text>{item.category}</Text>
              </Text>
              <Text numberOfLines={1} style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>Type: </Text>
                <Text>{item.type}</Text>
              </Text>
              <Text numberOfLines={1} style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>Price: $</Text>
                <Text>{item.price}</Text>
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Button
                style={globalStyles.smallButton}
                onPress={() =>
                  navigation.navigate("accessoryListingProfile", { item })
                }
              >
                <Text style={globalStyles.smallButtonText}>View</Text>
              </Button>
              <Button
                style={globalStyles.smallButton}
                onPress={() =>
                  navigation.navigate("updateAccessoryListingApplication", {
                    docId: item.docId,
                  })
                }
              >
                <Text style={globalStyles.smallButtonText}>Update</Text>
              </Button>
              <Button
                style={globalStyles.smallButton}
                onPress={() => deleteAccessory(item.docId)}
              >
                <Text style={globalStyles.smallButtonText}>Delete</Text>
              </Button>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};
