import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
// src/features/profile/ -> src/shared/ is 2 levels up.
import { apiRequest } from '../../shared/api';
import styles from './AddNewAddressScreen.styles';

// react-native-maps is native-only — it has no web implementation, so
// statically importing it crashes (or fails to bundle) when running on
// Expo web (e.g. localhost:8081 in the browser). Load it conditionally so
// native builds still get the real map, and web gets a safe fallback below.
let MapView = null;
let Marker = null;
let PROVIDER_GOOGLE = null;
if (Platform.OS !== 'web') {
  // eslint-disable-next-line global-require
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
  PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;
}

const AddNewAddressScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const mapRef = useRef(null);

  // This is the raw address object as returned by GET /address (see
  // AddressesScreen): { _id, label, street, apartment, postcode, lat, lng,
  // isDefault }
  const existingAddress = route.params?.address || null;
  const isEditing = !!existingAddress;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [region, setRegion] = useState({
    latitude: existingAddress?.lat || 37.78825,
    longitude: existingAddress?.lng || -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: existingAddress?.lat || 37.78825,
    longitude: existingAddress?.lng || -122.4324,
  });
  const [addressDetails, setAddressDetails] = useState({
    street: existingAddress?.street || '',
    postCode: existingAddress?.postcode || '',
    apartment: existingAddress?.apartment || '',
    label: existingAddress?.label || 'Home',
  });
  const [locationAddress, setLocationAddress] = useState(existingAddress?.street || '');

  const labels = ['Home', 'Work', 'Other'];

  useEffect(() => {
    // Only auto-locate for a brand-new address — editing should keep the
    // address's existing coordinates instead of jumping to the device's
    // current location.
    if (!isEditing) {
      getCurrentLocation();
    } else {
      setLoading(false);
    }
  }, []);

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Allow location access to use this feature');
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      setSelectedLocation({ latitude, longitude });

      await reverseGeocode(latitude, longitude);

      setLoading(false);
    } catch (error) {
      console.log('Location error:', error);
      setLoading(false);
      setRegion({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const address = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (address && address.length > 0) {
        const addr = address[0];
        const fullAddress = `${addr.street || ''} ${addr.city || ''} ${addr.region || ''} ${addr.postalCode || ''}`.trim();
        setLocationAddress(fullAddress);
        setAddressDetails((prev) => ({
          ...prev,
          street: addr.street || '',
          postCode: addr.postalCode || '',
        }));
      }
    } catch (error) {
      console.log('Reverse geocode error:', error);
    }
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
    reverseGeocode(latitude, longitude);
  };

  const handleMarkerDragEnd = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
    reverseGeocode(latitude, longitude);
  };

  const handleSave = async () => {
    if (!addressDetails.street.trim()) {
      Alert.alert('Error', 'Street is required');
      return;
    }

    try {
      setSaving(true);

      // Confirmed schema: POST /address / PUT /address/{id} body ->
      // { label, street, apartment, postcode, lat, lng, isDefault }
      const payload = {
        label: addressDetails.label,
        street: addressDetails.street,
        apartment: addressDetails.apartment,
        postcode: addressDetails.postCode,
        lat: selectedLocation.latitude,
        lng: selectedLocation.longitude,
        isDefault: existingAddress?.isDefault ?? false,
      };

      if (isEditing) {
        await apiRequest(`/address/${existingAddress._id}`, {
          method: 'PUT',
          data: payload,
        });
      } else {
        await apiRequest('/address', {
          method: 'POST',
          data: payload,
        });
      }

      Alert.alert(
        'Success',
        isEditing ? 'Address updated successfully!' : 'Address added successfully!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.log('Error saving address:', error);
      Alert.alert('Error', error.message || 'Failed to save address');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} color="#1C1C1E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isEditing ? 'Edit Address' : 'Add New Address'}
          </Text>
          <View style={styles.headerPlaceholder} />
        </View>

        <View style={styles.mapContainer}>
          {MapView ? (
            <>
              <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
                onPress={handleMapPress}
                showsUserLocation={true}
                showsMyLocationButton={true}
              >
                <Marker
                  coordinate={selectedLocation}
                  draggable
                  onDragEnd={handleMarkerDragEnd}
                  pinColor="#FF6B35"
                />
              </MapView>

              <View style={styles.pinIndicator}>
                <Feather name="map-pin" size={32} color="#FF6B35" />
              </View>
            </>
          ) : (
            // Web fallback: no native MapView available here. Show the
            // detected/typed address and let the person fill the fields
            // below manually instead of dragging a pin.
            <View style={[styles.map, styles.mapWebFallback]}>
              <Feather name="map-pin" size={28} color="#FF6B35" />
              <Text style={styles.mapWebFallbackText}>
                Map preview isn't available in the browser — use "locate me" or fill in the
                address fields below.
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.locateButton}
            onPress={getCurrentLocation}
          >
            <Feather name="crosshair" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.addressDisplay}>
          <Text style={styles.addressLabel}>ADDRESS</Text>
          <Text style={styles.addressText}>
            {locationAddress || 'Move the pin to select your location'}
          </Text>
        </View>

        <View style={styles.formCard}>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>STREET</Text>
            <TextInput
              style={styles.formInput}
              value={addressDetails.street}
              onChangeText={(text) => setAddressDetails((prev) => ({ ...prev, street: text }))}
              placeholder="Enter street address"
              placeholderTextColor="#C7C7CC"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>POST CODE</Text>
            <TextInput
              style={styles.formInput}
              value={addressDetails.postCode}
              onChangeText={(text) => setAddressDetails((prev) => ({ ...prev, postCode: text }))}
              placeholder="Enter post code"
              placeholderTextColor="#C7C7CC"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>APPARTMENT</Text>
            <TextInput
              style={styles.formInput}
              value={addressDetails.apartment}
              onChangeText={(text) => setAddressDetails((prev) => ({ ...prev, apartment: text }))}
              placeholder="Enter apartment number"
              placeholderTextColor="#C7C7CC"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>LABEL AS</Text>
            <View style={styles.labelContainer}>
              {labels.map((label) => (
                <TouchableOpacity
                  key={label}
                  style={[
                    styles.labelOption,
                    addressDetails.label === label && styles.labelOptionSelected,
                  ]}
                  onPress={() => setAddressDetails((prev) => ({ ...prev, label }))}
                >
                  <Text
                    style={[
                      styles.labelOptionText,
                      addressDetails.label === label && styles.labelOptionTextSelected,
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>SAVE LOCATION</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddNewAddressScreen;