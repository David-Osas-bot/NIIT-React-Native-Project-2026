import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Modal, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { styles } from './DeliveryWalletScreen.styles';
import DeliveryBottomNav from '../DeliveryBottomNav';

const BASE_URL = 'https://niit-react-native-project-2026.onrender.com';

export default function DeliveryWalletScreen({ navigation }) {
  const [availableBalance, setAvailableBalance] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(0); 
  const [weeklyEarnings, setWeeklyEarnings] = useState(0);
  const [monthlyEarnings, setMonthlyEarnings] = useState(0);
  const [loading, setLoading] = useState(true);

  const [linkedAccount, setLinkedAccount] = useState({
    bankName: 'No Bank Linked',
    last4: '0000',
    holderName: 'User',
  });

  const [transactions, setTransactions] = useState([
    // Fallback/Placeholder history (since a dedicated GET /transactions endpoint wasn't specified)
    { id: 't1', type: 'credit', title: 'Delivery Payout', subtitle: 'Order #21200 · Vegetarian Poutine House', date: 'Today, 2:40 PM', amount: 6.75 },
    { id: 't2', type: 'credit', title: 'Delivery Payout', subtitle: 'Order #53241 · Turkey Bacon Strips', date: 'Today, 9:40 AM', amount: 5.00 },
  ]);

  const [isWithdrawVisible, setIsWithdrawVisible] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawError, setWithdrawError] = useState('');

  const formatMoney = (n) => `$${Number(n).toFixed(2)}`;

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      setLoading(true);

      // 1. Fetch Balance & Earnings
      const balanceRes = await fetch(`${BASE_URL}/payments/balance`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (balanceRes.ok) {
        const balanceData = await balanceRes.json();
        setAvailableBalance(balanceData.available || 128.50); // Fallbacks for UI testing
        setPendingBalance(balanceData.pending || 24.15);
        setWeeklyEarnings(balanceData.weekly || 186.40);
        setMonthlyEarnings(balanceData.monthly || 742.90);
      }

      // 2. Fetch Payment Methods
      const methodsRes = await fetch(`${BASE_URL}/payments/methods`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (methodsRes.ok) {
        const methodsData = await methodsRes.json();
        if (methodsData && methodsData.length > 0) {
          const primary = methodsData[0];
          setLinkedAccount({
            bankName: primary.brand || primary.bankName || 'Card/Bank',
            last4: primary.last4 || '****',
            holderName: primary.holderName || 'Courier',
          });
        } else {
           // Mock fallback if array is empty
           setLinkedAccount({ bankName: 'GTBank', last4: '4821', holderName: 'Robert Fox' });
        }
      }
    } catch (error) {
      console.error("Error fetching wallet data:", error);
    } finally {
      setLoading(false);
    }
  };

  const openWithdraw = () => {
    setWithdrawAmount('');
    setWithdrawError('');
    setIsWithdrawVisible(true);
  };

  const handleConfirmWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);

    if (!amount || amount <= 0) {
      setWithdrawError('Enter a valid amount');
      return;
    }
    if (amount > availableBalance) {
      setWithdrawError('Amount exceeds your available balance');
      return;
    }

    try {
      // POST /payments/withdraw
      const response = await fetch(`${BASE_URL}/payments/withdraw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error('Withdrawal request failed on server');
      }

      const withdrawalData = await response.json();

      // Deduct locally and log transaction using the returned _id and status
      setAvailableBalance((prev) => prev - amount);
      setTransactions((prev) => [
        {
          id: withdrawalData._id || `t${Date.now()}`,
          type: 'debit',
          title: 'Withdrawal',
          subtitle: `${linkedAccount.bankName} •••• ${linkedAccount.last4} (${withdrawalData.status || 'Pending'})`,
          date: 'Just now',
          amount,
        },
        ...prev,
      ]);
      
      setIsWithdrawVisible(false);
      Alert.alert('Success', 'Withdrawal processed successfully.');

    } catch (error) {
      console.error("Withdrawal error:", error);
      setWithdrawError(error.message || 'An error occurred.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wallet</Text>
        <View style={styles.headerSpacer} />
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FE724C" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>AVAILABLE BALANCE</Text>
            <Text style={styles.balanceAmount}>{formatMoney(availableBalance)}</Text>
            <Text style={styles.pendingText}>{formatMoney(pendingBalance)} pending clearance</Text>

            <TouchableOpacity style={styles.withdrawButton} onPress={openWithdraw}>
              <Text style={styles.withdrawButtonText}>Withdraw to Bank</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statAmount}>{formatMoney(weeklyEarnings)}</Text>
              <Text style={styles.statLabel}>THIS WEEK</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statAmount}>{formatMoney(monthlyEarnings)}</Text>
              <Text style={styles.statLabel}>THIS MONTH</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payout Method</Text>
            <View style={styles.accountCard}>
              <View style={styles.bankIconWrap}>
                <Text style={styles.bankIcon}>🏦</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.accountBankName}>{linkedAccount.bankName}</Text>
                <Text style={styles.accountNumber}>•••• •••• {linkedAccount.last4}</Text>
                <Text style={styles.accountHolder}>{linkedAccount.holderName}</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.changeLink}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.section, { marginBottom: 30 }]}>
            <Text style={styles.sectionTitle}>Transaction History</Text>

            {transactions.map((tx) => (
              <View key={tx.id} style={styles.transactionRow}>
                <View style={[styles.transactionIconWrap, tx.type === 'credit' ? styles.iconWrapCredit : styles.iconWrapDebit]}>
                  <Text style={styles.transactionIcon}>{tx.type === 'credit' ? '↓' : '↑'}</Text>
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionTitle}>{tx.title}</Text>
                  <Text style={styles.transactionSubtitle} numberOfLines={1}>{tx.subtitle}</Text>
                  <Text style={styles.transactionDate}>{tx.date}</Text>
                </View>
                <Text style={[styles.transactionAmount, tx.type === 'credit' ? styles.amountCredit : styles.amountDebit]}>
                  {tx.type === 'credit' ? '+' : '-'}{formatMoney(tx.amount)}
                </Text>
              </View>
            ))}
          </View>

        </ScrollView>
      )}

      <DeliveryBottomNav active="wallet" />

      <Modal visible={isWithdrawVisible} transparent animationType="slide" onRequestClose={() => setIsWithdrawVisible(false)}>
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setIsWithdrawVisible(false)} />

          <View style={styles.modalSheet}>
            <View style={styles.dragHandle} />

            <Text style={styles.modalTitle}>Withdraw to Bank</Text>
            <Text style={styles.modalSubtitle}>{linkedAccount.bankName} •••• {linkedAccount.last4}</Text>

            <View style={styles.amountInputWrap}>
              <Text style={styles.currencyPrefix}>$</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor="#C4C4C4"
                keyboardType="decimal-pad"
                value={withdrawAmount}
                onChangeText={(text) => {
                  setWithdrawAmount(text);
                  setWithdrawError('');
                }}
              />
            </View>

            <Text style={styles.availableHint}>Available: {formatMoney(availableBalance)}</Text>
            {withdrawError ? <Text style={styles.errorText}>{withdrawError}</Text> : null}

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmWithdraw}>
              <Text style={styles.confirmButtonText}>Confirm Withdrawal</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsWithdrawVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

    </SafeAreaView>
  );
}