import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Card, Text } from "react-native-elements";
import { TextInput, Button } from "react-native-paper";
import "react-navigation";
import "react-navigation-props-mapper";
import "@react-navigation/native";
import "react-navigation-hooks";
import { TextInput as NativeTextInput } from "react-native";
// import "firebase/storage";
import { db } from "../../database/firebase";
import { auth } from "../../database/firebase";
import { onBuyTab } from "../../components/petTabComponents";
import { Input } from "react-native-elements";
import { CustomInput, InputHeader } from "../../components/CustomInput";
import istyles, { darkGreen, green } from "../../styleSheet/styleSheet";
import { Icon } from "react-native-elements";
import GooglePlacesInput from "../../components/mapAutoComplete";
import { SafeAreaView } from "react-native-safe-area-context";
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

  address_validator = () => {
    var bool;

    if (this.state.address == "") {
      bool = false;
      this.setState({
        address_err: "Invalid address",
      });
    } else {
      bool = true;
      this.setState({
        address_err: "",
      });
    }

    this.setState({
      valid_address: bool,
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
          <Image
            style={{ width: screenWidth, height: 300 }}
            source={{
              uri: item.photo,
            }}
          />
          <Card containerStyle={{ borderRadius: 10 }}>
            <Text>
              <Text
                style={{ fontWeight: "bold", fontSize: 30, color: "#404040" }}>
                {item.petName}
              </Text>
              <Text
                style={{ fontSize: 30, color: "#606060", fontWeight: "bold" }}>
                {", "}
                {item.age}
              </Text>
            </Text>
            <Text style={{ fontWeight: "bold", color: "#505050" }}>
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
          {/* <GooglePlacesInput/> */}
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

          <CustomInput
            label="Address"
            //   placeholder="Please fill in the field"
            //   onChangeText={(address) => this.setState({ address })}
            //   validator={() => this.address_validator()}
            //   errorMessage={this.state.address_err}
            leftIcon={
              <Icon
                name="ios-pin"
                type="ionicon"
                color={darkGreen}
                containerStyle={{ paddingRight: 10 }}
              />
            }
          />

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
                containerStyle={{ paddingRight: 10 }}
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
                containerStyle={{ paddingRight: 10 }}
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
                containerStyle={{ paddingRight: 10 }}
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
                containerStyle={{ paddingRight: 10 }}
              />
            }
          />

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
                containerStyle={{ paddingRight: 10 }}
              />
            }
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Button
              style={{
                //   paddingVertical : 25,
                marginTop: 25,
                marginBottom: 25,
                backgroundColor: green,
              }}
              onPress={this.handleSubmit}>
              <Text
                style={{
                  color: "white",
                }}>
                Submit
              </Text>
            </Button>
          </View>
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 25,
  },
  buySellContainer: {
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  titleContainer: {
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  imageContainer: {
    width: 150,
    height: 150,
  },
  categories: {
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 20,
  },
  iconContainer: {
    padding: 20,
  },
  viewApplication: {
    backgroundColor: "#447ECB",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 200,
  },
  fontTitle: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },
  fontHeading: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardContainer: {
    borderRadius: 4,
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    elevation: 5,
  },
  cardContentContainer: {
    borderRadius: 4,
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
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
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#707070",
  },
  formContainer: {
    marginLeft: 30,
    marginRight: 30,
  },
  smallInputBox: {
    margin: 0,
    height: 25,
    // borderWidth: 1,
    // borderWidth: 3,
    padding: 0,
  },
  bigInputBox: {
    height: 50,
  },
  inputName: {
    marginBottom: 0,
    paddingBottom: 0,
    color: "#515151",
    fontSize: 14,
  },
  inputContainer: {
    marginTop: 10,
  },
  errorText: {
    color: "red",
    textAlign: "right",
    fontSize: 14,
    fontWeight: "bold",
  },
});
