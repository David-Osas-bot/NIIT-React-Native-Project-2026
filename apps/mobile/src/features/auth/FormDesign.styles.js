import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  wrap: {justifyContent: "center", marginTop: 10,gap: 10 },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  inputRow: {
    justifyContent: "center",
    marginBottom: 10,
    position: "relative",
  },
  input: {
    backgroundColor: "#F0F5FA",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 24,
    fontSize: 14,
    color: "#1C1C1E",
  },
  eyeButton: { position: "absolute", right: 14 },
});
