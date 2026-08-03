import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import styles from './ChefNotificationsScreen.styles';
import { apiRequest } from '../../../shared/api';

export default function ChefNotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await apiRequest('/notifications');
      setNotifications(data.notifications || []);
    } catch (err) {
      setError('Could not load notifications');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.goBack()}
        >
          <Text>{'‹'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <View style={styles.tabsRow}>
        <View style={[styles.tab, styles.tabActive]}>
          <Text style={[styles.tabText, styles.tabTextActive]}>Notifications</Text>
        </View>
        <View style={styles.tab}>
          <Text style={styles.tabText}>Messages</Text>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.notificationRow}>
              <View style={styles.textWrapper}>
                <Text style={styles.notificationText}>
                  <Text style={styles.nameBold}>{item.title} </Text>
                  {item.body}
                </Text>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', color: '#999', marginTop: 40 }}>
              No notifications yet
            </Text>
          }
        />
      )}
    </View>
  );
}