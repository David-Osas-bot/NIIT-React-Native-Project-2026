import React from 'react';
import {View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './AuthBody.styles.js';

export default function AuthBody({ children }) {
  return (
    <View style={styles.card}> 
      <SafeAreaView style={styles.flex} edges={['bottom']}>
        <KeyboardAwareScrollView 
          contentContainerStyle={styles.content} 
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          extraScrollHeight={Platform.OS === 'ios' ? 20 : 80}
          showsVerticalScrollIndicator={false}>
          {children}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}
