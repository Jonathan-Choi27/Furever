import React from "react";
import {
  Text,
  ScrollView,
  View,
  Dimensions,
  Image,
  BackHandler,
} from "react-native";
import { Card } from "react-native-elements";
import "react-navigation";
import "react-navigation-props-mapper";
import "@react-navigation/native";
import "react-navigation-hooks";
import globalStyles from "../../styleSheet/styleSheet";

export default class breedInfo extends React.Component {
  //Back Button Handler
  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };

  render() {
    const screenWidth = Math.round(Dimensions.get("window").width);
    const item = this.props.route.params.item;
    return (
      <ScrollView>
        <View style={globalStyles.container}>
          <View style={{ marginBottom: 20 }}>
            <View style={{ alignItems: "center" }}>
              <Image
                style={{ width: screenWidth, height: 250 }}
                source={{ uri: item.infoImage }}
              />
            </View>
            <Card containerStyle={globalStyles.cardContentContainer}>
              <Text
                style={{ fontWeight: "bold", fontSize: 30, color: "black" }}
              >
                {item.breedName}
              </Text>
            </Card>

            <Card containerStyle={globalStyles.cardContentContainer}>
              <Text style={globalStyles.cardHeading}>Description</Text>
              <View style={globalStyles.cardContainer}>
                <View>
                  <Text style={globalStyles.contentText}>
                    {item.fullDescription}
                  </Text>
                  <View style={{ paddingTop: 10 }}>
                    <Text style={globalStyles.contentTextBold}>Size: </Text>
                    <Text style={globalStyles.contentText}>{item.size}</Text>
                  </View>
                  <View style={{ paddingTop: 10 }}>
                    <Text style={globalStyles.contentTextBold}>Exterior: </Text>
                    <Text style={globalStyles.contentText}>
                      {item.exterior}
                    </Text>
                  </View>
                  <View style={{ paddingTop: 10 }}>
                    <Text style={globalStyles.contentTextBold}>
                      Weight/Height Range:{" "}
                    </Text>
                    <Text style={globalStyles.contentText}>{item.weight}</Text>
                  </View>
                  <View style={{ paddingTop: 10 }}>
                    <Text style={globalStyles.contentTextBold}>Ailments: </Text>
                    <Text style={globalStyles.contentText}>
                      {item.ailments}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>

            <Card containerStyle={globalStyles.cardContentContainer}>
              <Text style={globalStyles.cardHeading}>Feeding</Text>
              <Text style={globalStyles.contentText}>{item.feeding}</Text>
            </Card>

            <Card containerStyle={globalStyles.cardContentContainer}>
              <Text style={globalStyles.cardHeading}>Personality</Text>
              <Text style={globalStyles.contentText}>{item.personality}</Text>
            </Card>

            <Card containerStyle={globalStyles.cardContentContainer}>
              <Text style={globalStyles.cardHeading}>Care</Text>
              <Text style={globalStyles.contentText}>{item.care}</Text>
            </Card>

            <Card containerStyle={globalStyles.cardContentContainer}>
              <Text style={globalStyles.cardHeading}>Grooming</Text>
              <Text style={globalStyles.contentText}>{item.grooming}</Text>
            </Card>
          </View>
        </View>
      </ScrollView>
    );
  }
}
