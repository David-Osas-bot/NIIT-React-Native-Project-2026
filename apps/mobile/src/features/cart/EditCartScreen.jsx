import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './EditCartScreen.styles';
import { apiRequest } from '../../shared/api';

export default function EditCartScreen({ navigation }) {
  // 1. Declare state hooks at top
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Pizza Calzone European',
      size: '14"',
      price: 32,
      quantity: 2,
      image: null,
    },
    {
      id: '2',
      name: 'Pizza Calzone European',
      size: '14"',
      price: 32,
      quantity: 1,
      image: null,
    },
  ]);

  const deliveryAddress = '2118 Thornridge Cir. Syracuse'; // TODO: pull from profile/addresses

  // 2. Fetch cart on mount
  useEffect(() => {
    apiRequest('/cart')
      .then((data) => {
        if (data?.items) setItems(data.items);
      })
      .catch(console.error);
  }, []);

  // 3. Handlers with optimistic UI updates & API persistence
  const updateQuantity = async (id, delta) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);

    // Optimistic UI update
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i))
    );

    try {
      const updatedCart = await apiRequest(`/cart/items/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity: newQuantity }),
      });
      if (updatedCart?.items) setItems(updatedCart.items);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const removeItem = async (id) => {
    // Optimistic UI removal
    setItems((prev) => prev.filter((item) => item.id !== id));

    try {
      const updatedCart = await apiRequest(`/cart/items/${id}`, { method: 'DELETE' });
      if (updatedCart?.items) setItems(updatedCart.items);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
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
          <TouchableOpacity onPress={() => { /* TODO: enable delete/reorder mode */ }}>
            <Text style={styles.editItemsLink}>EDIT ITEMS</Text>
          </TouchableOpacity>
        </View>

        {/* Cart items */}
        {items.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <View style={styles.itemImage}>
              {item.image ? (
                <Image source={item.image} style={styles.image} resizeMode="cover" />
              ) : (
                <View style={styles.imagePlaceholder} />
              )}
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