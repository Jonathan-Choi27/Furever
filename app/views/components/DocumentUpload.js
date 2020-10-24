import * as DocumentPicker from "expo-document-picker";
import React, { Component } from "react";
import { Button, StyleSheet } from "react-native";
import * as firebase from "firebase/app";
import "firebase/storage";

export const openDocumentPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync();

    if(result.type != "cancel"){
        const {uri, name, size} = result;
        return uri;
    }
}
// hello

// export default openDocumentPicker;

export function uploadDocument(uri, uuid){ 
    fetch(uri)
      .then((result) => result.blob())
      .then((blob) => {
        var storageRef = firebase.storage().ref();

        storageRef
          .child("user_uploads/documents/" + uuid)
          .put(blob)
          .then((snapshot) => {
            // console.log("File succesfully uploaded", snapshot);
          })
          .catch((error) => {
            // console.log("Error during file upload", error);
          });
      });
  };

// export default function {uploadDocument, openDocumentPicker};