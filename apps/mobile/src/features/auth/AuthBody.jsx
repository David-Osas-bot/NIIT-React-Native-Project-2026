import React from 'react';
import {View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './AuthBody.styles.js';

export default function AuthBody({ children }) {
  return (
    <View style={styles.card}> 
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
    </View>
  );
}
