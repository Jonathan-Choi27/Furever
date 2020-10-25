import * as React from "react";
import { ActivityIndicator } from "react-native";
import { View, Image, Text, StyleSheet } from "react-native";
import {
  Button,
  Card,
  Title,
  Paragraph,
  List,
  Divider,
  Provider,
} from "react-native-paper";
import { auth } from "../database/firebase";
import { Avatar, Accessory, Input } from "react-native-elements";
import { darkGreen, lightGrey } from "../styleSheet/styleSheet";
import globalStyles from "../styleSheet/styleSheet";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  logout() {
    // auth.signOut().then(function() {
    //     alert("Signed out");
    // this.props.navigation.navigate("login");
    this.props.navigation.navigate("Home", { screen: "Home" });
    //   }).catch(function(error) {
    //     // An error happened.
    //   });
  }

  render() {
    return (
      <View style={{backgroundColor: lightGrey,}}>
        <View style={globalStyles.profileContainer}>
          <View style={globalStyles.avatarContainer}>
            <View style={globalStyles.dogBackground}>
              <Image
                style={globalStyles.dogImage}
                source={{
                  uri:
                    "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2FLogoDogWhite.png?alt=media&token=d2ba6451-beeb-4815-8782-a31601436e20",
                }}
              />
            </View>
            <Avatar
              size={150}
              rounded
              renderPlaceholderContent={<ActivityIndicator />}
              source={{
                uri: this.props.data.photo,
              }}
            >
            </Avatar>

            <View style={globalStyles.nameEmailContainer}>
              <View style={globalStyles.shortLine}>
                <Text style={globalStyles.profileName}>
                  {this.props.data.name}
                </Text>
              </View>
              <Text style={globalStyles.emailStyle}>
                {this.props.data.email}
              </Text>
            </View>
          </View>
        </View>

        <List.Item
          title="Edit Profile"
          left={(props) => <List.Icon {...props} icon="pencil" />}
          style={globalStyles.listStyle}
          onPress={() =>
            this.props.navigation.navigate("updateProfile", {
              data: this.props.data,
              refresh: () => this.props.refresh(),
            })
          }
        />
        <Divider style={globalStyles.divider}/>
        <List.Item
          title="Privacy and Security"
          left={(props) => <List.Icon {...props} icon="security" />}
          style={globalStyles.listStyle}
        />
        <Divider style={globalStyles.divider}/>
        <List.Item
          title="Help and Support"
          left={(props) => <List.Icon {...props} icon="help" />}
          style={globalStyles.listStyle}
        />
        <Divider style={globalStyles.divider}/>
        <List.Item
          title="Logout"
          onPress={() => this.logout()}
          left={(props) => <List.Icon {...props} icon="door" />}
          style={globalStyles.listStyle}
        />
        <Divider style={globalStyles.divider}/>
      </View>
    );
  }
}
