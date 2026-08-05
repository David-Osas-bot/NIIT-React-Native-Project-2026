import { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuListScreen from '../features/menu/MenuListScreen';
import FoodDetailScreen from '../features/menu/FoodDetailScreen';
import MyCartScreen from '../features/cart/MyCartScreen';
import EditCartScreen from '../features/cart/EditCartScreen';
import PaymentMethodScreen from '../features/checkout/PaymentMethodScreen';
import AddCardScreen from '../features/checkout/AddCardScreen';
import PaymentSuccessfulScreen from '../features/checkout/PaymentSuccessfulScreen';
import AddressesScreen from '../features/profile/AddressesScreen';
import AddNewAddressScreen from '../features/profile/AddNewAddressScreen';
import PersonalProfileScreen from '../features/profile/PersonalProfileScreen';
import EditProfileScreen from '../features/profile/EditProfileScreen';
import FoodCategoryScreen from '../features/home/FoodCategoryScreen';
import RestaurantViewScreen from '../features/home/RestaurantViewScreen';
const Stack = createNativeStackNavigator();

// NOTE: route names below were renamed to match what the screens actually
// call via navigation.navigate(...) — previously several of these had a
// "Screen" suffix in their registered name here but were called without it
// elsewhere (e.g. AddressesScreen calls navigate('MenuList'), but this was
// registered as 'MenuListScreen' — a silent crash waiting to happen).
// If you have other files calling navigate('MenuListScreen') or similar
// with the old suffixed names, those calls need updating too.
export default function CustomerStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="FoodCategoryScreen" component={FoodCategoryScreen} />
      <Stack.Screen name="RestaurantViewScreen" component={RestaurantViewScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
      <Stack.Screen name="MenuList" component={MenuListScreen} />
      <Stack.Screen name="FoodDetailScreen" component={FoodDetailScreen} />
      <Stack.Screen name="FoodCategoryScreen" component={FoodCategoryScreen} />
      <Stack.Screen name="RestaurantViewScreen" component={RestaurantViewScreen} />
      <Stack.Screen name="Cart" component={MyCartScreen} />
      <Stack.Screen name="EditCartScreen" component={EditCartScreen} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
      <Stack.Screen name="AddCardScreen" component={AddCardScreen} />
      <Stack.Screen name="PaymentSuccessfulScreen" component={PaymentSuccessfulScreen} />
      <Stack.Screen name="Addresses" component={AddressesScreen} />
      <Stack.Screen name="AddNewAddress" component={AddNewAddressScreen} />
      <Stack.Screen name="PersonalProfile" component={PersonalProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="MenuList" component={MenuListScreen} />
      <Stack.Screen name="FoodDetail" component={FoodDetailScreen} />
      <Stack.Screen name="MyCart" component={MyCartScreen} />
      <Stack.Screen name="EditCart" component={EditCartScreen} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
      <Stack.Screen name="AddCard" component={AddCardScreen} />
    </Stack.Navigator>
  );
}