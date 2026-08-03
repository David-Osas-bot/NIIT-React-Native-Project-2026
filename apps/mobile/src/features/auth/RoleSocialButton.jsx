import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './RoleSocialButton.styles.js';

export default function RoleSocialButton({ provider, icon, iconColor, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name={icon} size={18} color={iconColor ?? '#1C1C1E'} style={styles.icon} />
      <Text style={styles.text}>Continue with {provider}</Text>
    </TouchableOpacity>
  );
}