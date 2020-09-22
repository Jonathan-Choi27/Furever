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


export default class buyDogs extends React.Component {
  render() {

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

            <View style={styles.categories}>
                <Image
                  source={{
                    uri:
                      "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Fgerman-shepherd.svg?alt=media&token=0d0219e4-061a-427c-b5d2-e373b10f1a7d",
                  }}
                  style={styles.icon}
                />   
                <Image
                    source={{
                      uri:
                      "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Fcavoodle.svg?alt=media&token=4f462a1d-18e5-448c-990d-29b4716de764", 
                    }}
                    style={styles.icon}
                  />  
            </View>
        </View>    
    );
}
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