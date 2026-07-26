import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  tabsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    marginRight: 24,
    paddingBottom: 10,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#F97316',
  },
  tabText: {
    fontSize: 14,
    color: '#999',
  },
  tabTextActive: {
    color: '#F97316',
    fontWeight: '600',
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E5E5E5',
    marginRight: 12,
  },
  textWrapper: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: '#333',
  },
  nameBold: {
    fontWeight: '700',
    color: '#222',
  },
  timeText: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
  },
  thumbnail: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
  },
  errorText: {
    textAlign: 'center',
    color: '#E53935',
    marginTop: 40,
  },
});