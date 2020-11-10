import * as React from "react";
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
} from "react-native";
import {
    Card,
    Button,
} from "react-native-paper";
import styleSheet from "../styleSheet/styleSheet";
import styles from "../styleSheet/styleSheet";
import globalStyles, { darkGreen, green, lightGreen, lightGrey, orange, lightBlue } from "../styleSheet/styleSheet";
import { db } from "../database/firebase";
import { auth } from "../database/firebase";
import { Cart } from "../shop/Cart";

const itemList = [];

export const shopAccessoryCard = (item, navigation) => {
  return (
    
    <View style={styles.iconContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("shopProfile", {item})}
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
          onPress={() => addItemToCart(item)}
          
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
          navigation.navigate("accessoryCategories", { item })
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
          navigation.navigate("accessoryList", { item, categoryId })
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

export const getItemList = () =>{
  // const newList = [...itemList];
  return itemList;
}

// add item to the cart
export const addItemToCart = (item) => {
  let index = 0;
  let duplicate = false;
  while (index < itemList.length){
    console.log(itemList[index].qty);
    if(item.docId === itemList[index].docId){
      let currentQty = itemList[index].qty + 1;
      console.log(currentQty);
      duplicate = true;
      itemList[index].qty = currentQty;  
      break;
    }
    index++;
  }

  if(!duplicate){
    item['qty'] = 1;
    itemList.push(item);
  }
  duplicate = false;
  console.log(itemList); 

  Alert.alert("Your item has been added!"); 
};

