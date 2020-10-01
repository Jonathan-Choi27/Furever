import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,

} from "react-native";
import { Avatar, Card, Button, Searchbar,   ActivityIndicator,  Modal, Chip,  Provider, Portal, Checkbox} from "react-native-paper";
import { db } from "../database/firebase";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { AppLoading } from "expo";
import * as Font from "expo-font";

let customFonts = {
  Roboto_400Regular,
  Roboto_700Bold,
};

export default class petBuy1Dog extends React.Component {
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
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  async componentDidMount() {
    this._loadFontsAsync();
    const dataArray = [];
    db.collection("pet_listings")
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
            });
          dataArray.push({
            name: seller_name,
            avatarPhoto: seller_photo,
            title: listingDoc.data().name,
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
          });
          this.setState({
            isLoading: false,
            data: [...dataArray],
          });
        });
      });
  }

  searchFunction = (searchText) => {
    this.setState({ searchText: searchText });

    let filteredData = this.state.data.filter(function (item) {
      return item.title.includes(searchText);
    });

    this.setState({ filteredData: filteredData });
  };

  checkFunction = (input) => {
    switch(input) {
      case 'dogCheck':
          this.setState({dogCheck: !this.state.dogCheck});
        break;
      case 'catCheck':
        this.setState({catCheck: !this.state.catCheck});
        break;
      case 'rabbitCheck':
        this.setState({rabbitCheck: !this.state.rabbitCheck});
        break;
      case 'fishCheck':
        this.setState({fishCheck: !this.state.fishCheck});
        break;
        case 'birdCheck':
          this.setState({birdCheck: !this.state.birdCheck});
        break;
      case 'horseCheck':
        this.setState({horseCheck: !this.state.horseCheck});
        break;
      case 'lizardCheck':
        this.setState({lizardCheck: !this.state.lizardCheck});
        break;
      case 'turtleCheck':
        this.setState({catCturtleCheckheck: !this.state.turtleCheck});
        break;
        case 'pigCheck':
          this.setState({pigCheck: !this.state.pigCheck});
        break;
      default:
    }
    console.log(this.state.dogCheck);
  }

  displayFunction = () => {
    let listData = [];
    if (this.state.dogCheck) {
      this.setState({filterDisplay: true});
      let filteredData = this.state.data.filter(function (item) {
        return item.category.includes("dog");
      });
      listData = listData.concat(filteredData);
    } 
    if (this.state.catCheck) {
      this.setState({filterDisplay: true});
      let filteredData = this.state.data.filter(function (item) {
        return item.category.includes("cat");
      });
      listData = listData.concat(filteredData);
    } 
    if (this.state.rabbitCheck) {
      this.setState({filterDisplay: true});
      let filteredData = this.state.data.filter(function (item) {
        return item.category.includes("rabbit");
      });
      listData = listData.concat(filteredData);
    } 
    if (this.state.fishCheck) {
      this.setState({filterDisplay: true});
      let filteredData = this.state.data.filter(function (item) {
        return item.category.includes("fish");
      });
      listData = listData.concat(filteredData);
    } 
    if (this.state.birdCheck) {
      this.setState({filterDisplay: true});
      let filteredData = this.state.data.filter(function (item) {
        return item.category.includes("bird");
      });
      listData = listData.concat(filteredData);
    } 
    if (this.state.horseCheck) {
      this.setState({filterDisplay: true});
      let filteredData = this.state.data.filter(function (item) {
        return item.category.includes("horse");
      });
      listData = listData.concat(filteredData);
    } 
    if (this.state.lizardCheck) {
      this.setState({filterDisplay: true});
      let filteredData = this.state.data.filter(function (item) {
        return item.category.includes("lizard");
      });
      listData = listData.concat(filteredData);
    } 
    if (this.state.turtleCheck) {
      this.setState({filterDisplay: true});
      let filteredData = this.state.data.filter(function (item) {
        return item.category.includes("turtle");
      });
      listData = listData.concat(filteredData);
    } 
    if (this.state.pigCheck) {
      this.setState({filterDisplay: true});
      let filteredData = this.state.data.filter(function (item) {
        return item.category.includes("pig");
      });
      listData = listData.concat(filteredData);
    } 

    if (!this.state.dogCheck && !this.state.catCheck && !this.state.birdCheck) {
      this.setState({filterDisplay: false});
    }
    console.log(listData);
    this.setState({ filteredData: listData });
  }

  render() {
    const { search } = this.state;
    if (this.state.isLoading) {
      return (
        <View style={styles.activityContainer}>
          <ActivityIndicator size="large" color="#447ECB" />
        </View>
      );
    }
    // if (this.state.fontsLoaded) {
      return (
        <Provider>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.buySellContainer}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#d7e5f7",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 50,
                }}
                onPress={() => this.props.navigation.replace("petBuy")}
              >
                <Text>Buy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 50,
                }}
                onPress={() => this.props.navigation.replace("petSell")}
              >
                <Text style={{ textAlign: "center" }}> Sell </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "stretch",
                flexDirection: "row",
              }}
            >
              <Searchbar
                style={{
                  margin: 10,
                  height: 50,
                  width: 250,
                }}
                placeholder="Search"
                onChangeText={this.searchFunction}
                value={this.state.searchText}
              />
              <Button
                labelStyle={{ fontFamily: "Roboto_400Regular" }}
                color="#447ECB"
                onPress={() => {
                  this.setState({ visible: true });
                }}
                mode="contained"
              >Filter</Button>
          </View>
          <View style={{ height: 50, padding: 10 }}>
            <TouchableOpacity style={styles.viewApplication}                     
                              onPress={() => this.props.navigation.replace("petBuy7")}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                View Applications
              </Text>
            </TouchableOpacity>
          </View>
          <Portal>

          <Modal
              style={{ backgroundColor: "transparent",}}
              visible={this.state.visible}
              onDismiss={() => {
              this.setState({ visible: false });
              }}
            >
            <Card elevation={5} style={{ margin: 10 }}>
              <Card.Content>
                <Text>Animal:</Text>
                <View style={{flexDirection: 'row' }}>
                  <Checkbox.Item
                    label="Dog"
                    status={this.state.dogCheck ? 'checked' : 'unchecked'}
                    onPress={() => {
                    this.checkFunction('dogCheck');
                    }}
                  />      
                  <Checkbox.Item
                    label="Fish"
                    status={this.state.fishCheck ? 'checked' : 'unchecked'}
                    onPress={() => {
                    this.checkFunction('fishCheck');
                    }}
                  /> 
                  <Checkbox.Item
                    label="Lizard"
                    status={this.state.lizardCheck ? 'checked' : 'unchecked'}
                    onPress={() => {
                    this.checkFunction('lizardCheck');
                    }}
                  />     
                </View>
                <View style={{flexDirection: 'row' }}>
                  <Checkbox.Item
                    label="Cat"
                    status={this.state.catCheck ? 'checked' : 'unchecked'}
                    onPress={() => {
                    this.checkFunction('catCheck');
                    }}
                  />      
                  <Checkbox.Item
                    label="Bird"
                    status={this.state.birdCheck ? 'checked' : 'unchecked'}
                    onPress={() => {
                    this.checkFunction('birdCheck');
                    }}
                  /> 
                  <Checkbox.Item
                    label="Turtle"
                    status={this.state.turtleCheck ? 'checked' : 'unchecked'}
                    onPress={() => {
                    this.checkFunction('turtleCheck');
                    }}
                  />   
                </View>
                <View style={{flexDirection: 'row' }}>
                  <Checkbox.Item
                    label="Rabbit"
                    status={this.state.rabbitCheck ? 'checked' : 'unchecked'}
                    onPress={() => {
                    this.checkFunction('rabbitCheck');
                    }}
                  />      
                  <Checkbox.Item
                    label="Horse"
                    status={this.state.horseCheck ? 'checked' : 'unchecked'}
                    onPress={() => {
                    this.checkFunction('horseCheck');
                    }}
                  /> 
                  <Checkbox.Item
                    label="Pig"
                    status={this.state.pigCheck ? 'checked' : 'unchecked'}
                    onPress={() => {
                    this.checkFunction('pigCheck');
                    }}
                  />   
                </View>                   
              </Card.Content>
              <Card.Actions style={{justifyContent: "flex-end"}}>
                <Button onPress={() => {
                    this.displayFunction();
                    this.setState({ visible: false });
                    }}>
                  Done
                </Button>
              </Card.Actions>
            </Card>
          </Modal>
              </Portal>
              {this.state.filterDisplay ?

               <FlatList
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Card elevation={5} style={styles.card}>
                    <Card.Cover source={item.photo} />
                    <Card.Title
                      title={item.title}
                      subtitle={item.name}
                      left={(props) => (
                        <Avatar.Image
                          {...props}
                          size={40}
                          source={item.photo}
                        />
                      )}
                    />
                    <Card.Content>
                      <Text style={styles.cardContentText}>
                        Age: {item.age}
                      </Text>
                      <Text style={styles.cardContentText}>
                        Gender: {item.gender}
                      </Text>
                      <Text style={styles.cardContentText}>
                        Location: {item.location}
                      </Text>
                    </Card.Content>
                    <Card.Actions>
                      <Button color="#447ECB" onPress={() => {}}>
                        More info
                      </Button>
                    </Card.Actions>
                  </Card>
                )}
                keyExtractor={(item, index) => index.toString()}
                data={
                  this.state.filteredData &&
                  this.state.filteredData.length > 0
                    ? this.state.filteredData
                    : this.state.data
                }
                /> :
          <View style={styles.container}>
          {this.state.searchText == ''? 
          <View style={styles.container}>
          <View style={styles.categories}>
            <TouchableOpacity style={styles.iconShadow}
              onPress={() => this.props.navigation.replace("shepherdList")}
            >
              <View style={styles.iconContainer}>
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FGermanShepherd.jpg?alt=media&token=83976d43-8ecb-44d9-83cf-280d3eba290d",
                  }}
                />
                <Text style= {styles.iconText}>German Shepherd</Text>

              </View>
            </TouchableOpacity>
            <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconShadow}>
            <View style={styles.iconContainer}>

                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FMaltese.jpg?alt=media&token=80dd5f30-f73b-4faf-8361-8f744bd7c97d",
                  }}
                />
                <Text style= {styles.iconText}>Maltese</Text>
                </View>

              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.categories}>
          <TouchableOpacity style={styles.iconShadow}>
              <View style={styles.iconContainer}>
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FCavoodle.jpg?alt=media&token=b5e332b5-796b-4397-978a-746892b36645",
                  }}
                />
                <Text style= {styles.iconText}>Cavoodle</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconShadow}>
            <View style={styles.iconContainer}>

                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FSamoyed.jpg?alt=media&token=361103d9-2478-4577-a114-a4c5841eccd2",
                  }}
                />
                <Text style= {styles.iconText}>Samoyed</Text>
                </View>

              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.categories}>
          <TouchableOpacity style={styles.iconShadow}>
              <View style={styles.iconContainer}>
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FGoldenRetriever.jpg?alt=media&token=520b3637-9b17-4d8b-93e3-747e0a46ee49",
                  }}
                />
                <Text style= {styles.iconText}>Golden Retriever</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconShadow}>
            <View style={styles.iconContainer}>

                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FPomeranian.jpg?alt=media&token=7ff9a11a-11f8-49f1-aa56-5da7ed2b0082",
                  }}
                />
                <Text style= {styles.iconText}>Pomeranian</Text>
                </View>

              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.categories}>
          <TouchableOpacity style={styles.iconShadow}>
              <View style={styles.iconContainer}>
                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FRottweiler.jpg?alt=media&token=d3d468ff-08d2-40e3-b13d-6e6a1e0a85e1",
                  }}
                />
                <Text style= {styles.iconText}>Rottweiler</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconShadow}>
            <View style={styles.iconContainer}>

                <Image
                  style={styles.icon}
                  source={{
                    uri:
                      "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fpet%20buy%20icons%2FCorgi.jpg?alt=media&token=e189582b-f588-4067-8a75-ce2daf84eae1",
                  }}
                />
                <Text style= {styles.iconText}>Corgi</Text>

              </View>

              </TouchableOpacity>
            </View>
          </View>
          </View>
          :
        <View style={styles.container}>
          {this.state.filteredData.length == 0 ? 
                      <View style={styles.container}>
                        <Text style={{margin: 100}}>No results found.</Text>
                      </View>
                      :
          <FlatList
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card elevation={5} style={styles.card}>
            <Card.Cover source={item.photo} />
            <Card.Title
              title={item.title}
              subtitle={item.name}
              left={(props) => (
                <Avatar.Image {...props} size={40} source={item.photo} />
              )}
            />
            <Card.Content>
              <Text style={styles.cardContentText}>Age: {item.age}</Text>
              <Text style={styles.cardContentText}>
                Gender: {item.gender}
              </Text>
              <Text style={styles.cardContentText}>
                Location: {item.location}
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button color="#447ECB" onPress={() => {}}>
                More info
              </Button>
            </Card.Actions>
          </Card>
        )}
        keyExtractor={(item, index) => index.toString()}
        data={
          this.state.filteredData && this.state.filteredData.length > 0
            ? this.state.filteredData
            : this.state.data
        }
      />      
    }
    </View>
  }
  </View>
}

          </View>
        </ScrollView>
        </Provider>

      );
      // } else {
    //   return <AppLoading />;
    // }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buySellContainer: {
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  categories: {
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  iconContainer: {
    padding: 10,
  },
  icon: {
    height: 150,
    width: 150,
    borderRadius: 10,
  },
  iconShadow: {
    // borderRadius: 10,
    // backgroundColor: '#FFFFFF',
    // shadowColor: 'rgba(0, 0, 0, 0.1)',
    // shadowOpacity: 0.6,
    // elevation: 5,
    // shadowRadius: 10 ,
    // shadowOffset : { width: 1, height: 13},
  },
  iconText: {
    paddingTop: 5,
    textAlign: 'center',
    color: '#447ECB'
  },
  viewApplication: {
    backgroundColor: "#447ECB",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 200,
    borderRadius: 5,

  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 25,
  },
  cardContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  card: {
    margin: 5,
    width: 340,
  },
  cardContentText: {
    fontWeight: "bold",
  },
  activityContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
