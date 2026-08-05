import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: 176,
    borderRadius: 24,
  },
  name: {
    color: '#111827',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
  },
  tags: {
    color: '#9CA3AF',
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: '#4B5563',
    fontSize: 13,
  },
});