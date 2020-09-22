import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import React, { Component } from 'react';
import { Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({ 
  button: { 
    padding: 10, 
    borderWidth: 1, 
    borderColor: "#333", 
    textAlign: "center", 
    maxWidth: 150 
  }
}); 

class PhotoUploader extends Component { 
    uriToBlob = (uri) => {

        return new Promise((resolve, reject) => {
    
          const xhr = new XMLHttpRequest();
    
          xhr.onload = function() {
            // return the blob
            resolve(xhr.response);
          };
          
          xhr.onerror = function() {
            // something went wrong
            reject(new Error('uriToBlob failed'));
          };
    
          // this helps us get a blob
          xhr.responseType = 'blob';
    
          xhr.open('GET', uri, true);
          xhr.send(null);
    
        });
    
      }
    
      uploadToFirebase = (blob) => {
    
        return new Promise((resolve, reject)=>{
    
          var storageRef = firebase.storage().ref();
    
          storageRef.child('uploads/photo.jpg').put(blob, {
            contentType: 'image/jpeg'
          }).then((snapshot)=>{
            
            // blob.close();
    
            resolve(snapshot);
    
          }).catch((error)=>{
    
            reject(error);
    
          });
    
        });
    
    
      }      
    
    
      handleOnPress = () => { 
    
        ImagePicker.launchImageLibraryAsync({ 
          mediaTypes: "Images"
        }).then((result)=>{ 
    
          if (!result.cancelled) {
            // User picked an image
            const {height, width, type, uri} = result;
            return this.uriToBlob(uri);
    
          }
    
        }).then((blob)=>{
    
          return this.uploadToFirebase(blob);
    
        }).then((snapshot)=>{
    
          console.log("File uploaded");
       
        }).catch((error)=>{
    
          throw error;
    
        }); 
    
      } 

  render () { 
    return(
        <Button 
            style={styles.button}
            title="Choose Photo"
            onPress={this.handleOnPress}
            />
        
    )
  } 
} 
export default PhotoUploader;