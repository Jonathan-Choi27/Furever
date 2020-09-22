import React, {useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  FlatList,
  ActivityIndicator,
  Platform,
  Dimensions,
  Image, 
} from "react-native";
import { SearchBar } from 'react-native-elements';
import { max } from "react-native-reanimated";


  
export default function PetBuy () {
    return (
        <View style={styles.container}>
            <View style={styles.buySellContainer}>
                <TouchableOpacity style={{backgroundColor: '#FDD7E4',
                                            flex: 1, 
                                            justifyContent: "center", 
                                            alignItems: "center",
                                            height: 50}}>
                    <Text>Buy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: 'blue',
                                            flex: 1, 
                                            justifyContent: "center", 
                                            alignItems: "center",
                                            height: 50}}>
                    <Text style={{textAlign: 'center'}}>Sell</Text>
                </TouchableOpacity>

            </View>

            <TouchableOpacity style={{backgroundColor: 'blue',
                                            flex: 1, 
                                            justifyContent: "center", 
                                            alignItems: "center",
                                            height: 10}}>
                    <Text style={{textAlign: 'center'}}>View Applications</Text>
                </TouchableOpacity>
            <View style={styles.categories}>
                <Image
                  source={{
                    uri:
                      "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fdog.svg?alt=media&token=056e06ac-79a3-4536-8420-3327b0fc090e",
                  }}
                  style={styles.icon}
                />   
                <Image
                    source={{
                      uri:
                      "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fcat.svg?alt=media&token=3fb83456-2150-4c53-bcfc-6b32b63f8cc9", 
                    }}
                    style={styles.icon}
                  />  
            </View>
            <Text>Pet Screen!</Text>
        </View>    
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center"
  },
  buySellContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  categories: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    flexDirection: "row",
    padding:20,
  },
  icon: {
    width: 100,
    height: 100,
    padding:20,

  }
});