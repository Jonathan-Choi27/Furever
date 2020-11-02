import React, { Component } from "react";
import { Image } from "react-native";
import { Dimensions } from 'react-native';

//Gets the dimensions of the device
const win = Dimensions.get('window');
var height = 23;
var width = 143;
//Sets the height and width, adding on in ratio to device size
console.log(win.height/win.width);
if (win.height/win.width > 1.88) {
	height = 22
	width = 140 
} else {

}
console.log(win.width);
// + Math.floor(win.height*0.0045);
// + Math.floor(win.width*0.01);

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
