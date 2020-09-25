import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase/app";
import "firebase/storage";
import React, { Component } from "react";
import { Button, StyleSheet } from "react-native";

export const openImagePicker = async () => {
  // ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: "Images"
  //   }).then((result)=>{

  //     if (!result.cancelled) {
  //       // User picked an image
  //       const {height, width, type, uri} = result;
  //         console.log(uri);
  //       return uri;
  //     } else {
  //         return "err";
  //     }
  //   });

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "Images",
  });

  if (!result.cancelled) {
    const { height, width, type, uri } = result;
    return uri;
  }
};

export const uploadPhoto =  async (uri, uuid) => {

    // var photoURL;
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.storage().ref().child("user_uploads/images/" + uuid);

    const snapshot = await ref.put(blob);

    const photoURL = await snapshot.ref.getDownloadURL();
    // ref.put(blob).then((snapshot) => {
    //     snapshot.ref.getDownloadURL().then((url) => {
    //         console.log("inside loop: " + url);
    //         photoURL = url;
    //     })
    // })

    // .then((result) => result.blob())
    // .then((blob) => {
    //   var storageRef = firebase.storage().ref();
    //   storageRef
    //     .child("user_uploads/images/" + uuid)
    //     .put(blob)
    //     .then(async (snapshot) => {
    //         photoURL = await snapshot.ref.getDownloadURL().then((downloadURL) => {
    //             return downloadURL;
    //             // return downloadURL;
    //         })
    //       console.log("File succesfully uploaded", snapshot);
    //     })
    //     .catch((error) => {
    //       console.log("Error during file upload", error);
    //     });
    // });
    console.log("outside : " + photoURL);
    return photoURL;
    // return photoURL;
}

// export default function openImagePicker();
