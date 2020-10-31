import { Picker, Text, View } from "react-native";
import React from "react";
import { CustomPicker } from "./customPicker";
import GooglePlacesInput from "./mapAutoComplete";
import globalStyles, { darkGreen } from "../styleSheet/styleSheet";
import { Icon } from "react-native-elements";

var option;

var age = [];

export default class AgePicker extends React.Component {
  constructor(props) {
    super(props);

    for (let i = 0; i < 30; i++) {
      if (i == 0) {
        age[i] = "Select";
      } else {
        age[i] = i;
      }
    }

    this.state = {
      age,
      options: "0",
    };
  }
  componentDidUpdate(prevProps) {
    // console.log(this.props.age);
    if (this.props.age !== prevProps.age) {
      this.setState({
        age: this.props.age,
      });
    }
  }

  onOptionChange = (options) => {
    this.setState({
      options: options,
    });
    this.props.setAgeOption(options);
  };

  onAgeChange = (age) => {
    this.setState({
      age: age,
    });
    this.props.setAge(age);
  };

  render() {
    return (
      <View>
        <Text style={{ color: "#505050", fontWeight: "bold", fontSize: 16 }}>
          Age
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 0.6,
              borderBottomColor: "#D3D3D3",
              borderBottomWidth: 2,
              flexDirection: "row",
            }}>
            <View style={{ justifyContent: "center", flex: 0.2 }}>
              <Icon name="ios-paper" type="ionicon" color={darkGreen} />
            </View>
            <View style={globalStyles.formPickerInnerContainer}>
              <Picker
                selectedValue={this.state.age}
                onValueChange={(age) => this.onAgeChange(age)}>
                {age.map((item, i) => {
                  if (i == 0) {
                    return (
                      <Picker.Item label={item} value="0" color="#D3D3D3" />
                    );
                  } else {
                    return (
                      <Picker.Item
                        label={item.toString()}
                        key={i}
                        value={item}
                      />
                    );
                  }
                })}
              </Picker>
            </View>
          </View>

          {/* space between */}
          <View style={{ flex: 0.05 }} />

          <View
            style={{
              flex: 0.4,
              borderBottomColor: "#D3D3D3",
              borderBottomWidth: 2,
            }}>
            <Picker
              selectedValue={this.state.options}
              onValueChange={(options) => this.onOptionChange(options)}>
              <Picker.Item label="Select" value="0" color="#D3D3D3" />
              <Picker.Item label="Months" value="Months" />
              <Picker.Item label="Years" value="Years" />
            </Picker>
          </View>
        </View>
      </View>
    );
  }
}
