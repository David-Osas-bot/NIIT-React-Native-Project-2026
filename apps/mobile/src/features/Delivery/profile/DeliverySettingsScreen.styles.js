import { StyleSheet, Platform } from 'react-native';

const COLORS = {
  primary: '#FE724C',
  white: '#FFFFFF',
  textDark: '#1A1E26',
  textLight: '#9796A1',
  bgLight: '#F3F4F6',
  borderLine: '#F2F2F2',
  danger: '#FF3B30',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 50 : 60,
    paddingBottom: 15,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.bgLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  headerSpacer: {
    width: 44,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textLight,
    letterSpacing: 0.5,
    marginBottom: 10,
    marginTop: 20,
  },
  card: {
    backgroundColor: COLORS.bgLight,
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEBEE',
  },
  toggleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 3,
  },
  toggleSubtitle: {
    fontSize: 11,
    color: COLORS.textLight,
    maxWidth: 240,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEBEE',
  },
  linkLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textDark,
  },
  linkLabelDanger: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.danger,
  },
  versionText: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  logoutButton: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.danger,
    paddingVertical: 15,
    marginTop: 30,
  },
  logoutButtonText: {
    color: COLORS.danger,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
});