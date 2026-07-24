// import { StyleSheet } from 'react-native';
 
// export default StyleSheet.create({
//   container: { flex: 1 },
// });






import { StyleSheet } from 'react-native';

const COLORS = {
  screenBg: '#EEF1F6',
  cardBg: '#FFFFFF',
  previewBg: '#E9ECF2',
  inputBg: '#EEF1F6',
  label: '#9098AC',
  text: '#1C1F2A',
  placeholder: '#B7BECC',
  iconCircleBg: '#EEF1F6',
  iconColor: '#4A5266',
  accent: '#F4801F',
  accentText: '#FFFFFF',
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.screenBg,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBg,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.iconCircleBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 16,
    color: COLORS.iconColor,
    fontWeight: '600',
  },
  headerTitle: {
    marginLeft: 14,
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text,
  },

  // Card preview
  previewArea: {
    backgroundColor: COLORS.previewBg,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  previewCard: {
    borderRadius: 16,
    padding: 18,
    minHeight: 90,
    justifyContent: 'space-between',
  },
  previewCardNumber: {
    fontSize: 16,
    letterSpacing: 2,
    color: COLORS.text,
    fontWeight: '600',
  },
  previewCardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  previewCardName: {
    fontSize: 12,
    color: COLORS.label,
    textTransform: 'uppercase',
  },
  previewCardExpiry: {
    fontSize: 12,
    color: COLORS.label,
  },

  // Body / form
  body: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16,
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: COLORS.label,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 15,
    color: COLORS.text,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#E4574C',
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: '#E4574C',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfField: {
    flex: 1,
  },
  halfFieldSpacer: {
    width: 16,
  },

  spacer: {
    flex: 1,
  },

  submitButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 28,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 24,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: COLORS.accentText,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export { COLORS };