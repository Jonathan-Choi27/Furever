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
      <View>
        <View
          style={{
            backgroundColor: "#447ECB",
            borderBottomRightRadius: 1000,
            borderBottomLeftRadius: 1000,
            marginBottom: 30,
            transform: [{ scaleX: 2 }],
            overflow: "hidden",
          }}>
          <View style={{ alignItems: "center" }}>
          </View>
          <View style={styles.avatarContainer}>
            <View style={{ opacity: 0.1, position: "absolute" }}>
              <Image
                style={{
                  left: 140,
                  width: 750 / 1.7,
                  height: 610 / 1.7,
                }}
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
              }}>
              {/* <Accessory size={45} /> */}
            </Avatar>

            <View
              style={{
                marginTop: 15,
                alignItems: "center",
                marginHorizontal: 60,
                justifyContent: "center",
              }}>
              <View
                style={{ borderBottomColor: "#D3D3D3", borderBottomWidth: 1, paddingBottom: 5  }}>
                <Text
                  style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>
                  {this.props.data.name}
                </Text>
              </View>
              <View style={{ marginTop: 5 }} />
              <Text style={{ color: "#202020", fontSize: 17}}>{this.props.data.email}</Text>
            </View>
          </View>
        </View>

        <List.Item
          title="Edit Profile"
          left={(props) => <List.Icon {...props} icon="pencil" />}
          onPress={() =>
            this.props.navigation.navigate("updateProfile", {
              data: this.props.data,
              refresh: () => this.props.refresh(),
            })
          }
        />
        <Divider />
        <List.Item
          title="Privacy and Security"
          left={(props) => <List.Icon {...props} icon="security" />}
        />
        <Divider />
        <List.Item
          title="Help and Support"
          left={(props) => <List.Icon {...props} icon="help" />}
        />
        <Divider />
        <List.Item
          title="Logout"
          onPress={() => this.logout()}
          left={(props) => <List.Icon {...props} icon="door" />}
        />
        <Divider />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 50,
    height: 50,
  },
  avatarContainer: {
    marginTop: 80,
    marginBottom: 50,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    transform: [{ scaleX: 0.5 }],
  },
  borderBottom: {
    //   borderBottomColor: "grey",
    //   borderBottomWidth: 1
  },
});
