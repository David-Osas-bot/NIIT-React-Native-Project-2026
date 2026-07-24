// import { StyleSheet } from 'react-native';

// export default StyleSheet.create({
//   container: { flex: 1 },
// });





import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  editItemsLink: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F2994A',
    textDecorationLine: 'underline',
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  itemImage: {
    width: 76,
    height: 76,
    borderRadius: 16,
    backgroundColor: '#2A2A40',
    overflow: 'hidden',
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: '#2A2A40',
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  itemMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemSize: {
    fontSize: 13,
    color: '#8B8BA0',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  stepperButton: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperValue: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginHorizontal: 8,
    fontSize: 13,
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 30,
  },
  addressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  addressLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9B9BAA',
    letterSpacing: 0.5,
  },
  editLink: {
    fontSize: 11,
    fontWeight: '600',
    color: '#F2994A',
    textDecorationLine: 'underline',
  },
  addressBox: {
    backgroundColor: '#F3F3F5',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  addressText: {
    fontSize: 13,
    color: '#4A4A5A',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 13,
    color: '#9B9BAA',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  breakdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breakdownText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F2994A',
    marginRight: 2,
  },
  placeOrderButton: {
    backgroundColor: '#F2994A',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
  },
  placeOrderText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});