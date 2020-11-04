import * as React from "react";
import { StyleSheet, View, Image, Text, Dimensions } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import globalStyles, { darkGreen, green, lightGreen, lightGrey, orange, lightBlue } from "../styleSheet/styleSheet";
console.disableYellowBox = true;

export const offerApplicationListingCard = (item, navigation) => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    return (
        <View style={[globalStyles.cardContentContainer, {marginBottom: 11}]}>
            <Card elevation={5}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{
                        // flex: 1,
                        padding: 10,
                        justifyContent: "center",
                        height: screenWidth/3,
                        width: screenWidth/3,
                    }}>
                        <Image
                            source={{ uri: item.buyerPhoto }}
                            style={{borderRadius: 5, flexGrow: 1}}
                        />
                    </View>

                    <View style={{
                        // flex: 3,
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingRight: 10,
                        paddingLeft: 2,
                        justifyContent: "center",
                    }}>
                        <View>
                            <Text numberOfLines={1} style={{ flex: 1, paddingBottom: 2 }}>
                                <Text style={{ fontWeight: "bold" }}>Name: </Text>
                                <Text>{item.name}</Text>
                            </Text>
                            <Text numberOfLines={1} style={{ flex: 1, paddingBottom: 2 }}>
                                <Text style={{ fontWeight: "bold" }}>Contact: </Text>
                                <Text>{item.contact_number}</Text>
                            </Text>
                            <Text numberOfLines={1} style={{ flex: 1, paddingBottom: 2 }}>
                                <Text style={{ fontWeight: "bold" }}>Email: </Text>
                                <Text>{item.email}</Text>
                            </Text>
                        </View>

                        <View>
                            <Button style={globalStyles.bigButton}
                                onPress={() => navigation.navigate("buyerProfile", {item})}
                            >
                            <Text style={globalStyles.bigButtonText}>View Application</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Card>
        </View>
    )
}