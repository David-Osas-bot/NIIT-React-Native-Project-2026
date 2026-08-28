import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15161B',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },

  // Header
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
    backgroundColor: '#22232B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  doneLink: {
    color: '#F2994A',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  errorText: {
    color: '#FF6B6B',
    fontSize: 13,
    marginBottom: 12,
  },
  emptyText: {
    color: '#8A8B93',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 40,
  },

  // Cart item row
  itemRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  itemImageWrap: {
    position: 'relative',
    marginRight: 16,
  },
  itemImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    overflow: 'hidden',
    backgroundColor: '#22232B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2A2B33',
  },
  removeButton: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E5484D',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#15161B',
  },
  quantityBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 4,
    borderRadius: 10,
    backgroundColor: '#F2994A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#15161B',
  },
  quantityBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },

  itemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemPrice: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  itemMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemSize: {
    color: '#8A8B93',
    fontSize: 12,
  },

  // Quantity stepper
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22232B',
    borderRadius: 20,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  stepperButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F2994A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperValue: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginHorizontal: 12,
    minWidth: 12,
    textAlign: 'center',
  },

  // Bottom sheet
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  addressHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  addressLabel: {
    color: '#9A9AA2',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  editLink: {
    color: '#F2994A',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  addressBox: {
    backgroundColor: '#F4F4F6',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 20,
  },
  addressText: {
    color: '#3A3A42',
    fontSize: 13,
    fontWeight: '500',
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  totalLabel: {
    color: '#9A9AA2',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  totalValue: {
    color: '#F2994A',
    fontSize: 15,
    fontWeight: '800',
  },
  breakdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breakdownText: {
    color: '#F2994A',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  placeOrderButton: {
    backgroundColor: '#F2994A',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeOrderText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
});