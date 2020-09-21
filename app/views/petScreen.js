import * as React from "react";
import {
    Picker,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { db } from "./database/firebase";

export default class PetScreenComponent extends React.Component {
  state = {
    name: "",
    category: "",
    breed: "",
    colour: "",
    age: "",
    gender: "",
    location: "",
    behaviour: "",
    health: "",
    training: "",
    additionalInfo: "",
    photo: "",
    documents: "",
  };

  handleSubmit = () => {
    const {
      name,
      category,
      breed,
      colour,
      age,
      gender,
      location,
      behaviour,
      health,
      training,
      additionalInfo,
      photo,
      documents,
    } = this.state;

    db.collection("pet-sell-list").add({
      name: this.state.name,
      category: this.state.category,
      breed: this.state.breed,
      colour: this.state.colour,
      age: this.state.age,
      gender: this.state.gender,
      behaviour: this.state.behaviour,
      health: this.state.health,
      training: this.state.training
      // to implement
    //   location
    //   photo
    //   documents
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.heading}>New Pet Listing Application</Text>

          <View style={styles.titleContainer}>
            <View style={styles.rectangle}>
              <Text style={styles.titles}>Name:</Text>
              <TextInput
                onChangeText={(name) => this.setState({ name })}
                style={styles.input}
              />

              <Picker
                selectedValue={"Category"}
                style={styles.picker}
                onValueChange={(category) => this.setState({ category })}>
                <Picker.Item label="Dog" value="dog" />
                <Picker.Item label="Cat" value="cat" />
                <Picker.Item label="Bird" value="bird" />
                <Picker.Item label="Reptile" value="reptile" />
                <Picker.Item label="Fish" value="fish" />
                <Picker.Item label="Exotic" value="exotic" />
              </Picker>

              <Text style={styles.titles}>Animal Breed:</Text>
              <TextInput
                onChangeText={(breed) => this.setState({ breed })}
                style={styles.input}
              />

              <Text style={styles.titles}>Colour:</Text>
              <TextInput
                onChangeText={(colour) => this.setState({ colour })}
                secureTextEntry={true}
                style={styles.input}
              />

              <Text style={styles.titles}>Age:</Text>
              <TextInput
                onChangeText={(age) => this.setState({ age })}
                secureTextEntry={true}
                style={styles.input}
              />

              <Picker
                style={styles.picker}
                onValueChange={(gender) => this.setState({ gender })}>
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>

              <Text style={styles.titles}>Gender:</Text>
              <TextInput
                onChangeText={(gender) => this.setState({ confirmPassword })}
                secureTextEntry={true}
                style={styles.input}
              />

              <Text style={styles.titles}>Location:</Text>
              <TextInput
                onChangeText={(location) => this.setState({ location })}
                secureTextEntry={true}
                style={styles.input}
              />

              <Text style={styles.titles}>Behaviour:</Text>
              <TextInput
                onChangeText={(behaviour) => this.setState({ behaviour })}
                multiline
                numberOfLines={4}
                secureTextEntry={true}
                style={styles.biginput}
              />

              <Text style={styles.titles}>Care,Health and Feeding:</Text>
              <TextInput
                onChangeText={(heatlh) => this.setState({ health })}
                multiline
                numberOfLines={4}
                secureTextEntry={true}
                style={styles.biginput}
              />

              <Text style={styles.titles}>Training:</Text>
              <TextInput
                onChangeText={(training) => this.setState({ training })}
                multiline
                numberOfLines={4}
                secureTextEntry={true}
                style={styles.biginput}
              />

              <Text style={styles.titles}>Additional Information:</Text>
              <TextInput
                onChangeText={(additionalInfo) =>
                  this.setState({ additionalInfo })}
                multiline
                numberOfLines={4}
                secureTextEntry={true}
                style={styles.biginput}
              />

              <Text style={styles.titles}>Upload a photo</Text>
              <TextInput
                onChangeText={(photo) => this.setState({ photo })}
                secureTextEntry={true}
                style={styles.input}
              />

              <Text style={styles.titles}>Upload Documents:</Text>
              <TextInput
                onChangeText={(documents) => this.setState({ documents })}
                secureTextEntry={true}
                style={styles.input}
              />

              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  title={"submit"}
                  style={styles.buttons}
                  onPress={this.handleSubmit}>
                  <Text style={styles.buttonsText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    color: "#FFFFFF",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    flex: 1,
  },
  input: {
    width: 250,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    backgroundColor: "white",
  },
  biginput: {
    width: 250,
    // height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    backgroundColor: "white",
  },
  picker: {
    height: 44,
    width: 250,
  },
});
