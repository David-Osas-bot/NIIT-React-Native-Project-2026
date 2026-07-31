import { StyleSheet } from 'react-native';

const colors = {  
  primary: '#FF7622',
  dark: '#1C1C1E',
  gray: '#94A3B8',
  lightGray: '#E2E8F0',
  textMuted: '#64748B',
  white: '#FFFFFF',
  headerDark: '#15152B',
  inputBg: '#F5F6FA',
};

export default StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 14,
    paddingVertical: 13,
    marginBottom: 12,
  },
  icon: { marginRight: 10 },
  text: { fontSize: 14, fontWeight: '600', color: colors.dark },
});