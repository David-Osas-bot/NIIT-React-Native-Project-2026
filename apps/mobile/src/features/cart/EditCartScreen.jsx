import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './EditCartScreen.styles';
import { apiRequest } from '../../shared/api';

export default function EditCartScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deliveryAddress = '2118 Thornridge Cir. Syracuse'; // TODO: pull from profile/addresses

  const loadCart = () => {
    setLoading(true);
    apiRequest('/cart')
      .then((cart) => setItems(cart.items ?? []))
      .catch((err) => setError(err?.message ?? 'Could not load cart'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQuantity = async (itemId, delta) => {
    const current = items.find((item) => item.id === itemId);
    if (!current) return;
    const newQuantity = Math.max(1, current.quantity + delta);

    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );

    try {
      const updatedCart = await apiRequest(`/cart/items/${itemId}`, {
        method: 'PUT',
        data: { quantity: newQuantity },
      });
      setItems(updatedCart.items ?? []);
    } catch (err) {
      setError(err?.message ?? 'Could not update quantity');
      loadCart();
    }
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#F2994A" style={{ marginTop: 40 }} />
      </View>
    );
  }

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

        {error && <Text style={styles.errorText}>{error}</Text>}

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