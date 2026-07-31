import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './SocialRow.styles.js';

const ICONS = [
  { name: 'logo-facebook', bg: '#3B5998' },
  { name: 'logo-google', bg: '#1DA1F2' },
  { name: 'logo-apple', bg: '#000000' },
];
const colors = {  primary: '#FF7622',
  dark: '#1C1C1E',
  gray: '#94A3B8',
  lightGray: '#E2E8F0',
  textMuted: '#64748B',
  white: '#FFFFFF',
  headerDark: '#15152B',
  inputBg: '#F5F6FA',
};

export default function SocialRow({ onPressIcon }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.orText}>Or</Text>
      <View style={styles.row}>
        {ICONS.map((icon) => (
          <TouchableOpacity
            key={icon.name}
            style={[styles.circle, { backgroundColor: icon.bg }]}
            onPress={() => onPressIcon?.(icon.name)}
          >
            <Ionicons name={icon.name} size={30} color={colors.white} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}