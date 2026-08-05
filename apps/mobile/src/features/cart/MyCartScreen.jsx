// import { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import styles from './MyCartScreen.styles';
// import { apiRequest } from '../../shared/api';

// export default function MyCartScreen({ navigation }) {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
// <<<<<<< HEAD

//   const deliveryAddress = '2118 Thornridge Cir. Syracuse';
// =======
//   const [error, setError] = useState(null);
// >>>>>>> Dim-root

//   useEffect(() => {
//     apiRequest('/cart')
//       .then((data) => {
//         setItems(data?.items || data || []);
//       })
//       .catch((err) => console.error('Error loading cart:', err))
//       .finally(() => setLoading(false));
//   }, []);

//   const updateQuantity = async (id, delta) => {
//     const item = items.find((i) => i.id === id);
//     if (!item) return;

//     const newQuantity = Math.max(1, item.quantity + delta);

// <<<<<<< HEAD
//     setItems((prev) =>
//       prev.map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i))
//     );

//     try {
//       const updatedCart = await apiRequest(`/cart/items/${id}`, {
//         method: 'PUT',
//         data: { quantity: newQuantity },
//       });
//       if (updatedCart?.items) setItems(updatedCart.items);
//     } catch (error) {
//       console.error('Failed to update quantity:', error);
//     }
//   };

//   const removeItem = async (id) => {
//     setItems((prev) => prev.filter((item) => item.id !== id));

//     try {
//       const updatedCart = await apiRequest(`/cart/items/${id}`, {
//         method: 'DELETE',
//       });
//       if (updatedCart?.items) setItems(updatedCart.items);
//     } catch (error) {
//       console.error('Failed to remove item:', error);
// =======
//   const loadCart = () => {
//     setLoading(true);
//     apiRequest('/cart')
//       .then((cart) => setItems(cart.items ?? []))
//       .catch((err) => setError(err?.message ?? 'Could not load cart'))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     loadCart();
//   }, []);

//   const updateQuantity = async (itemId, delta) => {
//     const current = items.find((item) => item.id === itemId);
//     if (!current) return;
//     const newQuantity = Math.max(1, current.quantity + delta);

//     // optimistic update
//     setItems((prev) =>
//       prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
//     );

//     try {
//       const updatedCart = await apiRequest(`/cart/items/${itemId}`, {
//         method: 'PUT',
//         data: { quantity: newQuantity },
//       });
//       setItems(updatedCart.items ?? []);
//     } catch (err) {
//       setError(err?.message ?? 'Could not update quantity');
//       loadCart(); // reload to reflect real server state after failure
//     }
//   };

//   const removeItem = async (itemId) => {
//     const previousItems = items;
//     setItems((prev) => prev.filter((item) => item.id !== itemId));

//     try {
//       const updatedCart = await apiRequest(`/cart/items/${itemId}`, { method: 'DELETE' });
//       setItems(updatedCart.items ?? []);
//     } catch (err) {
//       setError(err?.message ?? 'Could not remove item');
//       setItems(previousItems);
// >>>>>>> Dim-root
//     }
//   };

//   const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   if (loading) {
//     return (
// <<<<<<< HEAD
//       <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
//         <ActivityIndicator size="large" color="#F2994A" />
// =======
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#F2994A" style={{ marginTop: 40 }} />
// >>>>>>> Dim-root
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <View style={styles.header}>
//           <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//             <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Cart</Text>
//           <TouchableOpacity onPress={() => navigation.goBack()}>
//             <Text style={styles.doneLink}>DONE</Text>
//           </TouchableOpacity>
//         </View>

// <<<<<<< HEAD
// =======
//         {error && <Text style={styles.errorText}>{error}</Text>}

//         {/* Cart items */}
// >>>>>>> Dim-root
//         {items.map((item) => (
//           <View key={item.id} style={styles.itemRow}>
//             <View style={styles.itemImageWrap}>
//               <View style={styles.itemImage}>
//                 {item.imageUrl ? (
//                   <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
//                 ) : (
//                   <View style={styles.imagePlaceholder} />
//                 )}
//               </View>
//               <TouchableOpacity
//                 style={styles.removeButton}
//                 onPress={() => removeItem(item.id)}
//               >
//                 <Ionicons name="close" size={12} color="#FFFFFF" />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.itemInfo}>
//               <Text style={styles.itemName}>{item.name}</Text>
//               <Text style={styles.itemPrice}>${item.price * item.quantity}</Text>

//               <View style={styles.itemMetaRow}>
//                 <Text style={styles.itemSize}>{item.size}</Text>

//                 <View style={styles.stepper}>
//                   <TouchableOpacity
//                     style={styles.stepperButton}
//                     onPress={() => updateQuantity(item.id, -1)}
//                   >
//                     <Ionicons name="remove" size={14} color="#FFFFFF" />
//                   </TouchableOpacity>
//                   <Text style={styles.stepperValue}>{item.quantity}</Text>
//                   <TouchableOpacity
//                     style={styles.stepperButton}
//                     onPress={() => updateQuantity(item.id, 1)}
//                   >
//                     <Ionicons name="add" size={14} color="#FFFFFF" />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </View>
//         ))}
//       </ScrollView>

//       <View style={styles.bottomSheet}>
//         <View style={styles.addressHeaderRow}>
//           <Text style={styles.addressLabel}>DELIVERY ADDRESS</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('Addresses')}>
//             <Text style={styles.editLink}>EDIT</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.addressBox}>
//           <Text style={styles.addressText}>{deliveryAddress}</Text>
//         </View>

//         <View style={styles.totalRow}>
//           <Text style={styles.totalLabel}>
//             TOTAL: <Text style={styles.totalValue}>${total}</Text>
//           </Text>
//           <TouchableOpacity style={styles.breakdownButton}>
//             <Text style={styles.breakdownText}>Breakdown</Text>
//             <Ionicons name="chevron-forward" size={14} color="#F2994A" />
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity
//           style={styles.placeOrderButton}
//           onPress={() => navigation.navigate('PaymentMethod', { total })}
//         >
//           <Text style={styles.placeOrderText}>PLACE ORDER</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }






import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './MyCartScreen.styles';

export default function MyCartScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const deliveryAddress = '2118 Thornridge Cir. Syracuse';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>My Cart</Text>
        </View>

        {/* Cart items list rendering */}
        {items.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty</Text>
        ) : (
          items.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Text style={styles.itemName}>{item.name}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}