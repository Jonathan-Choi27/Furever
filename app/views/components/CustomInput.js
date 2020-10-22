import { Input, Text } from "react-native-elements";
import React from "react";
import { StyleSheet } from "react-native";
import { darkGreen, lightGreen, lightGrey } from "../styleSheet/styleSheet";

export function CustomInput(props) {
  if (props.multiline) {
    return (
      <Input
        style={styles.input}
        placeholderTextColor={"#D3D3D3"}
        labelStyle={styles.label}
        inputContainerStyle={styles.inputContainer}
        {...props}
        onBlur={() => {
          if (props.validator != undefined) {
            props.validator();
          }
        }}
        multiline={true}
        numberOfLines={3}
        maxLength={300}
      />
    );
  } else {
    return (
      <Input
        style={styles.input}
        placeholderTextColor={"#D3D3D3"}
        inputContainerStyle={styles.inputContainer}
        labelStyle={styles.label}
        maxLength={50}
        multiline={true}
        {...props}
        onBlur={() => {
          if (props.validator != undefined) {
            props.validator();
          }
        }}
      />
    );
  }
}

export function InputHeader(props) {
  return (
    <Text
      style={{
        fontSize: 18,
        color: "#505050",
        fontWeight: "bold",
        borderBottomWidth: 2,
        borderBottomColor: "#484848",
        marginBottom: 20,
      }}>
      {props.text}
    </Text>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    borderBottomColor: "#D3D3D3",
    borderBottomWidth: 2,
  },
  label: {
    color: "#505050",
  },
});
