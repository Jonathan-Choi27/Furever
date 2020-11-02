import * as React from "react";
import {
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import {
    Card,
    Button,
} from "react-native-paper";
// import { accessibilityProps } from "react-native-paper/lib/typescript/src/components/MaterialCommunityIcon";
import styleSheet from "../styleSheet/styleSheet";
import styles from "../styleSheet/styleSheet";
import globalStyles, { darkGreen, green, lightGreen, lightGrey, orange, lightBlue } from "../styleSheet/styleSheet";

export const shopAccessoryCard = (item, navigation) => {
  return (
    
    <View style={styles.iconContainer}>
      <TouchableOpacity
        // onPress={() =>
        //   navigation.replace(/*add nav*/, { item })
        // }
        >
        <View style={styles.iconContainer} 
          onPress={() => props.navigation}>
          <Image
            style={styles.icon}
            source={{uri: item.photo}}
          />
        </View>
      </TouchableOpacity>
      <View 
      style={styles.container}
      >
      <Text>{item.accessoryName} - ${item.price} </Text>


      <Button style={globalStyles.smallButton}
          onPress={() => navigation.navigate("shopProfile", {item})}
      >
        <Text style={{ fontWeight: "bold", color:"#53A687"}}>Add to Cart</Text>
      </Button>
    </View>
    </View>    
  )
}

export const shopCategory = (item, navigation) => {
  return (
    
    <View style={styles.iconContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.replace("accessoryCategories", { item })
        }>
        <View style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={{uri: item.image}}
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export const accessoryCategory = (item, categoryId, navigation) => {
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.replace("accessoryList", { item, categoryId })
        }>
        <View style={styles.breedIconContainer}>
          <Image
            style={styles.icon}
            source={{uri: item.image}}
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}