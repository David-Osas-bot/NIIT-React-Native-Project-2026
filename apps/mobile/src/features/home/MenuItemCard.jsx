import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Plus } from 'lucide-react-native';
import { styles } from './MenuItemCard.styles';

export default function MenuItemCard({ item }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.restaurant} numberOfLines={1}>{item.restaurant}</Text>

      <View style={styles.footerRow}>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}