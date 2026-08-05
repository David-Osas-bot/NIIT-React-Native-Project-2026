import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },

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

  profileHeader: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  userBio: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '400',
  },

  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF6B35',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
    marginLeft: 8,
  },

  infoCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    paddingVertical: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8E8E93',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    color: '#333333',
    marginRight: 12,
  },
  infoValue: {
    fontSize: 16,
    color: '#1C1C1E',
    fontWeight: '500',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 16,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
    paddingVertical: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '500',
    marginLeft: 8,
  },

  // Modal Styles for Full Screen Image
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
    padding: 8,
  },
  modalImage: {
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 12,
  },
});