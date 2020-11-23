import React from "react";
import "react-navigation";
import "react-navigation-props-mapper";
import "@react-navigation/native";
import "react-navigation-hooks";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  BackHandler,
} from "react-native";
import {
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { Card } from "react-native-elements";
import globalStyles, {
  screenWidth,
  primaryColour1,
} from "../styleSheet/styleSheet";

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectAll: false,
      cartItemsIsLoading: false,
      cartItems: this.props.route.params.items,
      totalPrice: "",
    };
  }

  //Handle back button
  async componentDidMount() {
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

  //Delete Handler
  deleteHandler = (index) => {
    var id = this.state.cartItems[index].itemId;
    Alert.alert(
      "Are you sure you want to delete this item from your cart?",
      "",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            let updatedCart = this.state.cartItems; /* Clone it first */
            updatedCart.splice(
              index,
              1
            ); /* Remove item from the cloned cart state */
            this.setState(updatedCart); /* Update the state */
          },
        },
      ],
      { cancelable: false }
    );
  };

  quantityHandler = (action, index) => {
    const newItems = [...this.state.cartItems]; //Clone the array

    let currentQty = newItems[index]["qty"];

    if (action == "more") {
      newItems[index]["qty"] = currentQty + 1;
    } else if (action == "less") {
      newItems[index]["qty"] = currentQty > 1 ? currentQty - 1 : 1;
    }

    this.setState({ cartItems: newItems }); //Set new state
  };

  calculateTotalPrice = () => {
    const { cartItems } = this.state;
    if (cartItems) {
      const total = cartItems.reduce(
        (sum, item) => sum + item.qty * item.price,
        0
      );
      return total;
    }
    return 0;
  };

  render() {
    const styles = StyleSheet.create({
      centerElement: { justifyContent: "center", alignItems: "center" },
    });

    const { cartItems, cartItemsIsLoading, selectAll } = this.state;

    return (
      <View style={[globalStyles.container, { marginTop: 10 }]}>
        <View style={[globalStyles.pageTitleContainer, { paddingBottom: 0 }]}>
          <Text style={globalStyles.pageTitle}>Shopping Cart</Text>
        </View>

        <View>
          {this.state.cartItems.length === 0 ? (
            <Text style={{ paddingTop: 30, fontSize: 15, textAlign: "center" }}>
              Your cart is currently empty
            </Text>
          ) : null}
        </View>

        {cartItemsIsLoading ? (
          <View style={[styles.centerElement, { height: 300 }]}>
            <ActivityIndicator size="large" color="#ef5739" />
          </View>
        ) : (
          <ScrollView contentContainerStyle={{ alignItems: "center" }}>
            {cartItems &&
              cartItems.map((item, i) => (
                <Card
                  elevation={5}
                  containerStyle={{ borderRadius: 10, width: screenWidth - 40 }}
                >
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      backgroundColor: "#fff",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        source={{ uri: item.photo }}
                        style={[
                          styles.centerElement,
                          { height: 100, width: 100, marginRight: 12 },
                        ]}
                      />
                      <View
                        style={{
                          flexGrow: 1,
                          flexShrink: 1,
                          alignSelf: "center",
                        }}
                      >
                        <Text
                          numberOfLines={1}
                          style={{ fontSize: 15, paddingBottom: 10 }}
                        >
                          {item.accessoryName}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{ color: "#333333", marginBottom: 10 }}
                        >
                          ${item.price}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                          <TouchableOpacity
                            onPress={() => this.quantityHandler("less", i)}
                            style={{ borderWidth: 1, borderColor: "#8c8c8c" }}
                          >
                            <MaterialIcons
                              name="remove"
                              size={22}
                              color="#8c8c8c"
                            />
                          </TouchableOpacity>
                          <Text
                            style={{
                              borderTopWidth: 1,
                              borderBottomWidth: 1,
                              borderColor: "#8c8c8c",
                              paddingHorizontal: 7,
                              paddingTop: 3,
                              color: "#8c8c8c",
                              fontSize: 13,
                            }}
                          >
                            {item.qty}
                          </Text>
                          <TouchableOpacity
                            onPress={() => this.quantityHandler("more", i)}
                            style={{ borderWidth: 1, borderColor: "#8c8c8c" }}
                          >
                            <MaterialIcons
                              name="add"
                              size={22}
                              color="#8c8c8c"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <View style={styles.centerElement}>
                      <TouchableOpacity
                        style={[
                          styles.centerElement,
                          { width: 32, height: 32 },
                        ]}
                        onPress={() => this.deleteHandler(i)}
                      >
                        <Ionicons name="md-trash" size={25} color="#ee4d2d" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Card>
              ))}
          </ScrollView>
        )}

        {!cartItemsIsLoading && (
          <View
            style={{
              backgroundColor: "#fff",
              borderTopWidth: 2,
              borderColor: "#f6f6f6",
              paddingVertical: 5,
              width: screenWidth,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#525252", fontSize: 15 }}>
                Total Price:{" "}
              </Text>
              <Text style={{ fontSize: 15 }}>
                ${this.calculateTotalPrice().toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                height: 32,
                paddingRight: 20,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={[
                  styles.centerElement,
                  {
                    backgroundColor: primaryColour1,
                    width: 100,
                    height: 25,
                    borderRadius: 5,
                  },
                ]}
                onPress={() =>
                  this.props.navigation.navigate("CheckoutSummary", {
                    cartItems: this.state.cartItems,
                    price: this.calculateTotalPrice(),
                  })
                }
              >
                <Text style={{ color: "white" }}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}
