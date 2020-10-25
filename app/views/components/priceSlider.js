import { Slider, Text, Icon, Input } from "react-native-elements";
import { Animated, View } from "react-native";
import React from "react";
import { darkGreen } from "../../views/styleSheet/styleSheet";

export default class PriceSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      price: 0,
    };
  }

  render() {
    return (
      <View style={{marginHorizontal: 10}}>
        <Text style={{ color: "#505050", fontWeight: "bold", fontSize: 16 }}>
          Price
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 0.8 }}>
            <Slider
                // converesion to int this way. parseInt() giving errors for some reason
              value={this.props.price * 1}
              onSlidingComplete={(price) =>
                this.props.setPrice(price.toString())
              }
              maximumValue={50}
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
              thumbTintColor={darkGreen}
            />
          </View>
          <View style={{ flex: 0.2 }}>
            <Input
              placeholder="0"
              placeholderTextColor={"#D3D3D3"}
              inputContainerStyle={{borderBottomColor: "#D3D3D3", borderBottomWidth: 2}}
              value={this.props.price.toString()}
              onChangeText={(price) => {
                this.props.setPrice(price);
              }}
              leftIcon={
                <Text
                  style={{
                    color: darkGreen,
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
