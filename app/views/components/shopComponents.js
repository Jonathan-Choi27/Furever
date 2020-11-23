import * as React from "react";
import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { Card, Button } from "react-native-paper";
import globalStyles from "../styleSheet/styleSheet";

//Card Item List
const itemList = [];

//Accessory Listing Card
export const accessoryListingCard = (item, navigation) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("shopListingProfile", { item })}
    >
      <Card elevation={5} style={globalStyles.petBuyCard}>
        <View style={globalStyles.petBuyCardTextContainer}>
          <View style={{ width: 125, height: 125 }}>
            <Image
              source={{ uri: item.photo }}
              style={globalStyles.petBuyCardImage}
            />
          </View>
          <View style={globalStyles.petBuyCardContent}>
            <Card.Content>
              <View style={{ marginRight: 40 }}>
                <Text numberOfLines={1} style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, paddingBottom: 2 }}>
                    {item.accessoryName}
                  </Text>
                </Text>
              </View>
              <Text numberOfLines={1} style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>Price: </Text>
                <Text>${item.price}</Text>
              </Text>
              <Text numberOfLines={2} style={{ flex: 1, paddingTop: 3 }}>
                {item.description}
              </Text>
            </Card.Content>

            <Card.Actions style={globalStyles.petBuyCardActionCard}>
              <Button
                style={globalStyles.petBuyCardBigButton}
                mode="contained"
                onPress={() => addItemToCart(item)}
              >
                <Text style={globalStyles.petBuyCardBigButtonText}>
                  Add to Cart
                </Text>
              </Button>
            </Card.Actions>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

//Shop Category
export const shopCategory = (category, navigation) => {
  return (
    <View style={globalStyles.iconContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("accessoryCategories", { category })}
      >
        <View style={globalStyles.categoryIconContainer}>
          <Image
            style={globalStyles.icon}
            source={{ uri: category.categoryImage }}
          />
          <Text style={globalStyles.iconText}>{category.category}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

//Accessory Category
export const accessoryCategory = (accessory, category, navigation) => {
  return (
    <View style={globalStyles.iconContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("accessoryList", { accessory, category })
        }
      >
        <View style={globalStyles.categoryIconContainer}>
          <Image
            style={globalStyles.icon}
            source={{ uri: accessory.accessoryImage }}
          />
          <Text style={globalStyles.iconText}>{accessory.accessory}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

//Get the item list
export const getItemList = () => {
  return itemList;
};

//Add item to the cart
export const addItemToCart = (item) => {
  let index = 0;
  let duplicate = false;

  while (index < itemList.length) {
    if (item.docId === itemList[index].docId) {
      let currentQty = itemList[index].qty + 1;
      duplicate = true;
      itemList[index].qty = currentQty;
      break;
    }
    index++;
  }

  if (!duplicate) {
    item["qty"] = 1;
    itemList.push(item);
  }
  duplicate = false;

  Alert.alert(
    "Item Added",
    "Your item has been successfully added to the cart"
  );
};

export const removeItemFromCart = () => {
  itemList.splice(0, itemList.length);
};
