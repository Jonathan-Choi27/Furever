import React from "react";
import { Text, View, TouchableOpacity, Dimensions, Image } from "react-native";
import { Card,  } from "react-native-elements";
import {Button} from "react-native-paper";
import styles from "../styleSheet/styleSheet";
import { CustomInput, InputHeader } from "../components/customInput";
import { darkGreen, green, lightGreen, lightGrey, orange, lightBlue } from "../styleSheet/styleSheet";

const checkDocuments = (field) => {
  if (field === "") {
    return "No Documents Provided."
  }
  return field;
  // (
  //   <View>
  //     <Icon
  //       name="ios-paper"
  //       type="ionicon"
  //       color={darkGreen}
  //       // containerStyle={{ paddingLeft: 7, paddingRight: 10 }}
  //     />
  //   </View>
  // );
}

const checkAdditional = (additional) => {
  if (additional === "") {
    return "No Additional Information Provided."
  }
  return additional;
}

export const profileInfo = (item) => {
  const screenWidth = Math.round(Dimensions.get("window").width);
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 0 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: screenWidth, height: 250 }}
            source={{
              uri: item.photo,
            }}
          />
        </View>
        <Card containerStyle={styles.cardContentContainer}>
          <Text
            style={{ fontWeight: "bold", fontSize: 30, color: "black" }}>
            {item.petName}'s Profile
          </Text>
        </Card>

        <Card containerStyle={styles.cardContentContainer}>
          <InputHeader text="General Information"/>
          <View style={styles.cardContainer}>
            <View style={{paddingRight: 15}}>
              <Text style={styles.contentTextBold}>Name: </Text>
              <Text style={styles.contentTextBold}>Category: </Text>
              <Text style={styles.contentTextBold}>Breed: </Text>
              <Text style={styles.contentTextBold}>Colour: </Text>
              <Text style={styles.contentTextBold}>Age: </Text>
              <Text style={styles.contentTextBold}>Gender: </Text>
              <Text style={styles.contentTextBold}>Size: </Text>
              <Text style={styles.contentTextBold}>Location: </Text>
            </View>
            <View>
              <Text numberOfLines={1} style={styles.contentText}>{item.petName}</Text>
              <Text numberOfLines={1} style={styles.contentText}>{item.category}</Text>
              <Text numberOfLines={1} style={styles.contentText}>{item.breed}</Text>
              <Text numberOfLines={1} style={styles.contentText}>{item.colour}</Text>
              <Text numberOfLines={1} style={styles.contentText}>{item.age}</Text>
              <Text numberOfLines={1} style={styles.contentText}>{item.gender}</Text>
              <Text numberOfLines={1} style={styles.contentText}>{item.size}</Text>
              <Text numberOfLines={1} style={styles.contentText}>{item.location}</Text>
            </View>
          </View>
      </Card>

      <Card containerStyle={styles.cardContentContainer}>
        <InputHeader text="Behaviour"/>
        <Text style={styles.contentText}>{item.behaviour}</Text>
      </Card>

      <Card containerStyle={styles.cardContentContainer}>
        <InputHeader text="Care, Health and Feeding"/>
        <Text style={styles.contentText}>{item.health}</Text>
      </Card>

      <Card containerStyle={styles.cardContentContainer}>
        <InputHeader text="Training"/>
        <Text style={styles.contentText}>{item.training}</Text>
      </Card>

      <Card containerStyle={styles.cardContentContainer}>
        <InputHeader text="Additional Information"/>
        <Text style={styles.contentText}>{checkAdditional(item.additional)}</Text>
      </Card>

      <Card containerStyle={styles.cardContentContainer}>
        <InputHeader text="Documents"/>
        {checkDocuments(item.documentName)}
      </Card>

      </View>
    </View>
  );
};

export const sellerInfo = (item, navigation) => {
  
  return (
      <View>
        <Card containerStyle={styles.cardContentContainer}>
          <InputHeader text="Seller Information"/>

          <View style={{flexDirection: 'row', }}> 
            <View style={{flex: 1, width: 100, justifyContent: 'center', alignItems: 'center',}}>
              <Image
                style={{height: 40, width: 40, borderRadius: 40/2, }}
                source={{
                  uri: item.sellerPhoto,
                }}
              />
              <Text style={{textAlign: "center", paddingTop: 5}}>{item.sellerName}</Text>
            </View>
            
            <Text>{item.sellerName}</Text>
            
          </View>
          <View style= {{flex: 1, paddingTop: 5, paddingLeft: 10}}>
            <Text >{item.sellerInfo}</Text>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10}}>
                <Button
                  style={{backgroundColor: "#447ECB",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 5,
                          height: 25, 
                          width: 120}}
                  mode="contained"
                  onPress={() => navigation.navigate("sellerProfile", { item })}

                >
                  <Text style={{color: "#ffffff",
                      fontSize: 10,
                      padding: 5,}}>
                    More Info</Text>
                </Button>
              </View>                      
            </View>
        </Card>    
      </View>
  );
};

export const expressInterest = (item, navigation) => {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => navigation.navigate("buyApplication", { item })}
      >
        <Text style={styles.buttonsText}>EXPRESS INTEREST</Text>
      </TouchableOpacity>
    </View>
  );
};
