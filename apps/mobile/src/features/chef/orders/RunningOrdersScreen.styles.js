import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    marginRight: 12,
  },
  infoWrapper: {
    flex: 1,
  },
  category: {
    fontSize: 12,
    color: '#F97316',
    fontWeight: '600',
    marginBottom: 2,
  },
  foodName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 2,
  },
  orderId: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
  },
  actionsColumn: {
    alignItems: 'flex-end',
  },
  doneButton: {
    backgroundColor: '#F97316',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginBottom: 6,
  },
  doneButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#F97316',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  cancelButtonText: {
    color: '#F97316',
    fontWeight: '600',
    fontSize: 13,
  },
  errorText: {
    textAlign: 'center',
    color: '#E53935',
    marginTop: 40,
  },
});