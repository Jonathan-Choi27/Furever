import { Picker, Text, View } from "react-native";
import React from "react";

//Custom Picker
export function customPicker(props) {
  if (props.list) {
    return (
      <View style={{ borderBottomColor: "#D3D3D3", borderBottomWidth: 2 }}>
        <Picker
          itemStyle={{ color: "#505050" }}
          selectedValue={props.val}
          onValueChange={(value) => props.setVal(value)}
        >
          {props.list.map((item, i) => {
            if (i == 0) {
              return <Picker.Item label={item} value="0" color="#D3D3D3" />;
            } else {
              return <Picker.Item label={item} key={i} value={item} />;
            }
          })}
        </Picker>
      </View>
    );
  } else {
    return <Text>hi</Text>;
  }
}
