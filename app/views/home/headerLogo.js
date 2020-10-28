import React, { Component } from "react";
import { Image } from "react-native";
import { Dimensions } from 'react-native';

//Gets the dimensions of the device
const win = Dimensions.get('window');

//Sets the height and width, adding on in ratio to device size
const height = 20 + Math.floor(win.height*0.0045);
const width = 140 + Math.floor(win.width*0.01);

export default class HeaderLogo extends Component {

	render() {
		console.log("height: " + height);
		console.log("width: " + width);

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
