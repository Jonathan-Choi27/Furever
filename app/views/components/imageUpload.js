import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase/app";
import "firebase/storage";
import React, { Component } from "react";
import { Button, StyleSheet } from "react-native";

export const openImagePicker = async () => {
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
    return photoURL;
}
