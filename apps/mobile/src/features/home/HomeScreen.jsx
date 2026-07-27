import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import SearchBar from './SearchBar';
import Categories from './categories';
import RestaurantCard from './RestaurantCard';
import { styles } from './HomeScreen.styles';

const restaurants = [
  {
    id: '1',
    name: 'Rose Garden Restaurant',
    tags: 'Burger - Chiken - Riche - Wings',
    rating: 4.7,
    delivery: 'Free',
    time: '20 min',
    image: require('../../../assets/restaurants/rose-garden.png'),
  },
  {
    id: '2',
    name: 'Green Bowl Kitchen',
    tags: 'Salad - Healthy - Bowl',
    rating: 4.8,
    delivery: 'Free',
    time: '15 min',
    image: require('../../../assets/restaurants/green-bowl.png'),
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <SearchBar />

        <Text style={styles.greeting}>
          Hey Halal, <Text style={styles.greetingBold}>Good Afternoon!</Text>
        </Text>

        <Categories />

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Open Restaurants</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RestaurantViewScreen')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {restaurants.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}