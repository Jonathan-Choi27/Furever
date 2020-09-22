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


export default class petBuySpecies extends React.Component {
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

    <TouchableOpacity style={{backgroundColor: 'blue',
                                    flex: 1, 
                                    justifyContent: "center", 
                                    alignItems: "center",
                                    height: 10}}>
            <Text style={{textAlign: 'center'}}>View Applications</Text>
        </TouchableOpacity>
    <View style={styles.categories}>
    <TouchableOpacity
              onPress={() => this.props.navigation.navigate("buyDogs")}
            >
          <Image
          source={{
            uri:
              "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Fdog.svg?alt=media&token=dcf9238f-4c30-4217-b441-f4b91856517d",
          }}
          style={styles.icon}
        />             
        </TouchableOpacity>
      <TouchableOpacity onPress={() => this.props.navigation.navigate("buyDogs")}>
        
      </TouchableOpacity>
        
        <Image
            source={{
              uri:
              "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Fcat.svg?alt=media&token=e691dc38-5295-4073-992a-d0b1ca6404f9", 
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