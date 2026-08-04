import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 16,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  headerAvatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAvatarText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Location Dropdown
  locationContainer: {
    marginTop: 16,
    marginBottom: 16,
    zIndex: 10,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  locationText: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
    fontWeight: '500',
    marginLeft: 10,
  },
  dropdownList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemSelected: {
    backgroundColor: '#FFF5F0',
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#1C1C1E',
  },
  dropdownItemTextSelected: {
    color: '#FF6B35',
    fontWeight: '600',
  },

  // Stats Cards
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },

  // Revenue Chart
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  seeDetailsText: {
    fontSize: 14,
    color: '#8E8E93',
    textDecorationLine: 'underline',
  },
  totalRevenue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  timeframeSelector: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 4,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  timeframeOption: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 6,
  },
  timeframeOptionActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  timeframeText: {
    fontSize: 13,
    color: '#8E8E93',
    fontWeight: '500',
  },
  timeframeTextActive: {
    color: '#1C1C1E',
    fontWeight: '600',
  },
  chartContainer: {
    height: 180,
    marginVertical: 8,
  },
  xAxisLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingHorizontal: 4,
  },
  xAxisLabel: {
    fontSize: 11,
    color: '#8E8E93',
    fontWeight: '400',
  },

  // Reviews
  reviewsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  reviewsSeeAll: {
    fontSize: 14,
    color: '#8E8E93',
    textDecorationLine: 'underline',
  },
  reviewsRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  reviewsRating: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  reviewsTotal: {
    fontSize: 14,
    color: '#8E8E93',
  },

  // Popular Items
  popularSection: {
    marginBottom: 16,
  },
  popularHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  popularTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  popularSeeAll: {
    fontSize: 14,
    color: '#8E8E93',
    textDecorationLine: 'underline',
  },
  popularList: {
    paddingRight: 16,
  },
  popularItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 120,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  popularItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#F2F2F7',
  },
  popularItemName: {
    fontSize: 12,
    color: '#1C1C1E',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 2,
  },
  popularItemPrice: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  popularItemOrders: {
    fontSize: 10,
    color: '#8E8E93',
    marginTop: 2,
  },

  bottomSpacer: {
    height: 30,
  },
});