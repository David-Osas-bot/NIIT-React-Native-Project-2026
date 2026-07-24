import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomerStack from './CustomerStack';
import MyOrderScreen from '../features/orders/MyOrderScreen';
import PersonalProfileScreen from '../features/profile/PersonalProfileScreen';

const Tab = createBottomTabNavigator();

export default function CustomerNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="MenuTab" component={CustomerStack} options={{ title: 'Home' }} />
      <Tab.Screen name="OrdersTab" component={MyOrderScreen} options={{ title: 'Orders' }} />
      <Tab.Screen name="ProfileTab" component={PersonalProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}