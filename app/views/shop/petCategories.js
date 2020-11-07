import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
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
import { db } from "../database/firebase";
import { onBuyTab } from "../components/petTabComponents";
import {
  darkGreen,
  green,
  lightGreen,
  orange,
  lightBlue,
  lightGrey,
} from "../styleSheet/styleSheet";
import globalStyles from "../styleSheet/styleSheet";
import { shopAccessoryCard, shopCategory } from "../components/shopComponents";

export default class petCategories extends React.Component {
  state = {
    data: [],
    isLoading: true,
    filteredData: [],
    searchText: "",
    visible: false,
    dogCheck: false,
    catCheck: false,
    rabbitCheck: false,
    fishCheck: false,
    birdCheck: false,
    horseCheck: false,
    lizardCheck: false,
    turtleCheck: false,
    pigCheck: false,
    filterDisplay: false,
    petCategories: [],
  };

  async fetchData() {
    const dataArray = [];
    const petCategoryArray = [];


    db.collection("accessories")
      .get()
      .then((doc) => {
        doc.forEach((listingDoc) => {
                dataArray.push({
                    accessoryName: listingDoc.data().name,
                    category: listingDoc.data().category,
                    type: listingDoc.data().type,
                    price: listingDoc.data().price,
                    photo: listingDoc.data().photoLink,
                    docIdd: listingDoc.id,
                  });
          this.setState({
            isLoading: false,
            data: [...dataArray],
          });
        });
      });

    db.collection("shopCategories")
      .get()
      .then((doc) => {
        doc.forEach(async (categoryDoc) => {
          petCategoryArray.push({
            category: categoryDoc.data().category,
            image: categoryDoc.data().image,
            categoryId: categoryDoc.id,
          });
          this.setState({
            isLoading: false,
            petCategories: [...petCategoryArray],
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
    const { search } = this.state;
    if (this.state.isLoading) {
      return (
        <View style={globalStyles.activityContainer}>
          <ActivityIndicator size="large" color="#447ECB" />
        </View>
      );
    }
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
              color={lightGreen}
              onPress={() => {
                this.setState({ visible: true });
              }}
              mode="contained"
              contentStyle={{
                height: 35,
              }}>
              Filter
            </Button>
          </View>

          <View style={{ height: 52 }}>
            <TouchableOpacity
              style={globalStyles.viewApplication}
              onPress={() =>
               this.props.navigation.navigate("accessoryListings")
              }
              >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}>
                Sell Accessories
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Portal>
              <Modal
                style={{ backgroundColor: "transparent" }}
                visible={this.state.visible}
                onDismiss={() => {
                  this.setState({ visible: false });
                }}>
                <Card elevation={5} style={{ margin: 10 }}>
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
            {this.state.filterDisplay ? (
              <FlatList
                numColumns={1}
                key={1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                shopCategory(item, this.props.navigation)
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
                  <View style={globalStyles.petContainer}>
                    <FlatList
                      data={this.state.petCategories}
                      columnWrapperStyle={{ justifyContent: "flex-start" }}
                      numColumns={2}
                      key={2}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) =>
                      shopCategory(item, this.props.navigation)
                      }
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
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        key={1}
                        renderItem={({ item }) =>
                        shopAccessoryCard(item, this.props.navigation)
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
