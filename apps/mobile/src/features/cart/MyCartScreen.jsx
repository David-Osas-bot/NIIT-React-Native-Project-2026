import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './MyCartScreen.styles';
import { apiRequest } from '../../shared/api';

export default function MyCartScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const deliveryAddress = '2118 Thornridge Cir. Syracuse';

  useEffect(() => {
    apiRequest('/cart')
      .then((data) => {
        setItems(data?.items || data || []);
      })
      .catch((err) => console.error('Error loading cart:', err))
      .finally(() => setLoading(false));
  }, []);

  const updateQuantity = async (id, delta) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);

    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i))
    );

    try {
      const updatedCart = await apiRequest(`/cart/items/${id}`, {
        method: 'PUT',
        data: { quantity: newQuantity },
      });
      if (updatedCart?.items) setItems(updatedCart.items);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const removeItem = async (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));

    try {
      const updatedCart = await apiRequest(`/cart/items/${id}`, {
        method: 'DELETE',
      });
      if (updatedCart?.items) setItems(updatedCart.items);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#F2994A" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cart</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.doneLink}>DONE</Text>
          </TouchableOpacity>
        </View>

        {items.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <View style={styles.itemImageWrap}>
              <View style={styles.itemImage}>
                {item.imageUrl ? (
                  <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
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
          <TouchableOpacity style={styles.breakdownButton}>
            <Text style={styles.breakdownText}>Breakdown</Text>
            <Ionicons name="chevron-forward" size={14} color="#F2994A" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={() => navigation.navigate('PaymentMethod', { total })}
        >
          <Text style={styles.placeOrderText}>PLACE ORDER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}