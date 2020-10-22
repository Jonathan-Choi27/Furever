import React from "react";
import "react-navigation"
import "react-navigation-props-mapper"
import "@react-navigation/native"
import 'react-navigation-hooks'
import {
    View,
    ScrollView,
  } from "react-native";
console.disableYellowBox = true;
import {buyerInfo} from "../../components/buyerInfoComponent";
import {onBuyTab} from "../../components/petTabComponents";
import styles from "../../styleSheet/styleSheet";

export default class sellerProfile extends React.Component {

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
        const uuid = this.props.route.params.item.uuid;

        await db
              .collection("users")
              .doc(uuid)
              .get()
              .then((user_doc) => {
                buyer_photo = user_doc.data().photo;
                console.log(uuid);
              });
              let buyer_info = {
                name: buyer.data().name,
                avatarPhoto: buyer_photo,
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
                doc_id: buyer.id
              };
              
              dataArray.push(buyer_info);
              this.setState({
                isLoading: false,
                data: [...dataArray], 
              });
      }

      async componentDidMount() {
        this.fetchData();
      }

    render() {
        return (
            <View style={{paddingBottom: 50}}>
                <ScrollView>
                    {sellerDetails(data)}                    
                </ScrollView>
            </View>
        );
    }
}