import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import styles from './ChefMenuScreen.styles';
import { apiRequest } from '../../../api/client';

const TABS = ['All', 'Breakfast', 'Lunch', 'Dinner'];

export default function ChefMenuScreen({ navigation }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const data = await apiRequest('/food');
      setFoods(data.foods || []);
    } catch (err) {
      setError('Could not load food list');
    } finally {
      setLoading(false);
    }
  };

  const filteredFoods =
    activeTab === 'All'
      ? foods
      : foods.filter(
          (item) => item.category?.toLowerCase() === activeTab.toLowerCase()
        );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
        >
          <Text>{'‹'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Food List</Text>
      </View>

      <View style={styles.tabsRow}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          <Text style={styles.totalText}>
            Total {String(filteredFoods.length).padStart(2, '0')} items
          </Text>
          <FlatList
            data={filteredFoods}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.thumbnail} />
                <View style={styles.infoWrapper}>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                  <View style={styles.ratingRow}>
                    <Text style={styles.ratingText}>★ {item.rating}</Text>
                    <Text style={styles.reviewText}>(reviews)</Text>
                  </View>
                </View>
                <View style={styles.rightColumn}>
                  <Text style={styles.price}>${item.price}</Text>
                  <Text style={styles.pickupText}>Pick UP</Text>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <Text style={{ textAlign: 'center', color: '#999', marginTop: 40 }}>
                No food items in this category
              </Text>
            }
          />
        </>
      )}
    </View>
  );
}