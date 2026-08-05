import { StyleSheet, Platform, StatusBar } from 'react-native';

const COLORS = {
  primary: '#FE724C', // The specific brand orange
  textDark: '#323643',
  textLight: '#9796A1',
  bgLight: '#F3F4F6',
  white: '#FFFFFF',
  success: '#029054', // Green for completed
  danger: '#FF4B4B',  // Red for canceled
  borderLine: '#EAEAEA',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 50 : 60, 
    paddingBottom: 20,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.bgLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLine,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textLight,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  cardContainer: {
    marginBottom: 30,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 14,
    color: COLORS.textDark,
    fontWeight: '500',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statusCompleted: {
    color: COLORS.success,
  },
  statusCanceled: {
    color: COLORS.danger,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLine,
    marginBottom: 15,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 65,
    height: 65,
    borderRadius: 8,
    backgroundColor: '#9DA8B6', // Grey placeholder color from the image
    marginRight: 15,
  },
  detailsTextContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  orderNumber: {
    fontSize: 14,
    color: COLORS.textLight,
    textDecorationLine: 'underline',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textDark,
  },
  verticalDivider: {
    width: 1,
    height: 15,
    backgroundColor: COLORS.borderLine,
    marginHorizontal: 10,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  bulletPoint: {
    fontSize: 12,
    color: COLORS.textLight,
    marginHorizontal: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12, // Automatically creates a clean, uniform gap between the two buttons
  },
  actionButton: {
    flex: 1,
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    // Removed conflicting directional margins
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    // Removed conflicting directional margins
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
  }
});