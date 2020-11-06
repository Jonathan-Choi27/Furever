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

export const shopAccessoryCard = (item, navigation) => {
  return (
    <View style={styles.iconContainer}>
      {/* {console.log(item.docId)} */}
      {/* {onCartTab(this.state.items, this.props.navigation)} */}
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
          onPress={() => addItemToCart(item.docId)}
          
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

export const addItemToCart = async (itemId) => {
  const user = auth.currentUser;
  // console.log(itemId);
  Alert.alert("Your item has been added!");
  // await db.collection("cart").get().then((doc) => {
  //   doc.forEach((listingDoc) => {
  //     if(itemId === listingDoc.data().itemId){
  //       console.log("same doc")
  //       db.collection("cart").doc(listingDoc.id).update({
  //         qty: listingDoc.data().qty + 1
  //       })
  //     } else if (itemId != listingDoc.data().itemId) {
  //       console.log("no same doc exist");
  //       db.collection("cart").add({itemId: itemId, uuid: user.uid, qty: 1}); 
  //     }
  //   })
  // })
  db.collection("cart").add({itemId: itemId, uuid: user.uid, qty: 1}); 
};

