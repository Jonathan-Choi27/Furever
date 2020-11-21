import * as React from "react";
import { Text, View, Image, Dimensions, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import styles from "../styleSheet/styleSheet";

//Get Screen Width
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
            <Text style={styles.cardHeading}>Personal Information</Text>
            <View style={[styles.cardContainer, { paddingBottom: 5 }]}>
              <View>
                <Text style={styles.contentTextBold}>Name: </Text>
                <Text style={styles.contentTextBold}>Contact: </Text>
                <Text style={styles.contentTextBold}>Email: </Text>
                <Text style={styles.contentTextBold}>Address: </Text>
              </View>
              <View style={{ paddingLeft: 5 }}>
                <Text numberOfLines={1} style={styles.contentText}>
                  {item.buyerName}
                </Text>
                <Text numberOfLines={1} style={styles.contentText}>
                  {item.buyerNumber}
                </Text>
                <Text numberOfLines={1} style={styles.contentText}>
                  {item.buyerEmail}
                </Text>
                <Text style={styles.contentText}>{item.buyerAddress}</Text>
              </View>
            </View>
          </Card>

          <Card containerStyle={styles.cardContentContainer}>
            <Text style={styles.cardHeading}>Pet Information</Text>
            <View style={{ paddingBottom: 20 }}>
              <Text style={styles.contentTextBold}>
                Why do you want this pet?
              </Text>
              <Text numberOfLines={1} style={styles.contentText}>
                {item.buyerWhyWantPet}
              </Text>
            </View>

            <View style={{ paddingBottom: 20 }}>
              <Text style={styles.contentTextBold}>
                What characteristics are most desirable in a pet for you?
              </Text>
              <Text numberOfLines={1} style={styles.contentText}>
                {item.buyerMostDesirableTraits}
              </Text>
            </View>

            <View style={{ paddingBottom: 20 }}>
              <Text style={styles.contentTextBold}>
                What characteristics are least desirable in a pet for you?
              </Text>
              <Text numberOfLines={1} style={styles.contentText}>
                {item.buyerLeastDesirableTraits}
              </Text>
            </View>

            <View style={{ paddingBottom: 5 }}>
              <Text style={styles.contentTextBold}>
                Name(s), breed(s), gender(s) and age(s) of current pets (if
                applicable)
              </Text>
              <Text numberOfLines={1} style={styles.contentText}>
                {item.buyerPreviousPets}
              </Text>
            </View>
          </Card>

          <Card containerStyle={styles.cardContentContainer}>
            <Text style={styles.cardHeading}>Your Home Environment</Text>
            <View style={{ paddingBottom: 5 }}>
              <Text style={styles.contentTextBold}>
                Description of your family/members of the household
              </Text>
              <Text numberOfLines={1} style={styles.contentText}>
                {item.buyerHouseEnviroment}
              </Text>
            </View>
          </Card>

          <View style={{ marginBottom: 20 }} />
        </View>
      </ScrollView>
    );
  }
}
