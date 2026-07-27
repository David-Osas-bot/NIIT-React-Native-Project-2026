import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 110,
    borderRadius: 16,
  },
  name: {
    color: '#111827',
    fontWeight: 'bold',
    marginTop: 8,
  },
  restaurant: {
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 2,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  price: {
    color: '#111827',
    fontWeight: 'bold',
    fontSize: 15,
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FB923C',
    alignItems: 'center',
    justifyContent: 'center',
  },
});