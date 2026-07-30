import { useState } from 'react';
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

// Add your own image paths here
const suggestedRestaurants = [
  { id: '1', name: 'Pansi Restaurant', rating: 4.7, image: require('../../../assets/restaurants/pansi.png') },
  { id: '2', name: 'American Spicy Burger Shop', rating: 4.3, image: require('../../../assets/restaurants/spicy-burger.png') },
  { id: '3', name: 'Cafenio Coffee Club', rating: 4.0, image: require('../../../assets/restaurants/cafenio.png') },
];

const popularFastFood = [
  { id: '1', name: 'European Pizza', restaurant: 'Uttora Coffee House', image: require('../../../assets/food/european-pizza.png') },
  { id: '2', name: 'Buffalo Pizza', restaurant: 'Cafenio Coffee Club', image: require('../../../assets/food/buffalo-pizza.png') },
];

const recentKeywords = ['Burger', 'Sandwich', 'Pizza', 'Sandwich'];

export default function SearchScreen() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');

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

        {/* Recent keywords */}
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

        {/* Suggested restaurants */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suggested Restaurants</Text>
          {suggestedRestaurants.map((r) => (
            <TouchableOpacity key={r.id} style={styles.suggestedRow}>
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

        {/* Popular fast food */}
        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Popular Fast Food</Text>
          <View style={styles.fastFoodRow}>
            {popularFastFood.map((item) => (
              <TouchableOpacity key={item.id} style={styles.fastFoodCard}>
                <Image source={item.image} style={styles.fastFoodImage} resizeMode="cover" />
                <Text style={styles.fastFoodName}>{item.name}</Text>
                <Text style={styles.fastFoodRestaurant}>{item.restaurant}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}