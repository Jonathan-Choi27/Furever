import * as React from "react";
import { View, Image, Text } from "react-native";
import { Card } from "react-native-paper"
import globalStyles from "../styleSheet/styleSheet";

const printSomething = () => {
    console.log("----------------------------------------------------")
    console.log("PRESSED")
}

export const homeListingCard = (item, navigation) => {
    return (
        <View style={globalStyles.homeCard}>
            <Card
                containerStyle={{ borderRadius: 5, padding: 0 }}
                onPress={() =>
                    navigation.navigate("petProfile", { item })
                }>
                <Image source={{ uri: item.photo }} style={globalStyles.homeCardImage} />
                <Text numberOfLines={1} style={globalStyles.homeCardTitle}>
                    {item.petName}
                </Text>
                <Text numberOfLines={1} style={globalStyles.homeCardSubtitle}>{item.breed}</Text>
            </Card>
        </View>
    )
}
