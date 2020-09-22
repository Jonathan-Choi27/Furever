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
} from "react-native";
import { SearchBar } from 'react-native-elements';
import { max } from "react-native-reanimated";


  
export default function Pet () {
    return (
        <View style={styles.container}>
            <View style={styles.buySellContainer}>
                <TouchableOpacity style={{backgroundColor: '#FDD7E4',
                                            flexDirection: 'row',
                                            flex: 1, 
                                            justifyContent: "center", 
                                            alignItems: "center",
                                            height: 50}}>
                    <Text>Buy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: 'blue',
                                            flexDirection: 'row',
                                            flex: 1, 
                                            justifyContent: "center", 
                                            alignItems: "center",
                                            height: 50}}>
                    <Text style={{textAlign: 'center'}}>Sell</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.categories}>
                <Text>Dog</Text>
                <Text>Cat</Text>
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
    alignItems: "center"
  }
});