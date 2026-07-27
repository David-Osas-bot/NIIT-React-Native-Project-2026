import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './MyCartScreen.styles';
import { apiRequest } from '../../shared/api';

useEffect(() => {
  apiRequest('/cart').then(setItems).catch(console.error);
}, []);

const updateQuantity = async (itemId, newQuantity) => {
  const updatedCart = await apiRequest(`/cart/items/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity: newQuantity }),
  });
  setItems(updatedCart.items);
};

const removeItem = async (itemId) => {
  const updatedCart = await apiRequest(`/cart/items/${itemId}`, { method: 'DELETE' });
  setItems(updatedCart.items);
};

export default function MyCartScreen({ navigation }) {
  // TODO: replace with real cart state (shared Zustand cart store) instead of local state
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Pizza Calzone European',
      size: '14"',
      price: 32,
      quantity: 2,
      image: require('../../../assets/pizza-02.jpeg'),
    },
    {
      id: '2',
      name: 'Pizza Calzone European',
      size: '14"',
      price: 32,
      quantity: 1,
      image: require('../../../assets/pizza.jpeg'),

    },
  ]);

  const deliveryAddress = '2118 Thornridge Cir. Syracuse'; // TODO: pull from profile/addresses

  const updateQuantity = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cart</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.doneLink}>DONE</Text>
          </TouchableOpacity>
        </View>

        {/* Cart items */}
        {items.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <View style={styles.itemImageWrap}>
              <View style={styles.itemImage}>
                {item.image ? (
                  <Image source={item.image} style={styles.image} resizeMode="cover" />
                ) : (
                  <View style={styles.imagePlaceholder} />
                )}
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeItem(item.id)}
              >
                <Ionicons name="close" size={12} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price * item.quantity}</Text>

              <View style={styles.itemMetaRow}>
                <Text style={styles.itemSize}>{item.size}</Text>

                <View style={styles.stepper}>
                  <TouchableOpacity
                    style={styles.stepperButton}
                    onPress={() => updateQuantity(item.id, -1)}
                  >
                    <Ionicons name="remove" size={14} color="#FFFFFF" />
                  </TouchableOpacity>
                  <Text style={styles.stepperValue}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.stepperButton}
                    onPress={() => updateQuantity(item.id, 1)}
                  >
                    <Ionicons name="add" size={14} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom sheet */}
      <View style={styles.bottomSheet}>
        <View style={styles.addressHeaderRow}>
          <Text style={styles.addressLabel}>DELIVERY ADDRESS</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Addresses')}>
            <Text style={styles.editLink}>EDIT</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.addressBox}>
          <Text style={styles.addressText}>{deliveryAddress}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>
            TOTAL: <Text style={styles.totalValue}>${total}</Text>
          </Text>
          <TouchableOpacity style={styles.breakdownButton} onPress={() => { /* TODO: show breakdown modal */ }}>
            <Text style={styles.breakdownText}>Breakdown</Text>
            <Ionicons name="chevron-forward" size={14} color="#F2994A" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={() => navigation.navigate('PaymentMethod')}
        >
          <Text style={styles.placeOrderText}>PLACE ORDER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}