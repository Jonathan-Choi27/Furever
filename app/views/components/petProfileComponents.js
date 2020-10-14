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

export const profileInfo = (item) => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const textWidth = (screenWidth - 20) / 2;
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <View style={{ width: screenWidth / 2 }}>
                    <Text style={styles.fontTitle}> {item.petName}'s Profile </Text>
                </View>
            </View>

            <Card containerStyle={styles.cardContainer}>
                <Text style={styles.fontHeading}> General Information </Text>
                {/* <Text style={styles.fontHeading}> ------------------- </Text> */}
                <View style={styles.line} />
                <View style={styles.cardContentContainer}>
                    <View>
                        <Image
                            style={styles.imageContainer}
                            source={{
                                uri: item.photo,
                            }}
                        />
                        <Text style={{ textAlign: "center", paddingTop: 5 }}>
                            <Text style={{ fontWeight: "bold" }}>Price:</Text>{" "}
                            <Text>${item.price}</Text>
                        </Text>
                    </View>
                    <View style={{ paddingLeft: 15, width: textWidth }}>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Name:</Text>{" "}
                            <Text>{item.petName}</Text>
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Category:</Text>{" "}
                            <Text>{item.category}</Text>
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Breed:</Text>{" "}
                            <Text>{item.breed}</Text>
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Colour:</Text>{" "}
                            <Text>{item.colour}</Text>
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Age:</Text>{" "}
                            <Text>{item.age}</Text>
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Gender:</Text>{" "}
                            <Text>{item.gender}</Text>
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Size:</Text>{" "}
                            <Text>{item.size}</Text>
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Location:</Text>{" "}
                            <Text>{item.location}</Text>
                        </Text>
                    </View>
                </View>
            </Card>

            <Card containerStyle={styles.cardContainer}>
                <Text style={styles.fontHeading}>Behaviour </Text>
                <View style={styles.line} />
                <Text style={{ paddingBottom: 10 }}>{item.behaviour}</Text>
            </Card>
            <Card containerStyle={styles.cardContainer}>
                <Text style={styles.fontHeading}>Care, Health and Feeding </Text>
                <View style={styles.line} />
                <Text style={{ paddingBottom: 10 }}>{item.health}</Text>
            </Card>
            <Card containerStyle={styles.cardContainer}>
                <Text style={styles.fontHeading}>Training </Text>
                <View style={styles.line} />
                <Text style={{ paddingBottom: 10 }}>{item.training}</Text>
            </Card>
            <Card containerStyle={styles.cardContainer}>
                <Text style={styles.fontHeading}>Additional information </Text>
                <View style={styles.line} />
                    <Text style={{ paddingBottom: 10 }}>{item.additional}</Text>
            </Card>
            <Card containerStyle={styles.cardContainer}>
                <Text style={styles.fontHeading}>Documents </Text>
                <View style={styles.line} />
            </Card>
        </View>
    );
}

export const sellerInfo = () => {
    return (
        <Card containerStyle={styles.cardContainer}>
            <View>
                <Text style={styles.fontHeading}>Seller Information </Text>
                <View style={styles.line} />
                <Text></Text>
            </View>
        </Card>
    );
}

export const expressInterest = (item) => {
    return (
        <View style={styles.buttonsContainer}>
            <TouchableOpacity
                style={styles.buttons}
                onPress={() => this.props.navigation.navigate("sellApplication", { item })}>

                <Text style={styles.buttonsText}>EXPRESS INTEREST</Text>
            </TouchableOpacity>
        </View>
    );
}