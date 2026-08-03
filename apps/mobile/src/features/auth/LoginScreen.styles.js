import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#ffffff" },
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
  checkboxChecked: { backgroundColor: "#FF7622", borderColor: "#FF7622" },
  tickText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700", top: -2 },
  rememberText: { fontSize: 13, color: "#64748B" },
  link: { fontSize: 13, color: "#FF7622", fontWeight: "600" },
  primaryButton: {
    backgroundColor: "#FF7622",
    padding: 25,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  primaryButtonText: { color: "#FFFFFF", fontWeight: "700", letterSpacing: 1 },
  signupRow: { flexDirection: "row", justifyContent: "center" },
  signupText: { fontSize: 16, color: "#64748B" },
});
