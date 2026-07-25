import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AuthHeader from './AuthHeader';
import AuthBody from './AuthBody';
import FormField from './FormDesign';
import styles from './SignupScreen.styles.js';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const goToLogin = () => navigation.navigate('Login');

  const handleSignup = () => {
    // wire up to real auth once the auth store exists
    // navigation.navigate('Verification', { email });
    navigation.navigate(goToLogin ? 'Login' : 'Verification', { email });
  };

  return (
    <View style={styles.screen}>
      <AuthHeader navigation={navigation} title="Sign Up" subtitle="Please sign up to get started" />

      <AuthBody >
        
        <FormField label="NAME" placeholder="John doe" value={name} onChangeText={setName} />
        <FormField
          label="EMAIL"
          placeholder="example@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <FormField
          label="PASSWORD"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <FormField
          label="RE-TYPE PASSWORD"
          placeholder="••••••••"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleSignup}>
          <Text style={styles.primaryButtonText}>SIGN UP</Text>
        </TouchableOpacity>
      </AuthBody>
    </View>
  );
}