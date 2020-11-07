import React from "react";
import "react-navigation"
import "react-navigation-props-mapper"
import "@react-navigation/native"
import 'react-navigation-hooks'
import {
    ScrollView,
    View,
} from "react-native";
console.disableYellowBox = true;
import {profileInfo} from "../../components/petProfileComponents";
import {onSellTab} from "../../components/petTabComponents";

export default class sellPetProfile extends React.Component {
    render() {
        const item = this.props.route.params.item;
        return (
            <View>
                <ScrollView>
                    {profileInfo(item)}
                    <View style={{padding: 10}}></View>
                </ScrollView>
            </View>
        );
    }
}