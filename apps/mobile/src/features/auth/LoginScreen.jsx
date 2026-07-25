import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AuthHeader from './AuthHeader';
import AuthBody from './AuthBody';
import FormField from './FormDesign';
import SocialRow from './SocialRow';
import styles from './LoginScreen.styles.js';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // TODO: wire up to real auth once the auth store exists
    console.log('login', { email, password, rememberMe });
  };

  return (
    <View style={styles.screen}>
      <AuthHeader navigation={navigation} title="Log In" subtitle="Please sign in to your existing account" />

      <AuthBody>
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

        <View style={styles.optionsRow}>
          <TouchableOpacity style={styles.rememberRow} onPress={() => setRememberMe(!rememberMe)}>
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                      {rememberMe && <Text style={styles.tickText}>✔</Text>}
                      </View>
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.link}>Forgot Password</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>LOG IN</Text>
        </TouchableOpacity>

        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.link}>SIGN UP</Text>
          </TouchableOpacity>
        </View>

        <SocialRow />
      </AuthBody>
    </View>
  );
}