import { StyleSheet } from "react-native";

const colors = {
  primary: "#FF7622",
  dark: "#1C1C1E",
  gray: "#94A3B8",
  lightGray: "#E2E8F0",
  textMuted: "#64748B",
  white: "#FFFFFF",
  headerDark: "#15152B",
  inputBg: "#F5F6FA",
};

export default StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBg,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  leftIcon: { marginRight: 10 },
  label: { fontSize: 14, color: colors.dark, marginBottom: 8 },
  input: { flex: 1, padding: 25, fontSize: 14, color: colors.dark },
  rightIconTouch: { paddingLeft: 10 },
});
