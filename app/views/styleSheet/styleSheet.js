import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const screenWidth = Math.round(Dimensions.get("window").width);
const textWidth = (screenWidth - 20) / 2;

export const darkGreen = "#53A687";
export const green = "#C1D96C";
export const lightGreen = "#DEF294";
export const orange = "#F2B885";
export const lightBlue = "#E8FAF4";
export const lightGrey = "#F6F6F6";

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
    backgroundColor: green,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: 200,
    marginTop: 10,
    height: 35,
  },
  landingButtonsText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
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
    color: darkGreen,
    padding: 10,
    fontSize: 15,
  },
  loginTitle2: {
    marginTop: 10,
    textAlign: "center",
    color: darkGreen,
  },

  //Signup
  signupLogoContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: 30,
    flex: 1,
    backgroundColor: "white",
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

  // Buy and Sell Tabs
  buySellContainer: {
    backgroundColor: lightGreen,
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  blueTab: {
    backgroundColor: green,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 7,
  },
  whiteTab: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 7,
  },

  // Pet Profile Pages
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: lightGrey,
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
    backgroundColor: darkGreen,
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
      color : "red",
      fontSize: 2
  },
  // form
  formPickerIconContainer:{
    justifyContent: "center",
    flex: 0.1,
  }, 
  formPickerInnerContainer:{
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
    backgroundColor: lightGrey,
  },
  viewApplication: {
    backgroundColor: darkGreen,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 16,
  },
  petCard: {
    margin: 5,
    width: 340,
  },
  iconContainer: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 10,
  },
  breedIconContainer: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
  },
  icon: {
    height: 130,
    width: 130,
    borderRadius: 10,
  },
  iconText: {
    paddingTop: 1,
    textAlign: "center",
    color: darkGreen,
    fontWeight: "bold",
  },
  activityContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // Profile Page
  profileContainer: {
    backgroundColor: darkGreen,
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
    backgroundColor: "#b0b0b0"
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
    borderBottomColor: "#D3D3D3",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  profileName: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold"
  },
  emailStyle: { 
    color: "#202020", 
    fontSize: 17, 
    marginTop: 10 
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
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: "absolute",
    padding: 13
  },
  petBuyCardActionCard: {
    margin: 0,
    padding: 0,
  },
  petBuyCardBigButtonText: {
    fontSize: 14,
    color: "white",
  },
  petBuyCardBigButton: {
    flex: 1,
    backgroundColor: darkGreen,
    marginTop: 10,
    marginLeft: 25,
    marginRight: 25,
    height: 30,
    justifyContent: "center",
  },
  petBuyCardSellerImage: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2
  },
  petBuyCardTextContainer: {
    flexDirection: "row",
    padding: 10
  },
  petBuyCardImageContainer: {
    width: 150,
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
  },
});
