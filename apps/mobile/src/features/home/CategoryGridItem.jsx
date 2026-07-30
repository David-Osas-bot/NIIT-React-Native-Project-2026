import { View, Text, Image } from 'react-native';
import { styles } from './CategoryGridItem.styles';

export default function CategoryGridItem({ category }) {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Image source={category.image} style={styles.image} resizeMode="cover" />
      </View>
      <Text style={styles.label} numberOfLines={1}>{category.label}</Text>
    </View>
  );
}