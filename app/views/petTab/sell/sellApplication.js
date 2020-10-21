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
import "firebase/storage";
import { darkGreen, green, lightGreen, lightGrey, orange, lightBlue } from "../../styleSheet/styleSheet";

export default class sellApplication extends React.Component {
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
      // this.additionalInfo_regex(this.state.additionalInfo) == false ||
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
      // this.check_valid_additionalInfo();
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

  // additionalInfo_regex = (additionalInfo) => {
  //   if (additionalInfo == "") {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  // check_valid_additionalInfo = () => {
  //   var bool = this.additionalInfo_regex(this.state.additionalInfo);
  //   this.setState({
  //     valid_additionalInfo: bool,
  //   });
  // };

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
          <View style={styles.container}>
            <Text style={styles.heading}>New Pet Listing Application</Text>
            
            <View style={{paddingTop: 5}}>
              <Text style={styles.subHeading}>General Information</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.inputContainer, {paddingTop: 10}}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Text style={styles.inputName}>Name</Text>
                  <Text style={styles.setColorRed}> *</Text>
                </View>
                {!this.state.valid_name && (
                  <View style={{ flex: 1 }}>
                    <Text style={styles.errorText}>Invalid name</Text>
                  </View>
                )}
              </View>
              <TextInput
                mode="outlined"
                theme={{ colors: { primary: darkGreen } }}
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
              setCategory={this.setCategory}
              setBreed={this.setBreed}
              setColour={this.setColour}
              setSize={this.setSize}
            />

            <View style={styles.inputContainer}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Text style={styles.inputName}>Age</Text>
                  <Text style={styles.setColorRed}> *</Text>
                </View>
                {!this.state.valid_age && (
                  <View style={{ flex: 1 }}>
                    <Text style={styles.errorText}>Invalid age</Text>
                  </View>
                )}
              </View>
              <TextInput
                mode="outlined"
                theme={{ colors: { primary: darkGreen } }}
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
              <Text style={styles.inputName}>Gender</Text>
              <Text style={styles.setColorRed}> *</Text>
            </Text>

            <View style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
                selectedValue={this.state.gender}
                onValueChange={(gender) => this.setState({ gender })}>
                <Picker.Item
                  label="Select gender"
                  value="0"
                  color="#adadad"
                />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            </View>
            {/* <View style={{ marginTop: 10 }} /> */}

            <View style={styles.inputContainer}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Text style={styles.inputName}>Location</Text>
                  <Text style={styles.setColorRed}> *</Text>
                </View>
                {!this.state.valid_location && (
                  <View style={{ flex: 1 }}>
                    <Text style={styles.errorText}>Invalid location</Text>
                  </View>
                )}
              </View>
              <TextInput
                mode="outlined"
                theme={{ colors: { primary: darkGreen } }}
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
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Text style={styles.inputName}>Price</Text>
                  <Text style={styles.setColorRed}> *</Text>
                </View>
                {!this.state.valid_price && (
                  <View style={{ flex: 1 }}>
                    <Text style={styles.errorText}>Invalid price</Text>
                  </View>
                )}
              </View>
              <TextInput
                mode="outlined"
                theme={{ colors: { primary: darkGreen } }}
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
            <View style={styles.subHeadingContainer}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Text style={styles.subHeading}>Behaviour</Text>
                  <Text style={styles.setColorRed}> *</Text>
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
                theme={{ colors: { primary: darkGreen } }}
                style={styles.bigInput}
                numberOfLines={4}
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

            <View style={styles.subHeadingContainer}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Text style={styles.subHeading}>Care, Health, and Feeding</Text>
                  <Text style={styles.setColorRed}> *</Text>
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
                theme={{ colors: { primary: darkGreen } }}
                style={styles.bigInput}
                numberOfLines={4}
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

            <View style={styles.subHeadingContainer}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Text style={styles.subHeading}>Training</Text>
                  <Text style={styles.setColorRed}> *</Text>
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
                theme={{ colors: { primary: darkGreen } }}
                style={styles.bigInput}
                numberOfLines={4}
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
            <View style={styles.subHeadingContainer}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.subHeading}>Additional Information</Text>
                </View>
                {/* {!this.state.valid_additionalInfo && (
                  <View style={{ flex: 1 }}>
                    <Text style={styles.errorText}>Invalid input</Text>
                  </View>
                )} */}
              </View>
              <TextInput
                mode="outlined"
                multiline={true}
                theme={{ colors: { primary: darkGreen } }}
                style={styles.bigInput}
                numberOfLines={4}
                onChangeText={(additionalInfo) =>
                  this.setState({
                    additionalInfo: additionalInfo,
                  })
                }
                // onBlur={() => {
                //   this.check_valid_additionalInfo();
                // }}
              />
            </View>

            {/* <Text style={styles.titles}>Upload a photo</Text> */}

            <View style={{ flexDirection: "row", paddingTop: 20 }}>
              <View style={{ flex: 1, flexDirection: "row", paddingBottom: 3}}>
                <Text style={styles.inputName}>Upload a Photo</Text>
                <Text style={styles.setColorRed}> *</Text>
              </View>
              {!this.state.valid_uri && (
                <View style={{ flex: 1 }}>
                  <Text style={styles.errorText}>Choose a photo</Text>
                </View>
              )}
            </View>
            <Button
              style={{
                backgroundColor: green,
              }}
              onPress={this.setPhotoUri}>
              <Text
                style={{
                  color: "white",
                }}>
                Choose Photo
              </Text>
            </Button>

            <View style={{ paddingTop: 15 }}>
              <Text style={styles.inputName, {paddingBottom: 3}}>Upload Documents</Text>
              <Button
                style={{
                  backgroundColor: green,
                }}
                onPress={this.setDocumentUri}>
                <Text
                  style={{
                    color: "white",
                  }}>
                  Choose Document
                </Text>
              </Button>
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                title={"submit"}
                style={styles.buttons}
                onPress={this.handleSubmit}>
                <Text style={styles.buttonsText}>Submit</Text>
              </TouchableOpacity>
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
    padding: 10,
    paddingTop: 10,
    justifyContent: "center",
  },
  inputName: {
    marginBottom: 0,
    paddingBottom: 0,
    color: "#242424",
    fontSize: 14,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 10,
    paddingTop: 20,
  },
  subHeading: {
    fontSize: 16,
  },
  subHeadingContainer: {
    paddingTop: 20,
  },
  smallInputBox: {
    margin: 0,
    height: 25,
    backgroundColor: "#fafafa",
    padding: 0,
  },
  input: {
    width: 314,
    height: 34,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white",
    fontSize: 12,
  },
  bigInput: {
    textAlignVertical: "top",
    margin: 0,
    backgroundColor: "#fafafa",
    padding: 0,
  },
  picker: {
    height: 27,
    borderRadius: 4,
    fontSize: 12,
  },
  buttonsContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
  buttons: {
    backgroundColor: darkGreen,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 100,
    height: 40,
  },
  buttonsText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  titleContainer: {
    flex: 1,
  },
  setColorRed: {
    color: "#f44336",
  },
  pickerContainer: {
    backgroundColor: "white",
    borderColor: "#5D5D5D",
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 5,
  },
  // errorText: {
  //   color: "red",
  //   textAlign: "right",
  //   fontSize: 14,
  //   fontWeight: "bold",
  // },
  inputContainer: {
    paddingTop: 12,
  },

  pickerItem: {
    fontSize: 12,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    textAlign: "right",
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  }
});
