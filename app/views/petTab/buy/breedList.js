import * as React from "react";
import { Text, View, FlatList, BackHandler } from "react-native";
import {
  Card,
  Button,
  Searchbar,
  Portal,
  Modal,
  Provider,
  Paragraph,
} from "react-native-paper";
import { db } from "../../database/firebase";
import globalStyles, {
  primaryColour1,
  primaryColour2,
} from "../../styleSheet/styleSheet";
import { petBuyCard } from "../../components/petBuyComponents";
import { Dimensions } from "react-native";

export default class breedList extends React.Component {
  state = {
    data: [],
    isLoading: true,
    filteredData: [],
    searchText: "",
    visible: false,
    pullToRefresh: false,
  };

  //Fetch Data
  async fetchData() {
    const dataArray = [];
    const seller = {};
    const breedName = this.props.route.params.item.breedName;
    const category = this.props.route.params.category;
    db.collection("categorizedPetListings")
      .doc(category)
      .collection(breedName)
      .get()
      .then((doc) => {
        doc.forEach(async (refDoc) => {
          refDoc
            .data()
            .list.get()
            .then(async (listingDoc) => {
              var uuid = listingDoc.data().uuid;
              await db
                .collection("users")
                .doc(uuid)
                .get()
                .then((userDoc) => {
                  seller["name"] = userDoc.data().name;
                  seller["photo"] = userDoc.data().photo;
                  seller["info"] = userDoc.data().profileText;
                  seller["email"] = userDoc.data().email;
                  seller["dob"] = userDoc.data().dob;
                });
              dataArray.push({
                sellerName: seller.name,
                sellerPhoto: seller.photo,
                sellerInfo: seller.info,
                sellerEmail: seller.email,
                sellerDob: seller.dob,
                petName: listingDoc.data().name,
                category: listingDoc.data().category,
                breed: listingDoc.data().breed,
                colour: listingDoc.data().colour,
                age: listingDoc.data().age,
                ageOption: listingDoc.data().ageOption,
                gender: listingDoc.data().gender,
                size: listingDoc.data().size,
                location: listingDoc.data().location,
                suburb: listingDoc.data().suburb,
                price: listingDoc.data().price,
                behaviour: listingDoc.data().behaviour,
                health: listingDoc.data().health,
                training: listingDoc.data().training,
                additional: listingDoc.data().additionalInfo,
                photo: listingDoc.data().photoLink,
                documentName: listingDoc.data().documentsLink,
                documentUri: listingDoc.data().documents_uri,
                doc_id: listingDoc.id,
                uuid: listingDoc.data().uuid,
              });
              this.setState({
                isLoading: false,
                data: [...dataArray],
              });
              delete seller.name;
              delete seller.photo;
              delete seller.info;
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

  //Handle the back button
  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };

  //Search functionality
  searchFunction = (searchText) => {
    this.setState({ searchText: searchText });

    let filteredData = this.state.data.filter(function (item) {
      return item.petName.toLowerCase().includes(searchText.toLowerCase());
    });

    this.setState({ filteredData: filteredData });
  };

  render() {
    const item = this.props.route.params.item;
    const screenWidth = Math.round(Dimensions.get("window").width);
    return (
      <Provider>
        <View style={globalStyles.container}>
          <Searchbar
            style={globalStyles.searchBarSingle}
            placeholder="Search"
            onChangeText={this.searchFunction}
            value={this.state.searchText}
          />
          <Portal>
            <Modal
              style={{ backgroundColor: "transparent" }}
              visible={this.state.visible}
              onDismiss={() => {
                this.setState({ visible: false });
              }}
            >
              <Card elevation={5} style={{ margin: 10 }}>
                <Card.Cover
                  source={{ uri: item.descriptionImage }}
                  resizeMode={`cover`}
                />
                <Card.Title title={item.breedName} />
                <Card.Content>
                  <Paragraph>{item.description}</Paragraph>
                </Card.Content>
                <Card.Actions style={{ justifyContent: "flex-end" }}>
                  <Button
                    color={primaryColour1}
                    onPress={() =>
                      this.props.navigation.navigate("breedInfo", { item })
                    }
                  >
                    More info
                  </Button>
                </Card.Actions>
              </Card>
            </Modal>
          </Portal>

          <View style={globalStyles.pageTitleContainer}>
            <Text style={[globalStyles.pageTitle, { flex: 1 }]}>
              {item.breedName}
            </Text>
            <View>
              <Button
                color={primaryColour2}
                onPress={() => {
                  this.setState({ visible: true });
                }}
                contentStyle={{
                  height: 30,
                }}
                mode="contained"
              >
                Information
              </Button>
            </View>
          </View>

          <View
            style={{
              flex: 2,
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            {this.state.data.length === 0 ? (
              <Text
                style={{ paddingTop: 30, fontSize: 15, textAlign: "center" }}
              >
                No available {item.breedName}'s for purchase
              </Text>
            ) : (
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
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) =>
                  petBuyCard(item, this.props.navigation)
                }
                keyExtractor={(item, index) => index.toString()}
                data={
                  this.state.filteredData && this.state.filteredData.length > 0
                    ? this.state.filteredData
                    : this.state.data
                }
              />
            )}
          </View>
        </View>
      </Provider>
    );
  }
}
