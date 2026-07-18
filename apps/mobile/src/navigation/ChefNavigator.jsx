import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SellerDashboardScreen from '../features/chef/dashboard/SellerDashboardScreen';
import ChefMenuScreen from '../features/chef/menu-management/ChefMenuScreen';
import RunningOrdersScreen from '../features/chef/orders/RunningOrdersScreen';
import WithdrawalScreen from '../features/chef/payments/WithdrawalScreen';

const Tab = createBottomTabNavigator();

export default function ChefNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Dashboard" component={SellerDashboardScreen} />
      <Tab.Screen name="ChefMenu" component={ChefMenuScreen} />
      <Tab.Screen name="RunningOrders" component={RunningOrdersScreen} />
      <Tab.Screen name="Withdrawal" component={WithdrawalScreen} />
    </Tab.Navigator>
  );
}