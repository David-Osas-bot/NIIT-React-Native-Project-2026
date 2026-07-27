import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './categories.styles';

export const allCategories = [
  { id: 'all', label: 'All', image: require('../../../assets/categories/all.png'), active: true },
  { id: 'hotdog', label: 'Hot Dog', image: require('../../../assets/categories/hotdog.png') },
  { id: 'burger', label: 'Burger', image: require('../../../assets/categories/burger.png') },
  { id: 'pizza', label: 'Pizza', image: require('../../../assets/categories/pizza.png') },
  { id: 'chicken', label: 'Chicken', image: require('../../../assets/categories/chicken.png') },
  { id: 'drinks', label: 'Drinks', image: require('../../../assets/categories/drinks.png') },
  { id: 'salad', label: 'Salad', image: require('../../../assets/categories/salad.png') },
  { id: 'dessert', label: 'Dessert', image: require('../../../assets/categories/dessert.png') },
  { id: 'noodles', label: 'Noodles', image: require('../../../assets/categories/noodles.png') },
];

const featuredCategories = allCategories.filter((cat) =>
  ['all', 'hotdog', 'burger', 'pizza'].includes(cat.id)
);

export default function Categories() {
  const navigation = useNavigation();

  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>All Categories</Text>
        <TouchableOpacity onPress={() => navigation.navigate('FoodCategoryScreen')}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {featuredCategories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.pill, cat.active ? styles.pillActive : styles.pillInactive]}
          >
            <Image source={cat.image} style={styles.pillImage} resizeMode="cover" />
            <Text style={[styles.pillText, cat.active ? styles.pillTextActive : styles.pillTextInactive]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}