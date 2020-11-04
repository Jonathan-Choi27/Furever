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
import {onSellTab} from "../../components/petTabComponents";
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
    db.collection("pet_listings")
      .doc(pet_doc_id)
      .collection("buyer_applications")
      .get()
      .then((doc) => {
        doc.forEach(async (buyer) => {
        //     console.log("abcde");
        var uuid;
        var buyer_photo;
        var petCategory;
        
        await db
          .collection("pet_listings")
          .doc(pet_doc_id)
          .get()
          .then((doc) => {
            uuid = doc.data().uuid;
            petCategory = doc.data().category;
          });

        await db
          .collection("users")
          .doc(uuid)
          .get()
          .then((user_doc) => {
            buyer_photo = user_doc.data().photo;
            // console.log(uuid);
          });
          let buyer_info = {
            name: buyer.data().name,
            buyerPhoto: buyer_photo,
            address: buyer.data().address,
            age: buyer.data().age,
            contact_number: buyer.data().contact_number,
            email: buyer.data().email,
            house_enviroment: buyer.data().house_enviroment,
            least_desirable_traits: buyer.data().least_desirable_traits,
            most_desirable_traits: buyer.data().most_desirable_traits,
            previous_pets: buyer.data().previous_pets,
            why_want_pet: buyer.data().why_want_pet,
            category: petCategory,
            is_accepted: buyer.data().is_accepted,
            doc_id: buyer.id,
            pet_id: pet_doc_id,
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