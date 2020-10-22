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
} from "react-native-elements"
import "react-navigation"
import "react-navigation-props-mapper"
import "@react-navigation/native"
import 'react-navigation-hooks'
import { onBuyTab } from "../../components/petTabComponents"
import globalStyles, { darkGreen, orange } from "../../styleSheet/styleSheet";

export default class breedInfo extends React.Component {

    state = {
        filteredData: [],
        searchText: "",
        visible: false,
        ailments: "",
        breed: "",
        care: "",
        exterior: "",
        feeding: "",
        fullDescripton: "",
        grooming: "",
        infoImage: "",
        personality: "",
        size: "",
        weight: "",
    };

    async fetchData() {
        const categoryId = this.props.route.params.categoryId;
        const breedId = this.props.route.params.breedId;
        db.collection("petCategories")
            .doc(categoryId)
            .collection("breed")
            .doc(breedId)
            .get()
            .then((doc) => {
                this.setState({
                    breed: doc.data().breed,
                    ailments: doc.data().ailments,
                    care: doc.data().care,
                    exterior: doc.data().exterior,
                    feeding: doc.data().feeding,
                    fullDescripton: doc.data().fullDescripton,
                    grooming: doc.data().feeding,
                    infoImage: doc.data().infoImage,
                    personality: doc.data().personality,
                    size: doc.data().size,
                    weight: doc.data().weight,
                });
            });
    }

    async componentDidMount() {
        this.fetchData();
    }

    searchFunction = (searchText) => {
        this.setState({ searchText: searchText });

        let filteredData = this.state.data.filter(function (item) {
            return item.title.includes(searchText);
        });

        this.setState({ filteredData: filteredData });
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    {onBuyTab(this.props.navigation)}

                    <View style={styles.titleContainer}>
                        <Text style={styles.fontTitle}>{this.state.breed}</Text>
                    </View>

                    <Card containerStyle={styles.cardContainer}>
                        <Card.Image style={styles.imageContainer} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fgerman-shepard.jpg?alt=media&token=5c2b32b6-572e-48d4-9e1a-e1a3612bb7b8" }} />
                    </Card>
                    <Card containerStyle={styles.cardContainer}>
                        <View style={styles.boxContainer}>
                            <Text style={styles.fontHeading}>Description </Text>
                            <Text style={{ paddingTop: 10 }}>{this.state.fullDescripton}</Text>
                            <Text style={{ paddingTop: 10 }}>
                                <Text style={{ fontWeight: "bold" }}>Size: </Text>
                                <Text>{this.state.size}</Text>
                            </Text>
                            <Text style={{ paddingTop: 10 }}>
                                <Text style={{ fontWeight: "bold" }}>Exterior: </Text>
                                <Text>{this.state.exterior}</Text>
                            </Text>
                            <Text style={{ paddingTop: 10 }}>
                                <Text style={{ fontWeight: "bold" }}>Weight/Height Range: </Text>
                                <Text>{this.state.weight} </Text>
                            </Text>
                            <Text style={{ paddingTop: 10 }}>
                                <Text style={{ fontWeight: "bold" }}>Ailments: </Text>
                                <Text>{this.state.ailments}</Text>
                            </Text>
                        </View>
                    </Card>

                    <Card containerStyle={styles.cardContainer}>
                        <Text style={styles.fontHeading}>Feeding </Text>
                        <Text style={{ paddingTop: 10 }}>
                            {this.state.feeding}
                        </Text>
                    </Card>

                    <Card containerStyle={styles.cardContainer}>
                        <Text style={styles.fontHeading}>Personality </Text>
                        <Text style={{ paddingTop: 10 }}>
                            {this.state.personality}
                        </Text>
                    </Card>

                    <Card containerStyle={styles.cardContainer}>
                        <Text style={styles.fontHeading}>Care </Text>
                        <Text style={{ paddingTop: 10 }}>
                            {this.state.care}
                        </Text>
                    </Card>

                    <Card containerStyle={styles.cardContainer}>
                        <Text style={styles.fontHeading}>Grooming </Text>
                        <Text style={{ paddingTop: 10 }}>
                            {this.state.grooming}
                        </Text>
                        
                    </Card>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    searchBar: {
        height: 50,
        width: 350,
        margin: 10,
    },
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
        paddingTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
    },
    imageContainer: {
        width: Math.round(Dimensions.get('window').width) - 73,
        height: 200
    },
    fontTitle: {
        textAlign: "left",
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 5,
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
});
