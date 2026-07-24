
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
    paddingBottom: 140,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
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
  imageCard: {
    height: 200,
    borderRadius: 20,
    backgroundColor: '#F7C59F',
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurantBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#F3F3F5',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  restaurantEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  restaurantName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1A1A2E',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: '#9B9BAA',
    lineHeight: 20,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A2E',
    marginLeft: 6,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9B9BAA',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  sizeRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  sizeCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F3F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  sizeCircleActive: {
    backgroundColor: '#F2994A',
  },
  sizeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9B9BAA',
  },
  sizeTextActive: {
    color: '#FFFFFF',
  },
  ingredientsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  ingredientCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FDEDE3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 74,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7F7FA',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A2E',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  stepperButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperValue: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginHorizontal: 10,
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#F2994A',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});