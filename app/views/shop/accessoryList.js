import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  BackHandler,
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
import {
  shopAccessoryCard,
  accessoryListingCard,
  getItemList,
} from "../components/shopComponents";
import { cartTab } from "../components/shopTabComponent";

import globalStyles, {
  darkGreen,
  green,
  lightGreen,
  lightGrey,
  orange,
  lightBlue,
  screenWidth,
} from "../styleSheet/styleSheet";

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

    const category = this.props.route.params.category.category;
    const accessory = this.props.route.params.accessory.accessory;

    db.collection("accessories")
      .where("category", "==", category)
      .where("type", "==", accessory)
      .get()
      .then((doc) => {
        doc.forEach((listingDoc) => {
          dataArray.push({
            accessoryName: listingDoc.data().name,
            category: listingDoc.data().category,
            type: listingDoc.data().type,
            price: listingDoc.data().price,
            photo: listingDoc.data().photoLink,
            description: listingDoc.data().description,
            docId: listingDoc.id,
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
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };

  searchFunction = (searchText) => {
    this.setState({ searchText: searchText });

    let filteredData = this.state.data.filter(function (item) {
      return item.accessoryName
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });

    this.setState({ filteredData: filteredData });
  };

  render() {
    console.log(this.state.data);
    const category = this.props.route.params.category;
    const accessory = this.props.route.params.accessory;
    return (
      <Provider>
        <View style={globalStyles.petContainer}>
          <View style={globalStyles.searchFilterContainer}>
            <Searchbar
              style={globalStyles.searchBar}
              placeholder="Search"
              onChangeText={this.searchFunction}
              value={this.state.searchText}
            />
            <Button
              color={green}
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
                }}
              >
                <Card elevation={5} style={{ margin: 10 }}>
                  <Card.Content></Card.Content>
                  <Card.Actions style={{ justifyContent: "flex-end" }}>
                    <Button
                      color={darkGreen}
                      onPress={() => {
                        this.displayFunction();
                        this.setState({ visible: false });
                      }}
                    >
                      Done
                    </Button>
                  </Card.Actions>
                </Card>
              </Modal>
            </Portal>
            {this.state.filterDisplay ? (
              <FlatList
                numColumns={1}
                key={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) =>
                  accessoryListingCard(item, this.props.navigation)
                }
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
                  //the page when not searching
                  <View style={{ alignItems: "center" }}>
                    <View
                      style={{
                        width: screenWidth - 40,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginLeft: 15,
                        marginRight: 15,
                        paddingBottom: 10,
                        paddingTop: 3,
                      }}
                    >
                      <Text style={[globalStyles.pageTitle]}>
                        {category.category} - {accessory.accessory}
                      </Text>
                      {cartTab(this.props.navigation)}
                    </View>
                    {this.state.data.length === 0 ? (
                      <Text
                        style={{
                          paddingTop: 30,
                          fontSize: 15,
                          textAlign: "center",
                        }}
                      >
                        No available{" "}
                        {category.category + " " + accessory.accessory} for
                        purchase
                      </Text>
                    ) : null}
                    <View style={globalStyles.petContainer}>
                      <FlatList
                        numColumns={1}
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
                        renderItem={({ item }) =>
                          accessoryListingCard(item, this.props.navigation)
                        }
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </View>
                  </View>
                ) : (
                  <View style={globalStyles.petContainer}>
                    {this.state.filteredData.length == 0 ? (
                      <View style={globalStyles.petContainer}>
                        <Text style={{ margin: 100 }}>No results found.</Text>
                      </View>
                    ) : (
                      <FlatList
                        numColumns={1}
                        key={1}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) =>
                          accessoryListingCard(item, this.props.navigation)
                        }
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
