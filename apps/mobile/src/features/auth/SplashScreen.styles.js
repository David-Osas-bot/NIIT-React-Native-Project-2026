import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 140,
    height: 70,
  },

  topBurst: {
    position: "absolute",
    top: -30,
    left: -20,
    width: 160,
    height: 160,
  },

  bottomBurst: {
    position: "absolute",
    bottom: 0,
    right: -50,
    width: 210,
    height: 170,
  },
});

export default styles;