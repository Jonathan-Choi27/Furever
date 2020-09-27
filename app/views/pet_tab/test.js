import React from "react";
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    Modal,
    TouchableHighlight,
    FlatList,
    ActivityIndicator,
    Platform,
    Dimensions,
    Image,
} from "react-native";
import {
    Card,
    ListItem,
    Button,
    Icon,
    SearchBar,
    Avatar,
} from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import { db } from "../database/firebase";
import { Route } from "react-router"
import "react-navigation"
import "react-navigation-props-mapper"
import "@react-navigation/native"
import 'react-navigation-hooks'

export default class test extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props)
    }    

    render() {
        // const { navigation } = this.props
        // const titleID = this.props.navigation.route.params.titleID;
        const titleID = this.props.route.params.titleID;
        // const titleID = this.props.match.params.titleID;
        // const titleID = this.props.navigation.state.params.titleID;
        // const titleID = this.props.navigation.getParam('titleID', 'default');
        // const titleID = this.props.params;
        // console.log(this.props);
        console.log(titleID);
        // const name = useNavigationParam('titleID');
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
                            onPress={() => this.props.navigation.navigate("petBuySpecies")}
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
                        <Text style={styles.fontTitle}> Marshmallow's Profile </Text>
                        <Text style={styles.fontHeading}> General Information </Text>
                        <Text>Title: {JSON.stringify(titleID)}</Text>
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
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    imageContainer: {
        width: 150,
        height: 150,
        backgroundColor: "pink",
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
    },
    cardContentContainer: {
        borderRadius: 4,
        alignSelf: "stretch",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "row",
    },
});
