import { Picker, Text, View } from "react-native";
import React from "react";
import globalStyles, { primaryColour1 } from "../styleSheet/styleSheet";
import { Icon } from "react-native-elements";

//Age Variable
var age = [];

export default class AgePicker extends React.Component {
  constructor(props) {
    super(props);

    //Select Age Range Picker
    for (let i = 0; i < 30; i++) {
      if (i == 0) {
        age[i] = "Select";
      } else {
        age[i] = i;
      }
    }

    this.state = {
      age,
      option: "0",
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.age !== prevProps.age) {
      this.setState({
        age: this.props.age,
      });
    }
    if (this.props.option !== prevProps.option) {
      this.setState({
        option: this.props.option,
      });
    }
  }

  //Option Change Listener
  onOptionChange = (option) => {
    this.setState({
      option: option,
    });
    this.props.setAgeOption(option);
  };

  //Option Age Listener
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
            }}
          >
            <View style={{ justifyContent: "center", flex: 0.2 }}>
              <Icon name="ios-paper" type="ionicon" color={primaryColour1} />
            </View>
            <View style={globalStyles.formPickerInnerContainer}>
              <Picker
                selectedValue={this.state.age}
                onValueChange={(age) => this.onAgeChange(age)}
              >
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
          <View style={{ flex: 0.05 }} />
          <View
            style={{
              flex: 0.4,
              borderBottomColor: "#D3D3D3",
              borderBottomWidth: 2,
            }}
          >
            <Picker
              selectedValue={this.state.option}
              onValueChange={(option) => this.onOptionChange(option)}
            >
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
