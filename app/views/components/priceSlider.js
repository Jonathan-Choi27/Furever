import { Slider, Text, Input } from "react-native-elements";
import { View } from "react-native";
import React from "react";
import { primaryColour1 } from "../../views/styleSheet/styleSheet";

export default class PriceSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      price: 0,
    };
  }

  render() {
    return (
      <View style={{ marginHorizontal: 10 }}>
        <Text style={{ color: "#505050", fontWeight: "bold", fontSize: 16 }}>
          Price
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 0.7 }}>
            <Slider
              // converesion to int this way. parseInt() giving errors for some reason
              value={this.props.price * 1}
              onSlidingComplete={(price) =>
                this.props.setPrice(price.toString())
              }
              maximumValue={this.props.max}
              minimumValue={0}
              step={1}
              trackStyle={{
                height: 5,
                borderColor: "red",
                backgroundColor: "red",
                shadowColor: "red",
              }}
              minimumTrackTintColor="#505050"
              maximumTrackTintColor="#D3D3D3"
              thumbTintColor={primaryColour1}
            />
          </View>
          <View style={{ flex: 0.3 }}>
            <Input
              placeholder="0"
              placeholderTextColor={"#D3D3D3"}
              inputContainerStyle={{
                borderBottomColor: "#D3D3D3",
                borderBottomWidth: 2,
              }}
              value={this.props.price.toString()}
              onChangeText={(price) => {
                if (/^\d+$/.test(price) || price == "") {
                  this.props.setPrice(price);
                }
              }}
              leftIcon={
                <Text
                  style={{
                    color: primaryColour1,
                    fontSize: 20,
                    fontWeight: "bold",
                  }}>
                  $
                </Text>
              }></Input>
          </View>
        </View>
      </View>
    );
  }
}
