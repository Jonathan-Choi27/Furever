import React from "react";
import { Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import {darkGreen} from "../styleSheet/styleSheet"

const GooglePlacesInput = () => {
  return (
    <View style={{ marginHorizontal: 10 }}>
      <Text> Address </Text>
      <View style={{flexDirection:"row", borderBottomWidth: 3}}>
        <View style={{flex: 0.1}}>
        <Icon
          name="ios-pin"
          type="ionicon"
          color={darkGreen}
          style={{borderWidth: 2, paddingVertical : 13 }}
        />
        </View>
        <View style={{flex: 1, borderWidth: 2}}>
        <GooglePlacesAutocomplete
          placeholder="Please enter location"
          //   onPress={(data, details = null) => {
          //     // 'details' is provided when fetchDetails = true
          //     console.log(data, details);
          //   }}
          onPress={(data) => console.log(data)}
          query={{
            key: "AIzaSyC-6ifFUYzIIgUf1uhbmJ_BU6VQyre4bRw",
            language: "en",
            components: "country:au",
          }}
          styles={{
            textInput: {
              backgroundColor: "backgroundColor: 'rgba(52, 52, 52, 0.0)'",
              paddingVertical: 100,
            //   borderBottomWidth: 2,
            //   borderBottomColor: "#D3D3D3",
              fontSize: 17,
            },
          }}
        />
      </View>
          </View>
    </View>
  );
};

export default GooglePlacesInput;
