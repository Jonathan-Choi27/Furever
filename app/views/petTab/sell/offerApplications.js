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
        const doc_id = this.props.route.params.doc_id;
        db.collection("pet_listings")
          .doc(doc_id)
          .collection("buyer_applications")
          .get()
          .then((doc) => {
            doc.forEach(async (buyer) => {
            //     console.log("abcde");
            var uuid;
            var buyer_photo;
            
            await db
              .collection("pet_listings")
              .doc(doc_id)
              .get()
              .then((doc) => {
                uuid = doc.data().uuid;
              });

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
                house_environment: buyer.data().house_environment,
                least_desirable_traits: buyer.data().least_desirable_traits,
                most_desirable_traits: buyer.data().most_desirable_traits,
                previous_pets: buyer.data().previous_pets,
                why_want_pet: buyer.data().why_want_pet,
                doc_id: buyer.id
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
          <Provider>
            {onSellTab(this.props.navigation)}

            <View style={styles.titleContainer}>
              <Text style={styles.title}>Offer Applications</Text>
            </View>
            <View style={styles.cardContainer}>
              <FlatList 
                style={{ paddingBottom: 10 }}
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
                            showsVerticalScrollIndicator={true} 
                            
                            renderItem={({item}) => (
                                <Card elevation={5} style={styles.card}>
                                    <View style={{ flexDirection: "row" }}>
                                        <View 
                                            style={{
                                                paddingLeft: 10,
                                                paddingBottom: 10,
                                                paddingTop: 10,
                                                paddingRight: 10,
                                                width: 120,
                                                height: 120,
                                                borderRadius: 120/2
                                        }}>
                                            <Image
                                                source={{ uri: item.avatarPhoto }}
                                                style={{ aspectRatio: 1, borderRadius: 5 }}
                                            />

                                        </View>
                                        <View
                                            style={{
                                                flex: 3,
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Card.Content>
                                                <Text numberOfLines={1} style={{ flex: 1 }}>
                                                    <Text style={{ fontWeight: "bold" }}>Name: </Text>
                                                    <Text>{item.name}</Text>
                                                </Text>
                                                <Text numberOfLines={1} style={{ flex: 1 }}>
                                                    <Text style={{ fontWeight: "bold" }}>Age: </Text>
                                                    <Text>{item.age}</Text>
                                                </Text>
                                                <Text numberOfLines={1} style={{ flex: 1 }}>
                                                    <Text style={{ fontWeight: "bold" }}>Contact: </Text>
                                                    <Text>{item.contact_number}</Text>
                                                </Text>
                                                <Text numberOfLines={1} style={{ flex: 1 }}>
                                                    <Text style={{ fontWeight: "bold" }}>Email: </Text>
                                                    <Text>{item.email}</Text>
                                                </Text>
                                            </Card.Content>
                                            <Card.Actions style={styles.actionCard}>
                                                <Button
                                                  style={styles.bigButton}
                                                  mode="contained"
                                                  // onPress={() =>
                                                  //     this.props.navigation.navigate("buyPetProfile", {
                                                  //     item,
                                                  //     })
                                                  // }
                                                >
                                                <Text style={styles.bigButtonText}>View Application</Text>
                                                </Button>
                                            </Card.Actions>
                                        </View>
                                    </View>
                                </Card>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            data={
                                this.state.filteredData && this.state.filteredData.length > 0
                                ? this.state.filteredData
                                : this.state.data
                        }
                        />
                        
                      
            </View>
          </Provider>
              
          )        
    }
}


const styles = StyleSheet.create({
    container: {
    //   flex: 1,
    //   justifyContent: "center",
    //   alignItems: "center",
    },
    buySellContainer: {
      alignSelf: "stretch",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flexDirection: "row",
    },
    titleContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      padding: 20,
    },
    title: {
      fontWeight: "bold",
      fontSize: 20,
      marginRight: 50,
    },
    cardContainer: {
      flex: 2,
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    card: {
      marginBottom: 13,
      marginLeft: 25,
      width: 340,
      
    },
    bigButton: {
      flex: 1,
      backgroundColor: "#447ECB",
      marginLeft: 25,
      marginRight: 25,
      marginTop: 20,
      marginBottom: 10,
      height: 27,
      width: 20,
      justifyContent: "center",
    },
    actionCard: {
      margin: 0,
      padding: 0,
    },
    bigButtonText: {
      fontSize: 12,
      color: "white",
    },
  });
  