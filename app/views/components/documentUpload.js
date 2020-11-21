import * as DocumentPicker from "expo-document-picker";
import * as firebase from "firebase/app";
import "firebase/storage";

//Open the Document Picker
export const openDocumentPicker = async () => {
  const result = await DocumentPicker.getDocumentAsync();

  if (result.type != "cancel") {
    const { uri, name, size } = result;
    return uri;
  }
};

//Upload the Document
export const uploadDocument = async (uri, uuid) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const ref = firebase
    .storage()
    .ref()
    .child("user_uploads/documents" + uuid);

  const snapshot = await ref.put(blob);

  const documentURL = await snapshot.ref.getDownloadURL();

  return documentURL;
};
