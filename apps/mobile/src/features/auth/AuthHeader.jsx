import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import styles from './AuthHeader.styles.js';
import Sunburst from '../../../assets/sunburst3.png';
import broken from '../../../assets/brokenLines.png';

export default function AuthHeader({ navigation, title, subtitle, children }) {
  const insets = useSafeAreaInsets();
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
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <Image source={Sunburst} style={styles.sunburst} resizeMode="contain" />
      <Image source={broken} style={styles.broken} resizeMode="contain" />

      <View style={styles.topRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color={colors.dark} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {children}
    </View>
  );
}