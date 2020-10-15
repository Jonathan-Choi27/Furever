import * as React from "react";
import {
  Picker,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { db } from "../../database/firebase";
import uuid from "react-native-uuid";
import {
  openDocumentPicker,
  uploadDocument,
} from "../../components/DocumentUpload";
import { openImagePicker, uploadPhoto } from "../../components/ImageUpload";
import CategorySelection from "./sellAppCategories";
import { auth } from "../../database/firebase";
import * as firebase from "firebase/app";
import "firebase/storage";

export default class sellApplication extends React.Component {
  state = {
    valid_price: true,
    valid_name: true,
    valid_age: true,
    valid_location: true,
    valid_health: true,
    valid_behaviour: true,
    valid_training: true,
    valid_additionalInfo: true,
    name: "",
    category: "",
    breed: "",
    colour: "",
    age: "",
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

  behaviour_regex = (behaviour) => {
    if (behaviour === "") {
      return false;
    } else {
      return true;
    }
  };

  training_regex = (training) => {
    if (training === "") {
      return false;
    } else {
      return true;
    }
  };

  additionalInfo_regex = (additionalInfo) => {
    if (additionalInfo === "") {
      return false;
    } else {
      return true;
    }
  };

  health_regex = (health) => {
    if (health === "") {
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

  componentDidMount() {}

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
      alert("Application Successful!");
      this.props.navigation.goBack();
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

  checkInput = (val) => {
    // let re = /[!@#$%^&*(),.?":{}|<>]/;
    if (!/\d+/g.test(val)) {
      return false;
    }
    return true;
  };

  renderError(val) {
    if (val === "name") {
      if (this.state["name"] === "") {
        return <Text style={styles.error}>Name cannot be blank</Text>;
      }
      if (/\d+/g.test(this.state["name"])) {
        return <Text style={styles.error}>Name must not contain numbers</Text>;
      }
    } else if (val === "age") {
      if (this.state["age"] === "") {
        return <Text style={styles.error}>Age cannot be blank</Text>;
      } else if (!/^[0-9\b]+$/.test(this.state["age"])) {
        return <Text style={styles.error}>Age must not contain letters</Text>;
      }
    } else if (val === "location") {
      if (this.state["location"] === "") {
        return <Text style={styles.error}>Location cannot be blank</Text>;
      }
    } else if (val === "price") {
      if (this.state["price"] === "") {
        return <Text style={styles.error}>Price cannot be blank</Text>;
      } else if (!/^[0-9\b]+$/.test(this.state["price"])) {
        return <Text style={styles.error}>Price must not contain letters</Text>;
      }
    } else if (val === "behaviour") {
      if (this.state["behaviour"] === "") {
        return <Text style={styles.error}>Behaviour cannot be blank</Text>;
      }
    } else if (val === "health") {
      if (this.state["health"] === "") {
        return (
          <Text style={styles.error}>
            Care, Health and Feeding cannot be blank
          </Text>
        );
      }
    } else if (val === "training") {
      if (this.state["training"] === "") {
        return <Text style={styles.error}>Training cannot be blank</Text>;
      }
    } else if (val === "additionalInfo") {
      if (this.state["additionalInfo"] === "") {
        return (
          <Text style={styles.error}>
            Additional information cannot be blank
          </Text>
        );
      }
    }

    return null;
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
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
                  mode="outlined"
                  theme={{ colors: { primary: "#447ECB" } }}
                  style={styles.smallInputBox}
                  onChangeText={(name) =>
                    this.setState({
                      name: name,
                    })
                  }
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
                  mode="outlined"
                  theme={{ colors: { primary: "#447ECB" } }}
                  style={styles.smallInputBox}
                  onChangeText={(age) =>
                    this.setState({
                      age: age,
                    })
                  }
                  onBlur={() => {
                    var bool = this.name_regex(this.state.age);
                    this.setState({
                      valid_age: bool,
                    });
                  }}
                />
              </View>

              <View style={{ marginTop: 10 }} />
              <Text>
                <Text style={styles.titles}>Gender</Text>
                {/* <Text style={styles.setColorRed}> *</Text> */}
              </Text>

              <View style={styles.picker_container}>
                <Picker
                  style={styles.picker}
                  selectedValue={this.state.gender}
                  onValueChange={(gender) => this.setState({ gender })}>
                  <Picker.Item
                    label="Select gender"
                    value="0"
                    color="#B4B4B4"
                  />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                </Picker>
              </View>
              <View style={{ marginTop: 10 }} />

              {/* <TextInput
                // label="Gender"
                mode="outlined"
                theme={{ colors: { primary: "#447ECB" } }}
                style={styles.smallInputBox}            
                render={(props) => (
                    <Picker
                    selectedValue={this.state.gender}
                    onValueChange={(gender) => this.setState({ gender })}>
                    <Picker.Item
                    //   label="Select gender"
                    //   value="0"
                    //   color="#B4B4B4"
                    />
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                  </Picker>
                )}
              /> */}

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
                  mode="outlined"
                  theme={{ colors: { primary: "#447ECB" } }}
                  style={styles.smallInputBox}
                  onChangeText={(location) =>
                    this.setState({
                      location: location,
                    })
                  }
                  onBlur={() => {
                    var bool = this.location_regex(this.state.location);
                    this.setState({
                      valid_location: bool,
                    });
                  }}
                />
              </View>
                  <View style={{marginBottom: 10}}/>

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
                  mode="outlined"
                  theme={{ colors: { primary: "#447ECB" } }}
                  style={styles.smallInputBox}
                  onChangeText={(price) =>
                    this.setState({
                      price: price,
                    })
                  }
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
                      <Text style={styles.errorText}>Invalid input</Text>
                    </View>
                  )}
                </View>
                <TextInput
                  mode="outlined"
                  multiline={true}
                  theme={{ colors: { primary: "#447ECB" } }}
                //   style={styles.smallInputBox}
                  onChangeText={(behaviour) =>
                    this.setState({
                      behaviour: behaviour,
                    })
                  }
                  onBlur={() => {
                    var bool = this.price_regex(this.state.behaviour);
                    this.setState({
                      valid_behaviour: bool,
                    });
                  }}
                />
              </View>


              <View style={styles.inputContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.inputName}>Care, Health and Feeding</Text>
                  </View>
                  {!this.state.valid_health && (
                    <View style={{ flex: 1 }}>
                      <Text style={styles.errorText}>Invalid input</Text>
                    </View>
                  )}
                </View>
                <TextInput
                  mode="outlined"
                  multiline={true}
                  theme={{ colors: { primary: "#447ECB" } }}
                  onChangeText={(health) =>
                    this.setState({
                      health: health,
                    })
                  }
                  onBlur={() => {
                    var bool = this.price_regex(this.state.health);
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
                      <Text style={styles.errorText}>Invalid input</Text>
                    </View>
                  )}
                </View>
                <TextInput
                  mode="outlined"
                  multiline={true}
                  theme={{ colors: { primary: "#447ECB" } }}
                  onChangeText={(training) =>
                    this.setState({
                      training: training,
                    })
                  }
                  onBlur={() => {
                    var bool = this.price_regex(this.state.training);
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
                  mode="outlined"
                  multiline={true}
                  theme={{ colors: { primary: "#447ECB" } }}
                  onChangeText={(additionalInfo) =>
                    this.setState({
                      additionalInfo: additionalInfo,
                    })
                  }
                  onBlur={() => {
                    var bool = this.price_regex(this.state.additionalInfo);
                    this.setState({
                      valid_additionalInfo: bool,
                    });
                  }}
                />
              </View>


              <Text style={styles.titles}>Upload a photo</Text>
              <Button
                style={{
                  //   paddingVertical : 25,
                  // marginBottom: 25,
                  backgroundColor: "#447ECB",
                }}
                onPress={this.setPhotoUri}>
                <Text
                  style={{
                    color: "white",
                  }}>
                  Choose Photo
                </Text>
              </Button>
              {/* <Button title="Choose Photo" onPress={this.setPhotoUri} /> */}
              <Image
                source={{
                  image_path: this.state.photo_uri,
                }}
              />
              <Text style={styles.titles}>Upload Documents</Text>

              <Button
                style={{
                  //   paddingVertical : 25,
                  // marginTop: 25,
                  // marginBottom: 25,
                  backgroundColor: "#447ECB",
                }}
                onPress={this.setDocumentUri}>
                <Text
                  style={{
                    color: "white",
                  }}>
                  Choose Document
                </Text>
              </Button>
              {/* <Button title="Choose Document" onPress={this.setDocumentUri} /> */}

              {/* <TextInput
                onChangeText={(documents) => this.setState({ documents })}
                secureTextEntry={true}
                style={styles.input}
              /> */}

              {/* <Picker
                style={styles.picker}
                onValueChange={(category) => this.setState({ category })}
              >
                <Picker.Item label="Select" value="0" />
                <Picker.Item label="Dog" value="dog" />
                <Picker.Item label="Cat" value="cat" />
                <Picker.Item label="Bird" value="bird" />
                <Picker.Item label="Reptile" value="reptile" />
                <Picker.Item label="Fish" value="fish" />
                <Picker.Item label="Exotic" value="exotic" />
              </Picker>
              <Text>
                <Text style={styles.titles}>Animal Breed</Text>
              </Text>
              <TextInput
                onChangeText={(breed) => this.setState({ breed })}
                style={styles.input}
              /> */}
              {/* <Text>
                <Text style={styles.titles}>Colour</Text>
              </Text>
              <Picker style={styles.picker} onValueChange={(category) => {}}>
                <Picker.Item label="Select" value="0" />
                <Picker.Item label="Brown" value="dog" />
                <Picker.Item label="White" value="cat" />
                <Picker.Item label="Black" value="bird" />
                <Picker.Item label="Grey" value="reptile" />
              </Picker> */}

              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  title={"submit"}
                  style={styles.buttons}
                  onPress={this.handleSubmit}
                  //   onPress={() => this.props.navigation.replace("currentListings")}
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
    color: "#515151",
    paddingVertical: 8,
    // width: 50,
  },
  inputName: {
    marginBottom: 0,
    paddingBottom: 0,
    color: "#515151",
    fontSize: 14,
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
  },
  smallInputBox: {
    margin: 0,
    height: 25,
    backgroundColor: "#F6F6F6",
    // borderWidth: 1,
    // borderWidth: 3,
    padding: 0,
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
    height: 27,
    borderRadius: 4,
    fontSize: 12,
    // backgroundColor: "#F6F6F6",
  },
  //   pickerContainer: {
  //       borderColor: "black",
  //   },
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
    backgroundColor: "#F6F6F6",
    borderColor: "#5D5D5D",
    borderWidth: 1,
    borderRadius: 4,
    // height: 34,
    // marginBottom: 10,
  },
  error: {
    marginBottom: 10,
    color: "red",
    fontSize: 12,
  },
  pickerItem: {
    fontSize: 12,
  },
  errorText: {
    color: "red",
    textAlign: "right",
    fontSize: 14,
    fontWeight: "bold",
  },
});
