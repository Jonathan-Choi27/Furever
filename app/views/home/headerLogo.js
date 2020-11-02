import React, { Component } from "react";
import { Image } from "react-native";
import { Dimensions } from 'react-native';

//Sets the dimensions of the device
const win = Dimensions.get('window');
var height = 23;
var width = 143;

//Changes the height and width depending on ratio of device size
if (win.height/win.width > 1.88) {
	height = 22
	width = 140 
}

export default class HeaderLogo extends Component {

	render() {

		return (
			<Image
				source={{
					uri:
						"https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FLogoWhite.png?alt=media&token=de9a54cb-6060-4c35-b501-fb41a0ef83af",
				}}
				style={{
					flexDirection: "row",
					flex: 1,
					width: width,
   					height: height, 
				}}
			/>
		);
	}
}
