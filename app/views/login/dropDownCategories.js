import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Picker,
  Button,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import globalStyles, {
  primaryColour1,
  primaryColour2,
  lightGrey,
  lightBlue,
} from "../styleSheet/styleSheet";
// Solved from this link https://github.com/GeekyAnts/NativeBase/issues/636

const locationSelection = [
  "Select location",
  "NSW",
  "VIC",
  "QLD",
  "WA",
  "SA",
  "TAS",
  "ACT",
  "NT",
];

var emptyLocation = ["Select category first"];

export default class CategorySelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "key1",
      categoryErr: "",
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.setState({
        category: this.props.category,
        location: this.props.location,
      });
    }
  }

  getLocation(val) {
    if (val === "Dog") {
      return locationSelection;
    } else if (val == "Cat") {
      return locationSelection;
    } else if (val == "Bird") {
      return locationSelection;
    } else if (val == "Fish") {
      return locationSelection;
    } else if (val == "Reptile") {
      return locationSelection;
    } else {
      return emptyLocation;
    }
  }

  onCategoryChange(value) {
    // console.log(value);
    this.props.setCategory(value);
    this.setState({
      category: value,
    });
  }

  onLocationChange(value) {
    this.setState({
      location: value,
    });
    this.props.setLocation(value);
  }

  render() {
    return (
      <View style={{ marginHorizontal: 10 }}>
        <View style={styles.inputContainer}>
          <Text>
            <Text style={styles.inputName}>Category</Text>
          </Text>
          <View style={globalStyles.formPickerOuterContainer}>
            <View style={globalStyles.formPickerIconContainer}>
              <Icon name="ios-paper" type="ionicon" color={primaryColour1} />
            </View>
            <View style={globalStyles.formPickerInnerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={this.state.category}
                onValueChange={this.onCategoryChange.bind(this)}>
                <Picker.Item
                  label="Select category"
                  value="0"
                  color="#D3D3D3"
                />
                <Picker.Item
                  label="Dog"
                  value="Dog"
                  style={styles.pickerEntry}
                />
                <Picker.Item
                  label="Cat"
                  value="Cat"
                  style={styles.pickerEntry}
                />
                <Picker.Item
                  label="Bird"
                  value="Bird"
                  style={styles.pickerEntry}
                />
                <Picker.Item
                  label="Reptile"
                  value="Reptile"
                  style={styles.pickerEntry}
                />
                <Picker.Item
                  label="Fish"
                  value="Fish"
                  style={styles.pickerEntry}
                />
              </Picker>
            </View>
          </View>
          <View style={{ paddingLeft: 5, paddingTop: 5 }}>
            <Text style={styles.error}>{this.props.categoryErr}</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text>
            <Text style={styles.inputName}>Location</Text>
          </Text>

          <View style={globalStyles.formPickerOuterContainer}>
            <View style={globalStyles.formPickerIconContainer}>
              <Icon name="ios-paper" type="ionicon" color={primaryColour1} />
            </View>
            <View style={globalStyles.formPickerInnerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={this.state.location}
                onValueChange={this.onLocationChange.bind(this)}>
                {this.getLocation(this.state.category).map((item, i) => {
                  // console.log("item", item);
                  // return <Picker.Item label={item} key={`${i}+1`} value={item} />;

                  if (i == 0) {
                    return (
                      <Picker.Item
                        label={item}
                        key={i}
                        value={0}
                        color="#D3D3D3"
                      />
                    );
                  } else {
                    return <Picker.Item label={item} key={i} value={item} />;
                  }
                })}
              </Picker>
            </View>
          </View>
          <View style={{ paddingLeft: 5, paddingTop: 5 }}>
            <Text style={styles.error}>{this.props.locationErr}</Text>
          </View>
          {/* <Text style={globalStyles.errorMessage}>{this.props.breedErr}</Text> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontSize: 12,
  },
  inputContainer: {
    paddingBottom: 10,
  },
  inputName: {
    color: "#505050",
    fontWeight: "bold",
    fontSize: 16,
  },
  pickerDefault: {
    color: "#fafafa",
  },
  pickerEntry: {
    fontSize: 12,
    color: "#0000FF",
  },
});
