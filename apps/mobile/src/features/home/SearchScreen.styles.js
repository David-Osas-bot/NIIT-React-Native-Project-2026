// import { StyleSheet } from 'react-native';

// export const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },

//   // Header
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingTop: 16,
//   },
//   iconButton: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: '#F3F4F6',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cartButton: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: '#111827',
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//   },
//   badge: {
//     position: 'absolute',
//     top: -4,
//     right: -4,
//     backgroundColor: '#F97316',
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   badgeText: {
//     color: '#fff',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },

//   // Search input
//   searchInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F3F4F6',
//     borderRadius: 16,
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     marginHorizontal: 20,
//     marginTop: 20,
//   },
//   searchInput: {
//     marginLeft: 8,
//     flex: 1,
//     color: '#1F2937',
//   },

//   // Recent keywords
//   recentSection: {
//     marginTop: 24,
//   },
//   keywordsRow: {
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     gap: 10,
//   },
//   keywordChip: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 999,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   keywordText: {
//     color: '#374151',
//     fontWeight: '500',
//   },

//   // Shared section title
//   section: {
//     marginTop: 16,
//   },
//   lastSection: {
//     marginBottom: 32,
//   },
//   sectionTitle: {
//     color: '#111827',
//     fontSize: 18,
//     fontWeight: 'bold',
//     paddingHorizontal: 20,
//     marginBottom: 8,
//   },

//   // Suggested restaurants
//   suggestedRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//   },
//   suggestedImage: {
//     width: 56,
//     height: 56,
//     borderRadius: 12,
//   },
//   suggestedInfo: {
//     marginLeft: 12,
//   },
//   suggestedName: {
//     color: '#111827',
//     fontWeight: '600',
//     fontSize: 15,
//   },
//   suggestedRatingRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 4,
//     gap: 4,
//   },
//   suggestedRating: {
//     color: '#6B7280',
//     fontSize: 13,
//   },

//   // Popular fast food
//   fastFoodRow: {
//     flexDirection: 'row',
//     paddingHorizontal: 20,
//     gap: 16,
//   },
//   fastFoodCard: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   fastFoodImage: {
//     width: 112,
//     height: 112,
//     borderRadius: 56,
//   },
//   fastFoodName: {
//     color: '#111827',
//     fontWeight: 'bold',
//     marginTop: 8,
//   },
//   fastFoodRestaurant: {
//     color: '#9CA3AF',
//     fontSize: 13,
//   },
// });
















import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Header
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#F97316',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },

  // Search input
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 20,
    marginTop: 20,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    color: '#1F2937',
  },

  // Recent keywords
  recentSection: {
    marginTop: 24,
  },
  keywordsRow: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
  },
  keywordChip: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  keywordText: {
    color: '#374151',
    fontWeight: '500',
  },

  // Shared section title
  section: {
    marginTop: 16,
  },
  lastSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 8,
  },

  // Suggested restaurants
  suggestedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  suggestedImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },
  suggestedInfo: {
    marginLeft: 12,
  },
  suggestedName: {
    color: '#111827',
    fontWeight: '600',
    fontSize: 15,
  },
  suggestedRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  suggestedRating: {
    color: '#6B7280',
    fontSize: 13,
  },

  // Popular fast food
  fastFoodRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16,
  },
  fastFoodCard: {
    flex: 1,
    alignItems: 'center',
  },
  fastFoodImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  fastFoodName: {
    color: '#111827',
    fontWeight: 'bold',
    marginTop: 8,
  },
  fastFoodRestaurant: {
    color: '#9CA3AF',
    fontSize: 13,
  },
});