import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Animated, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './DeliveryTrackingScreen.styles';

const BASE_URL = 'https://niit-react-native-project-2026.onrender.com';

const { width, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.72;
const PEEK_HEIGHT = 110;
const COLLAPSED_TRANSLATE_Y = SHEET_HEIGHT - PEEK_HEIGHT;

const ASPECT_RATIO = width / SCREEN_HEIGHT;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function DeliveryTrackingScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = route.params || {};

  const [isSheetExpanded, setIsSheetExpanded] = useState(true);
  const [deliveryData, setDeliveryData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 'toRestaurant' -> heading to pick up the order
  // 'toCustomer'   -> order picked up, heading to drop off
  // 'delivered'    -> trip complete
  const [deliveryStage, setDeliveryStage] = useState('toRestaurant');

  const slideAnim = useRef(new Animated.Value(0)).current;

  const toggleSheet = () => {
    const toValue = isSheetExpanded ? COLLAPSED_TRANSLATE_Y : 0;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsSheetExpanded(!isSheetExpanded);
  };

  // Fetch live order data
  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
      
      // Poll every 10 seconds for real-time status changes
      const interval = setInterval(() => {
        fetchOrderDetails(false);
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [orderId]);

  const fetchOrderDetails = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);
      
      // GET /orders/{id}
      const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch order details');
      }

      const order = await response.json();
      
      // Map backend data to UI format
      const formattedData = {
        orderId: order._id || order.id || orderId,
        restaurant: {
          name: order.restaurant?.name || 'Restaurant',
          address: order.restaurant?.address || 'Restaurant Address',
          coordinate: { 
            latitude: order.restaurant?.location?.lat || 37.78825, 
            longitude: order.restaurant?.location?.lng || -122.4324 
          },
          contactName: order.restaurant?.ownerName || 'Chef',
        },
        customer: {
          name: order.customer?.name || 'Customer',
          address: order.deliveryAddress?.address || 'Customer Address',
          coordinate: { 
            latitude: order.deliveryAddress?.location?.lat || 37.79285, 
            longitude: order.deliveryAddress?.location?.lng || -122.4354 
          },
          contactName: order.customer?.name || 'Customer',
        },
        items: order.items?.map(i => ({ quantity: `${i.quantity}x`, name: i.name })) || [],
        payout: `$${((order.total || 15) * 0.3).toFixed(2)}`,
        status: order.status || 'Assigned',
      };

      setDeliveryData(formattedData);

      // Sync stage state with backend status
      if (formattedData.status === 'PickedUp' || formattedData.status === 'OutForDelivery') {
        setDeliveryStage('toCustomer');
      } else if (formattedData.status === 'Delivered' || formattedData.status === 'Completed') {
        setDeliveryStage('delivered');
      }
    } catch (error) {
      console.error("Error loading delivery tracking data:", error);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  // Simulate courier location for the map (Replace with real device GPS in production)
  const courierCurrentLocation = { latitude: 37.78600, longitude: -122.43000 };

  const handlePrimaryAction = async () => {
    try {
      if (deliveryStage === 'toRestaurant') {
        // TODO: Map to actual backend endpoint for status update
        // await fetch(`${BASE_URL}/orders/${orderId}/status`, { method: 'PUT', body: JSON.stringify({ status: 'PickedUp' }) });
        setDeliveryStage('toCustomer');
      } else if (deliveryStage === 'toCustomer') {
        // TODO: Map to actual backend endpoint for status update
        // await fetch(`${BASE_URL}/orders/${orderId}/status`, { method: 'PUT', body: JSON.stringify({ status: 'Delivered' }) });
        setDeliveryStage('delivered');
      } else {
        navigation.navigate('DeliveryDashboardScreen');
      }
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
  };

  const handleContact = (person, personType, mode) => {
    const screenName = mode === 'call' ? 'GlobalCallScreen' : 'GlobalChatScreen';
    navigation.navigate(screenName, {
      currentUserType: 'delivery',
      contactType: personType, 
      contactName: person.contactName,
      orderId: deliveryData.orderId,
    });
  };

  if (loading || !deliveryData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#FE724C" />
      </View>
    );
  }

  const routeToRestaurant = [
    courierCurrentLocation,
    { latitude: 37.78725, longitude: -122.4315 },
    deliveryData.restaurant.coordinate,
  ];

  const routeToCustomer = [
    deliveryData.restaurant.coordinate,
    { latitude: 37.78985, longitude: -122.4354 },
    { latitude: 37.79185, longitude: -122.4364 },
    deliveryData.customer.coordinate,
  ];

  const activeRoute = deliveryStage === 'toCustomer' ? routeToCustomer : routeToRestaurant;
  const activeDestination = deliveryStage === 'toCustomer' ? deliveryData.customer : deliveryData.restaurant;

  const initialRegion = {
    latitude: 37.79000,
    longitude: -122.4340,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const stageConfig = {
    toRestaurant: { badgeLabel: 'PICKUP', title: 'Head to Restaurant', actionLabel: 'Confirm Pickup', icon: '🍳' },
    toCustomer: { badgeLabel: 'DROP-OFF', title: 'Deliver to Customer', actionLabel: 'Mark as Delivered', icon: '🏠' },
    delivered: { badgeLabel: 'COMPLETED', title: 'Delivery Completed', actionLabel: 'Back to Dashboard', icon: '✅' },
  };

  const timelineSteps = [
    { key: 'accepted', label: 'You accepted this delivery', done: true, active: false },
    { key: 'toRestaurant', label: 'Heading to the restaurant', done: deliveryStage !== 'toRestaurant', active: deliveryStage === 'toRestaurant' },
    { key: 'pickedUp', label: 'Order picked up, on the way', done: deliveryStage === 'delivered', active: deliveryStage === 'toCustomer' },
    { key: 'delivered', label: 'Delivered to customer', done: deliveryStage === 'delivered', active: deliveryStage === 'delivered' },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapContainer}
        initialRegion={initialRegion}
        showsUserLocation={true}
        onPress={toggleSheet}
      >
        <Polyline coordinates={activeRoute} strokeColor="#FE724C" strokeWidth={4} />
        <Marker coordinate={courierCurrentLocation} title="You" pinColor="#1A1E26" />
        <Marker coordinate={deliveryData.restaurant.coordinate} title={deliveryData.restaurant.name} pinColor="#FE724C" />
        <Marker coordinate={deliveryData.customer.coordinate} title={deliveryData.customer.name} pinColor="#323643" />
      </MapView>

      <SafeAreaView style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('DeliveryDashboardScreen')}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.headerBadge}>{stageConfig[deliveryStage].badgeLabel}</Text>
          <Text style={styles.headerTitle}>{stageConfig[deliveryStage].title}</Text>
        </View>
      </SafeAreaView>

      <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slideAnim }] }]}>
        <TouchableOpacity activeOpacity={0.8} onPress={toggleSheet} style={{ width: '100%', alignItems: 'center', paddingVertical: 10 }}>
          <View style={styles.dragHandle} />
        </TouchableOpacity>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.destinationCard}>
            <View style={styles.destinationIconWrap}>
              <Text style={styles.destinationIcon}>{stageConfig[deliveryStage].icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.destinationName}>{activeDestination.name}</Text>
              <Text style={styles.destinationAddress}>{activeDestination.address}</Text>
            </View>
            <Text style={styles.orderId}>#{deliveryData.orderId.substring(deliveryData.orderId.length - 5)}</Text>
          </View>

          <View style={styles.itemsList}>
            {deliveryData.items.map((item, index) => (
              <Text key={index} style={styles.itemText}>
                <Text style={styles.itemQuantity}>{item.quantity} </Text>{item.name}
              </Text>
            ))}
          </View>

          <View style={styles.timelineContainer}>
            {timelineSteps.map((step, index) => (
              <View key={step.key} style={[styles.timelineStep, index === timelineSteps.length - 1 && { minHeight: 24 }]}>
                <View style={styles.timelineIconContainer}>
                  <View style={[styles.dot, (step.done || step.active) && styles.dotActive]} />
                  {index !== timelineSteps.length - 1 && (
                    <View style={[styles.line, step.done && styles.lineActive]} />
                  )}
                </View>
                <Text style={[styles.timelineText, (step.done || step.active) && styles.textActive]}>
                  {step.label}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionLabel}>CONTACT</Text>
          <View style={styles.contactSection}>
            
            {/* Chef Contact */}
            <View style={styles.contactCard}>
              <View style={styles.contactProfileContainer}>
                <View style={styles.contactAvatarPlaceholder} />
                <View>
                  <Text style={styles.contactName}>{deliveryData.restaurant.contactName}</Text>
                  <Text style={styles.contactRole}>Chef · {deliveryData.restaurant.name}</Text>
                </View>
              </View>
              <View style={styles.contactActions}>
                <TouchableOpacity style={styles.callButton} onPress={() => handleContact(deliveryData.restaurant, 'chef', 'call')}>
                  <Text style={styles.callIcon}>📞</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.messageButton} onPress={() => handleContact(deliveryData.restaurant, 'chef', 'message')}>
                  <Text style={styles.messageIcon}>💬</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Customer Contact */}
            <View style={styles.contactCard}>
              <View style={styles.contactProfileContainer}>
                <View style={styles.contactAvatarPlaceholder} />
                <View>
                  <Text style={styles.contactName}>{deliveryData.customer.contactName}</Text>
                  <Text style={styles.contactRole}>Customer</Text>
                </View>
              </View>
              <View style={styles.contactActions}>
                <TouchableOpacity style={styles.callButton} onPress={() => handleContact(deliveryData.customer, 'customer', 'call')}>
                  <Text style={styles.callIcon}>📞</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.messageButton} onPress={() => handleContact(deliveryData.customer, 'customer', 'message')}>
                  <Text style={styles.messageIcon}>💬</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </ScrollView>

        <View style={styles.actionFooter}>
          <View>
            <Text style={styles.payoutLabel}>YOU'LL EARN</Text>
            <Text style={styles.payoutAmount}>{deliveryData.payout}</Text>
          </View>
          <TouchableOpacity style={styles.primaryActionButton} onPress={handlePrimaryAction}>
            <Text style={styles.primaryActionText}>{stageConfig[deliveryStage].actionLabel}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}