import { render } from "react-dom";
import { View, Text, Button } from "react-native";

export const SellListing = (props) => {
  return (
    <View>
      <Text>Name : {props.name}</Text>
      <Text>Animal Category : {props.category}</Text>
      <Text>Animal Breed : {props.breed}</Text>
      <Text>Animal Colour : {props.colour}</Text>

      <Button title="View"/>
      <Button title="Update"/>
      <Button title="Delete"/>

    </View>
  );
};
