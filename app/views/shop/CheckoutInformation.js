import React from "react";
import { ScrollView, View, Dimensions, Image, BackHandler, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-elements";
import { Button } from "react-native-paper";
import "react-navigation";
import "react-navigation-props-mapper";
import "@react-navigation/native";
import "react-navigation-hooks";
import { CustomInput } from "../components/customInput";
import globalStyles, { darkGreen, green } from "../styleSheet/styleSheet";
import { Icon } from "react-native-elements";
import GooglePlacesInput from "../components/mapAutoComplete";
import { db } from "../database/firebase";
import { auth } from "../database/firebase";

export default class CheckoutInformation extends React.Component {
    constructor(props){
      super(props);
      this.state = {
              cartItems: this.props.route.params.cartItems,
              price: this.props.route.params.price,
              contactNumber: "",
              address: "",
              name: "",
              valid_contact_number: true,
              valid_address: true,
              contact_err: "",
              address_err: "",
		  }
      console.log("im in checkout");
      console.log(this.props.route.params.cartItems);
      console.log(this.props.route.params.price);
    	
    }

    async fetchData() {
      const userData = {};
      const user = auth.currentUser;
  
      await db
        .collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          this.setState({
            name: doc.data().name
          })
          
        });
    }

    async componentDidMount() {
      this.fetchData();
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.handleBackButtonClick
      );
      
    };
		
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
    
    validationCheck = () => {
      var bool;
      this.contactNumberValidator();
      this.addressValidator();
  
      if (
        this.contactNumberValidator == false ||
        this.addressValidator == false
      ) {
        alert("All fields must be filled and valid");
        bool = false;
      } else {
        bool = true;
          }
  
      return bool;
    };
    
    render() {

        return (
            <View keyboardShouldPersistTaps={"handled"} 
                style={{flex: 1,justifyContent: 'center',  }}>
                <Card containerStyle={{ borderRadius: 10 }}>
                    <Text style={{ fontSize: 25, fontWeight: "bold", color: "#a8a8a8" }}>
                        Send to:
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
                            color={darkGreen}
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
                    <View style={globalStyles.buttonsContainer}>
                      <TouchableOpacity
                        style={globalStyles.buttons}
                        onPress={() => this.props.navigation.navigate("CheckoutSummary", {
                          name: this.state.name, contactNumber: this.state.contactNumber, address: this.state.address ,cartItems: this.state.cartItems, price: this.state.price})}
                      >
                        <Text style={globalStyles.buttonsText}>Next</Text>
                      </TouchableOpacity>
                  </View>
                </Card>
            </View>
        )
    }
}