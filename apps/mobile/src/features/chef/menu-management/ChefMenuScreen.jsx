import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: fix these two relative paths so they actually point at your
// shared/api.js and shared/authToken.js files based on where this screen
// lives in your folder structure (adjust the number of '../').
import { apiRequest } from '../../../shared/api';
import { clearToken } from '../../../shared/authToken';
import styles from './ChefMenuScreen.styles';

const ChefMenuScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [chefData, setChefData] = useState({
    name: '',
    balance: '0.00',
    orders: '0',
  });

  // Load chef data every time this screen comes into focus.
  useFocusEffect(
    React.useCallback(() => {
      loadChefData();
    }, [])
  );

  const loadChefData = async () => {
    try {
      setLoading(true);
      await fetchChefFromAPI();
    } catch (error) {
      console.log('Error loading chef data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChefFromAPI = async () => {
    try {
      // Pull the pieces of this screen from three separate endpoints, since
      // there's no single "chef profile" endpoint that returns all of them
      // together.
      const [profile, balanceRes, dashboard] = await Promise.all([
        apiRequest('/profile', { method: 'GET' }),
        apiRequest('/payments/balance', { method: 'GET' }),
        apiRequest('/dashboard', { method: 'GET' }),
      ]);

      // Confirmed field names from Swagger:
      // GET /profile        -> { user: { id, name, email, role, phone, bio, avatar, location } }
      // GET /payments/balance -> { balance: 0 }
      // GET /dashboard      -> { restaurant, revenue, orders: { requests, running, delivered, cancelled }, popularItems, reviews }
      const orderCounts = dashboard?.orders;
      const totalOrders = orderCounts
        ? (orderCounts.requests || 0) +
          (orderCounts.running || 0) +
          (orderCounts.delivered || 0) +
          (orderCounts.cancelled || 0)
        : 0;

      const newChefData = {
        name: profile?.user?.name || 'Chef',
        balance: String(balanceRes?.balance ?? '0.00'),
        orders: String(totalOrders),
      };

      setChefData(newChefData);
      await AsyncStorage.setItem('chefData', JSON.stringify(newChefData));
    } catch (error) {
      // apiRequest attaches the HTTP status to error.status (see api.js),
      // so we can reliably detect an expired/invalid session here.
      if (error.status === 401) {
        await clearToken();
        await AsyncStorage.removeItem('chefData');
        navigation.replace('Login');
        return;
      }

      console.log('API fetch error:', error);
      // Fall back to whatever we last had cached, so the screen isn't blank
      // on a transient network error.
      const storedChef = await AsyncStorage.getItem('chefData');
      if (storedChef) {
        setChefData(JSON.parse(storedChef));
      }
    }
  };

  const handleMenuItemPress = (screenName) => {
    if (screenName === 'Logout') {
      handleLogout();
      return;
    }

    if (screenName === 'Withdrawal') {
      navigation.navigate('Withdrawal');
      return;
    }

    const screensNotBuilt = ['WithdrawalHistory', 'NumberOfOrders', 'UserReviews'];
    if (screensNotBuilt.includes(screenName)) {
      Alert.alert('Coming Soon', `${screenName} will be available soon!`);
      return;
    }

    navigation.navigate(screenName, { chefData });
  };

  const handleWithdraw = () => {
    navigation.navigate('Withdrawal');
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('chefData');
      await clearToken();
      navigation.replace('Login');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const handleBackPress = () => {
    navigation.navigate('Dashboard');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
        <Text style={styles.loadingText}>Loading chef profile...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Orange Card Header with Rounded Corners */}
        <View style={styles.orangeCard}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
          >
            <Feather name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>My Profile</Text>

            <View style={styles.balanceSection}>
              <Text style={styles.balanceLabel}>Available Balance</Text>
              <Text style={styles.balanceAmount}>${chefData.balance || '0.00'}</Text>

              <TouchableOpacity
                style={styles.withdrawButton}
                onPress={handleWithdraw}
              >
                <Text style={styles.withdrawText}>Withdraw</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Menu Section 1: Personal Info & Settings */}
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuItemPress('PersonalInfo')}
          >
            <View style={styles.menuItemLeft}>
              <Feather name="user" size={22} style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Personal Info</Text>
            </View>
            <Feather name="chevron-right" size={20} style={styles.chevronIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.lastMenuItem]}
            onPress={() => handleMenuItemPress('Settings')}
          >
            <View style={styles.menuItemLeft}>
              <Feather name="settings" size={22} style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
            <Feather name="chevron-right" size={20} style={styles.chevronIcon} />
          </TouchableOpacity>
        </View>

        {/* Menu Section 2: Withdrawal History & Number of Orders */}
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuItemPress('WithdrawalHistory')}
          >
            <View style={styles.menuItemLeft}>
              <Feather name="clock" size={22} style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Withdrawal History</Text>
            </View>
            <Feather name="chevron-right" size={20} style={styles.chevronIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.lastMenuItem]}
            onPress={() => handleMenuItemPress('NumberOfOrders')}
          >
            <View style={styles.menuItemLeft}>
              <Feather name="shopping-bag" size={22} style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Number of Orders</Text>
            </View>
            <View style={styles.menuItemRight}>
              <Text style={styles.orderCount}>{chefData.orders || '0'}</Text>
              <Feather name="chevron-right" size={20} style={styles.chevronIcon} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Menu Section 3: User Reviews */}
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={[styles.menuItem, styles.lastMenuItem]}
            onPress={() => handleMenuItemPress('ChefReview')}
          >
            <View style={styles.menuItemLeft}>
              <Feather name="star" size={22} style={styles.menuIcon} />
              <Text style={styles.menuItemText}>User Reviews</Text>
            </View>
            <Feather name="chevron-right" size={20} style={styles.chevronIcon} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => handleMenuItemPress('Logout')}
        >
          <View style={styles.menuItemLeft}>
            <Feather name="log-out" size={22} style={styles.logoutIcon} />
            <Text style={styles.logoutText}>Log Out</Text>
          </View>
          <Feather name="chevron-right" size={20} style={styles.chevronIcon} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChefMenuScreen;