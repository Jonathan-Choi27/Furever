import * as React from "react";
import { Image, Text, View } from "react-native";
import { Card } from "react-native-elements";
import globalStyles from "../styleSheet/styleSheet";

export default class ProfileHelp extends React.Component {
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
    return (
      <View>
        <View
          style={{
            marginTop: 80,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}>
          <Image
            style={globalStyles.loginLogo}
            source={{
              uri:
                "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FlogoWithWords.png?alt=media&token=ac29597a-9268-419f-8769-fa44ac76a5df",
            }}
          />
        </View>
        <Card containerStyle={{ borderRadius: 10 }}>
          {/* <Text style={{ fontWeight: "bold", fontSize: 30, color: "#333333" }}>
            Help Page
          </Text> */}
          <Text style={globalStyles.cardHeading}> F.A.Q </Text>
          <View style={globalStyles.faqContainer}>
            <Text style={globalStyles.faqHeader}>
              1. What do I do once someone accepts my application?
            </Text>
            <Text>
              Once you get the email saying your offer has been accepted, please
              arrange the time and place to meet up with your seller/buyer. You
              are responsible for the rest of the transaction process{" "}
            </Text>
          </View>
          <View style={globalStyles.faqContainer}>
            <Text style={globalStyles.faqHeader}>
              2. What do I do if I encounter illegal animal traders or potential
              scammers?
            </Text>
            <Text>
              Please request for help from your nearest Police Department. The
              police contact number when there is no immediate danger is 131
              444.
            </Text>
          </View>
        </Card>

        <Card containerStyle={{ borderRadius: 10 }}>
          <Text style={globalStyles.cardHeading}> Contact Us</Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>E-Mail : </Text>
            <Text>_____ @ _____.com</Text>
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Hotline : </Text>
            <Text>__ ____ ____</Text>
          </Text>
        </Card>
      </View>
    );
  }
}
