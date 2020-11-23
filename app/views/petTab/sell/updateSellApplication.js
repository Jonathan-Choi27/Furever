import * as React from "react";
import {
  Picker,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  BackHandler,
  Dimensions,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import { db, auth } from "../../database/firebase";
import uuid from "uuid/v4"
import {
  openDocumentPicker,
  uploadDocument,
} from "../../components/documentUpload";
import { openImagePicker, uploadPhoto } from "../../components/imageUpload";
import CategorySelection from "./sellAppCategories";
import "firebase/storage";
import globalStyles, {
  primaryColour1,
  primaryColour2,
} from "../../styleSheet/styleSheet";
import { Card } from "react-native-elements";
import { CustomInput } from "../../components/customInput";
import { Icon } from "react-native-elements";
import AgePicker from "../../components/agePicker";
import GooglePlacesInput from "../../components/mapAutoComplete";
import PriceSlider from "../../components/priceSlider";

const screenWidth = Math.round(Dimensions.get("window").width);

export default class updateSellApplication extends React.Component {
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
      valid_uri: true,
      valid_gender: true,
      price: "",
      location: "",
      suburb: "",
      nameErr: "",
      behaviourErr: "",
      healthErr: "",
      trainingErr: "",
      categoryErr: "",
      breedErr: "",
      colourErr: "",
      sizeErr: "",
      genderErr: "",
      photo_uri: "",
      photo_uuid: "",
      documents_uri: "",
      seller_name: "",
      size: "",
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount = async () => {
    await db
      .collection("petListings")
      .doc(this.props.route.params.doc_id)
      .get()
      .then((doc) => {
        this.setState({
          name: doc.data().name,
          category: doc.data().category,
          breed: doc.data().breed,
          colour: doc.data().colour,
          size: doc.data().size,
          age: doc.data().age,
          ageOption: doc.data().ageOption,
          gender: doc.data().gender,
          location: doc.data().location,
          price: doc.data().price,
          behaviour: doc.data().behaviour,
          health: doc.data().health,
          training: doc.data().training,
          additionalInfo: doc.data().additionalInfo,
          photo_uri: doc.data().photoLink,
          documents: doc.data().documents,
        });
      });

    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  };

  //Handle back button
  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };

  setLocation = (location, suburb) => {
    this.setState({
      location: location,
      suburb: suburb,
    });
  };

  // Handle Submit Functions
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
      this.photoValidator() == false
    ) {
        Alert.alert("Error", "All input fields required and must be valid.");
      submit = false;
    } else {
      submit = true;
    }
    return submit;
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
      this.setState({
        price: "0",
      });
    }
  };

  pushData = async () => {
    if (this.state.photo_uri !== "") {
      const photoURL = await uploadPhoto(
        this.state.photo_uri,
        this.state.photo_uuid
      );
      this.setState({
        photoLink: photoURL,
      });
    }
    if (this.state.documents_uri !== "") {
      uploadDocument(this.state.documents_uri, this.state.documents);
    }
    db.collection("petListings").doc(this.props.route.params.doc_id).update({
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
      documents: this.state.documents,
      documents_uri: this.state.documents_uri,
      price: this.state.price,
      additionalInfo: this.state.additionalInfo,
      size: this.state.size,
    });
    this.props.navigation.goBack();
  };

  handleSubmit = async () => {
    const user = auth.currentUser;
    var submit = this.validationCheck();
  };

  setPrice = (price) => {
    this.setState({
      price: price,
    });
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
      photo_uuid: uuid(),
      photo_uri: get_uri,
    });
  };

  setDocumentUri = async () => {
    const get_uri = await openDocumentPicker();

    this.setState({
      documents: uuid(),
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
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        showsVerticalScrollIndicator={false}
      >
        <Card containerStyle={{ borderRadius: 10 }}>
          <Text style={globalStyles.applicationHeading}>
            Update Seller Application
          </Text>
          <Text style={globalStyles.cardHeading}>General Information</Text>

          <CustomInput
            label="Name"
            defaultValue={this.state.name}
            onChangeText={(name) => this.setState({ name })}
            errorMessage={this.state.nameErr}
            leftIcon={
              <Icon
                name="ios-paper"
                type="ionicon"
                color={primaryColour1}
                containerStyle={{ paddingLeft: 7, paddingRight: 10 }}
              />
            }
          />

          <CategorySelection
            setCategory={this.setCategory}
            setBreed={this.setBreed}
            setColour={this.setColour}
            setSize={this.setSize}
            category={this.state.category}
            breed={this.state.breed}
            colour={this.state.colour}
            size={this.state.size}
            update={true}
            categoryErr={this.state.categoryErr}
            breedErr={this.state.breedErr}
            colourErr={this.state.colourErr}
            sizeErr={this.state.sizeErr}
          />

          <View style={{ marginHorizontal: 15, marginBottom: 20 }}>
            <AgePicker
              setAge={this.setAge}
              setAgeOption={this.setAgeOption}
              age={this.state.age}
              option={this.state.ageOption}
            />
            {!this.state.valid_age && (
              <View style={{ marginLeft: 5, marginBottom: 5 }}>
                <Text style={{ fontSize: 12, color: "red" }}>Select age</Text>
              </View>
            )}
          </View>

          <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
            <Text
              style={{ color: "#505050", fontWeight: "bold", fontSize: 16 }}
            >
              Gender
            </Text>

            <View style={globalStyles.formPickerOuterContainer}>
              <View style={globalStyles.formPickerIconContainer}>
                <Icon name="ios-paper" type="ionicon" color={primaryColour1} />
              </View>
              <View style={globalStyles.formPickerInnerContainer}>
                <Picker
                  selectedValue={this.state.gender}
                  onValueChange={(gender) => this.setState({ gender })}
                >
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
            <GooglePlacesInput
              set={this.setLocation}
              previous={true}
              prev_location={this.state.location}
            />
            {!this.state.valid_location && (
              <View style={{ paddingLeft: 10 }}>
                <Text style={{ fontSize: 12, color: "red", marginTop: 5 }}>
                  Enter location
                </Text>
              </View>
            )}
          </View>

          <PriceSlider
            price={this.state.price}
            setPrice={this.setPrice}
            max={10000}
          />
        </Card>

        <Card containerStyle={{ borderRadius: 10 }}>
          <Text style={globalStyles.cardHeading}>Behaviour</Text>
          <CustomInput
            defaultValue={this.state.behaviour}
            onChangeText={(behaviour) => this.setState({ behaviour })}
            errorMessage={this.state.behaviour_err}
            multiline={true}
            leftIcon={
              <Icon
                name="ios-paper"
                type="ionicon"
                color={primaryColour1}
                containerStyle={{ paddingLeft: 7, paddingRight: 10 }}
              />
            }
          />
        </Card>

        <Card containerStyle={{ borderRadius: 10 }}>
          <Text style={globalStyles.cardHeading}>Care, Health and Feeding</Text>
          <CustomInput
            defaultValue={this.state.health}
            onChangeText={(health) => this.setState({ health })}
            errorMessage={this.state.health_err}
            multiline={true}
            leftIcon={
              <Icon
                name="ios-paper"
                type="ionicon"
                color={primaryColour1}
                containerStyle={{ paddingLeft: 7, paddingRight: 10 }}
              />
            }
          />
        </Card>

        <Card containerStyle={{ borderRadius: 10 }}>
          <Text style={globalStyles.cardHeading}>Training</Text>
          <CustomInput
            placeholder="Please fill in the field"
            defaultValue={this.state.training}
            onChangeText={(training) => this.setState({ training })}
            errorMessage={this.state.training_err}
            multiline={true}
            leftIcon={
              <Icon
                name="ios-paper"
                type="ionicon"
                color={primaryColour1}
                containerStyle={{ paddingLeft: 7, paddingRight: 10 }}
              />
            }
          />
        </Card>

        <Card containerStyle={{ borderRadius: 10 }}>
          <Text style={globalStyles.cardHeading}>Additional Information</Text>
          <CustomInput
            defaultValue={this.state.additionalInfo}
            onChangeText={(additionalInfo) => this.setState({ additionalInfo })}
            multiline={true}
            leftIcon={
              <Icon
                name="ios-paper"
                type="ionicon"
                color={primaryColour1}
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
              }}
            >
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
                marginHorizontal: 10,
              }}
            >
              <Image
                style={{ height: 300, width: screenWidth - 92 }}
                source={{ uri: this.state.photo_uri }}
              />
            </View>
            <Button
              style={{
                marginTop: 10,
                backgroundColor: primaryColour2,
                marginHorizontal: 10,
              }}
              onPress={this.setPhotoUri}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
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
                backgroundColor: primaryColour2,
              }}
              onPress={this.setDocumentUri}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                Choose Document
              </Text>
            </Button>
          </View>
        </Card>

        <View style={globalStyles.applicationButtonsContainer}>
          <TouchableOpacity
            title={"submit"}
            style={globalStyles.buttons}
            onPress={this.handleSubmit}
          >
            <Text style={globalStyles.buttonsText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
