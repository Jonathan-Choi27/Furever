import React from "react";
import {
  ScrollView,
  View,
  Dimensions,
  Image,
  BackHandler,
  Alert,
} from "react-native";
import { Card, Text } from "react-native-elements";
import { Button } from "react-native-paper";
import "react-navigation";
import "react-navigation-props-mapper";
import "@react-navigation/native";
import "react-navigation-hooks";
import { db } from "../../database/firebase";
import { auth } from "../../database/firebase";
import { CustomInput } from "../../components/customInput";
import globalStyles, { primaryColour1 } from "../../styleSheet/styleSheet";
import { Icon } from "react-native-elements";
import GooglePlacesInput from "../../components/mapAutoComplete";
// AIzaSyC-6ifFUYzIIgUf1uhbmJ_BU6VQyre4bRw

export default class buyApplication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profileData: {},
      name: "",
      age: "",
      contact_number: "",
      email: "",
      address: "",
      why_want_pet: "",
      most_desirable_traits: "",
      least_desirable_traits: "",
      previous_pets: "",
      house_enviroment: "",
      valid_contact_number: true,
      valid_name: true,
      valid_email: true,
      valid_address: true,
      contact_err: "",
      address_err: "",
    };
  }

  //Handle back button
  async componentDidMount() {
    this.fetchData();

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
  };

  //Fetch Data
  async fetchData() {
    const userData = {};
    const user = auth.currentUser;

    await db
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        userData["email"] = doc.data().email;
        userData["name"] = doc.data().name;
        userData["uuid"] = doc.data().uuid;

        this.setState({
          profileData: userData,
        });
      });
  }

  //Contact Number Validator
  contactNumberValidator = () => {
    var bool;
    if (
      this.state.contact_number == "" ||
      !/\d/.test(this.state.contact_number)
    ) {
      bool = false;
      this.setState({
        contact_err: "Invalid contact number",
      });
    } else {
      bool = true;
      this.setState({
        contact_err: "",
      });
    }

    this.setState({
      valid_contact_number: bool,
    });

    return bool;
  };

  //Address Validator
  addressValidator = () => {
    var bool;
    if (this.state.address == "") {
      bool = false;
      this.setState({
        valid_address: false,
      });
    } else {
      bool = true;
      this.setState({
        valid_address: true,
      });
    }

    return bool;
  };

  setAddress = (address) => {
    this.setState({
      address: address,
    });
  };

  //Push Data Handler
  pushData = async () => {
    const doc_id = this.props.route.params.item.doc_id;
    await db
      .collection("petListings")
      .doc(doc_id)
      .collection("buyer_applications")
      .add({
        uuid: this.state.profileData.uuid,
        name: this.state.profileData.name,
        age: this.state.age,
        contact_number: this.state.contact_number,
        email: this.state.profileData.email,
        address: this.state.address,
        why_want_pet: this.state.why_want_pet,
        most_desirable_traits: this.state.most_desirable_traits,
        least_desirable_traits: this.state.least_desirable_traits,
        previous_pets: this.state.previous_pets,
        house_enviroment: this.state.house_enviroment,
        is_accepted: false,
        pet_doc_id: doc_id,
      })
      .then((success) => {
        Alert.alert("Alert", "Submission successful");
      });
  };

  //Validation Checker
  validationCheck = () => {
    var bool;
    this.contactNumberValidator();
    this.addressValidator();

    if (
      this.contactNumberValidator == false ||
      this.addressValidator == false
    ) {
      Alert.alert("Error", "All fields must be filled and valid");
      bool = false;
    } else {
      bool = true;
    }

    return bool;
  };

  //Submit Handler
  handleSubmit = () => {
    var bool = this.validationCheck();

    if (bool) {
      this.pushData();
      this.props.navigation.goBack();
    }
  };

  render() {
    const item = this.props.route.params.item;
    const screenWidth = Math.round(Dimensions.get("window").width);
    const textWidth = screenWidth - 40 - 150 - 10;

    return (
      //Scrollview needs to have keyboardshouldpersisttaps for Google Maps
      <ScrollView keyboardShouldPersistTaps={"handled"}>
        <View style={{ marginBottom: 0 }}>
          <View style={{ alignItems: "center" }}>
            <Image
              style={{ width: screenWidth, height: 250 }}
              source={{
                uri: item.photo,
              }}
            />
          </View>
          <Card containerStyle={{ borderRadius: 10 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 30, color: "#333333" }}>
              {item.petName}
            </Text>
            <Text>
              <Text
                style={{ fontSize: 25, color: "#606060", fontWeight: "bold" }}>
                {item.age}
              </Text>
              <Text
                style={{ fontSize: 22, color: "#606060", fontWeight: "bold" }}>
                {" "}
                {item.ageOption.toUpperCase()}
              </Text>
            </Text>
            <Text style={{ fontWeight: "bold", color: "#505050" }}>
              {item.breed}
            </Text>
          </Card>
        </View>

        <Card containerStyle={{ borderRadius: 10 }}>
          <Text style={{ fontSize: 25, fontWeight: "bold", color: "#a8a8a8" }}>
            Buyer Application
          </Text>
          <View style={{ marginBottom: 10 }} />
          <Text style={globalStyles.cardHeading}>Personal Information</Text>

          <CustomInput
            label="Contact Number"
            placeholder="(0x) xxxx xxxx"
            onChangeText={(contact_number) => this.setState({ contact_number })}
            errorMessage={this.state.contact_err}
            leftIcon={
              <Icon
                name="ios-call"
                type="ionicon"
                color={primaryColour1}
                containerStyle={{ paddingRight: 10 }}
              />
            }
          />

          <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
            <GooglePlacesInput set={this.setAddress} />
            {!this.state.valid_address && (
              <View style={{ paddingLeft: 10 }}>
                <Text style={{ fontSize: 12, color: "red", marginTop: 5 }}>
                  Enter location
                </Text>
              </View>
            )}
          </View>
        </Card>

        <Card containerStyle={{ borderRadius: 10 }}>
          <Text style={globalStyles.cardHeading}>Pet Information</Text>

          <CustomInput
            label="Why do you want this pet?"
            placeholder="Please fill in the field"
            onChangeText={(why_want_pet) => this.setState({ why_want_pet })}
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

          <CustomInput
            label="What characteristics are most desirable in a pet for you?"
            placeholder="Please fill in the field"
            onChangeText={(most_desirable_traits) =>
              this.setState({ most_desirable_traits })
            }
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

          <CustomInput
            label="What characteristics are least desirable in a pet for you?"
            placeholder="Please fill in the field"
            onChangeText={(least_desirable_traits) =>
              this.setState({ least_desirable_traits })
            }
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

          <CustomInput
            label="Name(s), breed(s), gender(s) and age(s) of current pets (if
                applicable)"
            placeholder="Please fill in the field"
            onChangeText={(previous_pets) => this.setState({ previous_pets })}
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
          <Text style={globalStyles.cardHeading}>Your Home Environment</Text>
          <CustomInput
            label="Description of your family/members of the household"
            placeholder="Please fill in the field"
            onChangeText={(house_enviroment) =>
              this.setState({ house_enviroment })
            }
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

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Button
            style={{
              marginTop: 20,
              marginBottom: 20,
              backgroundColor: primaryColour1,
            }}
            onPress={this.handleSubmit}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
              }}>
              Submit
            </Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}
