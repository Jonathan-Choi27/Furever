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
  BackHandler,
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

export default class application extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid_name: true,
      valid_age: true,
      valid_location: true,
      valid_price: true,
      valid_behaviour: true,
      valid_health: true,
      valid_training: true,
      valid_additionalInfo: true,
      valid_uri: true,
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

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    this.props.navigation.goBack();
    return true;
  }

  handleSubmit = async () => {
    // alert("hi");
    // console.log("photo uuid:" + this.state.photo_uuid);

    // const photoURL = await uploadPhoto(
    //   this.state.photo_uri,
    //   this.state.photo_uuid
    // );

    // this.setState({
    //   photo_link: photoURL,
    // });
    // console.log("class : " + photoURL);

    // uploadDocument(this.state.documents_uri, this.state.documents);

    const user = auth.currentUser;

    var submit;
    if (
      this.name_regex(this.state.name) == false ||
      this.age_regex(this.state.age) == false ||
      this.location_regex(this.state.location) == false ||
      this.price_regex(this.state.price) == false ||
      this.behaviour_regex(this.state.behaviour) == false ||
      this.health_regex(this.state.health) == false ||
      this.training_regex(this.state.training) == false ||
      this.additionalInfo_regex(this.state.additionalInfo) == false ||
      this.state.photo_uri == ""
    ) {
      alert("All input fields required and must be valid.");
      this.check_valid_name();
      this.check_valid_age();
      this.check_valid_location();
      this.check_valid_price();
      this.check_valid_behaviour();
      this.check_valid_health();
      this.check_valid_training();
      this.check_valid_additionalInfo();
    //   console.log("photo_uri:" + this.state.photo_uri);
      if (this.state.photo_uri == "" || this.state.photo_uri == null) {
        this.setState({
          valid_uri: false,
        });
      }
      submit = false;
    } else {
      submit = true;
    }

    if (submit == true) {
      const photoURL = await uploadPhoto(
        this.state.photo_uri,
        this.state.photo_uuid
      );

      this.setState({
        photo_link: photoURL,
      });

    //   console.log("class : " + photoURL);

      uploadDocument(this.state.documents_uri, this.state.documents);

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
      });
      alert("Application Successful!");
      this.props.navigation.goBack();
    }
  };

  name_regex = (name) => {
    if (name == "" || /\d+/g.test(name)) {
      return false;
    } else {
      return true;
    }
  };

  check_valid_name = () => {
    var bool = this.name_regex(this.state.name);
    this.setState({
      valid_name: bool,
    });
  };

  age_regex = (age) => {
    if (!/^\d+$/.test(age) || age == "") {
      return false;
    } else {
      return true;
    }
  };

  check_valid_age = () => {
    var bool = this.age_regex(this.state.age);
    this.setState({
      valid_age: bool,
    });
  };

  location_regex = (location) => {
    if (location == "") {
      return false;
    } else {
      return true;
    }
  };

  check_valid_location = () => {
    var bool = this.location_regex(this.state.location);
    this.setState({
      valid_location: bool,
    });
  };

  price_regex = (price) => {
    if (!/^\d+$/.test(price) || price == "") {
      return false;
    } else {
      return true;
    }
  };

  check_valid_price = () => {
    var bool = this.price_regex(this.state.price);
    this.setState({
      valid_price: bool,
    });
  };

  behaviour_regex = (behaviour) => {
    if (behaviour == "") {
      return false;
    } else {
      return true;
    }
  };

  check_valid_behaviour = () => {
    var bool = this.behaviour_regex(this.state.behaviour);
    this.setState({
      valid_behaviour: bool,
    });
  };

  training_regex = (training) => {
    if (training == "") {
      return false;
    } else {
      return true;
    }
  };

  check_valid_training = () => {
    var bool = this.training_regex(this.state.training);
    this.setState({
      valid_training: bool,
    });
  };

  additionalInfo_regex = (additionalInfo) => {
    if (additionalInfo == "") {
      return false;
    } else {
      return true;
    }
  };

  check_valid_additionalInfo = () => {
    var bool = this.additionalInfo_regex(this.state.additionalInfo);
    this.setState({
      valid_additionalInfo: bool,
    });
  };

  health_regex = (health) => {
    if (health == "") {
      return false;
    } else {
      return true;
    }
  };

  check_valid_health = () => {
    var bool = this.health_regex(this.state.health);
    this.setState({
      valid_health: bool,
    });
  };


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
              //   marginBottom: 10
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
                    this.check_valid_name();
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
                    this.check_valid_age();
                  }}
                />
              </View>

              <View style={{ marginTop: 10 }} />
              <Text>
                <Text style={styles.titles}>Gender</Text>
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
              {/* <View style={{ marginTop: 10 }} /> */}

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
                    this.check_valid_location();
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
                  mode="outlined"
                  theme={{ colors: { primary: "#447ECB" } }}
                  style={styles.smallInputBox}
                  onChangeText={(price) =>
                    this.setState({
                      price: price,
                    })
                  }
                  onBlur={() => {
                    this.check_valid_price();
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
                  onChangeText={(behaviour) =>
                    this.setState({
                      behaviour: behaviour,
                    })
                  }
                  onBlur={() => {
                    this.check_valid_behaviour();
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
                  mode="outlined"
                  multiline={true}
                  theme={{ colors: { primary: "#447ECB" } }}
                  onChangeText={(health) =>
                    this.setState({
                      health: health,
                    })
                  }
                  onBlur={() => {
                    this.check_valid_health();
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
                    this.check_valid_training();
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
                    this.check_valid_additionalInfo();
                  }}
                />
              </View>

              {/* <Text style={styles.titles}>Upload a photo</Text> */}

              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.inputName}>Upload a photo</Text>
                </View>
                {!this.state.valid_uri && (
                  <View style={{ flex: 1 }}>
                    <Text style={styles.errorText}>Choose a photo</Text>
                  </View>
                )}
              </View>
              <Button
                style={{
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
              <Text style={styles.titles}>Upload Documents</Text>

              <Button
                style={{
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
    marginTop: 5,
    // height: 34,
    // marginBottom: 10,
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
  pickerItem: {
    fontSize: 12,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    textAlign: "right",
    // color: "red",
    // textAlign: "right",
    // fontSize: 14,
    // fontWeight: "bold",
  },
  inputContainer: {
    marginTop: 10,
  },
});
