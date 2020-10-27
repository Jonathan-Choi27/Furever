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
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import { Button } from "react-native-paper";
import { db } from "../../database/firebase";
import uuid from "react-native-uuid";
import { Card } from "react-native-elements";
import {
  openDocumentPicker,
  uploadDocument,
} from "../../components/documentUpload";
import { openImagePicker, uploadPhoto } from "../../components/imageUpload";
import CategorySelection from "./sellAppCategories";
import { auth } from "../../database/firebase";
import "firebase/storage";
import globalStyles, { darkGreen, green } from "../../styleSheet/styleSheet";
import { CustomInput, InputHeader } from "../../components/customInput";
import PriceSlider from "../../components/priceSlider";
import AgePicker from "../../components/AgePicker";
import GooglePlacesInput from "../../components/mapAutoComplete";
import * as firebase from "firebase";

const screenWidth = Math.round(Dimensions.get("window").width);
const emptyImage =
  "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";
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
      valid_gender: true,
      nameErr: "",
      behaviourErr: "",
      healthErr: "",
      trainingErr: "",
      additionalInfoErr: "",
      categoryErr: "",
      breedErr: "",
      colourErr: "",
      sizeErr: "",
      genderErr: "",
      name: "",
      category: "",
      breed: "",
      colour: "",
      age: "",
      ageOption: "",
      gender: "",
      location: "",
      price: "0",
      behaviour: "",
      health: "",
      training: "",
      additionalInfo: "",
      documents: "",
      //photo
      photo_link: "",
      photo_uri: emptyImage,
      photo_uuid: "",
      documents_uri: "",
      documents_link: "",
      seller_name: "",
      size: "",
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  // Handle Back button
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

  // Handle submit functions
  validationCheck = () => {
    this.nameValidator();
    this.categoryValidator();
    this.breedValidator();
    this.colourValidator();
    this.sizeValidator();
    this.ageValidator();
    this.behaviourValidator();
    this.healthValidator();
    this.trainingValidator();
    this.genderValidator();
    this.locationValidator();
    this.additionalInfoValidator();
    this.priceValidator();

    var submit = true;
    // if (
    //   this.nameValidator() == true
    // //   this.categoryValidator() == false ||
    // //   this.breedValidator() == false ||
    // //   this.colourValidator() == false ||
    // //   this.sizeValidator() == false ||
    // //   this.ageValidator() == false ||
    // //   this.genderValidator() == false ||
    // //   this.locationValidator() == false ||
    // //   this.behaviourValidator() == false ||
    // //   this.healthValidator() == false ||
    // //   this.trainingValidator() == false ||
    // //   this.additionalInfoValidator() == false ||
    // //   this.photoValidator() == false
    // ) {
    //   alert("All input fields required and must be valid.");
    //   submit = false;
    // } else {
    //   submit = true;
    // }
    return submit;
  };

  pushData = async () => {
    const user = auth.currentUser;
    // console.log("THIS ACTUALLY SUBMITTED");

    const photoURL = await uploadPhoto(
      this.state.photo_uri,
      this.state.photo_uuid
    );

    this.setState({
      photo_link: photoURL,
    });

    // if (
    //   this.state.documents_uri != "" ||
    //   this.state.documents_uri != null ||
    //   this.state.documents_uri != undefined
    // ) {
    //   console.log("1");
    //   const documentURL = await uploadDocument(
    //     this.state.documents_uri,
    //     this.state.documents
    //   );
    //   console.log("2");

    //   this.setState({
    //     documents_link: documentURL,
    //   });
    //   console.log("3");
    // }

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
      documents_link: this.state.documents_link,
      price: this.state.price,
      additionalInfo: this.state.additionalInfo,
      size: this.state.size,
      timestamp: firebase.firestore.Timestamp.now()
    });
    alert("Application Successful!");
    this.props.navigation.goBack();
  };

  handleSubmit = () => {
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

    // console.log(this.state.valid_name);

    var submit = this.validationCheck();
    if (submit == true) {
      this.pushData();
    }
  };

  // State setter functions
  setPrice = (price) => {
    // console.log(price);
    this.setState({
      price: price,
    });
  };

  setLocation = (location) => {
    this.setState({
      location: location,
    });
  };

  setCategory = (val) => {
    this.setState({
      category: val,
    });
  };

  setAge = (val) => {
    this.setState({
      age: val,
    });
  };

  setAgeOption = (val) => {
    this.setState({
      ageOption: val,
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

  //Validator functions
  nameValidator = () => {
    var bool;
    if (this.state.name == "" || /\d+/g.test(this.state.name)) {
      bool = false;
      this.setState({
        nameErr: "Invalid name",
      });
    } else {
      bool = true;
      this.setState({
        nameErr: "",
      });
    }

    this.setState({
      valid_name: bool,
    });

    return bool;
  };

  behaviourValidator = () => {
    var bool;
    if (this.state.behaviour == "") {
      bool = false;
      this.setState({
        behaviourErr: "Please fill this field in!",
      });
    } else {
      bool = true;
      this.setState({
        behaviourErr: "",
      });
    }

    this.setState({
      valid_behaviour: bool,
    });

    return bool;
  };

  categoryValidator = () => {
    var bool;
    if (this.state.category == "0" || this.state.category == "") {
      bool = false;
      this.setState({
        categoryErr: "Select category",
      });
    } else {
      bool = true;
      this.setState({
        categoryErr: "",
      });
    }

    return bool;
  };

  breedValidator = () => {
    var bool;
    if (this.state.breed == "0" || this.state.breed == "") {
      bool = false;
      this.setState({
        breedErr: "Select breed",
      });
    } else {
      bool = true;
      this.setState({
        breedErr: "",
      });
    }

    return bool;
  };

  genderValidator = () => {
    var bool;
    if (this.state.gender == "0" || this.state.gender == "") {
      bool = false;
      this.setState({
        valid_gender: false,
      });
    } else {
      bool = true;
      this.setState({
        valid_gender: true,
      });
    }

    return bool;
  };

  ageValidator = () => {
    // console.log(this.state.age);
    // console.log(this.state.ageOption);
    var bool;
    if (
      this.state.age == "0" ||
      this.state.ageOption == "0" ||
      this.state.age == "" ||
      this.state.ageOption == ""
    ) {
      bool = false;
      this.setState({
        valid_age: false,
      });
    } else {
      bool = true;
      this.setState({
        valid_age: true,
      });
    }

    return bool;
  };

  locationValidator = () => {
    var bool;
    if (this.state.location == "") {
      bool = false;
      this.setState({
        valid_location: false,
      });
    } else {
      bool = true;
      this.setState({
        valid_location: true,
      });
    }

    return bool;
  };

  colourValidator = () => {
    var bool;
    if (this.state.colour == "0" || this.state.colour == "") {
      bool = false;
      this.setState({
        colourErr: "Select colour",
      });
    } else {
      bool = true;
      this.setState({
        colourErr: "",
      });
    }

    return bool;
  };

  sizeValidator = () => {
    var bool;
    if (this.state.size == "0" || this.state.size == "") {
      bool = false;
      this.setState({
        sizeErr: "Select size",
      });
    } else {
      bool = true;
      this.setState({
        sizeErr: "",
      });
    }

    return bool;
  };

  additionalInfoValidator = () => {
    var bool;
    if (this.state.additionalInfo == "") {
      bool = false;
      this.setState({
        valid_additionalInfo: false,
        additionalInfoErr: "Please fill this field in",
      });
    } else {
      bool = true;
      this.setState({
        additionalInfoErr: "",
        valid_additionalInfo: true,
      });
    }

    return bool;
  };

  photoValidator = () => {
    var bool;
    if (
      this.state.photo_uri == "" ||
      this.state.photo_uri == null ||
      this.state.photo_uri == undefined ||
      this.state.photo_uri == emptyImage
    ) {
      bool = false;
      this.setState({
        valid_uri: false,
      });
    } else {
      bool = true;
      this.setState({
        valid_uri: true,
      });
    }
    return bool;
  };

  healthValidator = () => {
    var bool;
    if (this.state.health == "") {
      bool = false;
      this.setState({
        healthErr: "Please fill this field in!",
      });
    } else {
      bool = true;
      this.setState({
        healthErr: "",
      });
    }

    this.setState({
      valid_health: bool,
    });

    return bool;
  };

  trainingValidator = () => {
    var bool;
    if (this.state.training == "") {
      bool = false;
      this.setState({
        trainingErr: "Please fill this field in!",
      });
    } else {
      bool = true;
      this.setState({
        trainingErr: "",
      });
    }

    this.setState({
      valid_training: bool,
    });

    return bool;
  };

  priceValidator = () => {
    if (this.state.price == "") {
      //   console.log("going in loop");
      this.setState({
        price: "0",
      });
    }
  };

  // Handle document & Photo upload
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

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps={"handled"}
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <Card containerStyle={{ borderRadius: 10, width: screenWidth - 40 }}>
            <View style={{ marginTop: 0 }}>
              <Text style={styles.heading}>Seller Application</Text>
              <InputHeader text="General Information" />
            </View>

            <CustomInput
              label="Name"
              placeholder="Please fill in the field"
              onChangeText={(name) => this.setState({ name })}
              errorMessage={this.state.nameErr}
              leftIcon={
                <Icon
                  name="ios-paper"
                  type="ionicon"
                  color={darkGreen}
                  containerStyle={{ paddingLeft: 7, paddingRight: 10 }}
                />
              }
            />

            <CategorySelection
              setCategory={this.setCategory}
              categoryErr={this.state.categoryErr}
              setBreed={this.setBreed}
              breedErr={this.state.breedErr}
              setColour={this.setColour}
              colourErr={this.state.colourErr}
              setSize={this.setSize}
              sizeErr={this.state.sizeErr}
            />

            <View style={{ marginHorizontal: 15, marginBottom: 20 }}>
              <AgePicker
                setAge={this.setAge}
                setAgeOption={this.setAgeOption}
              />
              {!this.state.valid_age && (
                <View style={{ marginLeft: 5, marginBottom: 5 }}>
                  <Text style={{ fontSize: 12, color: "red" }}>Select age</Text>
                </View>
              )}
            </View>

            <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
              <Text
                style={{ color: "#505050", fontWeight: "bold", fontSize: 16 }}>
                Gender
              </Text>

              <View style={globalStyles.formPickerOuterContainer}>
                <View style={globalStyles.formPickerIconContainer}>
                  <Icon name="ios-paper" type="ionicon" color={darkGreen} />
                </View>
                <View style={globalStyles.formPickerInnerContainer}>
                  <Picker
                    selectedValue={this.state.gender}
                    onValueChange={(gender) => this.setState({ gender })}>
                    <Picker.Item
                      label="Select gender"
                      value="0"
                      color="#D3D3D3"
                    />
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                  </Picker>
                </View>
              </View>

              {!this.state.valid_gender && (
                <View style={{ paddingLeft: 10 }}>
                  <Text style={{ fontSize: 12, color: "red" }}>
                    Select gender
                  </Text>
                </View>
              )}
            </View>

            <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
              <GooglePlacesInput set={this.setLocation} />
              {!this.state.valid_location && (
                <View style={{ paddingLeft: 10 }}>
                  <Text style={{ fontSize: 12, color: "red", marginTop: 5 }}>
                    Enter location
                  </Text>
                </View>
              )}
            </View>

            {/* {!this.state.valid_location && (
              <View style={{ flex: 1 }}>
                <Text style={styles.errorText}>Enter location</Text>
              </View>
            )} */}

            <PriceSlider price={this.state.price} setPrice={this.setPrice} />

            <CustomInput
              label="Behaviour"
              placeholder="Please fill in the field"
              onChangeText={(behaviour) => this.setState({ behaviour })}
              errorMessage={this.state.behaviourErr}
              multiline={true}
              leftIcon={
                <Icon
                  name="ios-paper"
                  type="ionicon"
                  color={darkGreen}
                  containerStyle={{ paddingLeft: 7, paddingRight: 10 }}
                />
              }
            />

            <CustomInput
              label="Care, Health and Feeding"
              placeholder="Please fill in the field"
              onChangeText={(health) => this.setState({ health })}
              errorMessage={this.state.healthErr}
              multiline={true}
              leftIcon={
                <Icon
                  name="ios-paper"
                  type="ionicon"
                  color={darkGreen}
                  containerStyle={{ paddingLeft: 7, paddingRight: 10 }}
                />
              }
            />

            <CustomInput
              label="Training"
              placeholder="Please fill in the field"
              onChangeText={(training) => this.setState({ training })}
              errorMessage={this.state.trainingErr}
              multiline={true}
              leftIcon={
                <Icon
                  name="ios-paper"
                  type="ionicon"
                  color={darkGreen}
                  containerStyle={{ paddingLeft: 7, paddingRight: 10 }}
                />
              }
            />

            <CustomInput
              label="Additional Information"
              placeholder="Please fill in the field"
              onChangeText={(additionalInfo) =>
                this.setState({ additionalInfo })
              }
              errorMessage={this.state.additionalInfoErr}
              multiline={true}
              leftIcon={
                <Icon
                  name="ios-paper"
                  type="ionicon"
                  color={darkGreen}
                  containerStyle={{ paddingLeft: 7, paddingRight: 10 }}
                />
              }
            />

            <View style={{ marginBottom: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  paddingTop: 20,
                  marginHorizontal: 10,
                  marginBottom: 10,
                }}>
                <View
                  style={{ flex: 1, flexDirection: "row", paddingBottom: 3 }}>
                  <Text style={styles.inputName}>Upload a Photo</Text>
                  <Text style={styles.setColorRed}> *</Text>
                </View>
                {!this.state.valid_uri && (
                  <View style={{ flex: 1 }}>
                    <Text style={styles.errorText}>Choose a photo</Text>
                  </View>
                )}
              </View>

              <View
                style={{
                  alignContent: "center",
                  alignItems: "center",
                  //   borderWidth: 2,
                  //   borderColor: "#D3D3D3",
                  marginHorizontal: 10,
                }}>
                <Image
                  style={{ height: 300, width: screenWidth - 92 }}
                  source={{ uri: this.state.photo_uri }}
                />
              </View>

              <Button
                style={{
                  marginTop: 10,
                  backgroundColor: green,
                  marginHorizontal: 10,
                }}
                onPress={this.setPhotoUri}>
                <Text
                  style={{
                    color: "white",
                  }}>
                  Choose Photo
                </Text>
              </Button>
            </View>

            <View style={{ marginHorizontal: 10 }}>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.inputName}>Upload Documents</Text>
              </View>
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

            <Button onPress={this.test_submit}>Test</Button>
            <View style={{ marginBottom: 50 }} />
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 10,
    justifyContent: "center",
  },
  inputName: {
    color: "#505050",
    fontWeight: "bold",
    fontSize: 16,
  },
  heading: {
    fontSize: 30,
    color: "#606060",
    fontWeight: "bold",
    // fontSize: 20,
    // fontWeight: "bold",
    // color: "#000000",
    // textAlign: "left",
    // alignItems: "center",
    // justifyContent: "center",
    // flex: 1,
    // paddingVertical: 10,
    // paddingTop: 20,
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
  },
});
