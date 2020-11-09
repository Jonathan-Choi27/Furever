import * as React from "react";
import "react-navigation"
import "react-navigation-props-mapper"
import "@react-navigation/native"
import 'react-navigation-hooks'
import { StyleSheet, View, TouchableOpacity, FlatList, Image, Text } from "react-native";
import {
    Avatar,
    ActivityIndicator,
    Card,
    Button,
    Portal,
    Modal,
    Provider,
    Paragraph,
  } from "react-native-paper";
import firebase from "firebase";
import globalStyles from "../../styleSheet/styleSheet";
import {offerApplicationListingCard} from "../../components/offerApplicationListingsComponent";

const db = firebase.firestore();

export default class offerApplications extends React.Component {
  state = {
    data: [],
    isLoading: true,
    filteredData: [],
    searchText: "",
    visible: false,
    pullToRefresh: false,
  };
    
  async fetchData() {
    const dataArray = [];
    const pet_doc_id = this.props.route.params.doc_id;
    console.log(pet_doc_id);
    
    var petName;
    var petCategory;
    var petBreed;
    var sellerId
    // Getting Pet Info
    await db.collection("petListings")
      .doc(pet_doc_id)
      .get()
      .then((doc) => {
        petName = doc.data().name;
        petCategory = doc.data().category;
        petBreed = doc.data().breed;
        sellerId = doc.data().uuid;
    });

    var sellerName;
    await db
      .collection("users")
      .doc(sellerId)
      .get()
      .then((seller) => {
        sellerName = seller.data().name;
    });

    db.collection("petListings")
      .doc(pet_doc_id)
      .collection("buyer_applications")
      .get()
      .then((doc) => {
        doc.forEach(async (buyerApp) => {
          var buyerPhoto;
          await db
            .collection("users")
            .doc(buyerApp.data().uuid)
            .get()
            .then((userDoc) => {
              buyerPhoto = userDoc.data().photo;
            });

          let buyer_info = {
            name: buyerApp.data().name,
            buyerPhoto: buyerPhoto,
            address: buyerApp.data().address,
            age: buyerApp.data().age,
            contact_number: buyerApp.data().contact_number,
            email: buyerApp.data().email,
            house_enviroment: buyerApp.data().house_enviroment,
            least_desirable_traits: buyerApp.data().least_desirable_traits,
            most_desirable_traits: buyerApp.data().most_desirable_traits,
            previous_pets: buyerApp.data().previous_pets,
            why_want_pet: buyerApp.data().why_want_pet,
            is_accepted: buyerApp.data().is_accepted,
            doc_id: buyerApp.id,
            pet_id: pet_doc_id,
            petName: petName,
            petCategory: petCategory,
            petBreed: petBreed,
            sellerName: sellerName,
          };
            
          dataArray.push(buyer_info);
          this.setState({
            isLoading: false,
            data: [...dataArray], 
          });
          
        });
      });  
  }

  async componentDidMount() {
    this.fetchData();
  }
      
  render(){
    return (
      <View style={globalStyles.container}>
        <View style={[globalStyles.pageTitleContainer, {paddingTop: 15}]}>
          <Text style={globalStyles.pageTitle}>Offer Applications</Text>
        </View>

        <View style={{paddingTop: 10, paddingBottom: 60}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            onRefresh={async () => {
              this.setState({
                pullToRefresh: true,
              });
              await this.fetchData();
              this.setState({
                pullToRefresh: false,
              });
            }}
            refreshing={this.state.pullToRefresh}
            data={this.state.data}
            renderItem={({ item }) => (
              offerApplicationListingCard(item, this.props.navigation)
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    )
  }
}