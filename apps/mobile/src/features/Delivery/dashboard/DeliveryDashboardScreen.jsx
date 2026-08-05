import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, SafeAreaView, ActivityIndicator } from 'react-native';
import { styles } from './DeliveryDashboardScreen.styles';
import DeliveryBottomNav from '../DeliveryBottomNav';
import { useDeliveryOnlineStatus } from '../DeliveryOnlineStatusContext';

const BASE_URL = 'https://niit-react-native-project-2026.onrender.com';

export default function DeliveryDashboardScreen({ navigation }) {
  const { isOnline, setIsOnline } = useDeliveryOnlineStatus();

  const [requests, setRequests] = useState([]);
  const [runningDeliveries, setRunningDeliveries] = useState([]);
  const [recentDeliveries, setRecentDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded for UI placeholder until wallet endpoints are set up
  const earningsToday = '$24.15';
  const sparkline = [30, 45, 38, 60, 52, 70, 58, 65];

  // Poll for delivery assignments and active deliveries
  useEffect(() => {
    fetchDeliveryData();

    const interval = setInterval(() => {
      fetchDeliveryData(false);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const fetchDeliveryData = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);

      // GET /orders - Fetch orders related to this delivery driver
      // You may need to pass a query param or auth token to filter by driver ID
      const response = await fetch(`${BASE_URL}/orders`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch delivery orders');
      }

      const data = await response.json();
      
      const newRequests = [];
      const activeDeliveries = [];
      const pastDeliveries = [];

      (data || []).forEach(order => {
        const orderId = order._id || order.id;
        const restaurantName = order.restaurant?.name || order.restaurantName || 'Restaurant';
        const customerName = order.customer?.name || 'Customer';
        const payout = `$${((order.total || 15) * 0.3).toFixed(2)}`; // Assuming driver gets 30% cut for UI

        const formattedOrder = {
          id: orderId,
          orderId: orderId,
          restaurant: restaurantName,
          customer: customerName,
          distance: 'Nearby', // This would ideally be calculated from lat/lng
          items: order.items?.map(i => `${i.quantity}x ${i.name}`).join(', ') || 'Various items',
          payout: payout,
          date: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Today',
          stage: order.status || 'Received'
        };

        // Sort into categories based on status
        if (order.status === 'ReadyForPickup' || order.status === 'Assigning') {
          newRequests.push(formattedOrder);
        } else if (order.status === 'PickedUp' || order.status === 'OutForDelivery') {
          activeDeliveries.push({ ...formattedOrder, stage: 'toCustomer' });
        } else if (order.status === 'Delivered' || order.status === 'Completed') {
          pastDeliveries.push(formattedOrder);
        }
      });

      setRequests(newRequests);
      setRunningDeliveries(activeDeliveries);
      setRecentDeliveries(pastDeliveries.slice(0, 5)); // Limit history to recent 5

    } catch (error) {
      console.error("Error fetching delivery dashboard data:", error);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  const handleAccept = async (request) => {
    try {
      // Optimistic update
      setRequests((prev) => prev.filter((r) => r.id !== request.id));
      setRunningDeliveries((prev) => [
        { ...request, stage: 'toRestaurant' },
        ...prev,
      ]);

      // TODO: Call backend to update order status to 'PickedUp' or 'DriverAssigned'
      // Example: await fetch(`${BASE_URL}/orders/${request.orderId}/accept`, { method: 'PUT' });

      navigation.navigate('DeliveryTrackingScreen', { orderId: request.orderId });
    } catch (error) {
      console.error("Error accepting delivery:", error);
    }
  };

  const handleDecline = (request) => {
    // TODO: Call backend to decline/reject order so it passes to another driver
    setRequests((prev) => prev.filter((r) => r.id !== request.id));
  };

  const handleOpenRunning = (delivery) => {
    navigation.navigate('DeliveryTrackingScreen', { orderId: delivery.orderId });
  };

  const stageLabel = { toRestaurant: 'Picking up', toCustomer: 'Delivering', OutForDelivery: 'Delivering' };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FE724C" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

          <View style={styles.topRow}>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconText}>☰</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.avatarButton} onPress={() => navigation.navigate('DeliveryProfileScreen')}>
              <View style={styles.avatarPlaceholder} />
              {isOnline && <View style={styles.avatarOnlineDot} />}
            </TouchableOpacity>
          </View>

          <View style={styles.statusCard}>
            <View>
              <Text style={styles.statusTitle}>{isOnline ? "You're Online" : "You're Offline"}</Text>
              <Text style={styles.statusSubtitle}>📍 Ikeja, Lagos</Text>
            </View>
            <Switch
              value={isOnline}
              onValueChange={setIsOnline}
              trackColor={{ false: '#E3E5E9', true: '#FFD3C2' }}
              thumbColor={isOnline ? '#FE724C' : '#FFFFFF'}
            />
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{runningDeliveries.length.toString().padStart(2, '0')}</Text>
              <Text style={styles.statLabel}>RUNNING{'\n'}DELIVERIES</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{requests.length.toString().padStart(2, '0')}</Text>
              <Text style={styles.statLabel}>NEW{'\n'}REQUESTS</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.earningsCard} onPress={() => navigation.navigate('DeliveryWalletScreen')}>
            <View style={styles.earningsHeaderRow}>
              <Text style={styles.earningsLabel}>Today's Earnings</Text>
              <Text style={styles.seeDetails}>See Wallet</Text>
            </View>
            <Text style={styles.earningsAmount}>{earningsToday}</Text>
            <View style={styles.sparklineRow}>
              {sparkline.map((value, index) => (
                <View key={index} style={[styles.sparklineBar, { height: value }]} />
              ))}
            </View>
          </TouchableOpacity>

          {isOnline ? (
            requests.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionTitle}>New Requests</Text>
                  <Text style={styles.sectionCount}>{requests.length} nearby</Text>
                </View>

                {requests.map((request) => (
                  <View key={request.id} style={styles.requestCard}>
                    <View style={styles.requestImagePlaceholder} />
                    <View style={styles.requestDetails}>
                      <Text style={styles.requestRestaurant}>{request.restaurant}</Text>
                      <Text style={styles.requestMeta}>{request.distance}</Text>
                      <Text style={styles.requestItems} numberOfLines={1}>{request.items}</Text>
                      <Text style={styles.requestPayout}>{request.payout}</Text>
                    </View>
                    <View style={styles.requestActions}>
                      <TouchableOpacity style={styles.acceptButton} onPress={() => handleAccept(request)}>
                        <Text style={styles.acceptButtonText}>Accept</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.declineButton} onPress={() => handleDecline(request)}>
                        <Text style={styles.declineButtonText}>Decline</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )
          ) : (
            <View style={styles.offlineNotice}>
              <Text style={styles.offlineNoticeText}>You're offline — go online to start receiving delivery requests.</Text>
            </View>
          )}

          {runningDeliveries.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>Running Deliveries</Text>
                <Text style={styles.seeAll}>See All</Text>
              </View>

              {runningDeliveries.map((delivery) => (
                <TouchableOpacity key={delivery.id} style={styles.runningCard} onPress={() => handleOpenRunning(delivery)}>
                  <View style={styles.runningImagePlaceholder} />
                  <View style={styles.runningDetails}>
                    <Text style={styles.runningRestaurant}>{delivery.restaurant}</Text>
                    <Text style={styles.runningMeta}>#{delivery.orderId} · {delivery.customer}</Text>
                  </View>
                  <View style={styles.stageBadge}>
                    <Text style={styles.stageBadgeText}>{stageLabel[delivery.stage] || 'Active'}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={[styles.section, { marginBottom: 20 }]}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Recent Deliveries</Text>
              <Text style={styles.seeAll}>See All</Text>
            </View>

            {recentDeliveries.length === 0 ? (
              <Text style={{color: '#9796A1', marginTop: 10}}>No recent deliveries.</Text>
            ) : (
              recentDeliveries.map((item) => (
                <View key={item.id} style={styles.historyCard}>
                  <View style={styles.historyImagePlaceholder} />
                  <View style={styles.historyDetails}>
                    <Text style={styles.historyRestaurant}>{item.restaurant}</Text>
                    <Text style={styles.historyMeta}>{item.customer} · {item.date}</Text>
                  </View>
                  <Text style={styles.historyPayout}>{item.payout}</Text>
                </View>
              ))
            )}
          </View>

        </ScrollView>
      )}
      <DeliveryBottomNav active="dashboard" />
    </SafeAreaView>
  );
}