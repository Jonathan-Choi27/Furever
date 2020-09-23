import { green } from "@material-ui/core/colors";
import { PhonelinkTwoTone } from "@material-ui/icons";
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

export default class petSellProfile extends React.Component {
  render() {

    return (
      <View style={styles.container}>
        <View style={styles.buySellContainer}>
          <TouchableOpacity style={{
                              backgroundColor: 'white',
                              flex: 1, 
                              justifyContent: "center", 
                              alignItems: "center",
                              height: 50,
                            }}
                            onPress={() => this.props.navigation.navigate("petBuySpecies")}
                            >
            <Text>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
                              backgroundColor: '#d7e5f7',
                              flex: 1, 
                              justifyContent: "center", 
                              alignItems: "center",
                              height: 50,
                            }}
                            onPress={() => this.props.navigation.navigate("petSell")}
          >
            <Text style={{textAlign: 'center'}}> Sell </Text>
          </TouchableOpacity>
        </View>

      </View>  
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: "center",
  },
  buySellContainer: {
    alignSelf:'stretch',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  categories: {
    alignSelf:'stretch',
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    flexDirection: "row",
    padding:20,
    
  },
  iconContainer: {
    padding: 20,
  },
  viewApplication: {
    backgroundColor: '#447ECB',
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    height: 50, 
    width: 200,
  }
});