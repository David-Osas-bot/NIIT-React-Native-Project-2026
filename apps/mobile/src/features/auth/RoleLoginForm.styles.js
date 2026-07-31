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
  screen: { flex: 1, backgroundColor: colors.white, paddingHorizontal: 24 },
  backButton: { marginTop: 8, marginBottom: 20, width: 32 },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.dark,
    marginBottom: 8,
  },
  titleAccent: { color: colors.primary },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: 24,
    lineHeight: 19,
  },
  illustration: {
    height: 180,
    borderRadius: 24,
    backgroundColor: colors.cardTint,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  card: { paddingBottom: 24 },
  errorText: { color: colors.danger, fontSize: 13, marginBottom: 12 },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  rememberRow: { flexDirection: "row", alignItems: "center" },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.lightGray,
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  rememberText: { fontSize: 13, color: colors.textMuted },
  link: { fontSize: 13, color: colors.primary, fontWeight: "600" },
  primaryButton: {
    backgroundColor: colors.primary,
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 16,
  },
  primaryButtonText: {
    color: colors.white,
    fontWeight: "700",
    letterSpacing: 1,
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  signupText: { fontSize: 13, color: colors.textMuted },
  dividerText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.gray,
    textAlign: "center",
    letterSpacing: 1,
    marginBottom: 16,
  },
});
