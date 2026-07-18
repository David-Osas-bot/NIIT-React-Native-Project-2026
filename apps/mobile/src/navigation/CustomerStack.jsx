import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuListScreen from '../features/menu/MenuListScreen';
import FoodDetailScreen from '../features/menu/FoodDetailScreen';
import MyCartScreen from '../features/cart/MyCartScreen';
import EditCartScreen from '../features/cart/EditCartScreen';
import PaymentMethodScreen from '../features/checkout/PaymentMethodScreen';
import AddCardScreen from '../features/checkout/AddCardScreen';
import PaymentSuccessfulScreen from '../features/checkout/PaymentSuccessfulScreen';

const Stack = createNativeStackNavigator();

export default function CustomerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MenuList" component={MenuListScreen} />
      <Stack.Screen name="FoodDetail" component={FoodDetailScreen} />
      <Stack.Screen name="MyCart" component={MyCartScreen} />
      <Stack.Screen name="EditCart" component={EditCartScreen} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
      <Stack.Screen name="AddCard" component={AddCardScreen} />
      <Stack.Screen name="PaymentSuccessful" component={PaymentSuccessfulScreen} />
    </Stack.Navigator>
  );
}