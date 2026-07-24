// import { View } from 'react-native';
// import styles from './EditCartScreen.styles';

// export default function EditCartScreen() {
//   return <View style={styles.container} />;
// }


 




import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './EditCartScreen.styles';

export default function EditCartScreen({ navigation }) {
  // TODO: replace with real cart state (Zustand cart store) instead of local state
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Pizza Calzone European',
      size: '14"',
      price: 32,
      quantity: 2,
      image: null, // TODO: require('../../../assets/food/pizza-calzone.png')
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

  const updateQuantity = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
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
            <Text style={styles.editLink}>EDIT</Text>2-+
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