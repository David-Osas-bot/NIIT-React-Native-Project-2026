import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import CategoryGridItem from './CategoryGridItem';
import { allCategories } from './categories';
import { styles } from './FoodCategoryScreen.styles';

export default function FoodCategoryScreen() {
  const navigation = useNavigation();

  const gridCategories = allCategories.filter((cat) => cat.id !== 'all');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft size={20} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Categories</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <View style={styles.grid}>
          {gridCategories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => navigation.navigate('CategoryDetailScreen', { category: cat })}
            >
              <CategoryGridItem category={cat} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}