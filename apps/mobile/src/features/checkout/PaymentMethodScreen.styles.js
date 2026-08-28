import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    marginBottom: 28,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F4F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#1C1C21',
    fontSize: 16,
    fontWeight: '700',
  },
  headerSpacer: {
    width: 36,
  },

  // Payment method selector row
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodItem: {
    width: 68,
    height: 60,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#EDEDF1',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  methodItemActive: {
    borderColor: '#2F6FED',
    backgroundColor: '#EAF1FE',
  },
  methodIconWrap: {
    marginBottom: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9A9AA2',
  },
  methodLabelActive: {
    color: '#2F6FED',
  },

  // VISA text mark
  visaText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1A1F71',
    fontStyle: 'italic',
  },

  // Mastercard mark (two overlapping circles)
  mastercardMark: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mastercardCircleRed: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EB001B',
  },
  mastercardCircleOrange: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#F79E1B',
    marginLeft: -6,
    opacity: 0.9,
  },

  // Empty-state illustration card
  emptyCard: {
    marginTop: 36,
    backgroundColor: '#FDF3EA',
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  cardGraphicWrap: {
    width: 96,
    height: 64,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardGraphicBack: {
    position: 'absolute',
    width: 84,
    height: 54,
    borderRadius: 12,
    backgroundColor: '#F2994A',
    transform: [{ rotate: '-8deg' }],
    top: 4,
    left: 2,
  },
  cardGraphicFront: {
    position: 'absolute',
    width: 84,
    height: 54,
    borderRadius: 12,
    backgroundColor: '#E5484D',
    transform: [{ rotate: '6deg' }],
    top: 6,
    left: 8,
    padding: 10,
    justifyContent: 'space-between',
  },
  cardGraphicChip: {
    width: 16,
    height: 12,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  cardGraphicLine: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C1C21',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#9A9AA2',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 8,
  },

  addNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
  },
  addNewText: {
    color: '#F2994A',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginLeft: 6,
  },

  // Saved card list (when cards exist)
  savedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9F9FB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 16,
  },
  savedCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savedCardNumber: {
    marginLeft: 12,
    fontSize: 13,
    fontWeight: '600',
    color: '#1C1C21',
  },
  savedCardBadge: {
    fontSize: 11,
    color: '#9A9AA2',
    marginTop: 2,
  },

  // Bottom pay bar
  bottomBar: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F3',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9A9AA2',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1C1C21',
    marginBottom: 18,
  },
  payButton: {
    backgroundColor: '#F2994A',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonDisabled: {
    backgroundColor: '#F7CBA4',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
});