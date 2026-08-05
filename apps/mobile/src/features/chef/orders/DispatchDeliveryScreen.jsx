import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BASE_URL = 'https://niit-react-native-project-2026.onrender.com';

export default function DispatchDeliveryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = route.params || {};

  const [dispatchStatus, setDispatchStatus] = useState('searching'); // 'searching' | 'assigned'
  const [courierInfo, setCourierInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  // Poll or check delivery assignment status when component mounts
  useEffect(() => {
    if (orderId) {
      assignAndTrackDelivery();
      
      // Poll every 5 seconds to check if a driver has accepted/been assigned
      const interval = setInterval(() => {
        checkDeliveryStatus();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [orderId]);

  // POST /delivery - Assign a driver to an order (chef-only)
  const assignAndTrackDelivery = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/delivery`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}` // Include your auth token here if needed
        },
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        throw new Error('Failed to assign driver');
      }

      const data = await response.json();
      if (data.driver) {
        setCourierInfo(data.driver);
        setDispatchStatus('assigned');
      }
    } catch (error) {
      console.error("Assignment error:", error);
    } finally {
      setLoading(false);
    }
  };

  // GET /delivery/{orderId} - Get delivery status + assigned driver info
  const checkDeliveryStatus = async () => {
    try {
      const response = await fetch(`${BASE_URL}/delivery/${orderId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.driver) {
          setCourierInfo({
            id: data.driver._id || data.driver.id,
            name: data.driver.name || 'Delivery Partner',
            phone: data.driver.phone || 'N/A',
            vehicle: data.driver.vehicle || 'Motorcycle',
          });
          setDispatchStatus('assigned');
        }
      }
    } catch (error) {
      console.error("Error checking delivery status:", error);
    }
  };

  // Handle navigation to GlobalChatScreen and GlobalCallScreen with exact parameters
  const handleContactCourier = (mode) => {
    if (!courierInfo) return;

    const screenName = mode === 'call' ? 'GlobalCallScreen' : 'GlobalChatScreen';
    navigation.navigate(screenName, {
      currentUserType: 'chef',
      contactType: 'delivery',
      contactName: courierInfo.name,
      orderId: orderId,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Dispatch</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.content}>
        {dispatchStatus === 'searching' ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#FF6B35" />
            <Text style={styles.statusTitle}>Looking for a nearby delivery partner...</Text>
            <Text style={styles.statusSubtitle}>Broadcasting order #{orderId?.slice(-5)} to available couriers.</Text>
          </View>
        ) : (
          <View style={styles.assignedContainer}>
            <View style={styles.successBadge}>
              <Text style={styles.successBadgeText}>✓ Courier Assigned</Text>
            </View>

            <View style={styles.courierCard}>
              <View style={styles.avatarPlaceholder} />
              <Text style={styles.courierName}>{courierInfo?.name}</Text>
              <Text style={styles.courierVehicle}>{courierInfo?.vehicle}</Text>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.callButton]} 
                onPress={() => handleContactCourier('call')}
              >
                <Text style={styles.buttonIcon}>📞</Text>
                <Text style={styles.buttonText}>Call</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.actionButton, styles.chatButton]} 
                onPress={() => handleContactCourier('message')}
              >
                <Text style={styles.buttonIcon}>💬</Text>
                <Text style={styles.buttonText}>Chat</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.doneFlowButton} 
              onPress={() => navigation.navigate('Dashboard')}
            >
              <Text style={styles.doneFlowButtonText}>Back to Dashboard</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  backButton: { width: 30, height: 30, justifyContent: 'center' },
  backButtonText: { fontSize: 20, fontWeight: 'bold', color: '#1A1E26' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#1A1E26' },
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  centerContainer: { alignItems: 'center', justifyContent: 'center' },
  statusTitle: { fontSize: 18, fontWeight: '600', color: '#1A1E26', marginTop: 20, textAlign: 'center' },
  statusSubtitle: { fontSize: 14, color: '#8E8E93', marginTop: 8, textAlign: 'center' },
  assignedContainer: { alignItems: 'center', width: '100%' },
  successBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginBottom: 25 },
  successBadgeText: { color: '#2E7D32', fontWeight: '600', fontSize: 14 },
  courierCard: { backgroundColor: '#F8F9FA', width: '100%', padding: 25, borderRadius: 16, alignItems: 'center', marginBottom: 30, borderWidth: 1, borderColor: '#E5E5EA' },
  avatarPlaceholder: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#E5E5EA', marginBottom: 15 },
  courierName: { fontSize: 20, fontWeight: '700', color: '#1A1E26', marginBottom: 4 },
  courierVehicle: { fontSize: 14, color: '#8E8E93' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 },
  actionButton: { flex: 1, flexDirection: 'row', height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginHorizontal: 6 },
  callButton: { backgroundColor: '#E8F5E9' },
  chatButton: { backgroundColor: '#FFF3E0' },
  buttonIcon: { fontSize: 18, marginRight: 8 },
  buttonText: { fontSize: 16, fontWeight: '600', color: '#1A1E26' },
  doneFlowButton: { width: '100%', height: 50, backgroundColor: '#FF6B35', borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  doneFlowButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});