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
  Dimensions,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Svg, { Path, Circle, Line, Text as SvgText } from 'react-native-svg';
// src/features/chef/dashboard/ -> src/shared/ is 3 levels up.
import { apiRequest } from '../../../shared/api';
import { clearToken } from '../../../shared/authToken';
import styles from './SellerDashboardScreen.styles';

const { width } = Dimensions.get('window');

// Local-only, no backend support for multiple branches/locations exists in
// the API — this stays as static UI like your original design.
const locations = [
  'Halal Lab Office',
  'Downtown Branch',
  'Mall Branch',
  'Airport Branch',
];

const SellerDashboardScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('Halal Lab Office');
  const [showDropdown, setShowDropdown] = useState(false);
  const [timeframe, setTimeframe] = useState('daily');
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
      // Direct fetch rather than trusting AsyncStorage's 'chefData' cache —
      // that cache is only populated once ChefMenuScreen has been visited,
      // so it can leave this header blank if Dashboard is the first chef
      // screen the user lands on after login.
      const profile = await apiRequest('/profile', { method: 'GET' });
      const user = profile?.user || {};
      setChefData({ name: user.name || 'Chef', avatar: user.avatar || '' });
    } catch (error) {
      console.log('Error loading chef data:', error);
    }
  };

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const data = await apiRequest('/dashboard', { method: 'GET' });
      setDashboard(data);

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
            return { id: item.food, name: item.name, totalQuantity: item.totalQuantity };
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

  // There's no time-series endpoint (only revenue.today / .thisWeek /
  // .total as single numbers), so each "timeframe" plots just the one real
  // number we have for it as a flat reference line — same visual chart as
  // your original design, but not fabricating a trend that doesn't exist.
  const revenue = dashboard?.revenue || {};
  const timeframeValue = {
    daily: revenue.today ?? 0,
    weekly: revenue.thisWeek ?? 0,
    monthly: revenue.total ?? 0,
  };
  const currentTotal = timeframeValue[timeframe];
  const chartPoints = [
    { time: 'Start', revenue: currentTotal },
    { time: 'Now', revenue: currentTotal },
  ];

  const renderChart = () => {
    const data = chartPoints;
    const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);
    const chartHeight = 150;
    const chartWidth = width - 80;
    const padding = 20;

    const getY = (value) => chartHeight - (value / maxRevenue) * chartHeight;
    const getX = (index) => (index / (data.length - 1)) * chartWidth;

    let path = '';
    data.forEach((item, index) => {
      const x = getX(index) + padding;
      const y = getY(item.revenue) + padding;
      path += index === 0 ? `M${x},${y}` : ` L${x},${y}`;
    });

    return (
      <Svg height={chartHeight + padding * 2} width={chartWidth + padding * 2}>
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = padding + chartHeight - ratio * chartHeight;
          return (
            <Line key={ratio} x1={padding} y1={y} x2={chartWidth + padding} y2={y} stroke="#E5E5EA" strokeWidth="1" strokeDasharray="4,4" />
          );
        })}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const y = padding + chartHeight - ratio * chartHeight;
          const value = Math.round(maxRevenue * ratio);
          return (
            <SvgText key={ratio} x={2} y={y + 4} fontSize="10" fill="#8E8E93">${value}</SvgText>
          );
        })}
        <Path d={path} stroke="#4A90D9" strokeWidth="2.5" fill="none" />
        <Path
          d={`${path} L${getX(data.length - 1) + padding},${chartHeight + padding} L${padding},${chartHeight + padding} Z`}
          fill="#4A90D9"
          opacity="0.1"
        />
        {data.map((item, index) => {
          const x = getX(index) + padding;
          const y = getY(item.revenue) + padding;
          return <Circle key={index} cx={x} cy={y} r="4" fill="#4A90D9" />;
        })}
      </Svg>
    );
  };

  const handleAvatarPress = () => navigation.navigate('PersonalProfile');
  const handleHamburgerPress = () => navigation.navigate('ChefMenu');
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setShowDropdown(false);
  };
  const handleRunningOrdersPress = () => navigation.navigate('RunningOrders');
  const handleSeeReviews = () => navigation.navigate('ChefReview');
  const handleSeeAllPopular = () => navigation.navigate('MyFood');

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
      <Text style={styles.popularItemOrders}>{item.totalQuantity} orders</Text>
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
  const reviews = dashboard?.reviews || {};

  return (
    <SafeAreaView style={styles.safeArea}>
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

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Location Dropdown — static, no backend for multi-branch exists */}
        <View style={styles.locationContainer}>
          <TouchableOpacity style={styles.locationButton} onPress={() => setShowDropdown(!showDropdown)}>
            <Feather name="map-pin" size={18} color="#FF6B35" />
            <Text style={styles.locationText}>{selectedLocation}</Text>
            <Feather name={showDropdown ? 'chevron-up' : 'chevron-down'} size={18} color="#8E8E93" />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownList}>
              {locations.map((location) => (
                <TouchableOpacity
                  key={location}
                  style={[styles.dropdownItem, selectedLocation === location && styles.dropdownItemSelected]}
                  onPress={() => handleLocationSelect(location)}
                >
                  <Text style={[styles.dropdownItemText, selectedLocation === location && styles.dropdownItemTextSelected]}>
                    {location}
                  </Text>
                  {selectedLocation === location && <Feather name="check" size={16} color="#FF6B35" />}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Stats Cards — real values */}
        <View style={styles.statsRow}>
          <TouchableOpacity style={styles.statCard} onPress={handleRunningOrdersPress}>
            <Text style={styles.statNumber}>{orders.running ?? 0}</Text>
            <Text style={styles.statLabel}>RUNNING ORDERS</Text>
          </TouchableOpacity>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{orders.requests ?? 0}</Text>
            <Text style={styles.statLabel}>ORDER REQUEST</Text>
          </View>
        </View>

        {/* Revenue Chart */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Total Revenue</Text>
          </View>

          <Text style={styles.totalRevenue}>${currentTotal}</Text>

          <View style={styles.timeframeSelector}>
            {['daily', 'weekly', 'monthly'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[styles.timeframeOption, timeframe === option && styles.timeframeOptionActive]}
                onPress={() => setTimeframe(option)}
              >
                <Text style={[styles.timeframeText, timeframe === option && styles.timeframeTextActive]}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.chartContainer}>{renderChart()}</View>
        </View>

        {/* Reviews Section — real average/total */}
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

        {/* Popular Items — real data, enriched via GET /food/{id} */}
        <View style={styles.popularSection}>
          <View style={styles.popularHeader}>
            <Text style={styles.popularTitle}>Populer Items This Weeks</Text>
            <TouchableOpacity onPress={handleSeeAllPopular}>
              <Text style={styles.popularSeeAll}>[See All]</Text>
            </TouchableOpacity>
          </View>
          {popularItems.length === 0 ? (
            <Text style={{ color: '#8E8E93', paddingHorizontal: 4 }}>
              No orders yet — this fills in automatically once you have some.
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