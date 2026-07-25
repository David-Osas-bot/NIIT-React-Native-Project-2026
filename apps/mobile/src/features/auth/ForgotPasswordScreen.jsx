import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AuthHeader from './AuthHeader';
import AuthBody from './AuthBody';
import FormField from './FormDesign';
import styles from './ForgotPasswordScreen.styles.js';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleSendCode = () => {
    // TODO: wire up to real auth once the auth store exists
    navigation.navigate('Verification', { email });
  };

  return (
    <View style={styles.screen}>
      <AuthHeader navigation={navigation} title="Forgot Password" subtitle="Please sign in to your existing account" />

      <AuthBody>
        <FormField
          label="EMAIL"
          placeholder="example@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleSendCode}>
          <Text style={styles.primaryButtonText}>SEND CODE</Text>
        </TouchableOpacity>
      </AuthBody>
    </View>
  );
}