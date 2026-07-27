import { TouchableOpacity, Text } from 'react-native';
import { Search } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './SearchBar.styles';

export default function SearchBar() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('SearchScreen')}
      activeOpacity={0.7}
      style={styles.container}
    >
      <Search size={18} color="#9CA3AF" />
      <Text style={styles.placeholderText}>Search dishes, restaurants</Text>
    </TouchableOpacity>
  );
}