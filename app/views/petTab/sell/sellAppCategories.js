import React from "react";
import { StyleSheet, Text, View, Picker } from "react-native";
import { Icon } from "react-native-elements";
import globalStyles, { primaryColour1 } from "../../styleSheet/styleSheet";
// Solved from this link https://github.com/GeekyAnts/NativeBase/issues/636

//Information
const dog_breed = [
  "Select breed",
  "German Shepherd",
  "Maltese",
  "Cavoodle",
  "Samoyed",
  "Golden Retriever",
  "Pomeranian",
  "Rottweiler",
  "Corgi",
];

const dog_colour = ["Select colour", "Black", "Grey", "Brown", "White"];

const cat_breed = [
  "Select breed",
  "Bengal Cat",
  "British Shorthair",
  "Persian cat",
  "Siamese cat",
  "Ragdoll",
  "Sphynx",
];

const cat_colour = ["Select colour", "Black", "Grey", "Brown", "White"];

const bird_breed = [
  "Select breed",
  "Parakeet",
  "African Grey",
  "Cockatiel",
  "Conure",
  "Parotlet",
  "Canary",
  "Amazon Parrot",
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

const lizard_breed = [
  "Select breed",
  "Red Ackie",
  "Svannah Monitor",
  "Leopard Gecko",
  "Iguana",
  "Crested Gecko",
  "Bearded Dragon",
  "Chameleon",
];

const lizard_colour = ["Select colour", "Green", "Black", "White", "Other"];

const turtle_breed = [
  "Select breed",
  "Western Painted Turtle",
  "Red Eared Slider",
  "Spotted Turtle",
  "Eastern Box",
  "African Sideneck Turtle",
  "Common Musk Turtle",
  "Mississippi Map Turtle",
];

const turtle_colour = ["Select colour", "Green", "Black", "Brown", "Other"];

const fish_breed = [
  "Select breed",
  "Betta Splenden",
  "Fantail Goldfish",
  "Neon Tetra",
  "Freshwater Angelfish",
  "Platy",
  "Molly",
  "Guppy",
];

const fish_colour = [
  "Select colour",
  "Yellow",
  "White",
  "Orange",
  "Blue",
  "Green",
];

const rabbit_breed = [
  "American",
  "Belgian Hare",
  "Blanc de Hotot",
  "Californian",
  "Checkered Giant",
  "Dutch",
  "English Lop",
  "Lionhead",
];

const rabbit_colour = ["white", "black", "brown", "grey"];

const horse_breed = [
  "Arabian",
  "American Quarter",
  "Thoroughbred",
  "Morgan",
  "Appaloosa",
  "Pony",
  "Warmblood",
];

const horse_colour = ["white", "black", "brown", "grey"];

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

  //Get The Breed
  getBreed(val) {
    if (val === "Dog") {
      return dog_breed;
    } else if (val == "Cat") {
      return cat_breed;
    } else if (val == "Rabbit") {
      return rabbit_breed;
    } else if (val == "Fish") {
      return fish_breed;
    } else if (val == "Bird") {
      return bird_breed;
    } else if (val == "Horse") {
      return horse_breed;
    } else if (val == "Lizard") {
      return lizard_breed;
    } else if (val == "Turtle") {
      return turtle_breed;
    } else {
      return empty_breed;
    }
  }

  //Get The Colour
  getColour(val) {
    if (val === "Dog") {
        return dog_colour;
      } else if (val == "Cat") {
        return cat_colour;
      } else if (val == "Rabbit") {
        return rabbit_colour;
      } else if (val == "Fish") {
        return fish_colour;
      } else if (val == "Bird") {
        return bird_colour;
      } else if (val == "Horse") {
        return horse_colour;
      } else if (val == "Lizard") {
        return lizard_colour;
      } else if (val == "Turtle") {
        return turtle_colour;
      } else {
        return empty_colour;
      }
  }

  //Get The Size
  getSize(val) {
    if (
      val === "Dog" ||
      val === "Cat" ||
      val === "Rabbit" ||
      val === "Fish" ||
      val === "Bird" ||
      val === "Horse" ||
      val === "Lizard" ||
      val === "Turtle"
    ) {
      return size;
    } else {
      return empty_size;
    }
  }

  //Category Change Listener
  onCategoryChange(value) {
    this.props.setCategory(value);
    this.setState({
      category: value,
    });
  }

  //Breed Change Listener
  onBreedChange(value) {
    this.setState({
      breed: value,
    });
    this.props.setBreed(value);
  }

  //Colour Change Listener
  onColourChange(value) {
    this.setState({
      colour: value,
    });
    this.props.setColour(value);
  }

  //Size Change Listener
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
                  label="Rabbit"
                  value="Rabbit"
                  style={styles.pickerEntry}
                />
                <Picker.Item
                  label="Fish"
                  value="Fish"
                  style={styles.pickerEntry}
                />
                <Picker.Item
                  label="Bird"
                  value="Bird"
                  style={styles.pickerEntry}
                />
                <Picker.Item
                  label="Horse"
                  value="Horse"
                  style={styles.pickerEntry}
                />
                <Picker.Item
                  label="Lizard"
                  value="Lizard"
                  style={styles.pickerEntry}
                />
                <Picker.Item
                  label="Turtle"
                  value="Turtle"
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
              <Icon name="ios-paper" type="ionicon" color={primaryColour1} />
            </View>
            <View style={globalStyles.formPickerInnerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={this.state.breed}
                onValueChange={this.onBreedChange.bind(this)}>
                {this.getBreed(this.state.category).map((item, i) => {
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
        </View>

        <View style={styles.inputContainer}>
          <Text>
            <Text style={styles.inputName}>Colour</Text>
          </Text>
          <View style={globalStyles.formPickerOuterContainer}>
            <View style={globalStyles.formPickerIconContainer}>
              <Icon name="ios-paper" type="ionicon" color={primaryColour1} />
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
        </View>

        <View style={styles.inputContainer}>
          <Text>
            <Text style={styles.inputName}>Size</Text>
          </Text>

          <View style={globalStyles.formPickerOuterContainer}>
            <View style={globalStyles.formPickerIconContainer}>
              <Icon name="ios-paper" type="ionicon" color={primaryColour1} />
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
