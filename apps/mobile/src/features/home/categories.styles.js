import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  section: {
    marginTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#F97316',
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 10,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    paddingLeft: 6,
    paddingRight: 16,
    paddingVertical: 6,
  },
  pillActive: {
    backgroundColor: '#FB923C',
  },
  pillInactive: {
    backgroundColor: '#F3F4F6',
  },
  pillImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  pillText: {
    marginLeft: 8,
    fontWeight: '500',
  },
  pillTextActive: {
    color: '#fff',
  },
  pillTextInactive: {
    color: '#374151',
  },
});