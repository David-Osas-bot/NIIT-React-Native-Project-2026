import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 10,
  },
  pill: {
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
  },
  pillActive: {
    backgroundColor: '#FB923C',
    borderColor: '#FB923C',
  },
  pillInactive: {
    backgroundColor: '#fff',
    borderColor: '#E5E7EB',
  },
  pillText: {
    fontWeight: '500',
  },
  pillTextActive: {
    color: '#fff',
  },
  pillTextInactive: {
    color: '#374151',
  },
});