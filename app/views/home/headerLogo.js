import React, { Component } from "react";
import { Image } from "react-native";
import { Dimensions } from 'react-native';

//Sets the dimensions of the device
const win = Dimensions.get('window');
var height = 23;
var width = 143;
console.log(win.height/win.width);
//Changes the height and width depending on ratio of device size
if (win.height/win.width > 1.88 && win.height/win.width < 1.9) {
	height = 22
	width = 140 
}

export default class HeaderLogo extends Component {

	render() {

		return (
			<Image
				source={{
					uri:
						"https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FLogoBlack.png?alt=media&token=e1c8474a-de3f-46a6-ad62-f623d9f1f677",
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
