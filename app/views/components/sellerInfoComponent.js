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

export const sellerDetails = (item) => {
    const screenWidth = Math.round(Dimensions.get('window').width);
    const textWidth = (screenWidth - 20) / 2;
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <View style={{ width: screenWidth / 2 }}>
                    <Text style={styles.fontTitle}> {item.name}'s Profile </Text>
                </View>
            </View>

            <Card containerStyle={styles.cardContainer}>
                <Text style={styles.fontHeading}> Personal Information </Text>
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
                                uri: item.photo,
                            }}
                        />
                        <Text style={{ textAlign: "center", paddingTop: 5 }}>
                            <Text style={{ fontWeight: "bold" }}>Name:</Text>{" "}
                            <Text>{item.name}</Text>
                        </Text>
                        <Text style={{ textAlign: "center", paddingTop: 5 }}>
                            <Text style={{ fontWeight: "bold" }}>Dob:</Text>{" "}
                            <Text>{item.dob}</Text>
                        </Text>
                    </View>
                    <View style={{ paddingLeft: 15, width: textWidth }}>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Email:</Text>{" "}
                            <Text>{item.email}</Text>
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Location:</Text>{" "}
                            <Text style={{numberofLines: 3}}>{item.location}</Text>
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Info:</Text>{" "}
                            <Text style={{numberofLines: 3}}>{item.info}</Text>
                        </Text>
                    </View>
                </View>
            </Card>

            
        </View>
    );
}

// export const sellerInfo = () => {
//     return (
//         <Card containerStyle={styles.cardContainer}>
//             <View>
//                 <Text style={styles.fontHeading}>Seller Information </Text>
//                 <View style={styles.line} />
//                 <Text></Text>
//             </View>
//         </Card>
//     );
// }

// export const expressInterest = (item, navigation) => {
//     return (
//         <View style={styles.buttonsContainer}>
//             <TouchableOpacity
//                 style={styles.buttons}
//                 onPress={() => navigation.navigate("buyApplication", { item })}>

//                 <Text style={styles.buttonsText}>EXPRESS INTEREST</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }