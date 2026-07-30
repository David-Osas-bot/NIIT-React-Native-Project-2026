import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { ChevronLeft, MoreHorizontal, Star, Truck, Clock } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MenuItemCard from './MenuItemCard';
import CategoryPillFilter from './CategoryPillFilter';
import FilterScreen from './FilterScreen';
import { styles } from './RestaurantViewScreen.styles';

const { width } = Dimensions.get('window');

// Add your own image paths here
const restaurants = [
  {
    id: '1',
    name: 'Spicy Restaurant',
    rating: 4.7,
    delivery: 'Free',
    time: '20 min',
    description:
      'Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
    coverImage: require('../../../assets/restaurants/spicy-restaurant-cover.png'),
    categories: ['Burger', 'Sandwich', 'Pizza', 'Sandwich'],
    menu: [
      { id: 'm1', name: 'Burger Ferguson', restaurant: 'Spicy Restaurant', price: 40, image: require('../../../assets/food/burger-ferguson.png') },
      { id: 'm2', name: "Rockin' Burgers", restaurant: 'Cafecafochino', price: 40, image: require('../../../assets/food/rockin-burgers.png') },
    ],
  },
  {
    id: '2',
    name: 'Rose Garden Restaurant',
    rating: 4.7,
    delivery: 'Free',
    time: '20 min',
    description: 'Fresh ingredients, bold flavors, and a menu built around comfort classics done right.',
    coverImage: require('../../../assets/restaurants/rose-garden-cover.png'),
    categories: ['Burger', 'Chicken', 'Wings'],
    menu: [
      { id: 'm3', name: 'Classic Cheeseburger', restaurant: 'Rose Garden Restaurant', price: 35, image: require('../../../assets/food/classic-cheeseburger.png') },
    ],
  },
  {
    id: '3',
    name: 'Green Bowl Kitchen',
    rating: 4.8,
    delivery: 'Free',
    time: '15 min',
    description: 'Healthy bowls and fresh salads made daily with locally sourced produce.',
    coverImage: require('../../../assets/restaurants/green-bowl-cover.png'),
    categories: ['Salad', 'Bowl', 'Healthy'],
    menu: [
      { id: 'm4', name: 'Quinoa Power Bowl', restaurant: 'Green Bowl Kitchen', price: 28, image: require('../../../assets/food/quinoa-bowl.png') },
    ],
  },
  {
    id: '4',
    name: 'Pansi Restaurant',
    rating: 4.7,
    delivery: 'Free',
    time: '25 min',
    description: 'A cozy spot serving up hearty local dishes with a modern twist.',
    coverImage: require('../../../assets/restaurants/pansi-cover.png'),
    categories: ['Noodles', 'Rice', 'Soup'],
    menu: [
      { id: 'm5', name: 'Spicy Ramen', restaurant: 'Pansi Restaurant', price: 32, image: require('../../../assets/food/spicy-ramen.png') },
    ],
  },
  {
    id: '5',
    name: 'Cafenio Coffee Club',
    rating: 4.0,
    delivery: 'Free',
    time: '10 min',
    description: 'Specialty coffee and light bites in a relaxed, welcoming atmosphere.',
    coverImage: require('../../../assets/restaurants/cafenio-cover.png'),
    categories: ['Coffee', 'Dessert', 'Pastry'],
    menu: [
      { id: 'm6', name: 'Buffalo Pizza', restaurant: 'Cafenio Coffee Club', price: 40, image: require('../../../assets/food/buffalo-pizza.png') },
    ],
  },
];

export default function RestaurantViewScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { restaurantName } = route.params ?? {};

  const initialIndex = restaurantName
    ? Math.max(restaurants.findIndex((r) => r.name === restaurantName), 0)
    : 0;

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [activeCategory, setActiveCategory] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(null);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (initialIndex > 0 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: initialIndex, animated: false });
    }
  }, []);

  const activeRestaurant = restaurants[activeIndex];

  const onScrollEnd = (event) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
      setActiveCategory(null);
    }
  };

  const filteredMenu = activeCategory
    ? activeRestaurant.menu.filter((item) => item.name.toLowerCase().includes(activeCategory.toLowerCase()))
    : activeRestaurant.menu;

  // Does the currently-displayed restaurant meet the applied rating filter?
  const meetsFilter = !appliedFilters || activeRestaurant.rating >= appliedFilters.rating;

  return (
    <SafeAreaView style={styles.container}>
      {/* Image carousel */}
      <View style={styles.carouselWrapper}>
        <FlatList
          ref={flatListRef}
          data={restaurants}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          onMomentumScrollEnd={onScrollEnd}
          getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
          renderItem={({ item }) => (
            <Image source={item.coverImage} style={styles.coverImage} resizeMode="cover" />
          )}
        />

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.overlayButton, styles.backButton]}
        >
          <ChevronLeft size={20} color="#111827" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilterVisible(true)}
          style={[styles.overlayButton, styles.moreButton]}
        >
          <MoreHorizontal size={20} color="#111827" />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={filteredMenu}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.menuRow}
          contentContainerStyle={styles.menuList}
          ListHeaderComponent={
            <>
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Star size={16} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.metaText}>{activeRestaurant.rating}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Truck size={16} color="#F97316" />
                  <Text style={styles.metaText}>{activeRestaurant.delivery}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Clock size={16} color="#F97316" />
                  <Text style={styles.metaText}>{activeRestaurant.time}</Text>
                </View>
              </View>

              <Text style={styles.name}>{activeRestaurant.name}</Text>
              <Text style={styles.description}>{activeRestaurant.description}</Text>

              {appliedFilters && !meetsFilter && (
                <Text style={styles.filterWarning}>
                  This restaurant is below your {appliedFilters.rating}+ star filter.
                </Text>
              )}

              <CategoryPillFilter
                categories={activeRestaurant.categories}
                activeCategory={activeCategory}
                onSelect={setActiveCategory}
              />

              <Text style={styles.menuHeading}>
                {activeCategory ?? activeRestaurant.categories[0]} ({activeRestaurant.menu.length})
              </Text>
            </>
          }
          renderItem={({ item }) => <MenuItemCard item={item} />}
        />
      </View>

      <FilterScreen
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={(filters) => {
          setAppliedFilters(filters);
        }}
      />
    </SafeAreaView>
  );
}