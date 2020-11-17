import * as React from "react";
import { View, Text, BackHandler, TouchableOpacity } from "react-native";
import { CustomInput } from "../components/customInput";
import { Icon, Rating } from "react-native-elements";
import { Card } from "react-native-elements";
import { auth } from "../database/firebase";
import { db } from "../database/firebase";
import * as firebase from "firebase";

import globalStyles, {
  primaryColour1,
  primaryColour2,
} from "../styleSheet/styleSheet";

export default class revieApplication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      review: "",
      rating: 3,
    };
  }

  // Handle Back button
  componentDidMount() {
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

  handleSubmit = () => {
    const user = auth.currentUser;

    db.collection("users").doc(user.uid).collection("reviewList").add({
      review: this.state.review,
      rating: this.state.rating,
      reviewer: db.collection("users").doc(user.uid),
      timestamp: firebase.firestore.Timestamp.now(),
    });

    db.collection("users").doc(user.uid).get().then((doc) => {
        // var averageReview = doc.data().averageReview;
        var averageRating = doc.data().averageRating;
        averageRating.push(this.state.rating);

        db.collection("users").doc(user.uid).update({
            averageRating: averageRating
        })

    })
  };

  //   ratingCompleted = (rating) => {
  //     console.log("state Rating is: " + this.state.rating);
  //       this.setState({
  //           rating: rating
  //       })
  //     // console.log("Rating is: " + rating);
  //   }

  render() {
    const seller = this.props.route.params.seller;
    return (
      <View style={{justifyContent: "center", flex:1}}>
        <Card containerStyle={{ borderRadius: 10 }}>
          <CustomInput
            label="Write a review"
            placeholder="Please fill in this field"
            onChangeText={(review) => this.setState({ review })}
            multiline={true}
            leftIcon={
              <Icon
                name="ios-paper"
                type="ionicon"
                color={primaryColour1}
                containerStyle={{ paddingLeft: 7, paddingRight: 10 }}
              />
            }
          />

          <Rating
            showRating
            onFinishRating={(rating) => this.setState({ rating })}
            tintColor="white"
            defaultRating="3"
            ratingColor={primaryColour1}
            ratingBackgroundColor="#EFEFEF"
            type="custom"
            style={{ paddingVertical: 10, color: "red" }}
          />

          <View style={globalStyles.applicationButtonsContainer}>
            <TouchableOpacity
              title={"submit"}
              style={globalStyles.buttons}
              onPress={this.handleSubmit}>
              <Text style={globalStyles.buttonsText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
  }
}
