import React from "react";
import "react-navigation"
import "react-navigation-props-mapper"
import "@react-navigation/native"
import 'react-navigation-hooks'
import {
    View,
    ScrollView,
    Text,
    BackHandler
  } from "react-native";
console.disableYellowBox = true;
import {profileInfo, sellerInfo} from "../components/accessoryProfileComponent";
import { db } from "../database/firebase";
import Icon from 'react-native-vector-icons/AntDesign';
import {
    Button,
} from "react-native-paper";
import globalStyles, { darkGreen, green, lightGreen, lightGrey, orange, lightBlue } from "../styleSheet/styleSheet";
import { addItemToCart } from "../components/shopComponents";


export default class shopProfile extends React.Component {
    state = {
        name: "",
        dob: "",
        email: "",
        isPetShop: false,
        profileText: "",
        photo: "",
        quantity: 0,
        items: [],
     };
     
    async fetchData() {
        // const uuid = this.props.route.params.item.docIdd;
        // console.log(uuid);
        // db.collection("users")
        //     .doc(uuid)
        //     .get()
        //     .then((doc) => {
        //         this.setState({
        //             name: doc.data().name,
        //             dob: doc.data().dob,
        //             email: doc.data().email,
        //             isPetShop: doc.data().isPetShop,
        //             profileText: doc.data().profileText,
        //             photo: doc.data().photo,
        //         });
        // });
    };

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

    
    pushItem(item) {
        const itemsArray = [];
        itemsArray.push(item);
        this.setState({items: [...itemsArray]});
    }
    
    render() {
        const item = this.props.route.params.item;
        // console.log(item.docId);
        return (
            <View style={{paddingBottom: 50}}>
                {/* {onCartTab(this.state.items, this.props.navigation)} */}
                <ScrollView>
                    {profileInfo(item, this.props.navigation)}
                    {sellerInfo(this.state, this.props.navigation)}
                    <View style={{ flexDirection: 'row', paddingTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon onPress={() => this.setState({quantity: this.state.quantity - 1})} name="minuscircle" size={30} style={{justifyContent: 'center', alignItems: 'center'}}/>
                        <Text style={{fontSize: 20, margin: 20}}>{this.state.quantity}</Text>
                        <Icon onPress={() => this.setState({quantity: this.state.quantity + 1})} name="pluscircle" size={30} style={{justifyContent: 'center', alignItems: 'center'}} />
                    </View>
                    <View style={{paddingTop: 10, paddingBottom:10, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 15}}>Total price: {this.state.quantity * item.price}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                        <Button
                            style={{
                            backgroundColor: green,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 5,
                            height: 25,
                            width: 120
                            }}
                            mode="contained"
                            // onPress={() => navigation.navigate("sellerProfile", { seller })}
                            onPress={() => addItemToCart(item)}
                        >
                            <Text style={{
                            color: "#ffffff",
                            fontSize: 12,
                            padding: 5,
                            fontWeight: "bold"
                            }} >
                            Add To Cart
                                </Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        );
    }
}