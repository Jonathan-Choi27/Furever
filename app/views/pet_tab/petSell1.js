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
  Image,
} from "react-native";
import { color } from "react-native-reanimated";
import { db } from "../database/firebase";
import uuid from "react-native-uuid";
import {
  openDocumentPicker,
  uploadDocument,
} from "../components/DocumentUpload";
// import {
//   useFonts,
//   Roboto_400Regular,
//   Roboto_700Bold,
// } from "@expo-google-fonts/roboto";
import * as Font from "expo-font";
import { openImagePicker, uploadPhoto } from "../components/ImageUpload";
import CategorySelection from "./pet_sell_1_categorySelection";
import { auth } from "../database/firebase";
import * as firebase from "firebase/app";
import "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default class petSell1 extends React.Component {
  state = {
    name: "",
    category: "",
    breed: "",
    colour: "",
    age: 0,
    gender: "",
    location: "",
    price: "",
    behaviour: "",
    health: "",
    training: "",
    additionalInfo: "",
    documents: "",
    //photo
    photo_link: "",
    photo_uri: "",
    photo_uuid: "",
    documents_uri: "",
    seller_name: "",
    size: "",
    valid_name: true,
    valid_age: true,
    valid_location: true,
    valid_price: true,
    valid_behaviour: true,
    valid_health: true,
    valid_training: true,
    valid_additionalInfo: true,
  };

  componentDidMount() {
    //  db.collection("users").doc(auth.currentUser.uid).get().then((doc) => {
    //      this.state.seller_name = doc.data().name;
    //  });
  }

  handleSubmit = async () => {
    const {
      name,
      category,
      breed,
      colour,
      age,
      gender,
      location,
      price,
      behaviour,
      health,
      training,
      additionalInfo,
      size,
      photo_uuid,
      photo_uri,
      photo_link,
      documents,
      documents_uri,
      //   seller_name,
    } = this.state;

    console.log("photo uuid:" + this.state.photo_uuid);

    const photoURL = await uploadPhoto(
      this.state.photo_uri,
      this.state.photo_uuid
    );

    this.setState({
      photo_link: photoURL,
    });
    console.log("class : " + photoURL);

    uploadDocument(this.state.documents_uri, this.state.documents);

    // var storageRef = firebase.storage().ref();
    // storageRef
    //   .child("user_uploads/images/" + this.state.photo_uuid)
    //   .getDownloadURL()
    //   .then(function (url) {
    //     console.log("hi");
    //     // this.state.photo_link = url;
    //     console.log(url);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    const user = auth.currentUser;

    var submit;
    if (
      name == "" ||
      category == "0" ||
      breed == "0" ||
      colour == "0" ||
      age == "" ||
      gender == "0" ||
      size == "0" ||
      location == "" ||
      price == "" ||
      behaviour == "" ||
      health == "" ||
      training == "" ||
      additionalInfo == ""

      // documents == "" ||
    ) {
      alert("All input fields required and must be valid.");
      submit = false;
    } else {
      submit = true;
    }

    db.collection("pet_listings").add({
      uuid: user.uid,
      name: this.state.name,
      category: this.state.category,
      breed: this.state.breed,
      colour: this.state.colour,
      age: this.state.age,
      gender: this.state.gender,
      behaviour: this.state.behaviour,
      health: this.state.health,
      location: this.state.location,
      training: this.state.training,
      photo_link: this.state.photo_link,
      documents: this.state.documents,
      price: this.state.price,
      additionalInfo: this.state.additionalInfo,
      size: this.state.size,
      // to implement
      //   location
      //   photo
      //   documents
      //   price
    });

    if (submit == true) {
      this.props.navigation.replace("petSell");
    }
  };
  // aaaaaaaaaa
  setPhotoUri = async () => {
    const get_uri = await openImagePicker();

    this.setState({
      photo_uuid: uuid.v4(),
      photo_uri: get_uri,
    });
  };

  setDocumentUri = async () => {
    const get_uri = await openDocumentPicker();

    this.setState({
      documents: uuid.v4(),
      documents_uri: get_uri,
    });
  };

  setCategory = (val) => {
    this.setState({
      category: val,
    });
  };

  setBreed = (val) => {
    this.setState({
      breed: val,
    });
  };

  setColour = (val) => {
    this.setState({
      colour: val,
    });
  };

  setSize = (val) => {
    this.setState({
      size: val,
    });
  };

  name_regex = (name) => {
    if (name === "" || /\d+/g.test(name)) {
      return false;
    } else {
      return true;
    }
  };

  age_regex = (age) => {
    if (!/^\d+$/.test(age) || age === "") {
      return false;
    } else {
      return true;
    }
  };

  location_regex = (location) => {
    if (location === "") {
      return false;
    } else {
      return true;
    }
  };

  price_regex = (price) => {
    if (!/^\d+$/.test(price) || price === "") {
      return false;
    } else {
      return true;
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.heading}>New Pet Listing Application</Text>
          <Text>
            <Text style={styles.sub_heading}>General Information</Text>
            <Text style={styles.setColorRed}> *</Text>
          </Text>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
            }}
          />
          <View style={styles.titleContainer}>
            <View style={styles.rectangle}>
              <View style={styles.inputContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.inputName}>Name</Text>
                  </View>
                  {!this.state.valid_name && (
                    <View style={{ flex: 1 }}>
                      <Text style={styles.errorText}>Invalid name</Text>
                    </View>
                  )}
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={(name) => this.setState({ name })}
                  onBlur={() => {
                    var bool = this.name_regex(this.state.name);
                    this.setState({
                      valid_name: bool,
                    });
                  }}
                />
              </View>
              <CategorySelection
                category={this.setCategory}
                breed={this.setBreed}
                colour={this.setColour}
                size={this.setSize}
              />
              <View style={styles.inputContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.inputName}>Age</Text>
                  </View>
                  {!this.state.valid_age && (
                    <View style={{ flex: 1 }}>
                      <Text style={styles.errorText}>Invalid age</Text>
                    </View>
                  )}
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={(age) => this.setState({ age })}
                  onBlur={() => {
                    var bool = this.age_regex(this.state.age);
                    this.setState({
                      valid_age: bool,
                    });
                  }}
                />
              </View>
              <Text>
                <Text style={styles.titles}>Gender</Text>
              </Text>
              <View style={styles.picker_container}>
                <Picker
                  style={styles.picker}
                  onValueChange={(gender) => this.setState({ gender })}
                >
                  <Picker.Item
                    label="Select gender"
                    value="0"
                    color="#B4B4B4"
                  />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                </Picker>
              </View>
              <View style={styles.inputContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.inputName}>Location</Text>
                  </View>
                  {!this.state.valid_location && (
                    <View style={{ flex: 1 }}>
                      <Text style={styles.errorText}>Invalid location</Text>
                    </View>
                  )}
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={(location) => this.setState({ location })}
                  onBlur={() => {
                    var bool = this.location_regex(this.state.location);
                    this.setState({
                      valid_location: bool,
                    });
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.inputName}>Price</Text>
                  </View>
                  {!this.state.valid_price && (
                    <View style={{ flex: 1 }}>
                      <Text style={styles.errorText}>Invalid price</Text>
                    </View>
                  )}
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={(price) => this.setState({ price })}
                  onBlur={() => {
                    var bool = this.price_regex(this.state.price);
                    this.setState({
                      valid_price: bool,
                    });
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.inputName}>Behaviour</Text>
                  </View>
                  {!this.state.valid_behaviour && (
                    <View style={{ flex: 1 }}>
                      <Text style={styles.errorText}>Invalid behaviour</Text>
                    </View>
                  )}
                </View>
                <TextInput
                  multiline
                  numberOfLines={4}
                  secureTextEntry={true}
                  style={styles.biginput}
                  onChangeText={(behaviour) => this.setState({ behaviour })}
                  onBlur={() => {
                    var bool = this.location_regex(this.state.behaviour);
                    this.setState({
                      valid_behaviour: bool,
                    });
                  }}
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.inputName}>
                      Care, Health and Feeding
                    </Text>
                  </View>
                  {!this.state.valid_health && (
                    <View style={{ flex: 1 }}>
                      <Text style={styles.errorText}>Invalid input</Text>
                    </View>
                  )}
                </View>
                <TextInput
                  multiline
                  numberOfLines={4}
                  secureTextEntry={true}
                  style={styles.biginput}
                  onChangeText={(health) => this.setState({ health })}
                  onBlur={() => {
                    var bool = this.location_regex(this.state.health);
                    this.setState({
                      valid_health: bool,
                    });
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.inputName}>Training</Text>
                  </View>
                  {!this.state.valid_training && (
                    <View style={{ flex: 1 }}>
                      <Text style={styles.errorText}>Invalid training</Text>
                    </View>
                  )}
                </View>
                <TextInput
                  multiline
                  numberOfLines={4}
                  secureTextEntry={true}
                  style={styles.biginput}
                  onChangeText={(training) => this.setState({ training })}
                  onBlur={() => {
                    var bool = this.location_regex(this.state.training);
                    this.setState({
                      valid_training: bool,
                    });
                  }}
                />
              </View>
              <View style={styles.inputContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.inputName}>Additional Information</Text>
                  </View>
                  {!this.state.valid_additionalInfo && (
                    <View style={{ flex: 1 }}>
                      <Text style={styles.errorText}>Invalid input</Text>
                    </View>
                  )}
                </View>
                <TextInput
                  multiline
                  numberOfLines={4}
                  secureTextEntry={true}
                  style={styles.biginput}
                  onChangeText={(additionalInfo) =>
                    this.setState({ additionalInfo })
                  }
                  onBlur={() => {
                    var bool = this.location_regex(this.state.additionalInfo);
                    this.setState({
                      valid_additionalInfo: bool,
                    });
                  }}
                />
              </View>
              <Text style={styles.titles}>Upload a photo</Text>
              <Button title="Choose Photo" onPress={this.setPhotoUri} />
              <Image
                source={{
                  image_path: this.state.photo_uri,
                }}
              />
              <Text style={styles.titles}>Upload Documents</Text>
              <Button title="Choose Document" onPress={this.setDocumentUri} />
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  title={"submit"}
                  style={styles.buttons}
                  onPress={this.handleSubmit}
                  //   onPress={() => this.props.navigation.replace("petSell")}
                >
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
    justifyContent: "center",
    alignItems: "center",
  },
  titles: {
    fontSize: 14,
    // fontWeight: "bold",
    // fontFamily: "Roboto_400Regular",
    color: "#515151",
    paddingVertical: 8,
    // width: 50,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    // fontFamily: "Rosario_400Regular",
    // textShadowColor: "rgba(0, 0, 0, 0.3)",
    // textShadowOffset: { width: -1, height: 1 },
    // textShadowRadius: 10,
    color: "#000000",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 50,
    flex: 1,
    paddingVertical: 10,
  },
  sub_heading: {
    fontSize: 16,
    // fontWeight: "bold",
    fontFamily: "Roboto_700Bold",
  },
  input: {
    width: 314,
    // height: 44,
    height: 34,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    // marginBottom: 15,
    backgroundColor: "white",
    fontSize: 12,
  },
  biginput: {
    width: 314,
    height: 80,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
  },
  picker: {
    height: 34,
    width: 314,
    fontSize: 12,
    marginBottom: 10,
  },
  buttonsContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 10,
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
  picker_container: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    height: 34,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    textAlign: "right",
    fontSize: 14,
    fontWeight: "bold",
  },
  inputContainer: {
    marginTop: 10,
  },
});
