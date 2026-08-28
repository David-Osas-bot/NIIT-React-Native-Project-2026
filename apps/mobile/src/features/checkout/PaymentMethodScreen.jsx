import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './PaymentMethodScreen.styles';
// TODO: confirm the actual exported name/signature in ./paystack.js and adjust this import + call below
import { initiatePaystackPayment } from './paystack';

const PAYMENT_METHODS = [
  { id: 'cash', label: 'Cash' },
  { id: 'visa', label: 'Visa' },
  { id: 'mastercard', label: 'Mastercard' },
  { id: 'paypal', label: 'PayPal' },
];

function MethodIcon({ id, active }) {
  switch (id) {
    case 'cash':
      return (
        <Ionicons name="cash-outline" size={22} color={active ? '#2F6FED' : '#9A9AA2'} />
      );
    case 'visa':
      return <Text style={styles.visaText}>VISA</Text>;
    case 'mastercard':
      return (
        <View style={styles.mastercardMark}>
          <View style={styles.mastercardCircleRed} />
          <View style={styles.mastercardCircleOrange} />
        </View>
      );
    case 'paypal':
      return (
        <Ionicons name="logo-paypal" size={22} color={active ? '#2F6FED' : '#9A9AA2'} />
      );
    default:
      return null;
  }
}

export default function PaymentMethodScreen({ navigation, route }) {
  const total = route?.params?.total ?? 0;
  const [selectedMethod, setSelectedMethod] = useState('visa');
  const [savedCards, setSavedCards] = useState([]);
  const [paying, setPaying] = useState(false);

  const hasCard = selectedMethod === 'mastercard' && savedCards.length > 0;

  const handleAddNew = () => {
    navigation.navigate('AddCardScreen', { method: selectedMethod });
  };

  const handlePayConfirm = async () => {
    setPaying(true);
    try {
      // Paystack handles the actual charge — swap in the real call/args once
      // you confirm what initiatePaystackPayment expects in paystack.js
      await initiatePaystackPayment({ amount: total, method: selectedMethod });
      navigation.navigate('PaymentSuccessfulScreen', { total, method: selectedMethod });
    } catch (err) {
      Alert.alert('Payment failed', err?.message ?? 'Please try again.');
    } finally {
      setPaying(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color="#1C1C21" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.methodRow}>
            {PAYMENT_METHODS.map((method) => {
              const active = selectedMethod === method.id;
              return (
                <TouchableOpacity
                  key={method.id}
                  style={[styles.methodItem, active && styles.methodItemActive]}
                  onPress={() => setSelectedMethod(method.id)}
                >
                  <View style={styles.methodIconWrap}>
                    <MethodIcon id={method.id} active={active} />
                  </View>
                  <Text style={[styles.methodLabel, active && styles.methodLabelActive]}>
                    {method.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {hasCard ? (
          savedCards.map((card) => (
            <View key={card.id} style={styles.savedCard}>
              <View style={styles.savedCardLeft}>
                <View style={styles.mastercardMark}>
                  <View style={styles.mastercardCircleRed} />
                  <View style={styles.mastercardCircleOrange} />
                </View>
                <Text style={styles.savedCardNumber}>•••• {card.last4}</Text>
              </View>
              <Text style={styles.savedCardBadge}>Default</Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <View style={styles.cardGraphicWrap}>
              <View style={styles.cardGraphicBack} />
              <View style={styles.cardGraphicFront}>
                <View style={styles.cardGraphicChip} />
                <View style={styles.cardGraphicLine} />
              </View>
            </View>
            <Text style={styles.emptyTitle}>
              No {selectedMethod === 'mastercard' ? 'master' : selectedMethod} card added
            </Text>
            <Text style={styles.emptySubtitle}>
              You can add a {selectedMethod === 'mastercard' ? 'mastercard' : 'card'} and save it
              for later
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.addNewButton} onPress={handleAddNew}>
          <Ionicons name="add-circle-outline" size={16} color="#F2994A" />
          <Text style={styles.addNewText}>ADD NEW</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Text style={styles.totalLabel}>TOTAL</Text>
        <Text style={styles.totalValue}>${total}</Text>
        <TouchableOpacity
          style={[styles.payButton, paying && styles.payButtonDisabled]}
          onPress={handlePayConfirm}
          disabled={paying}
        >
          <Text style={styles.payButtonText}>{paying ? 'PROCESSING...' : 'PAY & CONFIRM'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}