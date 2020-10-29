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
                <Text
                    style={{ fontWeight: "bold", fontSize: 30, color: "black" }}>
                    {seller.name}'s Profile
                </Text>
            </Card>

            <Card containerStyle={styles.cardContentContainer}>
                <Text style={styles.cardHeading}>Personal Information</Text>
                <View style={styles.cardContainer}>
                    <Image
                        style={{paddingLeft: 10,
                            paddingBottom: 10,
                            paddingTop: 10,
                            paddingRight: 10,
                            width: 120,
                            height: 120,
                            borderRadius: 120/2}}
                        source={{
                            uri: seller.photo,
                        }}
                    />
                    <View style={{paddingLeft: 20, paddingTop: 10, flex: 1}}>
                        <Text>
                            <Text style={styles.contentTextBold}>Name: </Text>
                            <Text style={styles.contentText}>{seller.name}</Text>
                        </Text>
                        <Text>
                            <Text style={styles.contentTextBold}>Dob: </Text>
                            <Text style={styles.contentText}>{seller.dob}</Text>
                        </Text>
                        <Text>
                            <Text style={styles.contentTextBold}>Email: </Text>
                            <Text style={styles.contentText}>{seller.email}</Text>
                        </Text>
                        {/* <Text>
                            <Text style={{ fontWeight: "bold" }}>Location:</Text>{" "}
                            <Text style={{numberofLines: 3}}>{seller.location}</Text>
                        </Text> */}
                    </View>
                </View>
                <Text style={[styles.contentText, {paddingTop: 20}]}>{seller.profileText}</Text>
            </Card>

            
        </View>
    );
}