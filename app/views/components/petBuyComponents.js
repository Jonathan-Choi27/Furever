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
import globalStyles from "../styleSheet/styleSheet";

export const petBuyCard = (item, navigation) => {
  return (
    <Card elevation={5} style={globalStyles.petBuyCard}>
      <View style={globalStyles.petBuyCardSellerContainer}>
        <Image
          style={globalStyles.petBuyCardSellerImage}
          source={{
            uri: item.sellerPhoto,
          }}
        />
      </View>
      <View style={globalStyles.petBuyCardTextContainer}>
        <View style={globalStyles.petBuyCardImageContainer}>
          <Image
            source={{ uri: item.photo }}
            style={globalStyles.petBuyCardImage}
          />
        </View>
        <View
          style={globalStyles.petBuyCardContent}
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

          <Card.Actions style={globalStyles.petBuyCardActionCard}>
            <Button
              style={globalStyles.petBuyCardBigButton}
              mode="contained"
              onPress={() =>
                navigation.navigate("petProfile", {item})
              }
            >
              <Text style={globalStyles.petBuyCardBigButtonText}>More Info</Text>
            </Button>
          </Card.Actions>
        </View>
      </View>
    </Card>
  )
}

export const petBuyCategory = (item, navigation) => {
  return (
    <View style={globalStyles.iconContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("petBreeds", { item })
        }>
        <View style={globalStyles.categoryIconContainer}>
          <Image
            style={globalStyles.icon}
            source={{uri: item.categoryImage}}
          />
          <Text style={globalStyles.iconText}>{item.category}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export const petBuyBreed = (item, category, navigation) => {
  return (
    <View style={globalStyles.breedContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("breedList", { item, category })
        }>
        <View style={globalStyles.breedIconContainer}>
          <Image
            style={globalStyles.breedIcon}
            source={{uri: item.breedImage}}
          />
          <Text style={globalStyles.iconText}>{item.breedName}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}