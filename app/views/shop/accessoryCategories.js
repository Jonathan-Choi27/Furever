import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import globalStyles, {darkGreen} from "../styleSheet/styleSheet";

const db = firebase.firestore();

export default class accessoryCategories extends React.Component {
    render() {
        return (
          <View>
            <View style={{ height: 52, alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity
                style={globalStyles.viewApplication}
                onPress={() =>
                    this.props.navigation.replace("accessoryListings")
              }>
                <Text
                    style={{
                    textAlign: "center",
                    color: "white",
                    fontWeight: "bold",
                    }}>
                    Sell Accessories
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
}