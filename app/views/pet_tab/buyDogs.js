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

export default class buyDogs extends React.Component {
  render() {

    return (
      <View style={styles.container}>
        <View style={styles.buySellContainer}>
          <TouchableOpacity style={{
                              backgroundColor: '#89CFF0',
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
                              backgroundColor: 'white',
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
        <View>
          <SearchBar 
                  style={{
                    flex: 1, 
                    justifyContent: "center", 
                    alignItems: "center",
                    height: 50,
                    width: 300,
                  }}
                  placeholder="Search..."
                  lightTheme= "true"

          />
        </View>
        <View style={styles.categories}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("buyDogs")}>
            <View style={styles.iconContainer}>
            <Image
              // style={styles.icon}

            style={{height:100, width:100,}}
            source={{
            uri:
            "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Fgerman-shepherd.svg?alt=media&token=0d0219e4-061a-427c-b5d2-e373b10f1a7d",
          }}
          />      
            </View>     
          </TouchableOpacity>
          <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Image
              style={{height:100, width:100,}}
              source={{
                uri:
                "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Fmaltese.svg?alt=media&token=c96f15f4-2ea4-4187-a289-96a1bf1fe12f", 
              }}
            />  
          </TouchableOpacity> 
            </View>
        </View>

        <View style={styles.categories}>
          <TouchableOpacity>
            <View style={styles.iconContainer}>
            <Image
              // style={styles.icon}

            style={{height:100, width:100,}}
            source={{
            uri:
            "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Fcavoodle.svg?alt=media&token=4f462a1d-18e5-448c-990d-29b4716de764", 
          }}
          />      
            </View>     
          </TouchableOpacity>
          <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Image
              style={{height:100, width:100,}}
              source={{
                uri:
                "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Fsamoyed.svg?alt=media&token=587cd6a4-c892-4f0b-aa9c-8454f4c474ce", 
              }}
            />  
          </TouchableOpacity> 
            </View>

        </View>

      </View>  
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center", 
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