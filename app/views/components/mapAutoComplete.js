import React, { useEffect, useRef } from "react";
import { Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import { darkGreen } from "../styleSheet/styleSheet";

export const GooglePlacesInput = (props) => {
  const ref = useRef();

  useEffect(() => {
    console.log(props.prev_location);
    if (props.previous) {
      ref.current?.setAddressText(props.prev_location);
    }
  });

  return (
    <View>
      <Text style={{ color: "#505050", fontWeight: "bold", fontSize: 16 }}>
        {" "}
        Address{" "}
      </Text>
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 2,
          // dont change height css, seems to mess everything up
          borderBottomColor: "#D3D3D3",
        }}>
        <View style={{ flex: 0.08 }}>
          <Icon
            name="ios-pin"
            type="ionicon"
            color={darkGreen}
            style={{ paddingVertical: 8, paddingLeft: 0, marginLeft: 1 }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <GooglePlacesAutocomplete
            ref={ref}
            {...props}
            placeholder="Please enter location"
            // function required to set state of parent
            onPress={(data) => props.set(data.description)}
            // onPress={(data) => {
            //     // 'details' is provided when fetchDetails = true
            //     console.log(data.structured_formatting.secondary_text);
            //   }}
            // this is my google places key, will be deleted after sem
            query={{
              key: "AIzaSyC-6ifFUYzIIgUf1uhbmJ_BU6VQyre4bRw",
              language: "en",
              components: "country:au",
            }}
            styles={{
              textInput: {
                backgroundColor: "backgroundColor: 'rgba(52, 52, 52, 0.0)'",
                paddingVertical: 0,
                marginVertical: 0,
                height: 40,
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
