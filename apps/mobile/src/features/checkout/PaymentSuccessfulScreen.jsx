import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { processPaystackPayment } from './paystack'; // adjust path to wherever this function actually lives
import styles from './PaymentSuccessfulScreen.styles';

export default function PaymentSuccessfulScreen({ route, navigation }) {
  const { reference, paymentMethod, amount } = route.params ?? {};

  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState(null);

  const confirmPayment = useCallback(async () => {
    setStatus('loading');
    setErrorMessage(null);
    try {
      await processPaystackPayment({ reference, paymentMethod, amount });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error?.message ?? 'Something went wrong confirming your payment.');
    }
  }, [reference, paymentMethod, amount]);

  useEffect(() => {
    confirmPayment();
  }, [confirmPayment]);

  if (status === 'loading') {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FF7A1A" />
        <Text style={styles.loadingText}>Confirming your payment…</Text>
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorTitle}>Payment not confirmed</Text>
        <Text style={styles.subtitle}>{errorMessage}</Text>
        <TouchableOpacity style={styles.trackButton} onPress={confirmPayment}>
          <Text style={styles.trackButtonText}>TRY AGAIN</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../../assets/payment-success.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
        <Text style={styles.title}>Congratulations!</Text>
        <Text style={styles.subtitle}>
          You successfully made a payment, enjoy our service!
        </Text>
      </View>

      <TouchableOpacity
        style={styles.trackButton}
        onPress={() => navigation.navigate('TrackingScreen', { reference })}
      >
        <Text style={styles.trackButtonText}>TRACK ORDER</Text>
      </TouchableOpacity>
    </View>
  );
}