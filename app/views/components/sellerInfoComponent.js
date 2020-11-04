import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
} from "react-native";
import {
    Card,
    Button,
} from "react-native-elements";
import styles from "../styleSheet/styleSheet";

export const sellerDetails = (seller) => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const textWidth = (screenWidth - 20) / 2;
    return (
        <View style={styles.container}>
            {/* The seller name title */}
            <Card containerStyle={styles.cardContentContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                        style={{
                            paddingLeft: 10,
                            paddingBottom: 10,
                            paddingTop: 10,
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
                        style={{ fontWeight: "bold", fontSize: 30, color: "black", paddingLeft: 20 }}>
                        {seller.name}'s Profile
                    </Text>
                </View>
            </Card>

            <Card containerStyle={styles.cardContentContainer}>
                <Text style={styles.cardHeading}>Personal Information</Text>
                <View style={[styles.cardContainer, { paddingBottom: 5 }]}>
                    <View>
                        <Text style={styles.contentTextBold}>Name: </Text>
                        <Text style={styles.contentTextBold}>Email: </Text>
                        <Text style={styles.contentTextBold}>Description: </Text>
                    </View>
                    <View style={{paddingLeft: 5}}>
                        <Text numberOfLines={1} style={styles.contentText}>{seller.name}</Text>
                        <Text numberOfLines={1} style={styles.contentText}>{seller.email}</Text>
                        <Text style={styles.contentText}>{seller.profileText}</Text>
                    </View>
                </View>
            </Card>

            

        </View>
    );
}