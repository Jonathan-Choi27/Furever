import React from "react";
import {
  ScrollView,
  View,
  Dimensions,
  Image,
} from "react-native";
import { Card, Text } from "react-native-elements";
import { Button } from "react-native-paper";
import "react-navigation";
import "react-navigation-props-mapper";
import "@react-navigation/native";
import "react-navigation-hooks";
import { db } from "../../database/firebase";
import { auth } from "../../database/firebase";
import { CustomInput, InputHeader } from "../../components/customInput";
import { darkGreen, green } from "../../styleSheet/styleSheet";
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

  async componentDidMount() {
    this.fetchData();
  }

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

  contact_number_validator = () => {
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
  };

  setAddress = (address) => {
    this.setState({
      address: address,
    });
  };

  handleSubmit = async () => {
    const doc_id = this.props.route.params.item.doc_id;

    if (
      !this.state.valid_contact_number ||
      !this.state.valid_email ||
      !this.state.valid_name ||
      !this.state.valid_address
    ) {
      alert("All input fields required and must be valid.");
    } else {
      var submit = false;
      await db
        .collection("pet_listings")
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
        })
        .then((success) => {
          submit = true;
          alert("Submission successful");
        });

      if (submit == true) {
        this.props.navigation.goBack();
      }
    }
  };

  render() {
    const item = this.props.route.params.item;
    const screenWidth = Math.round(Dimensions.get("window").width);
    const textWidth = screenWidth - 40 - 150 - 10;

    return (
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
            <Text>
              <Text
                style={{ fontWeight: "bold", fontSize: 30, color: "#404040" }}>
                {item.petName}
              </Text>
              <Text
                style={{ fontSize: 30, color: "#606060", fontWeight: "bold" }}>
                {", "}{item.age}
              </Text>
            </Text>
            <Text 
              style={{ fontWeight: "bold", color: "#505050" }}>
              {item.breed}
            </Text>
          </Card>
        </View>

        <Card containerStyle={{ borderRadius: 10 }}>
          <Text style={{ fontSize: 25, fontWeight: "bold", color: "#C0C0C0" }}>
            Buyer Application
          </Text>
          <View style={{ marginBottom: 10 }} />
          <InputHeader text="Personal Information" />

          <CustomInput
            label="Contact Number"
            placeholder="(0x) xxxx xxxx"
            onChangeText={(contact_number) => this.setState({ contact_number })}
            validator={() => this.contact_number_validator()}
            errorMessage={this.state.contact_err}
            leftIcon={
              <Icon
                name="ios-call"
                type="ionicon"
                color={darkGreen}
                containerStyle={{ paddingRight: 10 }}
              />
            }
          />
          <GooglePlacesInput set={this.setAddress}/>
        </Card>

        <Card containerStyle={{ borderRadius: 10 }}>
          <InputHeader text="Pet Information" />

          <CustomInput
            label="Why do you want this pet?"
            placeholder="Please fill in the field"
            onChangeText={(why_want_pet) => this.setState({ why_want_pet })}
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
                color={darkGreen}
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
                color={darkGreen}
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
                color={darkGreen}
                containerStyle={{ paddingLeft: 7, paddingRight: 10 }}
              />
            }
          />
        </Card>

        <Card containerStyle={{ borderRadius: 10 }}>
          <InputHeader text="Your Home Enviroment" />
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
                color={darkGreen}
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
                backgroundColor: darkGreen,
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
