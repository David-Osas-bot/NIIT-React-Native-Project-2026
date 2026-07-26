import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from './PaymentWithdrawalScreen.styles';
import { apiRequest } from '../../api/client';

export default function PaymentWithdrawalScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [balance, setBalance] = useState(null);
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const data = await apiRequest('/payments/balance');
      setBalance(data.balance);
    } catch (err) {
      setError('Could not load balance');
    } finally {
      setLoadingBalance(false);
    }
  };

  const handleWithdraw = async () => {
    const numericAmount = parseFloat(amount);

    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (balance !== null && numericAmount > balance) {
      setError('Amount exceeds your available balance');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      await apiRequest('/payments/withdraw', {
        method: 'POST',
        body: JSON.stringify({ amount: numericAmount }),
      });
      navigation?.navigate('WithdrawSuccess');
    } catch (err) {
      setError(err.message || 'Withdrawal failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation?.goBack()}
      >
        <Text>{'‹'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Withdraw Funds</Text>

      {loadingBalance ? (
        <ActivityIndicator style={{ marginBottom: 30 }} />
      ) : (
        <Text style={styles.balanceText}>
          Available Balance:{' '}
          <Text style={styles.balanceAmount}>
            ${balance !== null ? balance.toFixed(2) : '0.00'}
          </Text>
        </Text>
      )}

      <Text style={styles.label}>Enter Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="$0.00"
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => {
          setAmount(text);
          setError('');
        }}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={[
          styles.submitButton,
          (!amount || submitting) && styles.submitButtonDisabled,
        ]}
        onPress={handleWithdraw}
        disabled={!amount || submitting}
      >
        {submitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Withdraw</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}