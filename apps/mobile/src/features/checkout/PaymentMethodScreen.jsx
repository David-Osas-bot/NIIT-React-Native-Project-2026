// import { View } from 'react-native';
// import styles from './PaymentMethodScreen.styles';
 
// export default function PaymentMethodScreen() {
//   return <View style={styles.container} />;
// }






import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import styles from './PaymentMethodScreen.styles';

const PAYMENT_METHODS = [
  { id: 'cash', label: 'Cash', icon: 'money-bill-wave', brand: false },
  { id: 'visa', label: 'Visa', icon: 'cc-visa', brand: true },
  { id: 'mastercard', label: 'Mastercard', icon: 'cc-mastercard', brand: true },
  { id: 'paypal', label: 'PayPal', icon: 'cc-paypal', brand: true },
];

export default function PaymentMethodScreen({ navigation }) {
  const [selectedMethod, setSelectedMethod] = useState('mastercard');
  const total = 96; // TODO: pull real total from cart store / route.params

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color="#1A1A2E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment</Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Payment method selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.methodsRow}>
          {PAYMENT_METHODS.map((method) => {
            const isSelected = selectedMethod === method.id;
            return (
              <TouchableOpacity
                key={method.id}
                style={[styles.methodCard, isSelected && styles.methodCardActive]}
                onPress={() => setSelectedMethod(method.id)}
              >
                <FontAwesome5
                  name={method.icon}
                  size={22}
                  color={method.brand ? undefined : '#4CAF50'}
                  solid={!method.brand}
                />
                {isSelected && (
                  <View style={styles.checkBadge}>
                    <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <View style={styles.labelsRow}>
          {PAYMENT_METHODS.map((method) => (
            <Text key={method.id} style={styles.methodLabel}>
              {method.label}
            </Text>
          ))}
        </View>

        {/* Card preview */}
        <View style={styles.cardPreviewWrap}>
          <View style={styles.cardIllustration}>
            <View style={styles.cardStripe} />
            <View style={styles.cardChip} />
          </View>
          <Text style={styles.noCardTitle}>No master card added</Text>
          <Text style={styles.noCardSubtitle}>
            You can add a mastercard and{'\n'}save it for later
          </Text>
        </View>

        {/* Add new */}
        <TouchableOpacity
          style={styles.addNewButton}
          onPress={() => navigation.navigate('AddCard')}
        >
          <Ionicons name="add" size={16} color="#F2994A" />
          <Text style={styles.addNewText}>ADD NEW</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL:</Text>
          <Text style={styles.totalValue}>${total}</Text>
        </View>
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => navigation.navigate('PaymentSuccessful')}
        >
          <Text style={styles.payButtonText}>PAY & CONFIRM</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}