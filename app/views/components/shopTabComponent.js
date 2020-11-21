import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import "react-navigation";
import "react-navigation-props-mapper";
import "@react-navigation/native";
import "react-navigation-hooks";

import globalStyles from "../styleSheet/styleSheet";
import { getItemList } from "../components/shopComponents";

//Cart Tab
export const cartTab = (navigation) => {
  const items = getItemList();
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Cart", { items })}>
        <Image
          style={{ width: 30, height: 30 }}
          source={{
            uri:
              "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fshop%2Fcart.png?alt=media&token=472ae7b3-7888-443c-b27b-9a37b39b4405",
          }}
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

//Cart Card
export const cartCard = (navigation) => {
  const items = getItemList();
  return (
    <Card
      elevation={5}
      containerStyle={{ borderRadius: 10 }}
      onPress={() => navigation.navigate("Cart", { items })}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 5,
          marginRight: 10,
        }}
      >
        <Text
          numberOfLines={1}
          style={[globalStyles.pageTitle, { padding: 10 }]}
        >
          View Shopping Cart
        </Text>
        <Image
          style={{ width: 30, height: 30 }}
          source={{
            uri:
              "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fshop%2Fcart.png?alt=media&token=472ae7b3-7888-443c-b27b-9a37b39b4405",
          }}
        ></Image>
      </View>
    </Card>
  );
};
