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
    const textWidth = (screenWidth - 20) / 2;
    return (
        <View style={styles.container}>
            {/* <View style={styles.titleContainer}>
                <View style={{ width: screenWidth / 2 }}>
                    <Text style={styles.fontTitle}> {item.name}'s Application </Text>
                </View>
            </View> */}

            <Card containerStyle={styles.cardContainer}>
                <Text style={{fontSize: 20, fontWeight: 'bold', paddingBottom:20}}> Personal Information </Text>
                {/* <Text style={styles.fontHeading}> ------------------- </Text> */}
                <View style={styles.line} />
                <View style={styles.cardContentContainer}>
                    <View>
                        <Image
                            style={{paddingLeft: 10,
                                paddingBottom: 10,
                                paddingTop: 10,
                                paddingRight: 10,
                                width: 120,
                                height: 120,
                                borderRadius: 120/2}}
                            source={{
                                uri: item.buyerPhoto,
                            }}
                        />
                        <Text style={{paddingTop: 10, paddingLeft: 15, width: textWidth }}>
                            <Text style={{ fontWeight: "bold" }}>Name:</Text>{" "}
                            <Text>{item.name}</Text>
                        </Text>
                        {/* <Text style={{ textAlign: "center", paddingTop: 5 }}>
                            <Text style={{ fontWeight: "bold" }}>Age:</Text>{" "}
                            <Text>{item.age}</Text>
                        </Text> */}
                    </View>
                    <View style={{ paddingLeft: 15, width: textWidth, numberofLines: 3 }}>

                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Contact:</Text>{" "}
                            <Text>{item.contact_number}</Text>
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Email:</Text>{" "}
                            <Text>{item.email}</Text>
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Address:</Text>{" "}
                            <Text>{item.address}</Text>
                        </Text>
                    </View>
                </View>
            </Card>

            <Card containerStyle={styles.cardContainer}>
                <Text style={{fontSize: 20, fontWeight: 'bold', paddingBottom:20}}>
                    {item.category} Experience
                </Text>
                <Text style={{textAlign: "left", fontSize: 16, fontWeight: "bold", paddingBottom:5}}>Why do you want this pet? </Text>
                <View style={styles.line} />
                <Text style={{ paddingBottom: 15 }}>{item.why_want_pet}</Text>
                <Text style={{textAlign: "left", fontSize: 16, fontWeight: "bold", paddingBottom:5}}>What characteristics are most desirable in a pet for you? </Text>
                <View style={styles.line} />
                {/* <View style={styles.line} /> */}
                <Text style={{ paddingBottom: 15 }}>{item.most_desirable_traits}</Text>
                <Text style={{textAlign: "left", fontSize: 16, fontWeight: "bold", paddingBottom:5}}>What characteristics are least desirable in a pet for you? </Text>
                <View style={styles.line} />
                <Text style={{ paddingBottom: 10 }}>{item.least_desirable_traits}</Text>
            </Card>
            <Card containerStyle={styles.cardContainer}>
                <Text style={{fontSize: 20, fontWeight: 'bold', paddingBottom:20}}>Your Pet Experience </Text>
                <Text style={{textAlign: "left", fontSize: 16, fontWeight: "bold", paddingBottom:5}}
                    >Name(s), breed(s), gender(s), and age(s) of current pets (if applicable): 
                </Text>
                <View style={styles.line} />
                <Text style={{ paddingBottom: 10 }}>{item.previous_pets}</Text>
                
            </Card>
            <Card containerStyle={styles.cardContainer}>
                <Text style={{fontSize: 20, fontWeight: 'bold', paddingBottom:20}}>Your Home Environment: </Text>
                <View style={styles.line} />
                <Text style={{ paddingBottom: 10 }}>{item.house_enviroment}</Text>
            </Card>
            
        </View>
    );
}



export const acceptBuyer = (item, navigation) => {
    return (
        <View style={styles.buttonsContainer}>
            <TouchableOpacity
                style={styles.buttons}
                onPress={() => { sendEmail(
                    item.email,
                    'Offer Accepted',
                    'Hi, your application has been accepted by the seller. The seller will contact you as soon as possible.\n\n Thank you.\n\n Regards,\n The Furever Team.'
                ); 
                    // item.is_accepted = true;
                    console.log(item.pet_id);
                    console.log(item.doc_id);
                    db.collection("pet_listings").doc(item.pet_id).collection("buyer_applications").doc(item.doc_id).update({
                        is_accepted: true
                    });
                    console.log(item.is_accepted);
                }
            
                }

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