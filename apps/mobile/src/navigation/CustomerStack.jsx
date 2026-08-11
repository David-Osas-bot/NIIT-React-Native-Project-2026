import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../features/home/HomeScreen';
import FoodCategoryScreen from '../features/home/FoodCategoryScreen';
import RestaurantViewScreen from '../features/home/RestaurantViewScreen';
import SearchScreen from '../features/home/SearchScreen';
import FilterScreen from '../features/home/FilterScreen';
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

const Stack = createNativeStackNavigator();

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
      <Stack.Screen name="Cart" component={MyCartScreen} />
      <Stack.Screen name="EditCartScreen" component={EditCartScreen} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
      <Stack.Screen name="AddCardScreen" component={AddCardScreen} />
      <Stack.Screen name="PaymentSuccessfulScreen" component={PaymentSuccessfulScreen} />
      <Stack.Screen name="Addresses" component={AddressesScreen} />
      <Stack.Screen name="AddNewAddress" component={AddNewAddressScreen} />
      <Stack.Screen name="PersonalProfile" component={PersonalProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}