// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import SellerDashboardScreen from '../features/chef/dashboard/SellerDashboardScreen';
// import ChefMenuScreen from '../features/chef/menu-management/ChefMenuScreen';
// import RunningOrdersScreen from '../features/chef/orders/RunningOrdersScreen';
// import WithdrawalScreen from '../features/chef/payments/WithdrawalScreen';

// const Tab = createBottomTabNavigator();

// export default function ChefNavigator() {
//   return (
//     <Tab.Navigator screenOptions={{ headerShown: false }}>
//       <Tab.Screen name="Dashboard" component={SellerDashboardScreen} />
//       <Tab.Screen name="ChefMenu" component={ChefMenuScreen} />
//       <Tab.Screen name="RunningOrders" component={RunningOrdersScreen} />
//       <Tab.Screen name="Withdrawal" component={WithdrawalScreen} />
//     </Tab.Navigator>
//   );
// }
//formerchefnavigator

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

// Import Screens - Using your actual file paths
import SellerDashboardScreen from '../features/chef/dashboard/SellerDashboardScreen';
import ChefMenuScreen from '../features/chef/menu-management/ChefMenuScreen';
import MyFoodScreen from '../features/chef/inventory/MyFoodScreen';
import AddNewItemScreen from '../features/chef/menu-management/AddNewItemScreen';
import ChefMessageScreen from '../features/chef/engagement/ChefMessageScreen';
import RunningOrdersScreen from '../features/chef/orders/RunningOrdersScreen';
import PaymentWithdrawalScreen from '../features/chef/payments/PaymentWithdrawalScreen';
import WithdrawalScreen from '../features/chef/payments/WithdrawalScreen';

// Custom Plus Button for Center Tab
const PlusButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#FF6B35',
      shadowColor: '#FF6B35',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    }}
    onPress={onPress}
  >
    {children}
  </TouchableOpacity>
);

const Tab = createBottomTabNavigator();

export default function ChefNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}
    >
      {/* Tab 1: Dashboard */}
      <Tab.Screen
        name="Dashboard"
        component={SellerDashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />

      {/* Tab 2: My Food */}
      <Tab.Screen
        name="MyFood"
        component={MyFoodScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="book" size={size} color={color} />
          ),
          tabBarLabel: 'My Food',
        }}
      />

      {/* Tab 3: Add New Item (Center Plus Button) */}
      <Tab.Screen
        name="AddNewItem"
        component={AddNewItemScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus" size={28} color="#FFFFFF" />
          ),
          tabBarLabel: '',
          tabBarButton: (props) => (
            <PlusButton {...props}>
              <Feather name="plus" size={28} color="#FFFFFF" />
            </PlusButton>
          ),
        }}
      />

      {/* Tab 4: Messages */}
      <Tab.Screen
        name="Messages"
        component={ChefMessageScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="bell" size={size} color={color} />
          ),
          tabBarLabel: 'Messages',
        }}
      />

      {/* Tab 5: Profile */}
      <Tab.Screen
        name="ChefMenu"
        component={ChefMenuScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}