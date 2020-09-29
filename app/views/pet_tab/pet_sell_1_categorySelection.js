import React from "react";
import { StyleSheet, Text, View, Picker, Button } from "react-native";

// Solved from this link https://github.com/GeekyAnts/NativeBase/issues/636

const dog_breed = [
  "Select breed",
  "dog breed 1",
  "dog breed 2",
  "dog breed 3",
  "dog breed 4",
];

const dog_colour = [
  "Select colour",
  "dog colour 1",
  "dog colour 2",
  "dog colour 3",
  "dog colour 4",
];

const cat_breed = [
  "Select breed",
  "cat breed 1",
  "cat breed 2",
  "cat breed 3",
  "cat breed 4",
];

const cat_colour = [
  "Select colour",
  "cat colour 1",
  "cat colour 2",
  "cat colour 3",
  "cat colour 4",
];

const bird_breed = [
  "Select breed",
  "bird breed 1",
  "bird breed 2",
  "bird breed 3",
  "bird breed 4",
];

const bird_colour = [
  "Select colour",
  "bird colour 1",
  "bird colour 2",
  "bird colour 3",
  "bird colour 4",
];

const reptile_breed = [
  "Select breed",
  "reptile breed 1",
  "reptile breed 2",
  "reptile breed 3",
  "reptile breed 4",
];

const reptile_colour = [
  "Select colour",
  "reptile colour 1",
  "reptile colour 2",
  "reptile colour 3",
  "reptile colour 4",
];

const fish_breed = [
  "Select breed",
  "fish breed 1",
  "fish breed 2",
  "fish breed 3",
  "fish breed 4",
];

const fish_colour = [
  "Select colour",
  "fish colour 1",
  "fish colour 2",
  "fish colour 3",
  "fish colour 4",
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
    if (val === "dog") {
      return dog_breed;
    } else if (val == "cat") {
      return cat_breed;
    } else if (val == "bird") {
      return bird_breed;
    } else if (val == "fish") {
      return fish_breed;
    } else if (val == "reptile") {
      return reptile_breed;
    } else {
      return empty_breed;
    }
  }

  getColour(val) {
    if (val === "dog") {
      return dog_colour;
    } else if (val == "cat") {
      return cat_colour;
    } else if (val == "bird") {
      return bird_colour;
    } else if (val == "fish") {
      return fish_colour;
    } else if (val == "reptile") {
      return reptile_colour;
    } else {
      return empty_colour;
    }
  }

  getSize(val) {
    if (
      val === "dog" ||
      val === "cat" ||
      val === "bird" ||
      val === "fish" ||
      val === "reptile"
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
        <Text>
          <Text style={styles.titles}>Category</Text>
        </Text>
        <View style={styles.picker_container}>
          <Picker
            style={styles.picker}
            selectedValue={this.state.category}
            onValueChange={this.onCategoryChange.bind(this)}
          >
            <Picker.Item label="Select category" value="0" color="#B4B4B4" />
            <Picker.Item label="Dog" value="dog" style={styles.picker_entry} />
            <Picker.Item label="Cat" value="cat" style={styles.picker_entry} />
            <Picker.Item
              label="Bird"
              value="bird"
              style={styles.picker_entry}
            />
            <Picker.Item
              label="Reptile"
              value="reptile"
              style={styles.picker_entry}
            />
            <Picker.Item
              label="Fish"
              value="fish"
              style={styles.picker_entry}
            />
          </Picker>
        </View>
        <Text>
          <Text style={styles.titles}>Breed</Text>
        </Text>
        <View style={styles.picker_container}>
          <Picker
            style={styles.picker}
            selectedValue={this.state.breed}
            onValueChange={this.onBreedChange.bind(this)}
          >
            {this.getBreed(this.state.category).map((item, i) => {
              // console.log("item", item);
              // return <Picker.Item label={item} key={`${i}+1`} value={item} />;

              if (i == 0) {
                return (
                  <Picker.Item label={item} key={i} value={0} color="#B4B4B4" />
                );
              } else {
                return <Picker.Item label={item} key={i} value={item} />;
              }
            })}
          </Picker>
        </View>
        <Text>
          <Text style={styles.titles}>Colour</Text>
        </Text>
        <View style={styles.picker_container}>
          <Picker
            style={styles.picker}
            selectedValue={this.state.colour}
            onValueChange={this.onColourChange.bind(this)}
          >
            {this.getColour(this.state.category).map((item, i) => {
              if (i == 0) {
                return (
                  <Picker.Item label={item} key={i} value={0} color="#B4B4B4" />
                );
              } else {
                return <Picker.Item label={item} key={i} value={item} />;
              }
            })}
          </Picker>
        </View>
        <Text>
          <Text style={styles.titles}>Size</Text>
        </Text>
        <View style={styles.picker_container}>
          <Picker
            style={styles.picker}
            selectedValue={this.state.size}
            onValueChange={this.onSizeChange.bind(this)}
          >
            {this.getSize(this.state.category).map((item, i) => {
              if (i == 0) {
                return (
                  <Picker.Item label={item} key={i} value={0} color="#B4B4B4" />
                );
              } else {
                return <Picker.Item label={item} key={i} value={item} />;
              }
            })}
          </Picker>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titles: {
    fontSize: 14,
    // fontWeight: "bold",
    color: "#515151",
    paddingVertical: 8,
    // width: 50,
  },
  picker: {
    height: 34,
    width: 314,
    fontSize: 12,
    // marginBottom: 100,
    //   backgroundColor: "white",
    //   borderColor: "black",
    //   borderWidth: 1
  },
  picker_default: {
    color: "#B4B4B4",
  },
  picker_container: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    height: 34,
    marginBottom: 10,
  },
  picker_entry: {
    fontSize: 12,
    color: "#0000FF",
  },
});
