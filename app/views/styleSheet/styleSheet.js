import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const screenWidth = Math.round(Dimensions.get("window").width);
const textWidth = (screenWidth - 20) / 2;

export default StyleSheet.create({
  // Buy and Sell Tabs
  buySellContainer: {
    alignSelf: "stretch",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  blueTab: {
    backgroundColor: "#d7e5f7",
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
});
