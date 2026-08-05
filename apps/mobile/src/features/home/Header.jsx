import { View, Text, TouchableOpacity } from 'react-native';
import { Menu, ChevronDown, ShoppingBag } from 'lucide-react-native';
import { styles } from './Header.styles';

export default function Header() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton}>
        <Menu size={20} color="#374151" />
      </TouchableOpacity>

      <View style={styles.deliverToContainer}>
        <Text style={styles.deliverToLabel}>DELIVER TO</Text>
        <View style={styles.deliverToRow}>
          <Text style={styles.deliverToText}>Halal Lab office</Text>
          <ChevronDown size={16} color="#374151" />
        </View>
      </View>

      <TouchableOpacity style={styles.cartButton}>
        <ShoppingBag size={18} color="#fff" />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>2</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}