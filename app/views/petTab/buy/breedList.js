import * as React from "react";
import {
  Text,
  View,
  FlatList,
} from "react-native";
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
import { onBuyTab } from "../../components/petTabComponents"
import globalStyles, { darkGreen, orange } from "../../styleSheet/styleSheet";
import { petBuyCard } from "../../components/petBuyComponents";

export default class breedList extends React.Component {
  state = {
    data: [],
    isLoading: true,
    filteredData: [],
    searchText: "",
    visible: false,
    pullToRefresh: false,
    breedDescription: "",
    breedDescriptionImage: "",
  };

  async fetchData() {
    const dataArray = [];
    const seller = {};
    const breedName = this.props.route.params.item.breed;
    db.collection("pet_listings")
      .where("breed", "==", breedName)
      .get()
      .then((doc) => {
        doc.forEach(async (listingDoc) => {
          var uuid = listingDoc.data().uuid;
          await db
            .collection("users")
            .doc(uuid)
            .get()
            .then((user_doc) => {
              seller["name"] = user_doc.data().name;
              seller["photo"] = user_doc.data().photo;
              seller["info"] = user_doc.data().profileText;
              seller["email"] = user_doc.data().email;    
              seller["dob"] = user_doc.data().dob;    
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
            gender: listingDoc.data().gender,
            size: listingDoc.data().size,
            location: listingDoc.data().location,
            price: listingDoc.data().price,
            behaviour: listingDoc.data().behaviour,
            health: listingDoc.data().health,
            training: listingDoc.data().training,
            additional: listingDoc.data().additionalInfo,
            photo: listingDoc.data().photo_link,
            doc_id: listingDoc.id,
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

      const categoryId = this.props.route.params.categoryId;
      const breedId = this.props.route.params.item.breedId;
      db.collection("petCategories")
        .doc(categoryId)
        .collection("breed")
        .doc(breedId)
        .get()
        .then((doc) => {
          this.setState({
            isLoading: false,
            breedDescription: doc.data().description,
            breedDescriptionImage: doc.data().descriptionImage,
          });
        });
  }

  async componentDidMount() {
    this.fetchData();
  }

  searchFunction = (searchText) => {
    this.setState({ searchText: searchText });

    let filteredData = this.state.data.filter(function (item) {
      return item.petName.toLowerCase().includes(searchText.toLowerCase());
    });

    this.setState({ filteredData: filteredData });
  };

  render() {
    const item = this.props.route.params.item;
    return (
      <Provider>
        {onBuyTab(this.props.navigation)}
        <View style={globalStyles.activityContainer}>
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
                  source={{ uri: this.state.breedDescriptionImage }}
                  resizeMode={`cover`}
                />
                <Card.Title title={item.breed} />
                <Card.Content>
                  <Paragraph>{this.state.breedDescription}</Paragraph>
                </Card.Content>
                <Card.Actions style={{ justifyContent: "flex-end" }}>
                  <Button
                    color={darkGreen}
                    onPress={() =>
                      this.props.navigation.navigate("breedInfo", { categoryId: this.props.route.params.categoryId, breedId: this.props.route.params.item.breedId })
                    }
                  >
                    More info
                  </Button>
                </Card.Actions>
              </Card>
            </Modal>
          </Portal>

          <View style={globalStyles.breedTitleContainer}>
            <Text style={globalStyles.breedTitle}>{item.breed}</Text>
            <Button
              color={darkGreen}
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

          <View style={{
            flex: 2,
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}>
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
              renderItem={({ item }) => (
                petBuyCard(item, this.props.navigation)
              )}
              keyExtractor={(item, index) => index.toString()}
              data={
                this.state.filteredData && this.state.filteredData.length > 0
                  ? this.state.filteredData
                  : this.state.data
              }
            />
          </View>
        </View>
      </Provider>
    );
  }
}
