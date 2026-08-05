import { StyleSheet, Platform } from 'react-native';

const COLORS = {
  primary: '#FE724C',
  white: '#FFFFFF',
  textDark: '#1A1E26',
  textLight: '#9796A1',
  bgLight: '#F3F4F6',
  borderLine: '#F2F2F2',
  avatarBg: '#FFD1BA',
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
  editLink: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 110,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 22,
    marginTop: 5,
  },
  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.avatarBg,
    marginBottom: 14,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  profileTagline: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: COLORS.bgLight,
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 22,
  },
  statChip: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.borderLine,
  },
  statValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.textLight,
    letterSpacing: 0.5,
  },
  infoCard: {
    backgroundColor: COLORS.bgLight,
    borderRadius: 16,
    padding: 18,
    marginBottom: 22,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  infoIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  infoIcon: {
    fontSize: 15,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textLight,
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  menuCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLine,
    marginBottom: 26,
    paddingHorizontal: 6,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#FAFAFA',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: 16,
    marginRight: 14,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textDark,
  },
  menuChevron: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  logoutButton: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.danger,
    paddingVertical: 15,
  },
  logoutButtonText: {
    color: COLORS.danger,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
});