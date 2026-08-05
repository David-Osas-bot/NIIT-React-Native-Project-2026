import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Animated, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { styles } from './TrackingScreen.styles';

const BASE_URL = 'https://niit-react-native-project-2026.onrender.com';

const { width, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.7; 
const PEEK_HEIGHT = 100; 
const COLLAPSED_TRANSLATE_Y = SHEET_HEIGHT - PEEK_HEIGHT;

const ASPECT_RATIO = width / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.015; 
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO; 

export default function TrackingScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = route.params || {};

  const [isSheetExpanded, setIsSheetExpanded] = useState(true);
  const [currentStep, setCurrentStep] = useState(1); 
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (orderId) {
      fetchOrderTrackingDetails(true);

      const pollInterval = setInterval(() => {
        fetchOrderTrackingDetails(false);
      }, 10000);

      return () => clearInterval(pollInterval);
    } else {
      setLoading(false);
    }
  }, [orderId]);

  const fetchOrderTrackingDetails = async (showLoader = false) => {
    try {
      if (showLoader) setLoading(true);
      
      const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tracking data');
      }

      const data = await response.json();
      setOrderDetails(data);

      const status = data.status || data.delivery?.status;
      if (status === 'Received') setCurrentStep(0);
      else if (status === 'Preparing') setCurrentStep(1);
      else if (status === 'PickedUp') setCurrentStep(2);
      else if (status === 'Delivered' || status === 'Completed') setCurrentStep(3);

    } catch (error) {
      console.error("Error loading order tracking details:", error);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  const toggleSheet = () => {
    const toValue = isSheetExpanded ? COLLAPSED_TRANSLATE_Y : 0;
    
    Animated.timing(slideAnim, {
      toValue,
      duration: 300, 
      useNativeDriver: true,
    }).start();

    setIsSheetExpanded(!isSheetExpanded);
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#FE724C" />
      </View>
    );
  }

  const activeOrder = orderDetails || {};
  
  // Extract driver coordinates using the backend's currentLocation { lat, lng } schema
  const driverLat = activeOrder.delivery?.currentLocation?.lat || activeOrder.currentLocation?.lat || 37.78825;
  const driverLng = activeOrder.delivery?.currentLocation?.lng || activeOrder.currentLocation?.lng || -122.4324;

  const initialRegion = {
    latitude: driverLat,
    longitude: driverLng,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const deliveryRoute = (activeOrder.route || []).map(pt => ({
    latitude: pt.lat,
    longitude: pt.lng
  }));

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.mapContainer}
        initialRegion={initialRegion}
        showsUserLocation={true}
        onPress={toggleSheet}
      >
        {deliveryRoute.length > 0 && (
          <Polyline 
            coordinates={deliveryRoute}
            strokeColor="#FE724C" 
            strokeWidth={4}
          />
        )}
        <Marker 
          coordinate={{ latitude: driverLat, longitude: driverLng }}
          title={activeOrder.courier?.name || activeOrder.delivery?.driver?.name || 'Courier'}
          pinColor="#FE724C"
        />
      </MapView>

      <SafeAreaView style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('MyOrderScreen')}
        >
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Order</Text>
      </SafeAreaView>

      <Animated.View 
        style={[
          styles.bottomSheet, 
          { transform: [{ translateY: slideAnim }] }
        ]}
      >
        <TouchableOpacity 
          activeOpacity={0.8} 
          onPress={toggleSheet}
          style={{ width: '100%', alignItems: 'center', paddingVertical: 10 }}
        >
          <View style={styles.dragHandle} />
        </TouchableOpacity>
        
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.orderSummaryContainer}>
            <View style={styles.restaurantImagePlaceholder} />
            <View style={styles.restaurantDetails}>
              <Text style={styles.restaurantName}>{activeOrder.restaurant || activeOrder.restaurantName || 'Restaurant'}</Text>
              <Text style={styles.orderDate}>{activeOrder.date || 'Active Order'}</Text>
              
              <View style={styles.itemsList}>
                {(activeOrder.items || []).map((item, index) => (
                  <Text key={index} style={styles.itemText}>
                    <Text style={styles.itemQuantity}>{item.quantity || ''} </Text>
                    {item.name}
                  </Text>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{activeOrder.estimatedTime || '20 min'}</Text>
            <Text style={styles.timeLabel}>ESTIMATED DELIVERY TIME</Text>
          </View>

          <View style={styles.timelineContainer}>
            {[
              "Your order has been received",
              "The restaurant is preparing your food",
              "Your order has been picked up for delivery",
              "Order arriving soon!"
            ].map((stepText, index) => {
              const isActive = index <= currentStep; 
              const isLineActive = index < currentStep; 
              const isLast = index === 3; 

              return (
                <View key={index} style={[styles.timelineStep, isLast && { minHeight: 24 }]}>
                  <View style={styles.timelineIconContainer}>
                    <View style={[styles.dot, isActive && styles.dotActive]} />
                    {!isLast && <View style={[styles.line, isLineActive && styles.lineActive]} />}
                  </View>
                  
                  <Text style={[styles.timelineText, isActive && styles.textActive]}>
                    {stepText}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.courierContainer}>
          <View style={styles.courierProfileContainer}>
            <View style={styles.courierAvatarPlaceholder} />
            <View>
              <Text style={styles.courierName}>{activeOrder.courier?.name || activeOrder.delivery?.driver?.name || 'Robert F.'}</Text>
              <Text style={styles.courierRole}>Courier</Text>
            </View>
          </View>
          
          <View style={styles.courierActions}>
            <TouchableOpacity 
              style={styles.callButton}
              onPress={() => navigation.navigate('GlobalCallScreen', { 
                contactType: 'delivery', 
                contactName: activeOrder.courier?.name || 'Courier' 
              })}
            >
              <Feather name="phone" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.messageButton}
              onPress={() => navigation.navigate('GlobalChatScreen', { 
                contactType: 'delivery',
                currentUserType: 'customer', 
                contactName: activeOrder.courier?.name || 'Courier',
                orderId: orderId || '12345' 
              })}
            >
              <Feather name="message-circle" size={20} color="#FE724C" />
            </TouchableOpacity>
          </View>
        </View>

      </Animated.View>
    </View>
  );
}