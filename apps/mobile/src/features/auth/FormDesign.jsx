import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './FormDesign.styles.js';

export default function FormField({ label, secureTextEntry, ...inputProps }) {
  const [hidden, setHidden] = useState(secureTextEntry);
  const colors = {
  primary: '#FF7622',
  dark: '#1C1C1E',
  gray: '#94A3B8',
  lightGray: '#E2E8F0',
  textMuted: '#64748B',
  white: '#FFFFFF',
  headerDark: '#15152B',
  inputBg: '#F5F6FA',
};

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.gray}
          secureTextEntry={hidden}
          {...inputProps}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setHidden(!hidden)} style={styles.eyeButton}>
            <Ionicons name={hidden ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.gray} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}