import * as React from "react";
import { View, Image, Text } from "react-native";
import { Button } from "react-native-paper";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View>
          <Text> Your Profile </Text>
        </View>

        <View>
          <Text> Name : {this.props.data.name}</Text>
        </View>

        <View>
          <Text> Profile Text : {this.props.data.profileText}</Text>
        </View>

        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: this.props.data.photo }}
        />

        <Button
          onPress={() =>
            this.props.navigation.navigate("updateProfile", {
              data: this.props.data,
              refresh: () => this.props.refresh()
            })
          }>
          <Text>Update Profile</Text>
        </Button>
      </View>
    );
  }
}
