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

export default class petBuySpecies extends React.Component {
  render() {

    return (
      <View style={styles.container}>
        <View style={styles.buySellContainer}>
          <TouchableOpacity style={{
                              backgroundColor: '#d7e5f7',
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
        <View style={{height: 50, padding: 10}}>
          <TouchableOpacity style={styles.viewApplication}>
            <Text style={{textAlign: 'center'}}>View Applications</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categories}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("buyDogs")}>
            <View style={styles.iconContainer}>
            <Image
              // style={styles.icon}

            style={{height:100, width:100,}}
            source={{
            uri:
              "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Fdog.svg?alt=media&token=dcf9238f-4c30-4217-b441-f4b91856517d",
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
                "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Fcat.svg?alt=media&token=e691dc38-5295-4073-992a-d0b1ca6404f9", 
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
              "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Frabbit.svg?alt=media&token=2d7ace4c-64db-4488-96b2-27119f05f5d5",
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
                "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2Ffish.svg?alt=media&token=46b0eaa2-5ddc-4660-bb8f-7b722064a997", 
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