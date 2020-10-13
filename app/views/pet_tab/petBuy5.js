import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Card } from "react-native-elements";
import { TextInput, Button } from "react-native-paper";
import "react-navigation";
import "react-navigation-props-mapper";
import "@react-navigation/native";
import "react-navigation-hooks";
import { TextInput as NativeTextInput } from "react-native";
// import "firebase/storage";
import { db } from "../database/firebase";

export default class shepherdListInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    };
  }
  contact_number_regex = (number) => {
    if (number == "" || !/\d/.test(number)) {
      return false;
    } else {
      return true;
    }
  };

  name_regex = (name) => {
    if (name == "") {
      return false;
    } else {
      return true;
    }
  };

  email_regex = (email) => {
    if (email == "") {
      return false;
    } else {
      return true;
    }
  };

  address_regex = (address) => {
    if (address == "") {
      return false;
    } else {
      return true;
    }
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
          name: this.state.name,
          age: this.state.age,
          contact_number: this.state.contact_number,
          email: this.state.email,
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
      <ScrollView>
        <View>
          <View style={styles.container}>
            <View style={styles.buySellContainer}>
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 50,
                }}
                onPress={() => this.props.navigation.navigate("petBuy")}
              >
                <Text>Buy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#d7e5f7",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 50,
                }}
                onPress={() => this.props.navigation.navigate("petSell")}
              >
                <Text style={{ textAlign: "center" }}> Sell </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.titleContainer}>
              <View>
                <Text style={styles.fontTitle}>
                  Expression of Interest Application
                </Text>
                {/* <Text style={styles.fontHeading}>Application for</Text> */}
              </View>
              {/* <View style={{ width: screenWidth / 2 }}>
                <Text>hello</Text>
              </View> */}
            </View>

            <Card containerStyle={styles.cardContainer}>
              <View style={styles.cardContentContainer}>
                <View>
                  <Image
                    style={styles.imageContainer}
                    source={{
                      uri: item.photo,
                    }}
                  />
                  <Text style={{ textAlign: "center", paddingTop: 5 }}>
                    <Text style={{ fontWeight: "bold" }}>Price:</Text>{" "}
                    <Text>{item.price}</Text>
                  </Text>
                </View>
                <View
                  style={{
                    paddingLeft: 15,
                    paddingRight: 10,
                    width: textWidth,
                  }}
                >
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Name:</Text>{" "}
                    <Text>{item.title}</Text>
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Category:</Text>{" "}
                    <Text>{item.category}</Text>
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Breed:</Text>{" "}
                    <Text>{item.breed}</Text>
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Colour:</Text>{" "}
                    <Text>{item.colour}</Text>
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Age:</Text>{" "}
                    <Text>{item.age}</Text>
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Gender:</Text>{" "}
                    <Text>{item.gender}</Text>
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Size:</Text>{" "}
                    <Text>{item.size}</Text>
                  </Text>
                  <Text>
                    <Text style={{ fontWeight: "bold" }}>Location:</Text>{" "}
                    <Text>{item.location}</Text>
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sub_heading}>Personal Information</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputName}>Age</Text>
            <TextInput
              mode="outlined"
              theme={{ colors: { primary: "#447ECB" } }}
              style={styles.smallInputBox}
              onChangeText={(age) => this.setState({ age })}
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputName}>Contact Number</Text>
              </View>
              {!this.state.valid_contact_number && (
                <View style={{ flex: 1 }}>
                  <Text style={styles.errorText}>Invalid contact number </Text>
                </View>
              )}
            </View>
            <TextInput
              mode="outlined"
              theme={{ colors: { primary: "#447ECB" } }}
              style={styles.smallInputBox}
              onChangeText={(contact_number) =>
                this.setState({
                  contact_number: contact_number,
                })
              }
              onBlur={() => {
                var bool = this.contact_number_regex(this.state.contact_number);
                this.setState({
                  valid_contact_number: bool,
                });
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputName}>E-Mail</Text>
              </View>
              {!this.state.valid_email && (
                <View style={{ flex: 1 }}>
                  <Text style={styles.errorText}>Invalid E-Mail</Text>
                </View>
              )}
            </View>
            <TextInput
              mode="outlined"
              theme={{ colors: { primary: "#447ECB" } }}
              style={styles.smallInputBox}
              onChangeText={(email) =>
                this.setState({
                  email: email,
                })
              }
              onBlur={() => {
                var bool = this.email_regex(this.state.email);
                this.setState({
                  valid_email: bool,
                });
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputName}>Address</Text>
              </View>
              {!this.state.valid_address && (
                <View style={{ flex: 1 }}>
                  <Text style={styles.errorText}>Invalid address</Text>
                </View>
              )}
            </View>
            <TextInput
              mode="outlined"
              theme={{ colors: { primary: "#447ECB" } }}
              style={styles.smallInputBox}
              onChangeText={(address) =>
                this.setState({
                  address: address,
                })
              }
              onBlur={() => {
                var bool = this.address_regex(this.state.address);
                this.setState({
                  valid_address: bool,
                });
              }}
            />
          </View>

          <View style={{ paddingTop: 25 }} />
          <Text style={styles.sub_heading}>Pet Information</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputName}>Why do you want this pet?</Text>
            <TextInput
              mode="outlined"
              theme={{ colors: { primary: "#447ECB" } }}
              multiline={true}
              onChangeText={(why_want_pet) => this.setState({ why_want_pet })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputName}>
              What characteristics are most desirable in a pet for you?
            </Text>
            <TextInput
              mode="outlined"
              theme={{ colors: { primary: "#447ECB" } }}
              multiline={true}
              onChangeText={(most_desirable_traits) =>
                this.setState({ most_desirable_traits })
              }
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputName}>
              What characteristics are least desirable in a pet for you?
            </Text>
            <TextInput
              mode="outlined"
              theme={{ colors: { primary: "#447ECB" } }}
              multiline={true}
              onChangeText={(least_desirable_traits) =>
                this.setState({ least_desirable_traits })
              }
            />
          </View>

          <View style={{ paddingTop: 25 }} />
          <Text style={styles.sub_heading}>Pet Information</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputName}>
              Name(s), breed(s), gender(s) and age(s) of current pets (if
              applicable)
            </Text>
            <TextInput
              mode="outlined"
              theme={{ colors: { primary: "#447ECB" } }}
              multiline={true}
              onChangeText={(previous_pets) => this.setState({ previous_pets })}
            />
          </View>

          <View style={{ paddingTop: 25 }} />
          <Text style={styles.sub_heading}>Your Home Enviroment</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputName}>
              Description of your family/members of the household
            </Text>
            <TextInput
              mode="outlined"
              theme={{ colors: { primary: "#447ECB" } }}
              multiline={true}
              onChangeText={(house_enviroment) =>
                this.setState({ house_enviroment })
              }
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              style={{
                //   paddingVertical : 25,
                marginTop: 25,
                marginBottom: 25,
                backgroundColor: "#447ECB",
              }}
              onPress={this.handleSubmit}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                Submit
              </Text>
            </Button>
          </View>
        </View>
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
