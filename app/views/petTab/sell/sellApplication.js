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
import { CustomInput } from "../../components/customInput";
import PriceSlider from "../../components/priceSlider";
import AgePicker from "../../components/agePicker";
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
      // valid_additionalInfo: true,
      valid_uri: true,
      valid_gender: true,
      nameErr: "",
      behaviourErr: "",
      healthErr: "",
      trainingErr: "",
      // additionalInfoErr: "",
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
      suburb: "",
      price: "0",
      behaviour: "",
      health: "",
      training: "",
      additionalInfo: "",
      documents: "",
      photoLink: "",
      photo_uri: emptyImage,
      photo_uuid: "",
      documents_uri: "",
      documentsLink: "",
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
    // this.additionalInfoValidator();
    this.priceValidator();

    var submit = true;
    if (
      this.nameValidator() == false ||
      this.categoryValidator() == false ||
      this.breedValidator() == false ||
      this.colourValidator() == false ||
      this.sizeValidator() == false ||
      this.ageValidator() == false ||
      this.genderValidator() == false ||
      this.locationValidator() == false ||
      this.behaviourValidator() == false ||
      this.healthValidator() == false ||
      this.trainingValidator() == false ||
      // this.additionalInfoValidator() == false ||
      this.photoValidator() == false
    ) {
      alert("All input fields required and must be valid.");
      submit = false;
    } else {
      submit = true;
    }
    return submit;
  };

  pushData = async () => {
    const user = auth.currentUser;

    // upload photo
    const photoURL = await uploadPhoto(
      this.state.photo_uri,
      this.state.photo_uuid
    );

    this.setState({
      photoLink: photoURL,
    });

    // only upload document if document selected
    if (
      this.state.documents_uri != "" &&
      this.state.documents_uri != null &&
      this.state.documents_uri != undefined
    ) {
      const documentURL = await uploadDocument(
        this.state.documents_uri,
        this.state.documents
      );

      this.setState({
        documentsLink: documentURL,
      });
    }

    // Timestamp is used as a key to sort
    db.collection("petListings")
      .add({
        uuid: user.uid,
        name: this.state.name,
        category: this.state.category,
        breed: this.state.breed,
        colour: this.state.colour,
        age: this.state.age,
        ageOption: this.state.ageOption,
        gender: this.state.gender,
        behaviour: this.state.behaviour,
        health: this.state.health,
        location: this.state.location,
        suburb: this.state.suburb,
        training: this.state.training,
        photoLink: this.state.photoLink,
        documentsLink: this.state.documentsLink,
        price: this.state.price,
        additionalInfo: this.state.additionalInfo,
        size: this.state.size,
        timestamp: firebase.firestore.Timestamp.now(),
      })
      .then((docRef) => {
        // Recieve DocumentReference and store in self (for convenience of retrieval)
        docRef.update({
          selfRef: docRef,
        });
        db.collection("users")
          .doc(user.uid)
          .collection("sellList")
          .add({
            list: docRef,
            timestamp: firebase.firestore.Timestamp.now(),
          })
          .then((userSellListRef) => {
            // Recieve DocumentReference and store
            docRef.update({
              userSellListRef: userSellListRef,
            });
          });
        db.collection("categorizedPetListings")
          .doc(this.state.category)
          .collection(this.state.breed)
          .add({
            list: docRef,
            timestamp: firebase.firestore.Timestamp.now(),
          })
          .then((categorizedListingsRef) => {
            // Recieve DocumentReference and store
            docRef.update({
              categorizedListingsRef: categorizedListingsRef,
            });
          });
      });
    alert("Application Successful!");
    this.props.navigation.goBack();
  };

  handleSubmit = () => {
    var submit = this.validationCheck();
    if (submit == true) {
      this.pushData();
    }
  };

  // State setter functions
  setPrice = (price) => {
    this.setState({
      price: price,
    });
  };

  setLocation = (location, suburb) => {
    this.setState({
      location: location,
      suburb: suburb,
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

  // additionalInfoValidator = () => {
  //   var bool;
  //   if (this.state.additionalInfo == "") {
  //     bool = false;
  //     this.setState({
  //       valid_additionalInfo: false,
  //       additionalInfoErr: "Please fill this field in",
  //     });
  //   } else {
  //     bool = true;
  //     this.setState({
  //       additionalInfoErr: "",
  //       valid_additionalInfo: true,
  //     });
  //   }

  //   return bool;
  // };

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
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        showsVerticalScrollIndicator={false}
        // style={globalStyles.scrollViewContentStyle}
      >
        <Card containerStyle={{ borderRadius: 10 }}>
          <Text style={globalStyles.applicationHeading}>
            Seller Application
          </Text>
          <Text style={globalStyles.cardHeading}>General Information</Text>

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
            <AgePicker setAge={this.setAge} setAgeOption={this.setAgeOption} />
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

          <PriceSlider
            price={this.state.price}
            setPrice={this.setPrice}
            max={10000}
          />
        </Card>

        <Card containerStyle={{ borderRadius: 10 }}>
          <Text style={globalStyles.cardHeading}>Behaviour</Text>
          <CustomInput
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
        </Card>

        <Card containerStyle={{ borderRadius: 10 }}>
          <Text style={globalStyles.cardHeading}>Care, Health and Feeding</Text>
          <CustomInput
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
        </Card>

        <Card containerStyle={{ borderRadius: 10 }}>
          <Text style={globalStyles.cardHeading}>Training</Text>
          <CustomInput
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
        </Card>

        <Card containerStyle={{ borderRadius: 10 }}>
          <Text style={globalStyles.cardHeading}>Additional Information</Text>
          <CustomInput
            placeholder="Please fill in the field"
            onChangeText={(additionalInfo) => this.setState({ additionalInfo })}
            // errorMessage={this.state.additionalInfoErr}
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
        </Card>

        <Card containerStyle={{ borderRadius: 10 }}>
          <View style={{ marginBottom: 10 }}>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 10,
                marginBottom: 10,
              }}>
              <View style={{ flex: 1, flexDirection: "row", paddingBottom: 3 }}>
                <Text style={globalStyles.applicationInputName}>
                  Upload a Photo
                </Text>
                <Text style={globalStyles.setColorRed}> *</Text>
              </View>
              {!this.state.valid_uri && (
                <View style={{ flex: 1 }}>
                  <Text style={globalStyles.applicationErrorText}>
                    Choose a photo
                  </Text>
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
        </Card>

        <Card containerStyle={{ borderRadius: 10 }}>
          <View style={{ marginHorizontal: 10 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={globalStyles.applicationInputName}>
                Upload Documents
              </Text>
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
        </Card>

        <View style={globalStyles.applicationButtonsContainer}>
          <TouchableOpacity
            title={"submit"}
            style={globalStyles.buttons}
            onPress={this.handleSubmit}>
            <Text style={globalStyles.buttonsText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
