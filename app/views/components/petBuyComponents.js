import * as React from "react";
import {
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import {
    Card,
    Button,
} from "react-native-paper";
import styles from "../styleSheet/styleSheet";

export const petBuyCard = (item, navigation) => {
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
          <Image
            source={{ uri: item.photo }}
            style={styles.petBuyCardImage}
          />
        </View>
        <View
          style={styles.petBuyCardContent}
        >
          <Card.Content>
            <View style={{marginRight: 40}}>
              <Text numberOfLines={1} style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, paddingBottom: 2 }}>{item.petName}</Text>
              </Text>
            </View>
            <Text numberOfLines={1} style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Age: </Text>
              <Text>{item.age} {item.ageOption}</Text>
            </Text>
            <Text numberOfLines={1} style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Gender: </Text>
              <Text>{item.gender}</Text>
            </Text>
            <Text numberOfLines={1} style={{ flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>Location: </Text>
              <Text>{item.suburb}</Text>
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
              onPress={() =>
                navigation.navigate("petProfile", {item})
              }
            >
              <Text style={styles.petBuyCardBigButtonText}>More Info</Text>
            </Button>
          </Card.Actions>
        </View>
      </View>
    </Card>
  )
}

export const petBuyCategory = (item, navigation) => {
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.replace("petBreeds", { item })
        }>
        <View style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={{uri: item.categoryImage}}
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export const petBuyBreed = (item, category, navigation) => {
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.replace("breedList", { item, category })
        }>
        <View style={styles.breedIconContainer}>
          <Image
            style={styles.icon}
            source={{uri: item.breedImage}}
          />
          <Text style={styles.iconText}>{item.breedName}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}