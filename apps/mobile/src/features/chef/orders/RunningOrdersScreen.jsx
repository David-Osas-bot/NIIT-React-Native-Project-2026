import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import styles from './RunningOrdersScreen.styles';
import { apiRequest } from '../../../shared/api';

export default function RunningOrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await apiRequest('/orders/incoming');
      setOrders(data.orders || []);
    } catch (err) {
      setError('Could not load running orders');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await apiRequest(`/orders/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
      fetchOrders();
    } catch (err) {
      // silently ignore for now, no token yet anyway
    }
  };

  // Flatten each order's items into individual rows for display
  const rows = orders.flatMap((order) =>
    (order.items || []).map((item, index) => ({
      key: `${order._id}-${index}`,
      orderId: order._id,
      status: order.status,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
    }))
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{orders.length} Running Orders</Text>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={rows}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.infoWrapper}>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.orderId}>ID: {item.orderId}</Text>
                <Text style={styles.price}>
                  ${item.price} {item.quantity > 1 ? `x${item.quantity}` : ''}
                </Text>
              </View>
              <View style={styles.actionsColumn}>
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={() => handleUpdateStatus(item.orderId, 'completed')}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => handleUpdateStatus(item.orderId, 'cancelled')}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', color: '#999', marginTop: 40 }}>
              No running orders
            </Text>
          }
        />
      )}
    </View>
  );
}
