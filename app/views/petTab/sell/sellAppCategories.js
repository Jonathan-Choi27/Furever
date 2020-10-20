import React from "react";
import { StyleSheet, Text, View, Picker, Button } from "react-native";

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
  "Ragdoll",
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
    };
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
    this.setState({
      category: value,
    });
    this.props.category(value);
  }

  onBreedChange(value) {
    this.setState({
      breed: value,
    });
    this.props.breed(value);
  }

  onColourChange(value) {
    this.setState({
      colour: value,
    });
    this.props.colour(value);
  }

  onSizeChange(value) {
    this.setState({
      size: value,
    });
    this.props.size(value);
  }

  render() {
    return (
      <View>
        <View style={styles.inputContainer}>
          <Text>
            <Text style={styles.titles}>Category</Text>
          </Text>
          <View style={styles.picker_container}>
            <Picker
              style={styles.picker}
              selectedValue={this.state.category}
              onValueChange={this.onCategoryChange.bind(this)}>
              <Picker.Item label="Select category" value="0" color="#B4B4B4" />
              <Picker.Item
                label="Dog"
                value="Dog"
                style={styles.picker_entry}
              />
              <Picker.Item
                label="Cat"
                value="Cat"
                style={styles.picker_entry}
              />
              <Picker.Item
                label="Bird"
                value="Bird"
                style={styles.picker_entry}
              />
              <Picker.Item
                label="Reptile"
                value="Reptile"
                style={styles.picker_entry}
              />
              <Picker.Item
                label="Fish"
                value="Fish"
                style={styles.picker_entry}
              />
            </Picker>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text>
            <Text style={styles.titles}>Breed</Text>
          </Text>
          <View style={styles.picker_container}>
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
                      color="#B4B4B4"
                    />
                  );
                } else {
                  return <Picker.Item label={item} key={i} value={item} />;
                }
              })}
            </Picker>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text>
            <Text style={styles.titles}>Colour</Text>
          </Text>
          <View style={styles.picker_container}>
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
                      color="#B4B4B4"
                    />
                  );
                } else {
                  return <Picker.Item label={item} key={i} value={item} />;
                }
              })}
            </Picker>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text>
            <Text style={styles.titles}>Size</Text>
          </Text>
          <View style={styles.picker_container}>
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
                      color="#B4B4B4"
                    />
                  );
                } else {
                  return <Picker.Item label={item} key={i} value={item} />;
                }
              })}
            </Picker>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 10
    },
  titles: {
    fontSize: 14,
    // fontWeight: "bold",
    color: "#515151",
    paddingVertical: 8,
    // width: 50,
  },
  picker: {
    // height: 34,
    // width: 314,
    // fontSize: 12,

    height: 27,
    borderRadius: 4,
    fontSize: 5,
    // backgroundColor: "#F6F6F6"

    // marginBottom: 100,
    //   backgroundColor: "white",
    //   borderColor: "black",
    //   borderWidth: 1
  },
  picker_default: {
    color: "#B4B4B4",
  },
  picker_container: {
    // backgroundColor: "white",
    borderColor: "black",
    backgroundColor: "#F6F6F6",
    borderColor: "#5D5D5D",
    borderWidth: 1,
    borderRadius: 4,
    // height: 34,
    marginTop: 5,
    // marginBottom: 10,
  },
  picker_entry: {
    fontSize: 12,
    color: "#0000FF",
  },
});
