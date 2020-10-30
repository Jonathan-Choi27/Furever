import * as React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Card, Button } from "react-native-paper";
import styles from "../styleSheet/styleSheet";

export const buyerApplicationList = (item, navigation) => {
  return (
    <Card elevation={5} style={styles.petBuyCard}>
      <View style={styles.petBuyCardSellerContainer}>
        <Image
          style={styles.petBuyCardSellerImage}
          source={{
            uri: item.sellerPhoto,
          }}
        />
      </View>
      <View style={styles.petBuyCardTextContainer}>
        <View style={styles.petBuyCardImageContainer}>
          <Image source={{ uri: item.photo }} style={styles.petBuyCardImage} />
        </View>
        <View style={styles.petBuyCardContent}>
          <Card.Content>
            <View style={{ marginRight: 40 }}>
              <Text numberOfLines={1} style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, paddingBottom: 2 }}>
                  {item.petName}
                </Text>
              </Text>
            </View>
            <Text numberOfLines={1} style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Age: </Text>
              <Text>{item.age}</Text>
            </Text>
            <Text numberOfLines={1} style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Gender: </Text>
              <Text>{item.gender}</Text>
            </Text>
            <Text numberOfLines={1} style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Location: </Text>
              <Text>{item.location}</Text>
            </Text>
            <Text numberOfLines={1} style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Seller: </Text>
              <Text>{item.sellerName}</Text>
            </Text>
          </Card.Content>

          <Card.Actions style={styles.petBuyCardActionCard}>
            <Button
              style={styles.petBuyCardBigButton}
              mode="contained"
              onPress={() => navigation.navigate("buyerApplicationView", { item })}>
              <Text style={styles.petBuyCardBigButtonText}> Test Test</Text>
            </Button>
          </Card.Actions>
        </View>
      </View>
    </Card>
  );
};
