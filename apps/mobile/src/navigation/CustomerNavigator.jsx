import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomerStack from './CustomerStack';
import MyOrderScreen from '../features/orders/MyOrderScreen';
import MenuListScreen from '../features/menu/MenuListScreen';

const Tab = createBottomTabNavigator();

// NOTE: ProfileTab now renders MenuListScreen (the settings hub with
// Personal Info / Addresses / Cart / etc. as sub-items) instead of jumping
// straight to PersonalProfileScreen — this mirrors how the chef side's
// "Profile" tab renders ChefMenuScreen (a hub) rather than going directly to
// a single info screen. PersonalProfileScreen is still reachable by tapping
// "Personal Info" inside MenuListScreen, since it's registered in
// CustomerStack.
export default function CustomerNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="MenuTab" component={CustomerStack} options={{ title: 'Home' }} />
      <Tab.Screen name="OrdersTab" component={MyOrderScreen} options={{ title: 'Orders' }} />
      <Tab.Screen name="ProfileTab" component={MenuListScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}