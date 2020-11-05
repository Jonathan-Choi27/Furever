import React from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
} from "react-native";
import {
    Card,
    Button,
} from "react-native-elements";
import styles from "../styleSheet/styleSheet";
import { sendEmail } from '../petTab/sell/sendEmail';
import { db } from "../database/firebase";

export const buyerInfo = (item) => {
    const screenWidth = Math.round(Dimensions.get('window').width);
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
                        style={{ fontWeight: "bold", fontSize: 30, color: "black", paddingLeft: 20 }}>
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
                    <View style={{paddingLeft: 5}}>
                        <Text numberOfLines={1} style={styles.contentText}>{item.name}</Text>
                        <Text numberOfLines={1} style={styles.contentText}>{item.contact_number}</Text>
                        <Text numberOfLines={1} style={styles.contentText}>{item.email}</Text>
                        <Text style={styles.contentText}>{item.address}</Text>
                    </View>
                </View>
            </Card>

            <Card containerStyle={styles.cardContentContainer}>
                <Text style={styles.cardHeading}>Pet Information</Text>
                <View style={{ paddingBottom: 20 }}>
                    <Text style={styles.contentTextBold}>Why do you want this pet?</Text>
                    <Text numberOfLines={1} style={styles.contentText}>{item.why_want_pet}</Text>
                </View>

                <View style={{ paddingBottom: 20 }}>
                    <Text style={styles.contentTextBold}>What characteristics are most desirable in a pet for you?</Text>
                    <Text numberOfLines={1} style={styles.contentText}>{item.most_desirable_traits}</Text>
                </View>

                <View style={{ paddingBottom: 20 }}>
                    <Text style={styles.contentTextBold}>What characteristics are least desirable in a pet for you?</Text>
                    <Text numberOfLines={1} style={styles.contentText}>{item.least_desirable_traits}</Text>
                </View>

                <View style={{ paddingBottom: 5 }}>
                    <Text style={styles.contentTextBold}>Name(s), breed(s), gender(s) and age(s) of current pets (if applicable)</Text>
                    <Text numberOfLines={1} style={styles.contentText}>{item.previous_pets}</Text>
                </View>
            </Card>

            <Card containerStyle={styles.cardContentContainer}>
                <Text style={styles.cardHeading}>Your Home Environment</Text>
                <View style={{ paddingBottom: 5 }}>
                    <Text style={styles.contentTextBold}>Description of your family/members of the household</Text>
                    <Text numberOfLines={1} style={styles.contentText}>{item.house_enviroment}</Text>
                </View>
            </Card>

        </View>
    )
}

export const acceptBuyer = (item, navigation) => {
    let body = 'Hi ' + item.name + ',' + `<br><br>` + 'Congratulations!' + `<br><br>` + 'Your application has been accepted. I will contact you shortly for further details about the next steps.' + `<br><br>` + 'Thank you.' + `<br><br>` + 'Kind Regards,' + `<br>` + item.sellerName;
    return (
        <View style={styles.buttonsContainer}>
            <TouchableOpacity
                style={styles.buttons}
                onPress={() => {
                    sendEmail(
                        item.email,
                        'Offer Accepted - ' + item.petName + " (" + item.petBreed + ", " + item.petCategory + ")",
                        body
                    );
                    // item.is_accepted = true;
                    console.log(item.pet_id);
                    console.log(item.doc_id);
                    db.collection("petListings").doc(item.pet_id).collection("buyer_applications").doc(item.doc_id).update({
                        is_accepted: true
                    });
                    console.log(item.is_accepted);
                }}
            >
                <Text style={styles.buttonsText}>Accept</Text>
            </TouchableOpacity>
        </View>
    );
}

// export const rejectBuyer = (item, navigation) => {
//     return (
//         <View style={styles.buttonsContainer}>
//             <TouchableOpacity
//                 style={styles.buttons}
//                 // onPress={() => navigation.navigate("buyApplication", { item })}
//             >

//                 <Text style={styles.buttonsText}>Reject</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }