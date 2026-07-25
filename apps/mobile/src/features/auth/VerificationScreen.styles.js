import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#ffffff" },
  email: {
    fontSize: 13,
    color: "#ffffff",
    textAlign: "center",
    marginTop: 4,
    fontWeight: "600",
  },
  resendRow: { alignSelf: "flex-end", marginBottom: 12 },
  resendText: { fontSize: 12, color: "#FF7622", fontWeight: "600" },
  codeBoxes: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  codeBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#F5F6FA",
    fontSize: 20,
    fontWeight: "700",
    color: "#1C1C1E",
    textAlign: "center",
  },
  primaryButton: {
    backgroundColor: "#FF7622",
    padding: 25,
    borderRadius: 10,
    alignItems: "center",
  },
  primaryButtonText: { color: "#FFFFFF", fontWeight: "700", letterSpacing: 1 },
});
