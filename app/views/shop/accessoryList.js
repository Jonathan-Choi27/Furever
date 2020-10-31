import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import {
  Avatar,
  Card,
  Button,
  Searchbar,
  ActivityIndicator,
  Modal,
  Provider,
  Portal,
  Checkbox,
} from "react-native-paper";
import firebase from "firebase";
import { auth } from "../database/firebase";
import {shopAccessoryCard} from "../components/shopComponents"

import globalStyles, { darkGreen, green, lightGreen, lightGrey, orange, lightBlue } from "../styleSheet/styleSheet";

const db = firebase.firestore();

export default class accessoryList extends React.Component {
  state = {
    data: [],
    lists: null,
    isLoading: true,
    pullToRefresh: false,
    limit: 6,
    lastVisible: null,

  };

  async fetchData() {
    const dataArray = [];
    const uid = auth.currentUser.uid;

    const type = this.props.route.params.item.breed;

    db.collection("accessories")
      .where("type", "==", this.props.route.params.item.breed)
      .get()
      .then((doc) => {
        doc.forEach((listingDoc) => {
            if (listingDoc.data().type == this.props.route.params.item.breed) {
                dataArray.push({
                    accessoryName: listingDoc.data().name,
                    category: listingDoc.data().category,
                    type: listingDoc.data().type,
                    price: listingDoc.data().price,
                    photo: listingDoc.data().photoLink,
                    docIdd: listingDoc.id,
                  });
            }
    
          

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

  render() {
    return (
        
      <Provider>
      <View style={globalStyles.petContainer}>
        <View
          style={globalStyles.searchFilterContainer}
        >
          <Searchbar
            style={globalStyles.searchBar}
            placeholder="Search"
            onChangeText={this.searchFunction}
            value={this.state.searchText}
          />
          <Button
            color={lightGreen}
            onPress={() => {
              this.setState({ visible: true });
            }}
            mode="contained"
            contentStyle={{
              height: 35,
            }}
          >
            Filter
          </Button>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
        <Portal>
          <Modal
            style={{ backgroundColor: "transparent" }}
            visible={this.state.visible}
            onDismiss={() => {
              this.setState({ visible: false });
            }}>
            <Card elevation={5} style={{margin: 10}}>
              <Card.Content>
                
              </Card.Content>
              <Card.Actions style={{ justifyContent: "flex-end" }}>
                <Button
                  color={darkGreen}
                  onPress={() => {
                    this.displayFunction();
                    this.setState({ visible: false });
                  }}>
                  Done
                </Button>
              </Card.Actions>
            </Card>
          </Modal>
        </Portal>
        <Text style = {{padding: 15}}>
            Shop - {this.props.route.params.item.breed}
        </Text>   
        <View style={globalStyles.petContainer}>
            
            <FlatList
            columnWrapperStyle={{ justifyContent: "flex-start" }}
            numColumns={2}
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
                    shopAccessoryCard(item, this.props.navigation)
                )}
                keyExtractor={(item, index) => index.toString()}
            />
          </View>
    
        </ScrollView>
      </View>
  </Provider>
    );
  }
}