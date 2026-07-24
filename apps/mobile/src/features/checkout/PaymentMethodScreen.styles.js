// import { StyleSheet } from 'react-native';
 
// export default StyleSheet.create({
//   container: { flex: 1 },
// });









import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F3F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  methodsRow: {
    marginBottom: 6,
  },
  methodCard: {
    width: 64,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#F3F3F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  methodCardActive: {
    borderWidth: 1.5,
    borderColor: '#F2994A',
    backgroundColor: '#FFFFFF',
  },
  checkBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#F2994A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelsRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  methodLabel: {
    width: 64,
    marginRight: 12,
    fontSize: 11,
    color: '#9B9BAA',
    textAlign: 'center',
  },
  cardPreviewWrap: {
    backgroundColor: '#F7F7FA',
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  cardIllustration: {
    width: 130,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F2994A',
    marginBottom: 20,
    padding: 12,
    justifyContent: 'space-between',
  },
  cardStripe: {
    width: '60%',
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  cardChip: {
    width: 20,
    height: 14,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  noCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 6,
  },
  noCardSubtitle: {
    fontSize: 12,
    color: '#9B9BAA',
    textAlign: 'center',
    lineHeight: 18,
  },
  addNewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 14,
    paddingVertical: 16,
  },
  addNewText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F2994A',
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  bottomBar: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 14,
  },
  totalLabel: {
    fontSize: 13,
    color: '#9B9BAA',
    marginRight: 8,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  payButton: {
    backgroundColor: '#F2994A',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});