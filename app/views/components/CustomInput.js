import { Input, Text } from "react-native-elements";
import React from "react";
import { StyleSheet } from "react-native";

export function CustomInput(props) {
  if (props.multiline) {
    return (
      <Input
        style={styles.input}
        placeholderTextColor={'#D3D3D3'}
        labelStyle={styles.label}
        inputContainerStyle={styles.inputContainer}
        {...props}
        onBlur={() => {
          props.validator();
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
        placeholderTextColor={'#D3D3D3'}
        inputContainerStyle={styles.inputContainer}
        labelStyle={styles.label}
        maxLength={50}
        multiline={true}
        {...props}
        onBlur={() => {
          props.validator();
        }}
      />
    );
  }
}

export function InputHeader(props) {
  return (
    <Text
      style={{
        fontSize: 16,
        color: "#484848",
        fontWeight: "bold",
        borderBottomWidth: 2,
        borderBottomColor: "#484848",
        marginBottom: 20
      }}>
      {props.text}
    </Text>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
      borderBottomColor : "#D3D3D3",
      borderBottomWidth: 2
  }, label : {
      color : "#447ECB"
  }
});
