import { blue } from "@material-ui/core/colors";
import * as React from "react";
import {
  Picker,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Image
} from "react-native";
import { color } from "react-native-reanimated";
import { db } from "../database/firebase";
import uuid from "react-native-uuid";
import {openDocumentPicker, uploadDocument }from "../components/DocumentUpload";
import {openImagePicker, uploadPhoto} from "../components/ImageUpload"

export default class SellApplicationComponent extends React.Component {
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
    photo_uri: "",
    documents_uri: ""
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
      photo_uri,
      documents_uri
    } = this.state;


    console.log("photo uuid:" + this.state.photo);

    uploadPhoto(this.state.photo_uri, this.state.photo);
    uploadDocument(this.state.documents_uri, this.state.documents)
    

    db.collection("pet-sell-list").add({
      name: this.state.name,
      category: this.state.category,
      breed: this.state.breed,
      colour: this.state.colour,
      age: this.state.age,
      gender: this.state.gender,
      behaviour: this.state.behaviour,
      health: this.state.health,
      training: this.state.training,
      photo: this.state.photo,
      documents: this.state.documents
      // to implement
      //   location
      //   photo
      //   documents
    });
  };

  setPhotoUri = async () => {
    const get_uri = await openImagePicker();

    this.setState({
      photo: uuid.v4(),
      photo_uri: get_uri,
    });
  };

  setDocumentUri = async () => {
      const get_uri = await openDocumentPicker();

      this.setState({
          documents: uuid.v4(),
          documents_uri: get_uri
      });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.heading}>New Pet Listing Application</Text>
          <View style={styles.titleContainer}>
            <View style={styles.rectangle}>
              <Text>
                <Text style={styles.titles}>Name:</Text>
                <Text style={styles.setColorRed}> *</Text>
              </Text>
              <TextInput
                onChangeText={(name) => this.setState({ name })}
                style={styles.input}
              />
              <Text>
                <Text style={styles.titles}>Category:</Text>
                <Text style={styles.setColorRed}> *</Text>
              </Text>
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
              <Text>
                <Text style={styles.titles}>Animal Breed:</Text>
                <Text style={styles.setColorRed}> *</Text>
              </Text>
              <TextInput
                onChangeText={(breed) => this.setState({ breed })}
                style={styles.input}
              />

              <Text>
                <Text style={styles.titles}>Colour:</Text>
                <Text style={styles.setColorRed}> *</Text>
              </Text>
              <TextInput
                onChangeText={(colour) => this.setState({ colour })}
                secureTextEntry={true}
                style={styles.input}
              />

              <Text>
                <Text style={styles.titles}>Age:</Text>
                <Text style={styles.setColorRed}> *</Text>
              </Text>
              <TextInput
                onChangeText={(age) => this.setState({ age })}
                secureTextEntry={true}
                style={styles.input}
              />

              <Text>
                <Text style={styles.titles}>Gender:</Text>
                <Text style={styles.setColorRed}> *</Text>
              </Text>
              <Picker
                style={styles.picker}
                onValueChange={(gender) => this.setState({ gender })}>
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>
              <Text>
                <Text style={styles.titles}>Location:</Text>
                <Text style={styles.setColorRed}> *</Text>
              </Text>
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

              <Text style={styles.titles}>Care, Health and Feeding:</Text>
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
                  this.setState({ additionalInfo })
                }
                multiline
                numberOfLines={4}
                secureTextEntry={true}
                style={styles.biginput}
              />

              <Text style={styles.titles}>Upload a photo</Text>
              <Button title="Choose Photo" onPress={this.setPhotoUri}/>
              <Image source={{
                  image_path: this.state.photo_uri
              }}/>

              <Text style={styles.titles}>Upload Documents:</Text>
              <Button title="Choose Photo" onPress={this.setDocumentUri} />
              {/* <TextInput
                onChangeText={(documents) => this.setState({ documents })}
                secureTextEntry={true}
                style={styles.input}
              /> */}

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
    padding: 24,
    // justifyContent: "center",
    // alignItems: "center",
  },
  titles: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 8,
    // width: 50,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    // textShadowColor: "rgba(0, 0, 0, 0.3)",
    // textShadowOffset: { width: -1, height: 1 },
    // textShadowRadius: 10,
    color: "#000000",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    flex: 1,
    paddingVertical: 10,
  },
  input: {
    width: 330,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    backgroundColor: "white",
  },
  biginput: {
    width: 350,
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
    // backgroundColor: "blue",
  },
  buttonsContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  buttons: {
    backgroundColor: "#447ECB",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 100,
    height: 40,
  },
  buttonsText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  titleContainer: {
    flex: 1,
  },
  setColorRed: {
    color: "#f44336",
  },
});
