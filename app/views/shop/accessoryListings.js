import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  Button,
} from "react-native-paper";
import firebase from "firebase";
import globalStyles, {darkGreen} from "../styleSheet/styleSheet";

const db = firebase.firestore();

export default class accessoryListings extends React.Component {
    render() {
        return (
          <View style={globalStyles.container}>
            <View style={[globalStyles.pageTitleContainer, {paddingTop: 15}]}>
              <Text style={globalStyles.pageTitle}>Accessory Listings</Text>
              <View>
                <Button
                  color={darkGreen}
                  onPress={() => this.props.navigation.navigate("accessoryListingApplication")}
                  contentStyle={{
                    height: 30,
                  }}
                  mode="contained"
                >
                  Add New Listing
                </Button>
              </View>
            </View>
          </View>
        );
    }
}