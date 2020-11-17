import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

export const screenWidth = Math.round(Dimensions.get("window").width);
const textWidth = (screenWidth - 20) / 2;

// export const primaryColour1 = "#53A687";
export const primaryColour2 = "#FF9680";
export const primaryColour1 = "#FF5733";
export const pageBackgroundColour = "#f7f8fa";

export default StyleSheet.create({
  // Landing Page
  landingContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    top: 190,
  },
  logo: {
    width: 300,
    height: 150,
    marginBottom: 30,
  },
  landingTitle: {
    marginTop: 10,
    textAlign: "center",
  },
  landingButtonsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  landingButtons: {
    backgroundColor: primaryColour2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 210,
    marginTop: 10,
    height: 40,
  },
  landingButtonsText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  textInput: {
    color: "white",
  },
  linkText: {
    fontWeight: "bold",
    color: primaryColour2,
  },

  // Login Page
  loginLogoContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: 110,
    flex: 1,
  },
  loginLogo: {
    width: 300,
    height: 150,
    marginBottom: 30,
  },
  loginInputContainer: {
    width: 325,
  },
  loginButtonsContainer: {
    alignItems: "center",
    flexGrow: 1,
  },
  loginTitle: {
    marginTop: 12,
    textAlign: "center",
    color: "black",
    padding: 10,
    fontSize: 15,
  },
  loginTitle2: {
    marginTop: 10,
    textAlign: "center",
    color: "black",
  },

  // Signup
  signupContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: 15,
    flex: 1,
  },
  signupInputContainer: {
    width: 325,
  },
  signupInput: {
    marginBottom: 0,
    marginTop: 0,
    padding: 0,
  },
  logo2: {
    width: 300,
    height: 150,
    marginBottom: 20,
  },

  // Home Card
  homeCardImage: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  homeCardTitle: {
    paddingRight: 8,
    paddingLeft: 8,
    paddingTop: 5,
    paddingBottom: 3,
    fontWeight: "bold",
    fontSize: 14.5,
    color: "black",
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: 120,
  },
  homeCardSubtitle: {
    paddingRight: 8,
    paddingLeft: 8,
    paddingBottom: 10,
    fontSize: 10,
    color: "#878787",
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: 120,
  },
  homeCard: {
    padding: 5,
  },

  // Pet Profile Pages
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: pageBackgroundColour,
  },
  cardContentContainer: {
    borderRadius: 10,
    width: screenWidth - 20,
  },
  cardContainer: {
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    width: screenWidth - 50,
  },
  cardHeading: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#484848",
    marginBottom: 10,
  },
  contentTextBold: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 20,
  },
  contentText: {
    fontSize: 15,
    lineHeight: 20,
  },

  // Express Interest Component
  buttonsContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 5,
  },
  buttons: {
    backgroundColor: primaryColour1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 40,
  },
  buttonsText: {
    color: "#ffffff",
    fontSize: 18,
    padding: 15,
    fontWeight: "bold",
  },
  buttonsError: {
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 40,
  },

  // Form container
  formContainer: {
    marginHorizontal: screenWidth * 0.08,
  },

  // Search bar
  searchFilterContainer: {
    height: 20,
    margin: 20,
    paddingTop: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "row",
  },
  searchBar: {
    marginRight: 10,
    height: 35,
    width: screenWidth - 125,
  },
  searchBarSingle: {
    margin: 10,
    height: 35,
    width: screenWidth - 20,
  },
  error: {
    color: "red",
    fontSize: 2,
  },
  // form
  formPickerIconContainer: {
    justifyContent: "center",
    flex: 0.1,
  },
  formPickerInnerContainer: {
    flex: 0.9,
  },
  formPickerOuterContainer: {
    borderBottomColor: "#D3D3D3",
    borderBottomWidth: 2,
    flexDirection: "row",
  },
  // Pet Categories and Breeds
  petContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: pageBackgroundColour,
  },
  viewApplication: {
    backgroundColor: primaryColour1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 295,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 16,
  },
  petCard: {
    margin: 5,
    width: 340,
  },
  iconContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 10,
  },
  icon: {
    height: 100,
    width: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  breedContainer: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 12,
    paddingBottom: 5,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  categoryIconContainer: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
  },
  breedIconContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  breedIcon: {
    height: 130,
    width: 140,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  iconText: {
    paddingTop: 1,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
  },
  activityContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // Profile Page
  profileContainer: {
    backgroundColor: primaryColour2,
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    marginBottom: 20,
    transform: [{ scaleX: 2 }],
    overflow: "hidden",
  },
  dogBackground: {
    opacity: 0.1,
    position: "absolute",
  },
  dogImage: {
    left: 140,
    width: 750 / 1.7,
    height: 610 / 1.7,
  },
  divider: {
    backgroundColor: "#b0b0b0",
  },
  avatarContainer: {
    marginTop: 50,
    marginBottom: 50,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    transform: [{ scaleX: 0.5 }],
  },
  listStyle: {
    paddingLeft: 25,
  },
  nameEmailContainer: {
    marginTop: 15,
    alignItems: "center",
    marginHorizontal: 60,
    justifyContent: "center",
  },
  shortLine: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  profileName: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
  },
  emailStyle: {
    // color: "white",
    fontSize: 17,
    marginTop: 10,
  },

  // Breed List
  pageTitleContainer: {
    flexDirection: "row",
    padding: 7,
    justifyContent: "space-between",
    width: screenWidth - 20,
    alignItems: "center",
  },
  pageTitle: {
    fontWeight: "bold",
    fontSize: 23,
  },

  // Breed Information

  //Pet Buy Card
  petBuyCard: {
    marginBottom: 10,
    width: screenWidth - 20,
  },
  petBuyCardSellerContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    position: "absolute",
    padding: 13,
  },
  petBuyCardActionCard: {
    margin: 0,
    padding: 0,
  },
  petBuyCardBigButtonText: {
    fontSize: 12,
    color: "white",
  },
  petBuyCardBigButton: {
    flex: 1,
    backgroundColor: primaryColour1,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    height: 30,
    justifyContent: "center",
  },
  petBuyCardSellerImage: {
    height: 35,
    width: 35,
    borderRadius: 35 / 2,
  },
  petBuyCardTextContainer: {
    flexDirection: "row",
    padding: 10,
  },
  petBuyCardImageContainer: {
    width: 140,
    height: 140,
  },
  petBuyCardImageStatusContainer: {
    width: 130,
    height: 150,
  },
  petBuyCardImage: {
    aspectRatio: 1,
    borderRadius: 5,
  },
  petBuyCardContent: {
    flex: 3,
    justifyContent: "center",
  },
  petBuyCardNameContainer: {
    marginRight: 40,
  },

  //Current applications
  pageMargin: {
    width: screenWidth - 20,
    flex: 1,
  },
  scrollViewContentStyle: {
    flex: 1,
    alignItems: "center",
  },

  //Sell application
  sellAppContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 10,
    justifyContent: "center",
  },
  applicationHeading: {
    fontSize: 30,
    color: "#606060",
    fontWeight: "bold",
    paddingBottom: 5,
  },
  applicationInputName: {
    color: "#505050",
    fontWeight: "bold",
    fontSize: 16,
  },
  setColorRed: {
    color: "#f44336",
  },
  applicationErrorText: {
    color: "red",
    fontSize: 12,
    textAlign: "right",
  },
  applicationButtonsContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 30,
  },

  //Listing card
  smallButton: {
    flex: 1,
    borderColor: primaryColour1,
    borderWidth: 1,
    marginLeft: 1.5,
    marginRight: 1.5,
    marginTop: 5,
    height: 25,
    justifyContent: "center",
  },
  bigButton: {
    flex: 1,
    backgroundColor: primaryColour1,
    marginLeft: 1.5,
    marginRight: 1.5,
    marginTop: 5,
    height: 25,
    justifyContent: "center",
  },
  smallButtonText: {
    fontSize: 8,
    color: "black",
  },
  bigButtonText: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
  },

  // cart icon and sell accessories button
  cartContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // FAQ
  faqHeader: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  faqContainer: {
    marginTop: 10
  }
});
