import React from "react";
import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Card, Button } from "react-native-elements";
import styles from "../styleSheet/styleSheet";
import { sendEmail } from "../petTab/sell/sendEmail";
import { db } from "../database/firebase";
import { INSPECT_MAX_BYTES } from "buffer";

export const buyerInfo = (item) => {
  const screenWidth = Math.round(Dimensions.get("window").width);
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.cardContentContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{
              paddingLeft: 10,
              paddingBottom: 10,
              paddingTop: 10,
              paddingRight: 10,
              width: screenWidth / 4,
              height: screenWidth / 4,
              borderRadius: 10,
            }}
            source={{
              uri: item.buyerPhoto,
            }}
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 30,
              color: "black",
              paddingLeft: 20,
              flex: 1,
            }}
          >
            {item.name}'s Application
          </Text>
        </View>
      </Card>

      <Card containerStyle={styles.cardContentContainer}>
        <Text style={styles.cardHeading}>Personal Information</Text>
        <View style={[styles.cardContainer, { paddingBottom: 5 }]}>
          <View>
            <Text style={styles.contentTextBold}>Name: </Text>
            <Text style={styles.contentTextBold}>Contact: </Text>
            <Text style={styles.contentTextBold}>Email: </Text>
            <Text style={styles.contentTextBold}>Address: </Text>
          </View>
          <View style={{ paddingLeft: 5, flex: 1 }}>
            <Text numberOfLines={1} style={styles.contentText}>
              {item.name}
            </Text>
            <Text numberOfLines={1} style={styles.contentText}>
              {item.contact_number}
            </Text>
            <Text numberOfLines={1} style={styles.contentText}>
              {item.email}
            </Text>
            <Text style={styles.contentText}>{item.address}</Text>
          </View>
        </View>
      </Card>

      <Card containerStyle={styles.cardContentContainer}>
        <Text style={styles.cardHeading}>Pet Information</Text>
        <View style={{ paddingBottom: 20 }}>
          <Text style={styles.contentTextBold}>Why do you want this pet?</Text>
          <Text numberOfLines={1} style={styles.contentText}>
            {item.why_want_pet}
          </Text>
        </View>

        <View style={{ paddingBottom: 20 }}>
          <Text style={styles.contentTextBold}>
            What characteristics are most desirable in a pet for you?
          </Text>
          <Text numberOfLines={1} style={styles.contentText}>
            {item.most_desirable_traits}
          </Text>
        </View>

        <View style={{ paddingBottom: 20 }}>
          <Text style={styles.contentTextBold}>
            What characteristics are least desirable in a pet for you?
          </Text>
          <Text numberOfLines={1} style={styles.contentText}>
            {item.least_desirable_traits}
          </Text>
        </View>

        <View style={{ paddingBottom: 5 }}>
          <Text style={styles.contentTextBold}>
            Name(s), breed(s), gender(s) and age(s) of current pets (if
            applicable)
          </Text>
          <Text numberOfLines={1} style={styles.contentText}>
            {item.previous_pets}
          </Text>
        </View>
      </Card>

      <Card containerStyle={styles.cardContentContainer}>
        <Text style={styles.cardHeading}>Your Home Environment</Text>
        <View style={{ paddingBottom: 5 }}>
          <Text style={styles.contentTextBold}>
            Description of your family/members of the household
          </Text>
          <Text numberOfLines={1} style={styles.contentText}>
            {item.house_enviroment}
          </Text>
        </View>
      </Card>
    </View>
  );
};

export const acceptBuyer = (item, navigation) => {
  let body =
    "Hi " +
    item.name +
    "," +
    `<br><br>` +
    "Congratulations!" +
    `<br><br>` +
    "Your application has been accepted. I will contact you shortly for further details about the next steps." +
    `<br><br>` +
    "Thank you." +
    `<br><br>` +
    "Kind Regards," +
    `<br>` +
    item.sellerName;

  return (
    <View style={styles.buttonsContainer}>
      {item.is_accepted == false ? (
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            db.collection("petListings")
              .doc(item.pet_id)
              .collection("buyer_applications")
              .where("is_accepted", "==", true)
              .limit(1)
              .get()
              .then((querySnapshot) => {
                if (querySnapshot.empty == true) {
                  db.collection("petListings")
                    .doc(item.pet_id)
                    .collection("buyer_applications")
                    .doc(item.doc_id)
                    .update({
                      is_accepted: true,
                    });
                  Alert.alert(
                    "Success",
                    `You have successfully accepted ${item.name}'s pet application. Please proceed with your email to communicate with the applicant.`,
                    [
                      {
                        text: "OK",
                        onPress: () =>
                          sendEmail(
                            item.email,
                            "Offer Accepted - " +
                              item.petName +
                              " (" +
                              item.petBreed +
                              ", " +
                              item.petCategory +
                              ")",
                            body
                          ),
                      },
                    ],
                    { cancelable: false }
                  );
                  item.is_accepted = true;
                } else {
                  Alert.alert(
                    "Accept Denied",
                    "You have already accepted a buyer application for this pet, please reject the other pet application first."
                  );
                }
              });
          }}
        >
          <Text style={styles.buttonsText}>ACCEPT</Text>
        </TouchableOpacity>
      ) : item.is_accepted == true ? (
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => {
            sendEmail(
              item.email,
              "Offer Accepted - " +
                item.petName +
                " (" +
                item.petBreed +
                ", " +
                item.petCategory +
                ")",
              body
            );
          }}
        >
          <Text style={styles.buttonsText}>ACCEPTED APPLICATION</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export const rejectBuyer = (item, navigation) => {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={styles.buttonsError}
        onPress={() => {
          db.collection("petListings")
            .doc(item.pet_id)
            .collection("buyer_applications")
            .doc(item.doc_id)
            .delete();

          Alert.alert(
            "Offer Rejected",
            "You have declined this offer application, and the offer will now be removed."
          );
          navigation.navigate("offerApplications");
        }}
      >
        <Text style={styles.buttonsText}>REJECT</Text>
      </TouchableOpacity>
    </View>
  );
};
