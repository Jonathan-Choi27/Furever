import React from "react";
import { ScrollView, View, Dimensions, Image, BackHandler } from "react-native";
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

export default class CheckoutSummary extends React.Component {

    constructor(props){
        super(props);
        this.state = {
                cartItems: this.props.route.params.cartItems,
                price: this.props.route.params.price,
                name: "",
                contactNumber: this.props.route.params.contactNumnber,
                address: this.props.route.params.address,
                
        }
        console.log("im in checkout summary");
        console.log(this.state.cartItems);
          
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

    render(){
        const { cartItems, price, name, contactNumber, address } = this.state;
        return(
            <View style={globalStyles.container}>
                <Card containerStyle={globalStyles.cardContentContainer}>
                    <Text style={{ fontWeight: "bold", fontSize: 30, color: "black" }}>Order Summary</Text>
                </Card>
                <Card containerStyle={globalStyles.cardContentContainer}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text>Date Ordered: </Text>
                        <View style={{flexDirection: 'row', paddingRight: 20, alignItems: 'center'}}>
                            <Text>{new Date().getDate()}/{new Date().getMonth()+1}/{new Date().getFullYear()}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text>Order Total: </Text>
                        <View style={{flexDirection: 'row', paddingRight: 20, alignItems: 'center'}}>
                            <Text>$ {this.state.price}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text>Order Status: </Text>
                        <View style={{flexDirection: 'row', paddingRight: 20, alignItems: 'center'}}>
                            <Text>Dispatched</Text>
                        </View>
                    </View>
                </Card>
                <Card containerStyle={globalStyles.cardContentContainer}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text>Billing Address: </Text>
                        
                        <View style={{flexDirection: 'row', paddingRight: 20, alignItems: 'center'}}>
                            <Text>{this.state.address}</Text>
                        </View>
                    </View>
                    <Text></Text>
                    <Text>23 Redfern Street, Redfern, NSW, 2016</Text>
                </Card>
                <Card containerStyle={globalStyles.cardContentContainer}>
                    <Text>Item Ordered:</Text>
                    <View style={{paddingLeft: 1, paddingRight: 15}}>
                        <Text>{"\n"}</Text>
                        {cartItems && cartItems.map((item, i) => (
                            <View key={i} style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2}}>
                                <Text>{"\n"}</Text>
                        <Text numberOfLines={1} style={{fontSize: 15, fontWeight: 'bold'}}>{item.qty}X  {item.accessoryName}: ${item.qty * item.price}</Text>
                            </View>    
                        ))}
                        
                        
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{fontWeight: 'bold', fontSize: 20}}>Order Total: $ {this.state.price}</Text>
                    </View>
                </Card>
                
                <Button
                    style={{
                    backgroundColor: "green",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5,
                    height: 35,
                    width: 200,
                    marginTop: 20
                    }}
                    mode="contained"
                    // onPress={() => pushData(item)}
                >
                    <Text style={{
                    color: "#ffffff",
                    fontSize: 12,
                    padding: 5,
                    fontWeight: "bold"
                    }} >
                    Confirm Purchase
                        </Text>
                </Button>
            </View>
        )
    }






}