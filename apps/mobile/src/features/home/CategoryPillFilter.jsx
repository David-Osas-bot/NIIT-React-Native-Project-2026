import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './CategoryPillFilter.styles';

export default function CategoryPillFilter({ categories = [], activeCategory, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((cat, index) => {
        const isActive = activeCategory ? activeCategory === cat : index === 0;
        return (
          <TouchableOpacity
            key={`${cat}-${index}`}
            onPress={() => onSelect(cat)}
            style={[styles.pill, isActive ? styles.pillActive : styles.pillInactive]}
          >
            <Text style={[styles.pillText, isActive ? styles.pillTextActive : styles.pillTextInactive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}cd