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
    top: 200,
  },
  logo: {
    width: 300,
    height: 150,
    marginBottom: 50,
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
    paddingTop: 130,
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
    backgroundColor: darkGreen,
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  blueTab: {
    marginTop: 25,
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
    marginTop: 25,
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
  },
  titleContainer: {
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    paddingTop: 17,
    paddingLeft: 12,
    paddingRight: 20,
  },
  fontTitle: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
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
    elevation: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  cardContentContainer: {
    borderRadius: 4,
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 6,
  },
  line: {
    backgroundColor: "#A2A2A2",
    height: 1.5,
    width: screenWidth - 75,
    alignSelf: "stretch",
    marginTop: 7,
    marginBottom: 15,
    marginRight: 10,
  },

  // Express Interest Component
  buttonsContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 5,
  },
  buttons: {
    backgroundColor: "#447ECB",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 40,
  },
  buttonsText: {
    color: "#ffffff",
    fontSize: 18,
    padding: 15,
  },
  // Form container
  formContainer: {
    marginHorizontal: screenWidth * 0.08,
  },
  //Search bar
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
    width: 284,
  },
  searchBarSingle: {
    margin: 10,
    height: 35,
    width: 390,
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
  }
});
