import * as React from "react";
import {
  Picker,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  BackHandler,
  Dimensions,
} from "react-native";
import {
  Icon,
  Card,
} from "react-native-elements";
import { Button } from "react-native-paper";
import firebase from "firebase";
import globalStyles, { primaryColour1, primaryColour2 } from "../styleSheet/styleSheet";
import { openImagePicker, uploadPhoto } from "../components/imageUpload";
import { CustomInput } from "../components/customInput";
import PriceSlider from "../components/priceSlider";
import uuid from "react-native-uuid";
import { auth } from "../database/firebase";

const db = firebase.firestore();
const screenWidth = Math.round(Dimensions.get("window").width);
const emptyImage =
  "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";

export default class accessoryListingApplication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valid_name: true,
      valid_description: true,
      valid_uri: true,
      nameErr: "",
      descriptionErr: "",
      categoryErr: "",
      typeErr: "",
      name: "",
      category: "",
      type: "",
      description: "",
      price: "0",
      photoLink: "",
      photoUri: emptyImage,
      photoUuid: "",
    }

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

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  // Handle submit functions
  validationCheck = () => {
    this.nameValidator();
    this.categoryValidator();
    this.typeValidator();
    this.descriptionValidator();
    this.priceValidator();

    var submit = true;
    if (
      this.nameValidator() == false ||
      this.categoryValidator() == false ||
      this.typeValidator() == false ||
      this.descriptionValidator() == false ||
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
      this.state.photoUri,
      this.state.photoUuid
    );

    this.setState({
      photoLink: photoURL,
    });

    db.collection("accessories").add({
      uuid: user.uid,
      name: this.state.name,
      category: this.state.category,
      type: this.state.type,
      description: this.state.description,
      photoLink: this.state.photoLink,
      price: this.state.price,
    })
      .then((accessoryDocRef) => {
        // Recieve DocumentReference of the accessory and store in self (for convenience of retrieval)
        accessoryDocRef.update({
          selfRef: accessoryDocRef,
        });
        db.collection("users")
          .doc(user.uid)
          .collection("shopSellList")
          .add({
            list: accessoryDocRef,
            timestamp: firebase.firestore.Timestamp.now(),
          })
          .then((userShopSellListRef) => {
            // Recieve DocumentReference and store
            accessoryDocRef.update({
              userShopSellListRef: userShopSellListRef,
            });
          });
        db.collection("categorizedShopListings")
          .doc(this.state.category)
          .collection(this.state.type)
          .add({
            list: accessoryDocRef,
          })
          .then((categorizedShopListingsRef) => {
            // Recieve DocumentReference and store
            accessoryDocRef.update({
              categorizedShopListingsRef: categorizedShopListingsRef,
              timestamp: firebase.firestore.Timestamp.now(),
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

  setCategory = (val) => {
    this.setState({
      category: val,
    });
  };

  setType = (val) => {
    this.setState({
      type: val,
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

  typeValidator = () => {
    var bool;
    if (this.state.type == "0" || this.state.type == "") {
      bool = false;
      this.setState({
        typeErr: "Select breed",
      });
    } else {
      bool = true;
      this.setState({
        typeErr: "",
      });
    }

    return bool;
  };

  descriptionValidator = () => {
    var bool;
    if (this.state.description == "") {
      bool = false;
      this.setState({
        valid_description: false,
        descriptionErr: "Please fill this field in",
      });
    } else {
      bool = true;
      this.setState({
        descriptionErr: "",
        valid_description: true,
      });
    }

    return bool;
  };

  photoValidator = () => {
    var bool;
    if (
      this.state.photoUri == "" ||
      this.state.photoUri == null ||
      this.state.photoUri == undefined ||
      this.state.photoUri == emptyImage
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

  priceValidator = () => {
    if (this.state.price == "") {
      //   console.log("going in loop");
      this.setState({
        price: "0",
      });
    }
  };

  // Handle photo upload
  setPhotoUri = async () => {
    const get_uri = await openImagePicker();

    this.setState({
      photoUuid: uuid.v4(),
      photoUri: get_uri,
    });
  };

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        showsVerticalScrollIndicator={false}
      >
        <Card containerStyle={{ borderRadius: 10 }}>
          <Text style={globalStyles.applicationHeading}>New Accessory Application</Text>
          <Text style={globalStyles.cardHeading}>General Information</Text>

          <CustomInput
            label="Accessory Name"
            placeholder="Please fill in the field"
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

          <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
            <Text
              style={{ color: "#505050", fontWeight: "bold", fontSize: 16 }}>
              Animal Category
            </Text>

            <View style={globalStyles.formPickerOuterContainer}>
              <View style={globalStyles.formPickerIconContainer}>
                <Icon name="ios-paper" type="ionicon" color={primaryColour1} />
              </View>
              <View style={globalStyles.formPickerInnerContainer}>
                <Picker
                  selectedValue={this.state.category}
                  onValueChange={(category) => this.setState({ category })}>
                  <Picker.Item
                    label="Select category"
                    value="0"
                    color="#D3D3D3"
                  />
                  <Picker.Item label="Dog" value="Dog" />
                  <Picker.Item label="Cat" value="Cat" />
                  <Picker.Item label="Rabbit" value="Rabbit" />
                  <Picker.Item label="Fish" value="Fish" />
                  <Picker.Item label="Bird" value="Bird" />
                  <Picker.Item label="Horse" value="Horse" />
                  <Picker.Item label="Lizard" value="Lizard" />
                  <Picker.Item label="Turtle" value="Turtle" />
                </Picker>
              </View>
            </View>
          </View>

          <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
            <Text
              style={{ color: "#505050", fontWeight: "bold", fontSize: 16 }}>
              Product Type
            </Text>

            <View style={globalStyles.formPickerOuterContainer}>
              <View style={globalStyles.formPickerIconContainer}>
                <Icon name="ios-paper" type="ionicon" color={primaryColour1} />
              </View>
              <View style={globalStyles.formPickerInnerContainer}>
                <Picker
                  selectedValue={this.state.type}
                  onValueChange={(type) => this.setState({ type })}>
                  <Picker.Item
                    label="Select type"
                    value="0"
                    color="#D3D3D3"
                  />
                  <Picker.Item label="Food" value="Food" />
                  <Picker.Item label="Toy" value="Toy" />
                  <Picker.Item label="Apparel" value="Apparel" />
                  <Picker.Item label="Wash" value="Wash" />
                  <Picker.Item label="Bed" value="Bed" />
                  <Picker.Item label="Bowl" value="Bowl" />
                  <Picker.Item label="Home" value="Home" />
                  <Picker.Item label="Medicine" value="Medicine" />
                </Picker>
              </View>
            </View>
          </View>

          <PriceSlider price={this.state.price} setPrice={this.setPrice} max={1000} />

        </Card>

        <Card containerStyle={{ borderRadius: 10 }}>
          <Text style={globalStyles.cardHeading}>Description</Text>
          <CustomInput
            placeholder="Please fill in the field"
            onChangeText={(description) => this.setState({ description })}
            errorMessage={this.state.descriptionErr}
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
              }}>
              <View
                style={{ flex: 1, flexDirection: "row", paddingBottom: 3 }}>
                <Text style={globalStyles.applicationInputName}>Upload a Photo</Text>
                <Text style={globalStyles.setColorRed}> *</Text>
              </View>
              {!this.state.valid_uri && (
                <View style={{ flex: 1 }}>
                  <Text style={globalStyles.applicationErrorText}>Choose a photo</Text>
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
                source={{ uri: this.state.photoUri }}
              />
            </View>

            <Button
              style={{
                marginTop: 10,
                backgroundColor: primaryColour2,
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