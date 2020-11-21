import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase/app";
import "firebase/storage";

//Open the Image Picker
export const openImagePicker = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "Images",
  });

  if (!result.cancelled) {
    const { height, width, type, uri } = result;
    return uri;
  }
};

//Upload the photo
export const uploadPhoto = async (uri, uuid) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const ref = firebase
    .storage()
    .ref()
    .child("user_uploads/images/" + uuid);

  const snapshot = await ref.put(blob);

  const photoURL = await snapshot.ref.getDownloadURL();

  return photoURL;
};
