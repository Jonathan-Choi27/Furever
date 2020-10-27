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
import { db } from "../../database/firebase";

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
        fullDescription: "",
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
                    fullDescription: doc.data().fullDescription,
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
        const screenWidth = Math.round(Dimensions.get("window").width);
        return (
            <ScrollView>
                <View style={globalStyles.container}>
                    <View style={{ marginBottom: 20 }}>
                        <View style={{ alignItems: "center" }}>
                        <Image
                            style={{ width: screenWidth, height: 250 }}
                            source={{ uri: this.state.infoImage }}
                        />
                        </View>
                        <Card containerStyle={globalStyles.cardContentContainer}>
                        <Text
                            style={{ fontWeight: "bold", fontSize: 30, color: "black" }}>
                            {this.state.breed}
                        </Text>
                        </Card>

                        <Card containerStyle={globalStyles.cardContentContainer}>
                        <Text style={globalStyles.cardHeading}>Description</Text>
                        <View style={globalStyles.cardContainer}>
                            <View>
                                <Text style={globalStyles.contentText}>{this.state.fullDescription}</Text>
                                <View style={{paddingTop: 10}}>
                                    <Text style={globalStyles.contentTextBold}>Size: </Text>
                                    <Text style={globalStyles.contentText}>{this.state.size}</Text>
                                </View>
                                <View style={{paddingTop: 10}}>
                                    <Text style={globalStyles.contentTextBold}>Exterior: </Text>
                                    <Text style={globalStyles.contentText}>{this.state.exterior}</Text>
                                </View>
                                <View style={{paddingTop: 10}}>
                                    <Text style={globalStyles.contentTextBold}>Weight/Height Range: </Text>
                                    <Text style={globalStyles.contentText}>{this.state.weight}</Text>
                                </View>
                                <View style={{paddingTop: 10}}>
                                    <Text style={globalStyles.contentTextBold}>Ailments: </Text>
                                    <Text style={globalStyles.contentText}>{this.state.ailments}</Text>
                                </View>
                            </View>
                        </View>
                    </Card>

                    <Card containerStyle={globalStyles.cardContentContainer}>
                        <Text style={globalStyles.cardHeading}>Feeding</Text>
                        <Text style={globalStyles.contentText}>{this.state.feeding}</Text>
                    </Card>

                    <Card containerStyle={globalStyles.cardContentContainer}>
                        <Text style={globalStyles.cardHeading}>Personality</Text>
                        <Text style={globalStyles.contentText}>{this.state.personality}</Text>
                    </Card>

                    <Card containerStyle={globalStyles.cardContentContainer}>
                        <Text style={globalStyles.cardHeading}>Care</Text>
                        <Text style={globalStyles.contentText}>{this.state.care}</Text>
                    </Card>

                    <Card containerStyle={globalStyles.cardContentContainer}>
                        <Text style={globalStyles.cardHeading}>Grooming</Text>
                        <Text style={globalStyles.contentText}>{this.state.grooming}</Text>
                    </Card>

                    </View>
                </View>
            </ScrollView>
        );
    }
}
