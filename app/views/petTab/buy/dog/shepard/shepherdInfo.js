import React from "react";
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
} from "react-native";
import {
    Card,
} from "react-native-elements"
import {
    Searchbar,
} from "react-native-paper";
import "react-navigation"
import "react-navigation-props-mapper"
import "@react-navigation/native"
import 'react-navigation-hooks'
import {onBuyTab} from "../../../../components/petTabComponents"

export default class shepherdInfo extends React.Component {

    state = {
        filteredData: [],
        searchText: "",
        visible: false,
    };

    searchFunction = (searchText) => {
        this.setState({ searchText: searchText });
    
        let filteredData = this.state.data.filter(function (item) {
          return item.title.includes(searchText);
        });
    
        this.setState({ filteredData: filteredData });
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    {onBuyTab(this.props.navigation)}

                    <View style={styles.titleContainer}>
                        <Text style={styles.fontTitle}>German Shepherd</Text>
                    </View>
                    
                    <Card containerStyle={styles.cardContainer}>
                        <Card.Image style={styles.imageContainer} source={{uri: "https://firebasestorage.googleapis.com/v0/b/pet-search-soft3888.appspot.com/o/images%2Fgerman-shepard.jpg?alt=media&token=5c2b32b6-572e-48d4-9e1a-e1a3612bb7b8"}}/>
                    </Card>
                    <Card containerStyle={styles.cardContainer}>
                        <View style={styles.boxContainer}>
                            <Text style={styles.fontHeading}>Description </Text>
                            <Text style={{paddingTop: 10}}>
                                The German Shepherd Dog (GSD) is one of America’s most popular dog breeds — 
                                for good reasons. They’re intelligent and capable working dogs. 
                                Their devotion and courage are unmatched. And they’re amazingly versatile.
                            </Text> 
                            <Text style={{paddingTop: 10}}>
                                The breed also goes by the name Alsatian. Despite their purebred status, 
                                you may find German Shepherds in shelters and breed specific rescues. 
                                So remember to adopt! Don’t shop if this is the breed for you. 
                            </Text>
                            <Text style={{paddingTop: 10}}>
                                GSDs excel at most anything they’re trained to do: 
                                guide and assistance work for the handicapped, police and military service, 
                                herding, search and rescue, drug detection, competitive obedience, and — 
                                last but not least — faithful companion. 
                            </Text>
                            <Text style={{paddingTop: 10}}>
                                See below for all dog breed traits and facts about German Shepherds!
                            </Text>
                            <Text style={{paddingTop: 10}}>
                                <Text style={{fontWeight: "bold"}}>Size: </Text>
                                <Text>
                                    Males stand 24 to 26 inches; females stand 22 to 24 inches. 
                                    Weight ranges from 75 to 95 pounds.
                                </Text>
                            </Text>
                            <Text style={{paddingTop: 10}}>
                                <Text style={{fontWeight: "bold"}}>Coat Length: </Text>
                                <Text>
                                    Some German Shepherds are longhaired. However, the "ideal" 
                                    German Shepherd has a double coat of medium length. 
                                    The outer coat is dense with straight hair that lies close to the body, 
                                    and is sometimes wavy and wiry.
                                </Text>
                            </Text>
                            <Text style={{paddingTop: 10}}>
                                <Text style={{fontWeight: "bold"}}>Weigth/Height Range: </Text>
                                <Text>
                                    75-95 pounds and 1 foot, 10 inches to 2 feet, 2 inches tall at the shoulder
                                </Text>
                            </Text>
                            <Text style={{paddingTop: 10}}>
                                <Text style={{fontWeight: "bold"}}>Ailments: </Text>
                                <Text>
                                    Bloat, due to his size and deep chest,Hip dysplasia, Arthritis, 
                                    Degenerative myelopathy, Exocrine pancreatic insufficiency
                                </Text>
                            </Text>
                        </View>
                    </Card>

                    <Card containerStyle={styles.cardContainer}>
                        <Text style={styles.fontHeading}>Feeding </Text>
                        <Text style={{paddingTop: 10}}>
                            A German Shepherd Dog diet should be formulated for a large-sized breed with high energy 
                            and exercise needs. You should consult your veterinarian or professional nutritionist for 
                            advice on what to feed your German Shepherd Dog and the correct portion sizes. 
                            Their dietary needs will change as they grow from puppyhood to adulthood and senior age. 
                            Stay on top of these nutritional requirements.
                        </Text>
                    </Card>

                    <Card containerStyle={styles.cardContainer}>
                        <Text style={styles.fontHeading}>Personality </Text>
                        <Text style={{paddingTop: 10}}>
                            The German Shepherd personality is aloof but not usually aggressive. They're reserved dogs; 
                            they don't make friends immediately, but once they do, they're extremely loyal. With their family, 
                            they're easy-going and approachable, but when threatened, they can be strong and protective, 
                            making them excellent watchdogs.
                        </Text>
                        <Text style={{paddingTop: 10}}>
                            This highly intelligent and trainable breed thrives on having a job to do—any job. 
                            The German Shepherd can be trained to do almost anything, from alerting a deaf person to a doorbell 
                            ring to sniffing out an avalanche victim.
                        </Text>
                        <Text style={{paddingTop: 10}}>
                            One thing they're not good at is being alone for long periods of time. Without the companionship they 
                            need—as well as exercise and the chance to put their intelligence to work—they become bored and frustrated. 
                            A German Shepherd who's under-exercised and ignored by their family is likely to express pent-up energy in 
                            ways you don't like, such as barking and chewing.
                        </Text>
                        <Text style={{paddingTop: 10}}>
                            Like every dog, the German Shepherd needs early socialization—exposure to many different people, sights, 
                            sounds, and experiences—when they're young. Socialization helps ensure that your German Shepherd puppy 
                            grows up to be a well-rounded dog.
                        </Text>
                    </Card>

                    <Card containerStyle={styles.cardContainer}>
                        <Text style={styles.fontHeading}>Care </Text>
                        <Text style={{paddingTop: 10}}>
                            Originally bred to herd flocks all day, German Shepherds are built for action. This means they've got 
                            lots of energy that they need to burn off with daily exercise.
                        </Text>
                        <Text style={{paddingTop: 10}}>
                            If you leave them alone for long periods of time without exercise, expect trouble. Boredom and inactivity 
                            lead to behavior problems—chewing, digging, and barking. The German Shepherd desperately needs to exercise 
                            both their body (jogging, a romp at the dog park) and their mind (training exercises like agility or obedience competitions).
                        </Text>
                        <Text style={{paddingTop: 10}}>
                            Like many herding breeds, German Shepherds are barkers. Barking isn't necessarily a problem, 
                            but it can be if the dog is bored. Learning the "Quiet" command should be part of every German Shepherd's obedience training.
                        </Text>
                        <Text style={{paddingTop: 10}}>
                            German Shepherds like to chew, and their powerful jaws can destroy most materials. If they pick the wrong 
                            thing to gnaw on, they can damage their teeth, swallow something that makes them sick, or even choke. 
                            Save your dog, and your belongings, by giving them safe chew toys and bones so they can entertain 
                            themselves when you're not playing with them.
                        </Text>
                    </Card>

                    <Card containerStyle={styles.cardContainer}>
                        <Text style={styles.fontHeading}>Grooming </Text>
                        <Text style={{paddingTop: 10}}>
                            Sometimes jokingly called "German shedders," the breed sheds year-round, and generally "blows"—sheds a lot of hair at once, 
                            like a snowstorm—twice a year. If you want a German Shepherd, be prepared for hair on your black pants, on your white couch, 
                            and pretty much all over the house.
                        </Text>
                        <Text style={{paddingTop: 10}}>
                            There's no magic solution to shedding, and we just have to accept it. However, brushing two to three times a week will help 
                            more of the hair come out in a brush, rather than on your furnishings. And a sturdy vacuum cleaner doesn't hurt either.
                        </Text>
                        <Text style={{paddingTop: 10}}>
                            Bathing the dog too often strips the coat of oils that keep it healthy, so start running the bathwater only if your dog 
                            really needs it. It shouldn't be that often; despite their notoriety as a shedder, the German Shepherd tends to be fairly 
                            clean and odorless.
                        </Text>
                        <Text style={{paddingTop: 10}}>
                            The nails need to be trimmed once a month, and the ears checked once a week for dirt, redness, or a bad odor that can 
                            indicate an infection, then wiped out weekly with a cotton ball dampened with gentle, pH-balanced ear cleaner to prevent problems.
                        </Text>
                        <Text style={{paddingTop: 10}}>
                            German Shepherds love to chew, and the habit helps keep their teeth clean. Give them sturdy, safe dental chew toys or bones, 
                            and they'll be fighting tartar buildup as they gnaw, especially on the back molars. Brushing their teeth with a soft toothbrush 
                            and doggy toothpaste also helps keep gums and teeth in good shape.
                        </Text>
                    </Card>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    searchBar: {
        height: 50,
        width: 350,
        margin: 10,
    },
    container: {
        flex: 1,
        alignItems: "center",
    },
    buySellContainer: {
        alignSelf: "stretch",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "row",
    },
    titleContainer: {
        alignSelf: "stretch",
        paddingTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
    },
    imageContainer: {
        width: Math.round(Dimensions.get('window').width) - 73,
        height: 200
    },
    fontTitle: {
        textAlign: "left",
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: 5,
    },
    fontHeading: {
        textAlign: "left",
        fontSize: 16,
        fontWeight: "bold",
    },
    cardContainer: {
        borderRadius: 4,
        alignSelf: "stretch",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        elevation: 5,
    },
    cardContentContainer: {
        borderRadius: 4,
        alignSelf: "stretch",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "row",
    },
});
