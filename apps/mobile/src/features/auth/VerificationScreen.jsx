import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AuthHeader from './AuthHeader';
import AuthBody from './AuthBody';
import styles from './VerificationScreen.styles.js';

const CODE_LENGTH = 4;
const RESEND_SECONDS = 50;

export default function VerificationScreen({ navigation, route }) {
  const email = route?.params?.email || 'example@gmail.com';
  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(''));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const inputs = useRef([]);

  useEffect(() => {
    if (secondsLeft === 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleChange = (text, index) => {
    const clean = text.replace(/[^0-9]/g, '').slice(-1);
    const next = [...digits];
    next[index] = clean;
    setDigits(next);

    if (clean && index < CODE_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    setSecondsLeft(RESEND_SECONDS);
    // TODO: trigger real resend once the auth store exists
  };

  const handleVerify = () => {
    // TODO: wire up to real auth — destination depends on whether this
    // came from Signup or Forgot Password, see note below
    console.log('verify', digits.join(''));
  };

  return (
    <View style={styles.screen}>
      <AuthHeader navigation={navigation} title="Verification" subtitle="We have sent a code to your email">
        <Text style={styles.email}>{email}</Text>
      </AuthHeader>

      <AuthBody>
        <TouchableOpacity style={styles.resendRow} onPress={handleResend} disabled={secondsLeft > 0}>
          <Text style={styles.resendText}>{secondsLeft > 0 ? `Resend in ${secondsLeft}s` : 'Resend'}</Text>
        </TouchableOpacity>

        <View style={styles.codeBoxes}>
          {digits.map((digit, i) => (
            <TextInput
              key={i}
              ref={(ref) => (inputs.current[i] = ref)}
              style={styles.codeBox}
              value={digit}
              onChangeText={(text) => handleChange(text, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleVerify}>
          <Text style={styles.primaryButtonText}>VERIFY</Text>
        </TouchableOpacity>
      </AuthBody>
    </View>
  );
}