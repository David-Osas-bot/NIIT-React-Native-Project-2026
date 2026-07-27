import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Star, Truck, Clock } from 'lucide-react-native';
import { styles } from './RestaurantCard.styles';

export default function RestaurantCard({ restaurant }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={restaurant.image} style={styles.image} resizeMode="cover" />

      <Text style={styles.name}>{restaurant.name}</Text>
      <Text style={styles.tags}>{restaurant.tags}</Text>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Star size={14} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.metaText}>{restaurant.rating}</Text>
        </View>
        <View style={styles.metaItem}>
          <Truck size={14} color="#F97316" />
          <Text style={styles.metaText}>{restaurant.delivery}</Text>
        </View>
        <View style={styles.metaItem}>
          <Clock size={14} color="#F97316" />
          <Text style={styles.metaText}>{restaurant.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}