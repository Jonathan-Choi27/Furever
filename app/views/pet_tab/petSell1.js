import * as React from "react";
import {
  Picker,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Image,
} from "react-native";
import { color } from "react-native-reanimated";
import { db } from "../database/firebase";
import uuid from "react-native-uuid";
import {
  openDocumentPicker,
  uploadDocument,
} from "../components/DocumentUpload";
import {
  useFonts,
  Rosario_400Regular,
  Rosario_700Bold,
} from "@expo-google-fonts/rosario";
import * as Font from "expo-font";
import { openImagePicker, uploadPhoto } from "../components/ImageUpload";
import CategorySelection from "./pet_sell_1_categorySelection";
import { auth } from "../database/firebase";
import * as firebase from "firebase/app";
import "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default class petSell1 extends React.Component {
  state = {
    name: "",
    category: "",
    breed: "",
    colour: "",
    age: "",
    gender: "",
    location: "",
    price: "",
    behaviour: "",
    health: "",
    training: "",
    additionalInfo: "",
    documents: "",
    //photo
    photo_link: "",
    photo_uri: "",
    photo_uuid: "",
    //
    documents_uri: "",
    seller_name: "",
    fontLoaded: false,
  };

  componentDidMount() {
    //  db.collection("users").doc(auth.currentUser.uid).get().then((doc) => {
    //      this.state.seller_name = doc.data().name;
    //  });
  }

  handleSubmit = async () => {
    const {
      name,
      category,
      breed,
      colour,
      age,
      gender,
      location,
      price,
      behaviour,
      health,
      training,
      additionalInfo,
      photo_uuid,
      photo_uri,
      photo_link,
      documents,
      documents_uri,
      //   seller_name,
    } = this.state;

    console.log("photo uuid:" + this.state.photo_uuid);

    const photoURL = await uploadPhoto(
      this.state.photo_uri,
      this.state.photo_uuid
    );

    this.setState({
      photo_link: photoURL,
    });
    console.log("class : " + photoURL);

    uploadDocument(this.state.documents_uri, this.state.documents);

    // var storageRef = firebase.storage().ref();
    // storageRef
    //   .child("user_uploads/images/" + this.state.photo_uuid)
    //   .getDownloadURL()
    //   .then(function (url) {
    //     console.log("hi");
    //     // this.state.photo_link = url;
    //     console.log(url);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    const user = auth.currentUser;

    var submit;
    if (
      name == "" ||
      category == "0" ||
      breed == "0" ||
      colour == "0" ||
      age == "" ||
      gender == "0" ||
      location == "" ||
      price == "" ||
      behaviour == "" ||
      health == "" ||
      training == "" ||
      additionalInfo == ""
      // documents == "" ||
      // behaviour == "" ||
      // behaviour == "" ||
    ) {
      alert("All input fields required and must be valid.");
      submit = false;
    } else {
      submit = true;
    }

    db.collection("pet_listings").add({
      uuid: user.uid,
      name: this.state.name,
      category: this.state.category,
      breed: this.state.breed,
      colour: this.state.colour,
      age: this.state.age,
      gender: this.state.gender,
      behaviour: this.state.behaviour,
      health: this.state.health,
      location: this.state.location,
      training: this.state.training,
      photo_link: this.state.photo_link,
      documents: this.state.documents,
      price: this.state.price,
      // to implement
      //   location
      //   photo
      //   documents
      //   price
    });

    if (submit == true) {
      this.props.navigation.replace("petSell");
    }
  };
  // aaaaaaaaaa
  setPhotoUri = async () => {
    const get_uri = await openImagePicker();

    this.setState({
      photo_uuid: uuid.v4(),
      photo_uri: get_uri,
    });
  };

  setDocumentUri = async () => {
    const get_uri = await openDocumentPicker();

    this.setState({
      documents: uuid.v4(),
      documents_uri: get_uri,
    });
  };

  setCategory = (val) => {
    this.setState({
      category: val,
    });
  };

  setBreed = (val) => {
    this.setState({
      breed: val,
    });
  };

  setColour = (val) => {
    this.setState({
      colour: val,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.heading}>New Pet Listing Application</Text>
          <Text>
            <Text style={styles.sub_heading}>General Information</Text>
            <Text style={styles.setColorRed}> *</Text>
          </Text>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
            }}
          />
          <View style={styles.titleContainer}>
            <View style={styles.rectangle}>
              <Text>
                <Text style={styles.titles}>Name</Text>
              </Text>
              <TextInput
                onChangeText={(name) => this.setState({ name })}
                style={styles.input}
              />

              {/* <Picker
                style={styles.picker}
                onValueChange={(category) => this.setState({ category })}
              >
                <Picker.Item label="Select" value="0" />
                <Picker.Item label="Dog" value="dog" />
                <Picker.Item label="Cat" value="cat" />
                <Picker.Item label="Bird" value="bird" />
                <Picker.Item label="Reptile" value="reptile" />
                <Picker.Item label="Fish" value="fish" />
                <Picker.Item label="Exotic" value="exotic" />
              </Picker>
              <Text>
                <Text style={styles.titles}>Animal Breed</Text>
              </Text>
              <TextInput
                onChangeText={(breed) => this.setState({ breed })}
                style={styles.input}
              /> */}

              {/* <Text>
                <Text style={styles.titles}>Colour</Text>
              </Text>
              <Picker style={styles.picker} onValueChange={(category) => {}}>
                <Picker.Item label="Select" value="0" />
                <Picker.Item label="Brown" value="dog" />
                <Picker.Item label="White" value="cat" />
                <Picker.Item label="Black" value="bird" />
                <Picker.Item label="Grey" value="reptile" />
              </Picker> */}
              {/* <TextInput
                onChangeText={(colour) => this.setState({ colour })}
                style={styles.input}
              /> */}
              <CategorySelection
                category={this.setCategory}
                breed={this.setBreed}
                colour={this.setColour}
              />
              <Text>
                <Text style={styles.titles}>Age</Text>
                {/* <Text style={styles.setColorRed}> *</Text> */}
              </Text>
              <TextInput
                onChangeText={(age) => this.setState({ age })}
                style={styles.input}
              />

              <Text>
                <Text style={styles.titles}>Gender</Text>
                {/* <Text style={styles.setColorRed}> *</Text> */}
              </Text>
              <View style={styles.picker_container}>
                <Picker
                  style={styles.picker}
                  onValueChange={(gender) => this.setState({ gender })}
                >
                  <Picker.Item
                    label="Select gender"
                    value="0"
                    color="#B4B4B4"
                  />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                </Picker>
              </View>
              <Text>
                <Text style={styles.titles}>Location</Text>
                {/* <Text style={styles.setColorRed}> *</Text> */}
              </Text>
              <TextInput
                onChangeText={(location) => this.setState({ location })}
                style={styles.input}
              />

              <Text>
                <Text style={styles.titles}>Price</Text>
                {/* <Text style={styles.setColorRed}> *</Text> */}
              </Text>
              <TextInput
                onChangeText={(price) => this.setState({ price })}
                style={styles.input}
                // secureTextEntry={true}
                // width={100}
                // backgroundColor="white"
                // height={44}
                // padding={10}
                // borderWidth={1}
                // borderColor="black"
                // marginBottom={10}
              />

              <Text style={styles.titles}>Behaviour</Text>
              <TextInput
                onChangeText={(behaviour) => this.setState({ behaviour })}
                multiline
                numberOfLines={4}
                secureTextEntry={true}
                style={styles.biginput}
              />

              <Text style={styles.titles}>Care, Health and Feeding</Text>
              <TextInput
                onChangeText={(health) => this.setState({ health })}
                multiline
                numberOfLines={4}
                secureTextEntry={true}
                style={styles.biginput}
              />

              <Text style={styles.titles}>Training</Text>
              <TextInput
                onChangeText={(training) => this.setState({ training })}
                multiline
                numberOfLines={4}
                secureTextEntry={true}
                style={styles.biginput}
              />

              <Text style={styles.titles}>Additional Information</Text>
              <TextInput
                onChangeText={(additionalInfo) =>
                  this.setState({ additionalInfo })
                }
                multiline
                numberOfLines={4}
                secureTextEntry={true}
                style={styles.biginput}
              />

              <Text style={styles.titles}>Upload a photo</Text>
              <Button title="Choose Photo" onPress={this.setPhotoUri} />
              <Image
                source={{
                  image_path: this.state.photo_uri,
                }}
              />

              <Text style={styles.titles}>Upload Documents</Text>
              <Button title="Choose Document" onPress={this.setDocumentUri} />
              {/* <TextInput
                onChangeText={(documents) => this.setState({ documents })}
                secureTextEntry={true}
                style={styles.input}
              /> */}

              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  title={"submit"}
                  style={styles.buttons}
                  onPress={this.handleSubmit}
                  //   onPress={() => this.props.navigation.replace("petSell")}
                >
                  <Text style={styles.buttonsText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  titles: {
    fontSize: 14,
    // fontWeight: "bold",
    fontFamily: "Rosario_400Regular",
    color: "#515151",
    paddingVertical: 8,
    // width: 50,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    // fontFamily: "Rosario_400Regular",
    // textShadowColor: "rgba(0, 0, 0, 0.3)",
    // textShadowOffset: { width: -1, height: 1 },
    // textShadowRadius: 10,
    color: "#000000",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 50,
    flex: 1,
    paddingVertical: 10,
  },
  sub_heading: {
    fontSize: 16,
    // fontWeight: "bold",
    fontFamily: "Rosario_700Bold",
  },
  input: {
    width: 314,
    // height: 44,
    height: 34,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    backgroundColor: "white",
    fontSize: 12,
  },
  biginput: {
    width: 314,
    height: 80,
    // height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    backgroundColor: "white",
  },
  picker: {
    height: 34,
    width: 314,
    fontSize: 12,
    marginBottom: 10,
  },
  buttonsContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 10,
  },
  buttons: {
    backgroundColor: "#447ECB",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 100,
    height: 40,
  },
  buttonsText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  titleContainer: {
    flex: 1,
  },
  setColorRed: {
    color: "#f44336",
  },
  picker_container: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    height: 34,
    marginBottom: 10,
  },
});
