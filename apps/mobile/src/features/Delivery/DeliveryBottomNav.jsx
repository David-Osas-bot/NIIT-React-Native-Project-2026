import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './DeliveryBottomNav.styles';
import { useDeliveryOnlineStatus } from './DeliveryOnlineStatusContext';

const COLORS = {
  primary: '#FE724C',
  textLight: '#9796A1',
  offline: '#C4C4C4',
};

// One shared bottom nav for every Delivery screen that needs it, so the icon
// set can never drift out of sync between screens again.
// `active` tells it which icon to highlight: 'dashboard' | 'wallet' | 'messages' | 'profile'
export default function DeliveryBottomNav({ active }) {
  const navigation = useNavigation();
  const { isOnline, toggleOnline } = useDeliveryOnlineStatus();

  const colorFor = (tab) => (active === tab ? COLORS.primary : COLORS.textLight);
  const toggleColor = isOnline ? COLORS.primary : COLORS.offline;

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('DeliveryDashboardScreen')}>
        <Feather name="grid" size={22} color={colorFor('dashboard')} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('DeliveryWalletScreen')}>
        <Feather name="credit-card" size={22} color={colorFor('wallet')} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navActionCenter, { borderColor: toggleColor }]}
        onPress={toggleOnline}
      >
        <Feather name={isOnline ? 'toggle-right' : 'toggle-left'} size={26} color={toggleColor} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('DeliveryMessageScreen')}>
        <Feather name="bell" size={22} color={colorFor('messages')} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('DeliveryProfileScreen')}>
        <Feather name="user" size={22} color={colorFor('profile')} />
      </TouchableOpacity>
    </View>
  );
}