import { StyleSheet } from 'react-native';


const colors = {
  white: '#FFFFFF',
  primary: '#F97316',      
  gray: '#6B7280',
  lightGray: '#D1D5DB',
  textMuted: '#6B7280',
  gray200: '#E5E7EB',
  black: '#1F2937',
};
 
export default StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  primaryButton: {
    backgroundColor: '#ff7622',
    borderRadius: 12,
    padding: 25,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleLabel: { fontSize: 12, fontWeight: '600', color: colors.textMuted, marginBottom: 6, letterSpacing: 0.5 },
roleContainer: { flexDirection: 'row', marginBottom: 16, gap: 8 },
roleButton: {
  flex: 1,
  paddingVertical: 12,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: colors.lightGray,
  backgroundColor: colors.inputBg,
  alignItems: 'center',
},
selectedRole: { backgroundColor: colors.primary, borderColor: colors.primary },
roleButtonText: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
roleButtonTextSelected: { color: colors.white },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});