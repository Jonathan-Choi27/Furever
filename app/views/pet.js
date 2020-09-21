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
                                        alignSelf: 'stretch',
                                        textAlign: 'center',
                                        flex: 1,
                                        // width: 300,
                                        height: 50}}>
                    <Text>Buy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{

                                        backgroundColor: 'blue',
                                        alignSelf: 'stretch',
                                        textAlign: 'center',
                                        flex: 1,
                                        // width: 30    0,
                                        height: 50
                                        }}>
                    <Text style={{textAlign: 'center'}}>Sell</Text>
                </TouchableOpacity>


            <View style={styles.categories}>
                <Text>Dog</Text>
                <Text>Cat</Text>
            </View>

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
    top: 10,
    // flex: 1, 
    flexDirection: 'row',
    // width: Dimensions.get("screen").width,
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  categories: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center"
  }

});
