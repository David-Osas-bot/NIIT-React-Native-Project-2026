import { StyleSheet, Platform, StatusBar } from 'react-native';

const COLORS = {
  primary: '#FE724C', // Star / Brand Orange
  starMuted: '#E4E4E4', // Inactive star color
  white: '#FFFFFF',
  textDark: '#1A1E26',
  textLight: '#9796A1',
  bgLight: '#F3F4F6',
  cardBg: '#FAFAFA',
  avatarBg: '#9DA8B6',
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
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: 40,
  },
  reviewRow: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  avatarPlaceholder: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: COLORS.avatarBg,
    marginRight: 15,
    marginTop: 5,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  dateText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  optionsDots: {
    fontSize: 14,
    color: COLORS.textLight,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  star: {
    fontSize: 14,
    marginRight: 3,
  },
  starFilled: {
    color: COLORS.primary,
  },
  starEmpty: {
    color: COLORS.starMuted,
  },
  reviewComment: {
    fontSize: 13,
    color: COLORS.textLight,
    lineHeight: 18,
  },
});