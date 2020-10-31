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
  darkGreen,
  green,
  lightGreen,
  lightGrey,
  orange,
  lightBlue,
} from "../../styleSheet/styleSheet";
// Solved from this link https://github.com/GeekyAnts/NativeBase/issues/636

const dog_breed = [
  "Select breed",
  "German Shepherd",
  "Maltese",
  "Poodle",
  "Golden Retriever",
  "Pomeranian",
  "Rottweiler",
  "Corgi",
  "Other",
];

const dog_colour = ["Select colour", "Black", "Grey", "Brown", "White"];

const cat_breed = [
  "Select breed",
  "British Shorthair",
  "Persian cat",
  "Siamese cat",
  "Ragdoll",
  "Scottish Fold",
  "Bengal cat",
  "Sphynx",
  "Other",
];

const cat_colour = ["Select colour", "Black", "Grey", "Brown", "White"];

const bird_breed = [
  "Select breed",
  "Parrot",
  "Owl",
  "Parakeet",
  "Cockatiel",
  "Canarie",
  "Conure",
  "Finch",
  "Other",
];

const bird_colour = [
  "Select colour",
  "Green",
  "Black",
  "Blue",
  "Brown",
  "White",
  "Grey",
  "Orange",
  "Other",
];

const reptile_breed = [
  "Select breed",
  "Bearded Dragon",
  "Gecko",
  "Snake",
  "Frog",
];

const reptile_colour = ["Select colour", "Green", "Black", "White", "Other"];

const fish_breed = [
  "Select breed",
  "Goldfish",
  "Angelfish",
  "Catfish",
  "Guppies",
  "Mollies",
  "Clownfish",
  "Guppies",
  "Other",
];

const fish_colour = [
  "Select colour",
  "Yellow",
  "White",
  "Orange",
  "Blue",
  "Green",
];

const size = ["Select size", "Small", "Medium", "Large"];

var empty_breed = ["Select category first"];
var empty_colour = ["Select category first"];
var empty_size = ["Select category first"];

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
        breed: this.props.breed,
        colour: this.props.colour,
        size: this.props.size,
      });
    }
  }

  getBreed(val) {
    if (val === "Dog") {
      return dog_breed;
    } else if (val == "Cat") {
      return cat_breed;
    } else if (val == "Bird") {
      return bird_breed;
    } else if (val == "Fish") {
      return fish_breed;
    } else if (val == "Reptile") {
      return reptile_breed;
    } else {
      return empty_breed;
    }
  }

  getColour(val) {
    if (val === "Dog") {
      return dog_colour;
    } else if (val == "Cat") {
      return cat_colour;
    } else if (val == "Bird") {
      return bird_colour;
    } else if (val == "Fish") {
      return fish_colour;
    } else if (val == "Reptile") {
      return reptile_colour;
    } else {
      return empty_colour;
    }
  }

  getSize(val) {
    if (
      val === "Dog" ||
      val === "Cat" ||
      val === "Bird" ||
      val === "Fish" ||
      val === "Reptile"
    ) {
      return size;
    } else {
      return empty_size;
    }
  }

  onCategoryChange(value) {
    // console.log(value);
    this.props.setCategory(value);
    this.setState({
      category: value,
    });
  }

  onBreedChange(value) {
    this.setState({
      breed: value,
    });
    this.props.setBreed(value);
  }

  onColourChange(value) {
    this.setState({
      colour: value,
    });
    this.props.setColour(value);
  }

  onSizeChange(value) {
    this.setState({
      size: value,
    });
    this.props.setSize(value);
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
              <Icon name="ios-paper" type="ionicon" color={darkGreen} />
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
            <Text style={styles.inputName}>Breed</Text>
          </Text>

          <View style={globalStyles.formPickerOuterContainer}>
            <View style={globalStyles.formPickerIconContainer}>
              <Icon name="ios-paper" type="ionicon" color={darkGreen} />
            </View>
            <View style={globalStyles.formPickerInnerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={this.state.breed}
                onValueChange={this.onBreedChange.bind(this)}>
                {this.getBreed(this.state.category).map((item, i) => {
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
            <Text style={styles.error}>{this.props.breedErr}</Text>
          </View>
          {/* <Text style={globalStyles.errorMessage}>{this.props.breedErr}</Text> */}
        </View>

        <View style={styles.inputContainer}>
          <Text>
            <Text style={styles.inputName}>Colour</Text>
          </Text>
          <View style={globalStyles.formPickerOuterContainer}>
            <View style={globalStyles.formPickerIconContainer}>
              <Icon name="ios-paper" type="ionicon" color={darkGreen} />
            </View>
            <View style={globalStyles.formPickerInnerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={this.state.colour}
                onValueChange={this.onColourChange.bind(this)}>
                {this.getColour(this.state.category).map((item, i) => {
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
            <Text style={styles.error}>{this.props.colourErr}</Text>
          </View>
          {/* <Text style={styles.error}>{this.props.colourErr}</Text> */}
        </View>

        <View style={styles.inputContainer}>
          <Text>
            <Text style={styles.inputName}>Size</Text>
          </Text>

          <View style={globalStyles.formPickerOuterContainer}>
            <View style={globalStyles.formPickerIconContainer}>
              <Icon name="ios-paper" type="ionicon" color={darkGreen} />
            </View>
            <View style={globalStyles.formPickerInnerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={this.state.size}
                onValueChange={this.onSizeChange.bind(this)}>
                {this.getSize(this.state.category).map((item, i) => {
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
            <Text style={styles.error}>{this.props.sizeErr}</Text>
          </View>
          {/* <Text style={styles.error}>{this.props.sizeErr}</Text> */}
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
