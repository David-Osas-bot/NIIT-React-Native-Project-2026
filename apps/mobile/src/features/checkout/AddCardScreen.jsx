// import { View } from 'react-native';
// import styles from './AddCardScreen.styles';

// export default function AddCardScreen() {
//   return <View style={styles.container} />;
// }









import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import styles from './AddCardScreen.styles';

// ---- Formatting helpers -----------------------------------------------

const formatCardNumber = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
};

const formatExpiry = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 6);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

const maskedPreviewNumber = (digits) => {
  const groups = ['____', '____', '____', '____'];
  for (let i = 0; i < 16; i += 1) {
    const groupIndex = Math.floor(i / 4);
    const posInGroup = i % 4;
    if (digits[i]) {
      const chars = groups[groupIndex].split('');
      chars[posInGroup] = digits[i];
      groups[groupIndex] = chars.join('');
    }
  }
  return groups.join(' ');
};

const luhnValid = (digits) => {
  if (digits.length < 12) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let d = parseInt(digits[i], 10);
    if (shouldDouble) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

// ---- Component ----------------------------------------------------------

export default function AddCardScreen({ onClose, onSubmit }) {
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const rawDigits = cardNumber.replace(/\D/g, '');

  const errors = useMemo(() => {
    const e = {};
    if (touched.cardHolderName && cardHolderName.trim().length < 2) {
      e.cardHolderName = 'Enter the name on the card';
    }
    if (touched.cardNumber && !luhnValid(rawDigits)) {
      e.cardNumber = 'Enter a valid card number';
    }
    if (touched.expiry) {
      const digits = expiry.replace(/\D/g, '');
      const month = parseInt(digits.slice(0, 2), 10);
      if (digits.length < 4 || month < 1 || month > 12) {
        e.expiry = 'Enter a valid expiry date';
      }
    }
    if (touched.cvc && cvc.length < 3) {
      e.cvc = 'Enter a valid CVC';
    }
    return e;
  }, [touched, cardHolderName, rawDigits, expiry, cvc]);

  const isFormValid =
    cardHolderName.trim().length >= 2 &&
    luhnValid(rawDigits) &&
    /^\d{2}\/\d{2,4}$/.test(expiry) &&
    cvc.length >= 3;

  const markTouched = (field) => setTouched((t) => ({ ...t, [field]: true }));

  const handleSubmit = async () => {
    setTouched({
      cardHolderName: true,
      cardNumber: true,
      expiry: true,
      cvc: true,
    });
    if (!isFormValid || submitting) return;

    setSubmitting(true);
    try {
      await onSubmit?.({
        cardHolderName: cardHolderName.trim(),
        cardNumber: rawDigits,
        expiry,
        cvc,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close"
        >
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Card</Text>
      </View>

      {/* Card preview */}
      <View style={styles.previewArea}>
        <View style={styles.previewCard}>
          <Text style={styles.previewCardNumber}>
            {maskedPreviewNumber(rawDigits)}
          </Text>
          <View style={styles.previewCardMeta}>
            <Text style={styles.previewCardName}>
              {cardHolderName || 'CARD HOLDER NAME'}
            </Text>
            <Text style={styles.previewCardExpiry}>
              {expiry || 'MM/YY'}
            </Text>
          </View>
        </View>
      </View>

      {/* Form */}
      <ScrollView
        style={styles.body}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Card Holder Name</Text>
          <TextInput
            style={[styles.input, errors.cardHolderName && styles.inputError]}
            placeholder="Vishal Khadok"
            placeholderTextColor={styles.input.color}
            value={cardHolderName}
            onChangeText={setCardHolderName}
            onBlur={() => markTouched('cardHolderName')}
            autoCapitalize="words"
            returnKeyType="next"
          />
          {errors.cardHolderName ? (
            <Text style={styles.errorText}>{errors.cardHolderName}</Text>
          ) : null}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={[styles.input, errors.cardNumber && styles.inputError]}
            placeholder="1234 5678 9012 3456"
            keyboardType="number-pad"
            value={cardNumber}
            onChangeText={(v) => setCardNumber(formatCardNumber(v))}
            onBlur={() => markTouched('cardNumber')}
            maxLength={19}
            returnKeyType="next"
          />
          {errors.cardNumber ? (
            <Text style={styles.errorText}>{errors.cardNumber}</Text>
          ) : null}
        </View>

        <View style={styles.row}>
          <View style={[styles.fieldGroup, styles.halfField]}>
            <Text style={styles.label}>Expire Date</Text>
            <TextInput
              style={[styles.input, errors.expiry && styles.inputError]}
              placeholder="MM/YYYY"
              keyboardType="number-pad"
              value={expiry}
              onChangeText={(v) => setExpiry(formatExpiry(v))}
              onBlur={() => markTouched('expiry')}
              maxLength={7}
              returnKeyType="next"
            />
            {errors.expiry ? (
              <Text style={styles.errorText}>{errors.expiry}</Text>
            ) : null}
          </View>

          <View style={styles.halfFieldSpacer} />

          <View style={[styles.fieldGroup, styles.halfField]}>
            <Text style={styles.label}>CVC</Text>
            <TextInput
              style={[styles.input, errors.cvc && styles.inputError]}
              placeholder="•••"
              keyboardType="number-pad"
              secureTextEntry
              value={cvc}
              onChangeText={(v) => setCvc(v.replace(/\D/g, '').slice(0, 4))}
              onBlur={() => markTouched('cvc')}
              maxLength={4}
              returnKeyType="done"
            />
            {errors.cvc ? (
              <Text style={styles.errorText}>{errors.cvc}</Text>
            ) : null}
          </View>
        </View>

        <View style={styles.spacer} />

        <TouchableOpacity
          style={[
            styles.submitButton,
            (!isFormValid || submitting) && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!isFormValid || submitting}
          accessibilityRole="button"
        >
          <Text style={styles.submitButtonText}>
            {submitting ? 'ADDING…' : 'ADD & MAKE PAYMENT'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}