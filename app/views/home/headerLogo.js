import React, { Component } from "react";
import { Image } from "react-native";

export default class HeaderLogo extends Component {
	render() {
		return (
			<Image
				source={{
					uri:
						"https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FLogoWhite.png?alt=media&token=de9a54cb-6060-4c35-b501-fb41a0ef83af",
				}}
				style={{
					flex: 1,
					flexDirection: "row",
					width: 143,
					height: 23,
				}}
			/>
		);
	}
}
