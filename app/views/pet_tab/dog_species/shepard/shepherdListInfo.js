import React from "react";
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
} from "react-native";
import {
    Card,
    Button,
} from "react-native-elements";
import "react-navigation"
import "react-navigation-props-mapper"
import "@react-navigation/native"
import 'react-navigation-hooks'

export default class shepherdListInfo extends React.Component {

    render() {
        const item = this.props.route.params.item;
        const screenWidth = Math.round(Dimensions.get('window').width);
        const textWidth = screenWidth - 40 - 150 - 10;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.buySellContainer}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "white",
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                height: 50,
                            }}
                            onPress={() => this.props.navigation.navigate("petBuy")}
                        >
                            <Text>Buy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#d7e5f7",
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                height: 50,
                            }}
                            onPress={() => this.props.navigation.navigate("petSell")}
                        >
                            <Text style={{ textAlign: "center" }}> Sell </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.titleContainer}>
                        <View style={{width: screenWidth/2}}>
                            <Text style={styles.fontTitle}> {item.title}'s Profile </Text>
                            <Text style={styles.fontHeading}> General Information </Text>
                        </View>
                        <View style={{width: screenWidth/2}}>
                            {/* <Text>hello</Text> */}
                        </View>
                    </View>

                    <Card containerStyle={styles.cardContainer}>
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
                            <View style={{ paddingLeft: 15, paddingRight: 10, width: textWidth }}>
                                <Text>
                                    <Text style={{ fontWeight: "bold" }}>Name:</Text>{" "}
                                    <Text>{item.title}</Text>
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
                        <View style={styles.boxContainer}>
                            <Text style={styles.fontHeading}>Behaviour </Text>
                            <Text style={{paddingBottom: 10}}>{item.behaviour}</Text>
                            <Text style={styles.fontHeading}>Care, Health and Feeding </Text>
                            <Text style={{paddingBottom: 10}}>{item.health}</Text>
                            <Text style={styles.fontHeading}>Training </Text>
                            <Text style={{paddingBottom: 10}}>{item.training}</Text>
                            <Text style={styles.fontHeading}>Additional information </Text>
                            <Text style={{paddingBottom: 10}}>{item.additional}</Text>
                            <Text style={styles.fontHeading}>Documents </Text>
                        </View>
                    </Card>

                    <Card containerStyle={styles.cardContainer}>
                        <View style={styles.boxContainer}>
                            <Text style={styles.fontHeading}>Seller Information </Text>
                            <Text></Text>
                        </View>
                    </Card>
                    
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            style={styles.buttons}
                            onPress={() => this.props.navigation.navigate("petBuy5", {item})}>
                        
                            <Text style={styles.buttonsText}>EXPRESS INTEREST</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    buySellContainer: {
        alignSelf: "stretch",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "row",
    },
    titleContainer: {
        alignSelf: "stretch",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "row",
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    imageContainer: {
        width: 150,
        height: 150,
    },
    categories: {
        alignSelf: "stretch",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        padding: 20,
    },
    iconContainer: {
        padding: 20,
    },
    viewApplication: {
        backgroundColor: "#447ECB",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 200,
    },
    fontTitle: {
        textAlign: "left",
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 10,
    },
    fontHeading: {
        textAlign: "left",
        fontSize: 16,
        fontWeight: "bold",
    },
    cardContainer: {
        borderRadius: 4,
        alignSelf: "stretch",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        elevation: 5,
    },
    cardContentContainer: {
        borderRadius: 4,
        alignSelf: "stretch",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "row",
    },
    buttonsContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    buttons: {
        backgroundColor: "#447ECB",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        height: 40,
    },
    buttonsText: {
        color: "#ffffff",
        fontSize: 18,
        padding: 15,
    },
});
