// import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
// import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
// import styles from './FoodDetailScreen.styles';
// import { useEffect, useState } from 'react';
// import { apiRequest } from '../../shared/api';

// // inside the component, replace the hardcoded `food` object:
// const [food, setFood] = useState(null);
// const { foodId } = route.params;

// useEffect(() => {
//   apiRequest(`/food/${foodId}`).then(setFood).catch(console.error);
// }, [foodId]);

// if (!food) return null; // or a loading spinner


// const SIZES = ['10"', '14"', '16"'];

// const INGREDIENTS = [
//   { icon: 'pepper-hot', color: '#F2994A' },
//   { icon: 'leaf', color: '#F2994A' },
//   { icon: 'carrot', color: '#F2994A' }, // placeholder — swap for real ingredient icons/assets later
//   { icon: 'cheese', color: '#F2994A' },
//   { icon: 'bacon', color: '#F2994A' },
// ];

// export default function FoodDetailScreen({ route, navigation }) {
//   const [selectedSize, setSelectedSize] = useState('14"');
//   const [quantity, setQuantity] = useState(2);
//   const [isFavorite, setIsFavorite] = useState(false);

//   // TODO: replace with real data from route.params / Firestore menu item
//   const food = {
//     name: 'Pizza Calzone European',
//     restaurant: 'Uttora Coffe House',
//     description: 'Prosciutto e funghi is a pizza variety that is topped with tomato sauce.',
//     rating: 4.7,
//     delivery: 'Free',
//     time: '20 min',
//     price: 32,
//     image: require('../../../assets/pizza.jpeg'),
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//             <Ionicons name="chevron-back" size={20} color="#1A1A2E" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Details</Text>
//           <View style={{ width: 36 }} />
//         </View>

//         {/* Image card */}
//         <View style={styles.imageCard}>
//           {food.image ? (
//             <Image source={food.image} style={styles.image} resizeMode="cover" />
//           ) : (
//             <View style={styles.imagePlaceholder}>
//               <FontAwesome5 name="pizza-slice" size={48} color="#FFF" />
//             </View>
//           )}
//           <TouchableOpacity
//             style={styles.favoriteButton}
//             onPress={() => setIsFavorite(!isFavorite)}
//           >
//             <Ionicons
//               name={isFavorite ? 'heart' : 'heart-outline'}
//               size={18}
//               color={isFavorite ? '#F2994A' : '#FFFFFF'}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Restaurant badge */}
//         <View style={styles.restaurantBadge}>
//           <Text style={styles.restaurantEmoji}>🍕</Text>
//           <Text style={styles.restaurantName}>{food.restaurant}</Text>
//         </View>

//         {/* Title + description */}
//         <Text style={styles.title}>{food.name}</Text>
//         <Text style={styles.description}>{food.description}</Text>

//         {/* Rating / delivery / time */}
//         <View style={styles.metaRow}>
//           <View style={styles.metaItem}>
//             <Ionicons name="star" size={14} color="#F2994A" />
//             <Text style={styles.metaText}>{food.rating}</Text>
//           </View>
//           <View style={styles.metaItem}>
//             <Feather name="truck" size={14} color="#F2994A" />
//             <Text style={styles.metaText}>{food.delivery}</Text>
//           </View>
//           <View style={styles.metaItem}>
//             <Feather name="clock" size={14} color="#F2994A" />
//             <Text style={styles.metaText}>{food.time}</Text>
//           </View>
//         </View>

//         {/* Size selector */}
//         <Text style={styles.sectionLabel}>SIZE</Text>
//         <View style={styles.sizeRow}>
//           {SIZES.map((size) => (
//             <TouchableOpacity
//               key={size}
//               style={[styles.sizeCircle, selectedSize === size && styles.sizeCircleActive]}
//               onPress={() => setSelectedSize(size)}
//             >
//               <Text
//                 style={[styles.sizeText, selectedSize === size && styles.sizeTextActive]}
//               >
//                 {size}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Ingredients */}
//         <Text style={styles.sectionLabel}>INGREDIENTS</Text>
//         <View style={styles.ingredientsRow}>
//           {INGREDIENTS.map((item, index) => (
//             <View key={index} style={styles.ingredientCircle}>
//               <FontAwesome5 name={item.icon} size={16} color={item.color} />
//             </View>
//           ))}
//         </View>
//       </ScrollView>

//       {/* Bottom bar */}
//       <View style={styles.bottomBar}>
//         <Text style={styles.price}>${food.price}</Text>
//         <View style={styles.stepper}>
//           <TouchableOpacity
//             style={styles.stepperButton}
//             onPress={() => setQuantity(Math.max(1, quantity - 1))}
//           >
//             <Ionicons name="remove" size={16} color="#FFFFFF" />
//           </TouchableOpacity>
//           <Text style={styles.stepperValue}>{quantity}</Text>
//           <TouchableOpacity
//             style={styles.stepperButton}
//             onPress={() => setQuantity(quantity + 1)}
//           >
//             <Ionicons name="add" size={16} color="#FFFFFF" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <TouchableOpacity
//         style={styles.addToCartButton}
//         onPress={() => navigation.navigate('MyCart')}
//       >
//         <Text style={styles.addToCartText}>ADD TO CART</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }








import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons';
import styles from './FoodDetailScreen.styles';
import { apiRequest } from '../../shared/api';

const SIZES = ['10"', '14"', '16"'];
const INGREDIENTS = [
  { icon: 'pepper-hot', color: '#F2994A' },
  { icon: 'leaf', color: '#F2994A' },
  { icon: 'carrot', color: '#F2994A' },
  { icon: 'cheese', color: '#F2994A' },
  { icon: 'bacon', color: '#F2994A' },
];

export default function FoodDetailScreen({ route, navigation }) {
  const { foodId } = route.params;

  const [food, setFood] = useState(null);
  const [selectedSize, setSelectedSize] = useState('14"');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    apiRequest(`/food/${foodId}`)
      .then(setFood)
      .catch((err) => console.error('Failed to load food item:', err));
  }, [foodId]);

  if (!food) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#F2994A" />
      </View>
    );
  }

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      await apiRequest('/cart/items', {
        method: 'POST',
        data: {
          foodId: food.id || foodId,
          quantity,
          size: selectedSize,
        },
      });
      navigation.navigate('MyCart');
    } catch (err) {
      console.error('Failed to add item to cart:', err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color="#1A1A2E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Details</Text>
          <View style={{ width: 36 }} />
        </View>

        <View style={styles.imageCard}>
          {food.imageUrl ? (
            <Image source={{ uri: food.imageUrl }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.imagePlaceholder}>
              <FontAwesome5 name="pizza-slice" size={48} color="#FFF" />
            </View>
          )}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={18}
              color={isFavorite ? '#F2994A' : '#FFFFFF'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.restaurantBadge}>
          <Text style={styles.restaurantEmoji}>🍕</Text>
          <Text style={styles.restaurantName}>{food.restaurantName || 'Restaurant'}</Text>
        </View>

        <Text style={styles.title}>{food.name}</Text>
        <Text style={styles.description}>{food.description}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="star" size={14} color="#F2994A" />
            <Text style={styles.metaText}>{food.rating || '4.5'}</Text>
          </View>
          <View style={styles.metaItem}>
            <Feather name="truck" size={14} color="#F2994A" />
            <Text style={styles.metaText}>{food.deliveryFee === 0 ? 'Free' : `$${food.deliveryFee || 0}`}</Text>
          </View>
          <View style={styles.metaItem}>
            <Feather name="clock" size={14} color="#F2994A" />
            <Text style={styles.metaText}>{food.prepTime || '20 min'}</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>SIZE</Text>
        <View style={styles.sizeRow}>
          {SIZES.map((size) => (
            <TouchableOpacity
              key={size}
              style={[styles.sizeCircle, selectedSize === size && styles.sizeCircleActive]}
              onPress={() => setSelectedSize(size)}
            >
              <Text style={[styles.sizeText, selectedSize === size && styles.sizeTextActive]}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>INGREDIENTS</Text>
        <View style={styles.ingredientsRow}>
          {INGREDIENTS.map((item, index) => (
            <View key={index} style={styles.ingredientCircle}>
              <FontAwesome5 name={item.icon} size={16} color={item.color} />
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Text style={styles.price}>${food.price * quantity}</Text>
        <View style={styles.stepper}>
          <TouchableOpacity
            style={styles.stepperButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Ionicons name="remove" size={16} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.stepperValue}>{quantity}</Text>
          <TouchableOpacity
            style={styles.stepperButton}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Ionicons name="add" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.addToCartButton, isAdding && { opacity: 0.7 }]}
        disabled={isAdding}
        onPress={handleAddToCart}
      >
        <Text style={styles.addToCartText}>
          {isAdding ? 'ADDING...' : 'ADD TO CART'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}