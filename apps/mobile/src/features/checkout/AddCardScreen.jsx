import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './AddCardScreen.styles';

export default function AddCardScreen({ navigation }) {
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  const handleAddCard = async () => {
    await apiRequest('/payments/methods', {
      method: 'POST',
      body: JSON.stringify({ /* fields — see note below */ }),
    });
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={18} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Card</Text>
      </View>

      {/* Top illustration area */}
      <View style={styles.illustrationArea} />

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>CARD HOLDER NAME</Text>
        <TextInput
          style={styles.input}
          placeholder="Vishal Khadok"
          placeholderTextColor="#B0B0BE"
          value={cardHolderName}
          onChangeText={setCardHolderName}
        />

        <Text style={styles.label}>CARD NUMBER</Text>
        <TextInput
          style={styles.input}
          placeholder="2134 1234 1234 1234"
          placeholderTextColor="#B0B0BE"
          keyboardType="number-pad"
          maxLength={19}
          value={cardNumber}
          onChangeText={setCardNumber}
        />

        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>EXPIRE DATE</Text>
            <TextInput
              style={styles.input}
              placeholder="mm/yyyy"
              placeholderTextColor="#B0B0BE"
              keyboardType="number-pad"
              maxLength={7}
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>CVC</Text>
            <TextInput
              style={styles.input}
              placeholder="•••"
              placeholderTextColor="#B0B0BE"
              keyboardType="number-pad"
              maxLength={4}
              secureTextEntry
              value={cvc}
              onChangeText={setCvc}
            />
          </View>
        </View>
      </View>

      {/* Submit */}
      <TouchableOpacity style={styles.submitButton} onPress={handleAddCard}>
        <Text style={styles.submitText}>ADD & MAKE PAYMENT</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}