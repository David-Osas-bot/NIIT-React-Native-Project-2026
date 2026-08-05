import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Container Styles
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },

  // Loading Styles
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '500',
  },

  // Orange Card Header - Rounded on ALL corners
  orangeCard: {
    backgroundColor: '#FF6B35',
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  backButton: {
    padding: 4,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  cardContent: {
    paddingHorizontal: 4,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },

  balanceSection: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  
  // Withdraw Button with White Outline
  withdrawButton: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  withdrawText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  // Menu Section Styles
  menuSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Icon Styles
  menuIcon: {
    color: '#333333',
  },
  chevronIcon: {
    color: '#C7C7CC',
  },
  logoutIcon: {
    color: '#FF3B30',
  },

  // Text Styles
  menuItemText: {
    fontSize: 16,
    color: '#1C1C1E',
    fontWeight: '500',
    marginLeft: 14,
  },
  orderCount: {
    fontSize: 16,
    color: '#1C1C1E',
    fontWeight: '600',
    marginRight: 8,
  },

  // Logout Button Styles
  logoutButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '500',
    marginLeft: 14,
  },
});