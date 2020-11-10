import React from "react";
import { View, Text, Image, Dimensions, BackHandler, } from "react-native";
import { Card } from "react-native-elements";

const screenWidth = Math.round(Dimensions.get("window").width);
export default class buyApplicationDetail extends React.Component {
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
  }
  
  render() {
    const item = this.props.route.params.item;
    return (
      <View>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: screenWidth, height: 250 }}
            source={{
              uri: item.photo,
            }}
          />
        </View>
        <Card>
          <Text> Why do you want this pet?</Text>
          <Text> {item.buyerWhyWantPet} </Text>
        </Card>
        <Card>
          <Text> </Text>
          <Text> {item.buyerWhyWantPet} </Text>
        </Card>
        <Card>
          <Text> Why do you want this pet?</Text>
          <Text> {item.buyerWhyWantPet} </Text>
        </Card>
        <Text> {item.buyerEmail} </Text>
        <Text> {item.buyerName} </Text>
        <Text> {item.buyerLeastDesirableTraits} </Text>
        <Text> {item.buyerMostDesirableTraits} </Text>
        <Text> {item.buyerHouseEnviroment} </Text>
      </View>
    );
  }
}
