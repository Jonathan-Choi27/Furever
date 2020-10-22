import React from "react";
import { Text, View, TouchableOpacity, Dimensions, Image } from "react-native";
import { Card,  } from "react-native-elements";
import {Button} from "react-native-paper";
import styles from "../styleSheet/styleSheet";
<<<<<<< HEAD
=======
import { darkGreen, green, lightGreen, lightGrey, orange, lightBlue } from "../styleSheet/styleSheet";
import { db } from "../database/firebase";
import { auth } from "../database/firebase";
>>>>>>> 1fc836f87a040b6867ce69a07543a8e06d52aad9

export const profileInfo = (item) => {
  const screenWidth = Math.round(Dimensions.get("window").width);
  const textWidth = (screenWidth - 20) / 2;
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View>
          <Text style={styles.fontTitle}> {item.petName}'s Profile </Text>
        </View>
      </View>

      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.fontHeading}> General Information </Text>
        <View style={styles.line} />
        <View style={styles.cardContentContainer}>
          <View>
            <Image
              style={styles.imageContainer}
              source={{
                uri: item.photo,
              }}
            />
            <Text style={{ textAlign: "center", paddingTop: 5 }}>
              <Text style={{ fontWeight: "bold" }}>Price:</Text>{" "}
              <Text>${item.price}</Text>
            </Text>
          </View>
          <View style={{ paddingLeft: 15, width: textWidth }}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Name:</Text>{" "}
              <Text>{item.petName}</Text>
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Category:</Text>{" "}
              <Text>{item.category}</Text>
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Breed:</Text>{" "}
              <Text>{item.breed}</Text>
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Colour:</Text>{" "}
              <Text>{item.colour}</Text>
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Age:</Text>{" "}
              <Text>{item.age}</Text>
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Gender:</Text>{" "}
              <Text>{item.gender}</Text>
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Size:</Text>{" "}
              <Text>{item.size}</Text>
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Location:</Text>{" "}
              <Text>{item.location}</Text>
            </Text>
          </View>
        </View>
      </Card>

      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.fontHeading}>Behaviour </Text>
        <View style={styles.line} />
        <Text style={{ paddingBottom: 10 }}>{item.behaviour}</Text>
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.fontHeading}>Care, Health and Feeding </Text>
        <View style={styles.line} />
        <Text style={{ paddingBottom: 10 }}>{item.health}</Text>
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.fontHeading}>Training </Text>
        <View style={styles.line} />
        <Text style={{ paddingBottom: 10 }}>{item.training}</Text>
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.fontHeading}>Additional information </Text>
        <View style={styles.line} />
        <Text style={{ paddingBottom: 10 }}>{item.additional}</Text>
      </Card>
      <Card containerStyle={styles.cardContainer}>
        <Text style={styles.fontHeading}>Documents </Text>
        <View style={styles.line} />
      </Card>
    </View>
  );
};

export const sellerInfo = (item) => {
<<<<<<< HEAD
  
=======
  // fetch data and store into profileData
>>>>>>> 1fc836f87a040b6867ce69a07543a8e06d52aad9
  return (
      <View>
        <Card containerStyle={styles.cardContainer}>
          <Text style={styles.fontHeading}>Seller Information </Text>
          <View style={styles.line} />

          <View style={{flexDirection: 'row', }}> 
            <View style={{flex: 1, width: 100, justifyContent: 'center', alignItems: 'center',}}>
              <Image
                style={{height: 40, width: 40, borderRadius: 40/ 2}}
                source={{
                  uri: item.sellerPhoto,
                }}
              />
              <Text style={{textAlign: "center", paddingTop: 5}}>{item.sellerName}</Text>
            </View>
<<<<<<< HEAD
            
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
                  onPress={() =>
                    navigation.navigate("sellerProfile", item)
                  }
                >
                  <Text style={{color: "#ffffff",
                      fontSize: 10,
                      padding: 5,}}>
                    More Info</Text>
                </Button>
              </View>                      
            </View>
          </View>
        </Card>    
=======

            <View style= {{flex: 4, paddingTop: 2, paddingLeft: 10, paddingRight: 10}}>
              <Text>{item.sellerInfo}</Text>
            </View>
              
          </View>
        </Card>
>>>>>>> 1fc836f87a040b6867ce69a07543a8e06d52aad9
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
