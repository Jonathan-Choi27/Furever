import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  BackHandler
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
import {shopAccessoryCard, getItemList} from "../components/shopComponents";
import { cartTab } from "../components/shopTabComponent";


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
    filteredData: [],
    searchText: "",

  };

  async fetchData() {
    const dataArray = [];
    const uid = auth.currentUser.uid;

    const type = this.props.route.params.item.type;

    db.collection("accessories")
      .where("type", "==", this.props.route.params.item.type)
      .get()
      .then((doc) => {
        doc.forEach((listingDoc) => {
                dataArray.push({
                    accessoryName: listingDoc.data().name,
                    category: listingDoc.data().category,
                    type: listingDoc.data().type,
                    price: listingDoc.data().price,
                    photo: listingDoc.data().photoLink,
                    docId: listingDoc.id,
                    description: listingDoc.data().description,
                  });
          this.setState({
            isLoading: false,
            data: [...dataArray],
          });
        });
      });
  }

  async componentDidMount() {
    this.fetchData();
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  
  };
  
  
  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
        
  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  }

  searchFunction = (searchText) => {
    this.setState({ searchText: searchText });

    let filteredData = this.state.data.filter(function (item) {
      return item.accessoryName.toLowerCase().includes(searchText.toLowerCase());
    });

    this.setState({ filteredData: filteredData });
  };

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
        <View style={{ height: 52, flexDirection:'row', justifyContent:'space-between', marginBottom: 10}}>
              
          <Text style={{fontSize: 20,
                  fontWeight: 'bold',
                  justifyContent: "center",
                  alignItems: "center",
                  // width: 300,
                  flexDirection: 'row',
                  borderRadius: 5,
                  marginTop: 5,
                  marginBottom: 16,}}>
              Shop - {this.props.route.params.item.type}
          </Text>  
          <View style={{paddingLeft:200}}>
            {cartTab(getItemList(), this.props.navigation)}
          </View>
          
        </View>
        

        {this.state.filterDisplay ? (
              <FlatList
                numColumns = {2}
                key={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  shopAccessoryCard(item, this.props.navigation)
                )}
                keyExtractor={(item, index) => index.toString()}
                data={
                  this.state.filteredData && this.state.filteredData.length > 0
                    ? this.state.filteredData
                    : this.state.data
                }
              />
            ) : (
              <View style={globalStyles.petContainer}>
                {this.state.searchText == "" ? (

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
                ) : (
                  <View style={globalStyles.petContainer}>
                    {this.state.filteredData.length == 0 ? (
                      <View style={globalStyles.petContainer}>
                        <Text style={{ margin: 100 }}>No results found.</Text>
                      </View>
                    ) : (
                      <FlatList
                        numColumns = {2}
                        key={1}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                          shopAccessoryCard(item, this.props.navigation)
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        data={
                          this.state.filteredData &&
                          this.state.filteredData.length > 0
                            ? this.state.filteredData
                            : this.state.data
                        }
                      />
                    )}
                  </View>
                )}
              </View>
            )} 
        
    
        </ScrollView>
      </View>
  </Provider>
    );
  }
}