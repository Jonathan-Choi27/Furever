import * as React from "react";
import { StyleSheet, View, Image } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Text,
} from "react-native-paper";

// const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
// https://picsum.photos/700

const SelfPetListing = () => (
  <View style={styles.cardContainer}>
    <Card elevation={5} styles={styles.card}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            flex: 2,
            // aspectRatio: 1,
            paddingLeft: 10,
            paddingBottom: 10,
            paddingTop: 10,
            justifyContent: "center",
            // alignItems: "center",
            // aspectRatio: 1,
            // borderWidth: 1,
            // borderColor: "red"
          }}>
          <Image
            source={{ uri: "https://picsum.photos/700" }}
            style={{ aspectRatio: 1, borderRadius: 5 }}
          />
        </View>
        <View
          style={{
            flex: 3,
            paddingTop: 10,
            paddingBottom: 10,
            paddingRight: 10,
          }}>
          <Card.Content>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Name: </Text>
              <Text>Placeholder</Text>
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Catagory: </Text>
              <Text>Placeholder</Text>
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Breed: </Text>
              <Text>Placeholder</Text>
            </Text>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Colour: </Text>
              <Text>Placeholder</Text>
            </Text>
          </Card.Content>

          <View style={{ marginLeft: 10 }}>
            <Card.Actions style={styles.actionCard}>
              <Button style={styles.smallButtons}>
                <Text style={styles.smallButtonText}>View</Text>
              </Button>
              <Button style={styles.smallButtons}>
                <Text style={styles.smallButtonText}>Update</Text>
              </Button>
              <Button style={styles.smallButtons}>
                <Text style={styles.smallButtonText}>Delete</Text>
              </Button>
            </Card.Actions>

            {/* <Card.Actions style={styles.actionCard}> */}
            {/* <View style={{color: "blue"}}> */}
            <Card.Actions style={styles.actionCard}>
              <Button style={styles.bigButton}>
                <Text style={styles.bigButtonText}>View Offers</Text>
              </Button>
            </Card.Actions>
            {/* </View> */}
          </View>
        </View>
      </View>
    </Card>
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    marginTop: 10
    // flexDirection: "row"
  },
  card: {
    //   margin: 5,
    // flexDirection: "row",
  },
  smallButtons: {
    flex: 1,
    borderColor: "#447ECB",
    borderWidth: 1,
    marginLeft: 1.5,
    marginRight: 1.5,
    marginTop: 5,
    height: 25,
    // alignItems: "center",
    justifyContent: "center"
  },
  bigButton: {
    flex: 1,
    backgroundColor: "#447ECB",
    // borderColor: "#447ECB",
    // borderWidth: 1,
    marginLeft: 1.5,
    marginRight: 1.5,
    marginTop: 5,
    height: 25,
    justifyContent: "center"
  },
  smallButtonText: {
    fontSize: 8,
    color: "#447ECB",
    fontWeight: "bold",
  },
  bigButtonText: {
    fontSize: 8,
    color: "white",
    fontWeight: "bold",
  },
  actionCard: {
    // borderColor: "blue",
    // borderWidth: 1,
    margin: 0,
    padding: 0,
  },
});
export default SelfPetListing;
