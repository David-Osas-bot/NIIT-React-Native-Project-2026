import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// src/features/chef/dashboard/ -> src/shared/ is 3 levels up.
import { apiRequest } from '../../../shared/api';
import { clearToken } from '../../../shared/authToken';
import styles from './SellerDashboardScreen.styles';

const SellerDashboardScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [chefData, setChefData] = useState({ name: '', avatar: '' });
  const [dashboard, setDashboard] = useState(null);
  const [popularItems, setPopularItems] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadDashboard();
      loadChefData();
    }, [])
  );

  const loadChefData = async () => {
    try {
      const storedChef = await AsyncStorage.getItem('chefData');
      if (storedChef) {
        const parsed = JSON.parse(storedChef);
        setChefData({
          name: parsed.name || 'Chef',
          avatar: parsed.avatar || '',
        });
      }
    } catch (error) {
      console.log('Error loading chef data:', error);
    }
  };

  const loadDashboard = async () => {
    try {
      setLoading(true);
      // Confirmed schema: GET /dashboard -> { restaurant, revenue: { total,
      // today, thisWeek }, orders: { requests, running, delivered,
      // cancelled }, popularItems: [{ food, name, totalQuantity }],
      // reviews: { averageRating, totalReviews, recent } }
      const data = await apiRequest('/dashboard', { method: 'GET' });
      setDashboard(data);

      // popularItems only gives { food (id), name, totalQuantity } — no
      // image or price — so we enrich each one with a GET /food/{id} call
      // to get the fields the card UI actually needs.
      const items = data?.popularItems || [];
      const enriched = await Promise.all(
        items.map(async (item) => {
          try {
            const food = await apiRequest(`/food/${item.food}`, { method: 'GET' });
            return {
              id: item.food,
              name: item.name,
              totalQuantity: item.totalQuantity,
              price: food?.price ?? food?.food?.price,
              image: food?.image ?? food?.food?.image,
            };
          } catch {
            // If a single food item fails to load (e.g. deleted since),
            // still show the card with what we have.
            return {
              id: item.food,
              name: item.name,
              totalQuantity: item.totalQuantity,
              price: undefined,
              image: undefined,
            };
          }
        })
      );
      setPopularItems(enriched);
    } catch (error) {
      if (error.status === 401) {
        await clearToken();
        navigation.replace('Login');
        return;
      }
      console.log('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return '?';
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleAvatarPress = () => {
    navigation.navigate('PersonalProfile');
  };

  const handleHamburgerPress = () => {
    navigation.navigate('ChefMenu');
  };

  const handleRunningOrdersPress = () => {
    navigation.navigate('RunningOrders');
  };

  const handleSeeReviews = () => {
    navigation.navigate('ChefReview');
  };

  const handleSeeAllPopular = () => {
    navigation.navigate('MyFood');
  };

  const renderPopularItem = ({ item }) => (
    <TouchableOpacity style={styles.popularItemCard}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.popularItemImage} />
      ) : (
        <View style={[styles.popularItemImage, { backgroundColor: '#F2F2F7' }]} />
      )}
      <Text style={styles.popularItemName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.popularItemPrice}>
        {item.price !== undefined ? `$${item.price}` : '—'}
      </Text>
      <Text style={styles.popularItemOrders}>{item.totalQuantity} sold</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  const orders = dashboard?.orders || {};
  const revenue = dashboard?.revenue || {};
  const reviews = dashboard?.reviews || {};

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleHamburgerPress} style={styles.headerButton}>
          <Feather name="menu" size={24} color="#1C1C1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity onPress={handleAvatarPress} style={styles.headerButton}>
          {chefData.avatar ? (
            <Image source={{ uri: chefData.avatar }} style={styles.headerAvatar} />
          ) : (
            <View style={styles.headerAvatarPlaceholder}>
              <Text style={styles.headerAvatarText}>{getInitials(chefData.name)}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Cards — real values from GET /dashboard */}
        <View style={styles.statsRow}>
          <TouchableOpacity
            style={styles.statCard}
            onPress={handleRunningOrdersPress}
          >
            <Text style={styles.statNumber}>{orders.running ?? 0}</Text>
            <Text style={styles.statLabel}>RUNNING ORDERS</Text>
          </TouchableOpacity>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{orders.requests ?? 0}</Text>
            <Text style={styles.statLabel}>ORDER REQUEST</Text>
          </View>
        </View>

        {/* Revenue Section — no time-series endpoint exists, so this shows
            the three real numbers the API actually gives us instead of a
            fabricated hourly/weekly/monthly chart. */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Revenue</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>${revenue.today ?? 0}</Text>
              <Text style={styles.statLabel}>TODAY</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>${revenue.thisWeek ?? 0}</Text>
              <Text style={styles.statLabel}>THIS WEEK</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>${revenue.total ?? 0}</Text>
              <Text style={styles.statLabel}>ALL TIME</Text>
            </View>
          </View>
        </View>

        {/* Reviews Section — real average/total from GET /dashboard */}
        <View style={styles.reviewsCard}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.reviewsTitle}>Reviews</Text>
            <TouchableOpacity onPress={handleSeeReviews}>
              <Text style={styles.reviewsSeeAll}>[See All Reviews]</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reviewsRatingRow}>
            <Text style={styles.reviewsRating}>⭐ {reviews.averageRating ?? 0}</Text>
            <Text style={styles.reviewsTotal}>Total {reviews.totalReviews ?? 0} Reviews</Text>
          </View>
        </View>

        {/* Popular Items — real data enriched with per-item GET /food/{id} */}
        <View style={styles.popularSection}>
          <View style={styles.popularHeader}>
            <Text style={styles.popularTitle}>Popular Items</Text>
            <TouchableOpacity onPress={handleSeeAllPopular}>
              <Text style={styles.popularSeeAll}>[See All]</Text>
            </TouchableOpacity>
          </View>
          {popularItems.length === 0 ? (
            <Text style={{ color: '#8E8E93', paddingHorizontal: 4 }}>
              No orders yet — popular items will show up here once you have some.
            </Text>
          ) : (
            <FlatList
              horizontal
              data={popularItems}
              renderItem={renderPopularItem}
              keyExtractor={(item, index) => item.id || String(index)}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.popularList}
            />
          )}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SellerDashboardScreen;