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
import { db } from "../database/firebase";
import globalStyles from "../styleSheet/styleSheet";
import { shopAccessoryCard, accessoryCategory, getItemList } from "../components/shopComponents";
import { cartTab } from "../components/shopTabComponent";
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  darkGreen,
  green,
} from "../styleSheet/styleSheet";

export default class accessoryCateogries extends React.Component {

  state = {
    data: [],
    isLoading: true,
    filteredData: [],
    searchText: "",
    visible: false,
    fontsLoaded: false,
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
    accessoryTypes: [],
  };
  
  async componentDidMount() {
    
    const dataArray = [];
    db.collection("accessories")
      .get()
      .then((doc) => {
        doc.forEach(async (listingDoc) => {
          var uuid = listingDoc.data().uuid;
          var seller_name;
          var seller_photo;
          await db
            .collection("users")
            .doc(uuid)
            .get()
            .then((user_doc) => {
              seller_name = user_doc.data().name;
              seller_photo = user_doc.data().photo;
            })
            .catch((erro) => {});
          dataArray.push({
            sellerName: seller_name,
            sellerPhoto: seller_photo,
            petName: listingDoc.data().name,
            category: listingDoc.data().category,
            breed: listingDoc.data().breed,
            colour: listingDoc.data().colour,
            age: listingDoc.data().age,
            gender: listingDoc.data().gender,
            size: listingDoc.data().size,
            location: listingDoc.data().location,
            price: listingDoc.data().price,
            behaviour: listingDoc.data().behaviour,
            health: listingDoc.data().health,
            training: listingDoc.data().training,
            additional: listingDoc.data().additionalInfo,
            photo: listingDoc.data().photo_link,
            uuid: listingDoc.data().uuid,
            items: [],
          });
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

    const accessoryTypesArray = [];
    const categoryId = this.props.route.params.item.categoryId;
    db.collection("shopCategories")
      .doc(categoryId)
      .collection("categories")
      .get()
      .then((doc) => {
        doc.forEach(async (accessoryDoc) => {
          accessoryTypesArray.push({
            type: accessoryDoc.data().name,
            image: accessoryDoc.data().image,
            typeId: accessoryDoc.id,
          });
          this.setState({
            isLoading: false,
            accessoryTypes: [...accessoryTypesArray],
          });
        });
      });
  });
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
            <View style={{ height: 52, flexDirection:'row', paddingLeft: 10 }}>
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
              {cartTab(getItemList(), this.props.navigation)}
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
                      data={this.state.accessoryTypes}
                      columnWrapperStyle={{ justifyContent: "flex-start" }}
                      numColumns={2}
                      key={2}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item }) => (
                        accessoryCategory(item, this.props.route.params.item.categoryId, this.props.navigation)
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
