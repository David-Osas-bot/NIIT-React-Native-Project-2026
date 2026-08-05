import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DeliveryDashboardScreen from '../features/Delivery/dashboard/DeliveryDashboardScreen';
import DeliveryTrackingScreen from '../features/Delivery/orders/DeliveryTrackingScreen';
import DeliveryMessageScreen from '../features/Delivery/engagement/DeliveryMessageScreen';
import DeliveryWalletScreen from '../features/Delivery/payments/DeliveryWalletScreen';
import DeliveryProfileScreen from '../features/Delivery/profile/DeliveryProfileScreen';
import DeliveryHelpSupportScreen from '../features/Delivery/profile/DeliveryHelpSupportScreen';
import DeliverySettingsScreen from '../features/Delivery/profile/DeliverySettingsScreen';
import { DeliveryOnlineStatusProvider } from '../features/Delivery/DeliveryOnlineStatusContext';

// Paths above are relative to THIS file's own location:
// apps/mobile/src/features/Delivery/DeliveryNavigator.jsx
// Matched to your actual folder structure: dashboard/, orders/, engagement/, payments/, profile/

/**
 * Param list for every screen in the Delivery Person stack.
 * `undefined` means the screen takes no params.
 *
 * @typedef {Object} DeliveryStackParamList
 * @property {undefined} DeliveryDashboardScreen
 * @property {{ orderId?: string }} DeliveryTrackingScreen
 * @property {undefined} DeliveryMessageScreen
 * @property {undefined} DeliveryWalletScreen
 * @property {undefined} DeliveryProfileScreen
 * @property {undefined} DeliveryHelpSupportScreen
 * @property {undefined} DeliverySettingsScreen
 */

const Stack = createNativeStackNavigator();

export default function DeliveryNavigator() {
  return (
    <DeliveryOnlineStatusProvider>
      <Stack.Navigator
        initialRouteName="DeliveryDashboardScreen"
        screenOptions={{
          headerShown: false, // every screen renders its own custom header
        }}
      >
      <Stack.Screen
        name="DeliveryDashboardScreen"
        component={DeliveryDashboardScreen}
      />

      <Stack.Screen
        name="DeliveryTrackingScreen"
        component={DeliveryTrackingScreen}
      />

      <Stack.Screen
        name="DeliveryMessageScreen"
        component={DeliveryMessageScreen}
      />

      <Stack.Screen
        name="DeliveryWalletScreen"
        component={DeliveryWalletScreen}
      />

      <Stack.Screen
        name="DeliveryProfileScreen"
        component={DeliveryProfileScreen}
      />

      <Stack.Screen
        name="DeliveryHelpSupportScreen"
        component={DeliveryHelpSupportScreen}
      />

      <Stack.Screen
        name="DeliverySettingsScreen"
        component={DeliverySettingsScreen}
      />
    </Stack.Navigator>
    </DeliveryOnlineStatusProvider>
  );
}
