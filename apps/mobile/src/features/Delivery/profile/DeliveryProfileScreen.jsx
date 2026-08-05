import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Platform, ActivityIndicator } from 'react-native';
import { styles } from './DeliveryProfileScreen.styles';
import DeliveryBottomNav from '../DeliveryBottomNav';

const BASE_URL = 'https://niit-react-native-project-2026.onrender.com';

export default function DeliveryProfileScreen({ navigation }) {
  const [profile, setProfile] = useState({
    name: '',
    tagline: 'Delivery Partner',
    fullName: '',
    email: '',
    phone: '',
    vehicle: 'Motorcycle', // Fallback as vehicle isn't explicitly in the base User schema
    rating: 4.9,           // Fallback stats
    totalDeliveries: 248,  // Fallback stats
    acceptanceRate: '96%', // Fallback stats
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      // GET /profile - Fetch current logged-in user's profile
      const response = await fetch(`${BASE_URL}/profile`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        // 'Authorization': `Bearer ${userToken}` // Add your auth token here
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const userData = await response.json();

      // Map backend User schema to UI
      setProfile((prev) => ({
        ...prev,
        name: userData.name || 'User',
        fullName: userData.name || 'User',
        email: userData.email || 'No email provided',
        phone: userData.phone || 'No phone provided',
        tagline: userData.bio || prev.tagline,
        // If avatar or location are needed, they are available in userData.avatar and userData.location
      }));

    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { id: 'wallet', icon: '💳', label: 'Wallet', screen: 'DeliveryWalletScreen' },
    { id: 'notifications', icon: '🔔', label: 'Messages & Notifications', screen: 'DeliveryMessageScreen' },
    { id: 'support', icon: '❓', label: 'Help & Support', screen: 'DeliveryHelpSupportScreen' },
    { id: 'settings', icon: '⚙️', label: 'Settings', screen: 'DeliverySettingsScreen' },
  ];

  const handleMenuPress = (item) => {
    if (item.screen) {
      navigation.navigate(item.screen);
    }
  };

  const handleLogout = () => {
    // TODO: clear auth session/token, then reset navigation to your auth stack
    navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('DeliveryEditProfileScreen')}>
          <Text style={styles.editLink}>EDIT</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FE724C" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

          <View style={styles.profileHeader}>
            <View style={styles.avatarPlaceholder} />
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileTagline}>{profile.tagline}</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statChip}>
              <Text style={styles.statValue}>⭐ {profile.rating}</Text>
              <Text style={styles.statLabel}>RATING</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statChip}>
              <Text style={styles.statValue}>{profile.totalDeliveries}</Text>
              <Text style={styles.statLabel}>DELIVERIES</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statChip}>
              <Text style={styles.statValue}>{profile.acceptanceRate}</Text>
              <Text style={styles.statLabel}>ACCEPTANCE</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIconWrap}>
                <Text style={styles.infoIcon}>👤</Text>
              </View>
              <View>
                <Text style={styles.infoLabel}>FULL NAME</Text>
                <Text style={styles.infoValue}>{profile.fullName}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIconWrap}>
                <Text style={styles.infoIcon}>✉️</Text>
              </View>
              <View>
                <Text style={styles.infoLabel}>EMAIL</Text>
                <Text style={styles.infoValue}>{profile.email}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIconWrap}>
                <Text style={styles.infoIcon}>📞</Text>
              </View>
              <View>
                <Text style={styles.infoLabel}>PHONE NUMBER</Text>
                <Text style={styles.infoValue}>{profile.phone}</Text>
              </View>
            </View>

            <View style={[styles.infoRow, { marginBottom: 0 }]}>
              <View style={styles.infoIconWrap}>
                <Text style={styles.infoIcon}>🏍️</Text>
              </View>
              <View>
                <Text style={styles.infoLabel}>VEHICLE</Text>
                <Text style={styles.infoValue}>{profile.vehicle}</Text>
              </View>
            </View>
          </View>

          <View style={styles.menuCard}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.menuRow, index === menuItems.length - 1 && { borderBottomWidth: 0 }]}
                onPress={() => handleMenuPress(item)}
              >
                <View style={styles.menuLeft}>
                  <Text style={styles.menuIcon}>{item.icon}</Text>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </View>
                <Text style={styles.menuChevron}>{'>'}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>

        </ScrollView>
      )}

      <DeliveryBottomNav active="profile" />
    </SafeAreaView>
  );
}