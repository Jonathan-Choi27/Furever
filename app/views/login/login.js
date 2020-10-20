import React from "react";
import { auth } from "../database/firebase";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Input } from "react-native-elements";
import styles from "../styleSheet/styleSheet";
import { darkGreen, green } from "../styleSheet/styleSheet";

export default class Login extends React.Component {
	state = {
		email: "",
		password: "",
	};
;
	onLogin() {
		const { email, password } = this.state;

		auth
			.signInWithEmailAndPassword(email, password)
			.then((e) => {
				const user = auth.currentUser;
				if (user.emailVerified) {
					this.props.navigation.replace("Home");
				} else {
					this.props.navigation.replace("Home");
					alert("Email address is not verified.");
				}
			})
			.catch((err) => {
				switch (err.code) {
					case "auth/invalid-email":
						alert("Email address is invalid.");
						break;
					case "auth/user-disabled":
						alert("User is disabled.");
						break;
					case "auth/user-not-found":
						alert("User is not found.");
						break;
					case "auth/wrong-password":
						alert("Password is invalid.");
						break;
				}
			});
		this.setState({ email: "" });
		this.setState({ password: "" });
	}

	onForgotPassword(email) {
		auth
			.sendPasswordResetEmail(email)
			.then((e) => {
				alert(`A password reset email has been sent to ${email}`);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		return (
			<View style={styles.loginLogoContainer}>
				<Image
					style={styles.loginLogo}
					source={{
						uri: "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FlogoWithWords.png?alt=media&token=ac29597a-9268-419f-8769-fa44ac76a5df",
					}}
				/>
				<View style={styles.loginInputContainer}>
					<Input
						placeholder="EMAIL"
						value={this.state.email}
						onChangeText={(email) => this.setState({ email })}
						leftIcon={{
							type: "ionicons",
							name: "mail-outline",
							size: 25,
							color: darkGreen,
							paddingRight: 10,
							paddingLeft: 5,
						}}
					/>
					<Input
						placeholder="PASSWORD"
						value={this.state.password}
						onChangeText={(password) => this.setState({ password })}
						secureTextEntry={true}
						leftIcon={{
							type: "ionicons",
							name: "lock-outline",
							size: 25,
							color: darkGreen,
							paddingRight: 10,
							paddingLeft: 5,
						}}
					/>
				</View>
				<View style={styles.loginButtonsContainer}>
					<TouchableOpacity
						style={styles.landingButtons}
						onPress={this.onLogin.bind(this)}
					>
						<Text style={styles.landingButtonsText}>LOGIN</Text>
					</TouchableOpacity>
					<Text
						style={styles.loginTitle}
						onPress={() => this.props.navigation.replace("Forgot Password")}
					>
						FORGOT PASSWORD?
					</Text>

					<Text
						style={styles.loginTitle2}
						onPress={() => this.props.navigation.replace("Sign Up")}
					>
						NO ACCOUNT?{" "}
						<Text style={{ fontWeight: "bold" }}>{"SIGN UP"}</Text>
					</Text>
				</View>
			</View>
		);
	}
}