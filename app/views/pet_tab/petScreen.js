import * as React from "react";
import {
    Picker,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Button,
    Image
  } from "react-native";
import SellApplicationComponent from "./petSell1";

export default class PetScreenComponent extends React.Component{

    render(){
        return(
            <View>
                <Button
                    title="Add New Listing"
                    onPress={() => this.props.navigation.navigate("petSell1")}
                    />
            </View>
        )
    }
}