import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Image,
  Modal,
  Alert,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// src/features/menu/ -> src/shared/ is 2 levels up.
import { apiRequest } from '../../shared/api';
import { clearToken } from '../../shared/authToken';
import styles from './MenuListScreen.styles';

const MenuListScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    name: '',
    bio: '',
    avatar: '',
    email: '',
  });
  const [loading, setLoading] = useState(true);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      loadUserData();
    }, [])
  );

  const loadUserData = async () => {
    try {
      setLoading(true);
      await fetchUserFromAPI();
    } catch (error) {
      console.log('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserFromAPI = async () => {
    try {
      // Confirmed schema: GET /profile -> { user: { id, name, email, role,
      // phone, bio, avatar, location } }
      const profile = await apiRequest('/profile', { method: 'GET' });
      const user = profile?.user || {};

      const updatedUserData = {
        name: user.name || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
        email: user.email || '',
      };

      setUserData(updatedUserData);
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
    } catch (error) {
      if (error.status === 401) {
        await clearToken();
        await AsyncStorage.removeItem('userData');
        navigation.replace('Login');
        return;
      }
      console.log('API fetch error:', error);
      const storedUser = await AsyncStorage.getItem('userData');
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
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

  // NOTE on route names below: this maps each menu row to a Stack.Screen
  // name registered in CustomerStack. 'Favourite', 'Notifications', 'FAQs',
  // 'UserReviews', and 'Settings' aren't built/registered anywhere yet —
  // tapping them will throw a navigation error until those screens exist.
  const handleMenuItemPress = (screenName) => {
    if (screenName === 'Logout') {
      handleLogout();
      return;
    }
    navigation.navigate(screenName, { userData });
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      await clearToken();
      navigation.replace('Login');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const handleAvatarPress = () => {
    if (userData.avatar) {
      setImageModalVisible(true);
    } else {
      Alert.alert('No Profile Picture', "You haven't set a profile picture yet. Go to Edit Profile to add one.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <TouchableOpacity
            onPress={handleAvatarPress}
            activeOpacity={0.8}
            style={styles.avatarTouchable}
          >
            {userData.avatar ? (
              <Image
                source={{ uri: userData.avatar }}
                style={styles.avatarImage}
              />
            ) : (
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>{getInitials(userData.name)}</Text>
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{userData.name || 'User'}</Text>
            <Text style={styles.userBio}>{userData.bio || 'No bio yet'}</Text>
          </View>
        </View>

        {/* Section 1: Personal Info & Addresses */}
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuItemPress('PersonalProfile')}
          >
            <View style={styles.menuItemLeft}>
              <Feather name="user" size={22} style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Personal Info</Text>
            </View>
            <Feather name="chevron-right" size={20} style={styles.chevronIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.lastMenuItem]}
            onPress={() => handleMenuItemPress('Addresses')}
          >
            <View style={styles.menuItemLeft}>
              <Feather name="map-pin" size={22} style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Addresses</Text>
            </View>
            <Feather name="chevron-right" size={20} style={styles.chevronIcon} />
          </TouchableOpacity>
        </View>

        {/* Section 2: Cart, Favourite, Notifications, Payment Method */}
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuItemPress('Cart')}
          >
            <View style={styles.menuItemLeft}>
              <Feather name="shopping-cart" size={22} style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Cart</Text>
            </View>
            <Feather name="chevron-right" size={20} style={styles.chevronIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuItemPress('Favourite')}
          >
            <View style={styles.menuItemLeft}>
              <Feather name="heart" size={22} style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Favourite</Text>
            </View>
            <Feather name="chevron-right" size={20} style={styles.chevronIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuItemPress('Notifications')}
          >
            <View style={styles.menuItemLeft}>
              <Feather name="bell" size={22} style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Notifications</Text>
            </View>
            <Feather name="chevron-right" size={20} style={styles.chevronIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.lastMenuItem]}
            onPress={() => handleMenuItemPress('PaymentMethod')}
          >
            <View style={styles.menuItemLeft}>
              <Feather name="credit-card" size={22} style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Payment Method</Text>
            </View>
            <Feather name="chevron-right" size={20} style={styles.chevronIcon} />
          </TouchableOpacity>
        </View>

        {/* Section 3: FAQs, User Reviews, Settings */}
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuItemPress('FAQs')}
          >
            <View style={styles.menuItemLeft}>
              <Feather name="help-circle" size={22} style={styles.menuIcon} />
              <Text style={styles.menuItemText}>FAQs</Text>
            </View>
            <Feather name="chevron-right" size={20} style={styles.chevronIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuItemPress('UserReviews')}
          >
            <View style={styles.menuItemLeft}>
              <Feather name="star" size={22} style={styles.menuIcon} />
              <Text style={styles.menuItemText}>User Reviews</Text>
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

        {/* Section 4: Logout */}
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

      {/* Image Full Screen Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setImageModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setImageModalVisible(false)}
            >
              <Feather name="x" size={28} color="#FFFFFF" />
            </TouchableOpacity>
            <Image
              source={{ uri: userData.avatar }}
              style={styles.modalImage}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default MenuListScreen;