import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  BackHandler
} from "react-native";
import {
  Avatar,
  Card,
  Button,
  Searchbar,
  ActivityIndicator,
  Modal,
  Provider,
  Portal,
  Checkbox,
} from "react-native-paper";
import { db } from "../database/firebase";
import {
  darkGreen,
  green,
  lightGreen,
  orange,
  lightBlue,
  lightGrey,
} from "../styleSheet/styleSheet";
import globalStyles from "../styleSheet/styleSheet";
import { accessoryListingCard, shopCategory } from "../components/shopComponents";
export default class Checkout extends React.Component {
    constructor(props){
		super(props);
		this.state = {
			cartItems: this.props.route.params.items,
		}
		console.log("im in checkout");
    	
    }

    async componentDidMount() {
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
    
    render() {
        return (
            <View style={globalStyles.container}>
                <Text>Order Summary: </Text>
                <Card containerStyle={globalStyles.cardContentContainer}>
                    <Text
                        style={{ fontWeight: "bold", fontSize: 30, color: "black" }}>
                        Date Ordered: {new Date().getDate()}/{new Date().getMonth()+1}/{new Date().getFullYear()}
                    </Text>
                </Card>
                
            </View>
        )
    }










}