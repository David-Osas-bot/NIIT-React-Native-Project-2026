import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './PaymentWithdrawalScreen.styles';

const AVAILABLE_BALANCE = 500.0;

export default function PaymentWithdrawalScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  const handleWithdraw = () => {
    const numericAmount = parseFloat(amount);

    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (numericAmount > AVAILABLE_BALANCE) {
      setError('Amount exceeds your available balance');
      return;
    }

    setError('');
    navigation?.navigate('WithdrawSuccess');
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
      <Text style={styles.balanceText}>
        Available Balance: <Text style={styles.balanceAmount}>${AVAILABLE_BALANCE.toFixed(2)}</Text>
      </Text>

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
          !amount && styles.submitButtonDisabled,
        ]}
        onPress={handleWithdraw}
        disabled={!amount}
      >
        <Text style={styles.submitButtonText}>Withdraw</Text>
      </TouchableOpacity>
    </View>
  );
}