import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    height: 250,
    justifyContent: "flex-start",
  },

  headerContent: {
    paddingHorizontal: 25,
    paddingTop: 10,
  },

  headerText:{
    marginTop:-10,
  },

  backButton: {
    marginBottom: 0,
  },

  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#222",
  },

  orange: {
    color: "#FF7622",
  },

  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },

  card: {
    flex: 1,
    marginTop: -30,
    backgroundColor: "#fff",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 25,
  },

  footer: {
    alignSelf:"center",
    width: "110%",
    height: "13%",
  },
  topRow: 
  { marginBottom: 40 },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  divider: {
    marginVertical: 25,
    textAlign: "center",
    color: "#777",
  },

  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 18,
  },

  orangeText: {
    color: "#FF7622",
    fontWeight: "600",
  },

  error: {
    color: "red",
    marginVertical: 10,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  rememberRow: { flexDirection: "row", alignItems: "center" },
  checkbox: {
    justifyContent: "center",
    alignItems: "center",
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    marginRight: 8,
  },
  orText: {
    color: "#64748B",
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  checkboxChecked: { backgroundColor: "#FF7622", borderColor: "#FF7622" },
  tickText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700", top: -2 },
  rememberText: { fontSize: 13, color: "#64748B" },
  link: { fontSize: 13, color: "#FF7622", fontWeight: "600" },
  primaryButton: {
    backgroundColor: "#FF7622",
    padding: 25,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  primaryButtonText: { color: "#FFFFFF", fontWeight: "700", letterSpacing: 1 },
  signupRow: { flexDirection: "row", justifyContent: "center" },
  signupText: { fontSize: 16, color: "#64748B",marginBottom:10 },
});
