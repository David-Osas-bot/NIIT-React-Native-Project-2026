// import { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   ScrollView,
//   SafeAreaView,
//   TouchableOpacity,
// } from 'react-native';
// import { ChevronLeft, ShoppingBag, Search, X, Star } from 'lucide-react-native';
// import { useNavigation } from '@react-navigation/native';
// import { styles } from './SearchScreen.styles';

// // Add your own image paths here
// const suggestedRestaurants = [
//   { id: '1', name: 'Pansi Restaurant', rating: 4.7, image: require('../../../assets/restaurants/pansi.png') },
//   { id: '2', name: 'American Spicy Burger Shop', rating: 4.3, image: require('../../../assets/restaurants/spicy-burger.png') },
//   { id: '3', name: 'Cafenio Coffee Club', rating: 4.0, image: require('../../../assets/restaurants/cafenio.png') },
// ];

// const popularFastFood = [
//   { id: '1', name: 'European Pizza', restaurant: 'Uttora Coffee House', image: require('../../../assets/food/european-pizza.png') },
//   { id: '2', name: 'Buffalo Pizza', restaurant: 'Cafenio Coffee Club', image: require('../../../assets/food/buffalo-pizza.png') },
// ];

// const recentKeywords = ['Burger', 'Sandwich', 'Pizza', 'Sandwich'];

// export default function SearchScreen() {
//   const navigation = useNavigation();
//   const [query, setQuery] = useState('');

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Header */}
//         <View style={styles.headerRow}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={styles.iconButton}
//           >
//             <ChevronLeft size={20} color="#374151" />
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.cartButton}>
//             <ShoppingBag size={18} color="#fff" />
//             <View style={styles.badge}>
//               <Text style={styles.badgeText}>2</Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//         {/* Search input */}
//         <View style={styles.searchInputContainer}>
//           <Search size={18} color="#9CA3AF" />
//           <TextInput
//             value={query}
//             onChangeText={setQuery}
//             placeholder="Search dishes, restaurants"
//             placeholderTextColor="#9CA3AF"
//             autoFocus
//             style={styles.searchInput}
//           />
//           {query.length > 0 && (
//             <TouchableOpacity onPress={() => setQuery('')}>
//               <X size={18} color="#9CA3AF" />
//             </TouchableOpacity>
//           )}
//         </View>

//         {/* Recent keywords */}
//         <View style={styles.recentSection}>
//           <Text style={styles.sectionTitle}>Recent Keywords</Text>
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.keywordsRow}
//           >
//             {recentKeywords.map((word, i) => (
//               <TouchableOpacity
//                 key={i}
//                 onPress={() => setQuery(word)}
//                 style={styles.keywordChip}
//               >
//                 <Text style={styles.keywordText}>{word}</Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>

//         {/* Suggested restaurants */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Suggested Restaurants</Text>
//           {suggestedRestaurants.map((r) => (
//             <TouchableOpacity key={r.id} style={styles.suggestedRow}>
//               <Image source={r.image} style={styles.suggestedImage} resizeMode="cover" />
//               <View style={styles.suggestedInfo}>
//                 <Text style={styles.suggestedName}>{r.name}</Text>
//                 <View style={styles.suggestedRatingRow}>
//                   <Star size={13} color="#F59E0B" fill="#F59E0B" />
//                   <Text style={styles.suggestedRating}>{r.rating}</Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Popular fast food */}
//         <View style={[styles.section, styles.lastSection]}>
//           <Text style={styles.sectionTitle}>Popular Fast Food</Text>
//           <View style={styles.fastFoodRow}>
//             {popularFastFood.map((item) => (
//               <TouchableOpacity key={item.id} style={styles.fastFoodCard}>
//                 <Image source={item.image} style={styles.fastFoodImage} resizeMode="cover" />
//                 <Text style={styles.fastFoodName}>{item.name}</Text>
//                 <Text style={styles.fastFoodRestaurant}>{item.restaurant}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }






















import { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { ChevronLeft, ShoppingBag, Search, X, Star } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './SearchScreen.styles';

// Add your own image paths here — combined searchable dataset
const allRestaurants = [
  { id: 'r1', type: 'restaurant', name: 'Pansi Restaurant', rating: 4.7, tags: ['noodles', 'rice', 'soup'], image: require('../../../assets/restaurants/pansi.png') },
  { id: 'r2', type: 'restaurant', name: 'American Spicy Burger Shop', rating: 4.3, tags: ['burger', 'spicy', 'american'], image: require('../../../assets/restaurants/spicy-burger.png') },
  { id: 'r3', type: 'restaurant', name: 'Cafenio Coffee Club', rating: 4.0, tags: ['coffee', 'dessert', 'pastry'], image: require('../../../assets/restaurants/cafenio.png') },
  { id: 'r4', type: 'restaurant', name: 'Rose Garden Restaurant', rating: 4.7, tags: ['burger', 'chicken', 'wings'], image: require('../../../assets/restaurants/rose-garden.png') },
  { id: 'r5', type: 'restaurant', name: 'Green Bowl Kitchen', rating: 4.8, tags: ['salad', 'bowl', 'healthy'], image: require('../../../assets/restaurants/green-bowl.png') },
];

// restaurant field must exactly match a "name" in RestaurantViewScreen's data
// for navigation to land on the correct restaurant
const allFoodItems = [
  { id: 'f1', type: 'food', name: 'European Pizza', restaurant: 'Cafenio Coffee Club', image: require('../../../assets/food/european-pizza.png') },
  { id: 'f2', type: 'food', name: 'Buffalo Pizza', restaurant: 'Cafenio Coffee Club', image: require('../../../assets/food/buffalo-pizza.png') },
  { id: 'f3', type: 'food', name: 'Burger Ferguson', restaurant: 'Spicy Restaurant', image: require('../../../assets/food/burger-ferguson.png') },
  { id: 'f4', type: 'food', name: "Rockin' Burgers", restaurant: 'Spicy Restaurant', image: require('../../../assets/food/rockin-burgers.png') },
  { id: 'f5', type: 'food', name: 'Classic Cheeseburger', restaurant: 'Rose Garden Restaurant', image: require('../../../assets/food/classic-cheeseburger.png') },
  { id: 'f6', type: 'food', name: 'Quinoa Power Bowl', restaurant: 'Green Bowl Kitchen', image: require('../../../assets/food/quinoa-bowl.png') },
  { id: 'f7', type: 'food', name: 'Spicy Ramen', restaurant: 'Pansi Restaurant', image: require('../../../assets/food/spicy-ramen.png') },
];

const recentKeywords = ['Burger', 'Sandwich', 'Pizza', 'Salad'];

export default function SearchScreen() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');

  const trimmedQuery = query.trim().toLowerCase();
  const isSearching = trimmedQuery.length > 0;

  const matchedRestaurants = useMemo(() => {
    if (!isSearching) return [];
    return allRestaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(trimmedQuery) ||
        r.tags.some((tag) => tag.includes(trimmedQuery))
    );
  }, [trimmedQuery]);

  const matchedFoodItems = useMemo(() => {
    if (!isSearching) return [];
    return allFoodItems.filter(
      (item) =>
        item.name.toLowerCase().includes(trimmedQuery) ||
        item.restaurant.toLowerCase().includes(trimmedQuery)
    );
  }, [trimmedQuery]);

  const hasResults = matchedRestaurants.length > 0 || matchedFoodItems.length > 0;

  const goToRestaurant = (restaurantName) => {
    navigation.navigate('RestaurantViewScreen', { restaurantName });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconButton}
          >
            <ChevronLeft size={20} color="#374151" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.cartButton}>
            <ShoppingBag size={18} color="#fff" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Search input */}
        <View style={styles.searchInputContainer}>
          <Search size={18} color="#9CA3AF" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search dishes, restaurants"
            placeholderTextColor="#9CA3AF"
            autoFocus
            style={styles.searchInput}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <X size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        {isSearching ? (
          <View style={styles.section}>
            {!hasResults && (
              <Text style={{ color: '#9CA3AF', paddingHorizontal: 20, marginTop: 16 }}>
                No results for "{query}"
              </Text>
            )}

            {matchedRestaurants.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Restaurants</Text>
                {matchedRestaurants.map((r) => (
                  <TouchableOpacity
                    key={r.id}
                    style={styles.suggestedRow}
                    onPress={() => goToRestaurant(r.name)}
                  >
                    <Image source={r.image} style={styles.suggestedImage} resizeMode="cover" />
                    <View style={styles.suggestedInfo}>
                      <Text style={styles.suggestedName}>{r.name}</Text>
                      <View style={styles.suggestedRatingRow}>
                        <Star size={13} color="#F59E0B" fill="#F59E0B" />
                        <Text style={styles.suggestedRating}>{r.rating}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            )}

            {matchedFoodItems.length > 0 && (
              <>
                <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Dishes</Text>
                <View style={styles.fastFoodRow}>
                  {matchedFoodItems.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.fastFoodCard}
                      onPress={() => goToRestaurant(item.restaurant)}
                    >
                      <Image source={item.image} style={styles.fastFoodImage} resizeMode="cover" />
                      <Text style={styles.fastFoodName}>{item.name}</Text>
                      <Text style={styles.fastFoodRestaurant}>{item.restaurant}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </View>
        ) : (
          <>
            <View style={styles.recentSection}>
              <Text style={styles.sectionTitle}>Recent Keywords</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.keywordsRow}
              >
                {recentKeywords.map((word, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => setQuery(word)}
                    style={styles.keywordChip}
                  >
                    <Text style={styles.keywordText}>{word}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Suggested Restaurants</Text>
              {allRestaurants.slice(0, 3).map((r) => (
                <TouchableOpacity
                  key={r.id}
                  style={styles.suggestedRow}
                  onPress={() => goToRestaurant(r.name)}
                >
                  <Image source={r.image} style={styles.suggestedImage} resizeMode="cover" />
                  <View style={styles.suggestedInfo}>
                    <Text style={styles.suggestedName}>{r.name}</Text>
                    <View style={styles.suggestedRatingRow}>
                      <Star size={13} color="#F59E0B" fill="#F59E0B" />
                      <Text style={styles.suggestedRating}>{r.rating}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <View style={[styles.section, styles.lastSection]}>
              <Text style={styles.sectionTitle}>Popular Fast Food</Text>
              <View style={styles.fastFoodRow}>
                {allFoodItems.slice(0, 2).map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.fastFoodCard}
                    onPress={() => goToRestaurant(item.restaurant)}
                  >
                    <Image source={item.image} style={styles.fastFoodImage} resizeMode="cover" />
                    <Text style={styles.fastFoodName}>{item.name}</Text>
                    <Text style={styles.fastFoodRestaurant}>{item.restaurant}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}