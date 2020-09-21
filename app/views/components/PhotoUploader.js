import * as ImagePicker from 'expo-image-picker';
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
    handleOnPress = () => { 
        console.log("button pressed");

        ImagePicker.launchImageLibraryAsync({
            mediaTypes: "Images"
        }).then((result)=> {
            if(!result.cancelled) {
                const {height, width, type, uri} = result;
                console.log("Image picked", uri);
            }
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