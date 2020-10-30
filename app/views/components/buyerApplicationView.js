import * as React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import { Card } from "react-native-elements";
import styles from "../styleSheet/styleSheet";

const screenWidth = Math.round(Dimensions.get("window").width);

export default class buyerApplicationView extends React.Component {
  render() {
    const item = this.props.route.params.item;
    return (
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Image
          style={{ width: screenWidth, height: 250 }}
          source={{
            uri: item.photo,
          }}
        />
        <View style={{ paddingHorizontal: 50 }}>
          <Card containerStyle={styles.cardContentContainer}>
            <Text style={{ fontWeight: "bold", fontSize: 30, color: "black" }}>
              Your Application for {item.petName}
            </Text>
          </Card>
          <Card containerStyle={styles.cardContentContainer}>
            <Text style={styles.cardHeading}>Why do you want this pet? </Text>
            <Text> {item.buyerWhyWantPet}</Text>
          </Card>
          <Card containerStyle={styles.cardContentContainer}>
            <Text style={styles.cardHeading}>
              What characteristics are most desirable in a pet for you?
            </Text>
          </Card>
          <Card containerStyle={styles.cardContentContainer}>
            <Text style={styles.cardHeading}>
              What characteristics are least desirable in a pet for you?
            </Text>
          </Card>
          <Card containerStyle={styles.cardContentContainer}>
            <Text style={styles.cardHeading}>
              Name(s), breed(s), gender(s) and age(s) of current pets(if
              applicable)
            </Text>
          </Card>
          <Card containerStyle={styles.cardContentContainer}>
            <Text style={styles.cardHeading}>
              Description of your family/members of the household
            </Text>
          </Card>
          <View style={{ marginBottom: 20 }} />
        </View>
      </ScrollView>
    );
  }
}
