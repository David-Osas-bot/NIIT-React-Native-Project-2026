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
// src/features/profile/ -> src/shared/ is 2 levels up.
import { apiRequest } from '../../shared/api';
import { clearToken } from '../../shared/authToken';
import styles from './AddressesScreen.styles';

const AddressesScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadAddresses();
    }, [])
  );

  const loadAddresses = async () => {
    try {
      setLoading(true);
      // Confirmed schema: GET /address -> { addresses: [{ _id, owner, label,
      // street, apartment, postcode, lat, lng, isDefault }] }
      const data = await apiRequest('/address', { method: 'GET' });
      const list = data?.addresses || [];

      const normalized = list.map((addr) => ({
        id: addr._id,
        type: (addr.label || 'HOME').toUpperCase(),
        // There's no single "full address" string field from the API, so we
        // build a display string from the parts it does give us.
        address: [addr.street, addr.apartment, addr.postcode]
          .filter(Boolean)
          .join(', '),
        raw: addr,
      }));

      setAddresses(normalized);
    } catch (error) {
      if (error.status === 401) {
        await clearToken();
        navigation.replace('Login');
        return;
      }
      console.log('Error loading addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewAddress = () => {
    navigation.navigate('AddNewAddress', { address: null });
  };

  const handleEditAddress = (address) => {
    navigation.navigate('AddNewAddress', { address: address.raw });
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await apiRequest(`/address/${addressId}`, { method: 'DELETE' });
      setAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
    } catch (error) {
      console.log('Error deleting address:', error);
      Alert.alert('Error', 'Could not delete this address. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
        <Text style={styles.loadingText}>Loading addresses...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('MenuList')}
          >
            <Feather name="arrow-left" size={24} color="#1C1C1E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Address</Text>
          <View style={styles.headerPlaceholder} />
        </View>

        {addresses.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Feather name="map-pin" size={60} color="#C7C7CC" />
            <Text style={styles.emptyText}>No addresses saved yet</Text>
            <Text style={styles.emptySubText}>Tap "ADD NEW ADDRESS" to add one</Text>
          </View>
        ) : (
          addresses.map((address) => (
            <View key={address.id} style={styles.addressCard}>
              <View style={styles.addressHeader}>
                <View style={styles.addressTypeContainer}>
                  <Text style={styles.addressType}>{address.type}</Text>
                </View>
                <View style={styles.addressActions}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleEditAddress(address)}
                  >
                    <Feather name="edit-2" size={18} color="#FF6B35" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDeleteAddress(address.id)}
                  >
                    <Feather name="trash-2" size={18} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.addressText}>{address.address}</Text>
            </View>
          ))
        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddNewAddress}
        >
          <Text style={styles.addButtonText}>ADD NEW ADDRESS</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddressesScreen;