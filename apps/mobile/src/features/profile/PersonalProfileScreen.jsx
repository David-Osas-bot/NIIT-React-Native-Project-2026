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
  Dimensions,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// src/features/profile/ -> src/shared/ is 2 levels up.
import { apiRequest } from '../../shared/api';
import { clearToken } from '../../shared/authToken';
import styles from './PersonalProfileScreen.styles';

const { width, height } = Dimensions.get('window');

const PersonalProfileScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: '',
    bio: '',
    email: '',
    phone: '',
    avatar: '',
  });
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
      // phone, bio, avatar, location: { lat, lng } } }
      const profile = await apiRequest('/profile', { method: 'GET' });
      const user = profile?.user || {};

      const updatedUserData = {
        name: user.name || '',
        bio: user.bio || '',
        email: user.email || '',
        phone: user.phone || '',
        avatar: user.avatar || '',
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
      // Fall back to cached data on a transient network error.
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

  const handleEditProfile = () => {
    navigation.navigate('EditProfile', { userData });
  };

  const handleAvatarPress = () => {
    if (userData.avatar) {
      setImageModalVisible(true);
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

        {/* Edit Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleEditProfile}
        >
          <Feather name="edit-2" size={18} color="#FF6B35" />
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>

        {/* Personal Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>FULL NAME</Text>
            <View style={styles.infoRow}>
              <Feather name="user" size={20} style={styles.infoIcon} />
              <Text style={styles.infoValue}>{userData.name || 'Not set'}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>EMAIL</Text>
            <View style={styles.infoRow}>
              <Feather name="mail" size={20} style={styles.infoIcon} />
              <Text style={styles.infoValue}>{userData.email || 'Not set'}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>PHONE NUMBER</Text>
            <View style={styles.infoRow}>
              <Feather name="phone" size={20} style={styles.infoIcon} />
              <Text style={styles.infoValue}>{userData.phone || 'Not set'}</Text>
            </View>
          </View>
        </View>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={20} color="#FF6B35" />
          <Text style={styles.backButtonText}>Back to Menu</Text>
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

export default PersonalProfileScreen;