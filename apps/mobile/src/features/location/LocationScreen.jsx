import React, { useState } from 'react';
import { View,Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import styles from './LocationScreen.styles.js';
import locationImage from '../../../assets/location.png';

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
export default function LocationScreen({ navigation }) {
  const [requesting, setRequesting] = useState(false);

  const handleAccessLocation = async () => {
    setRequesting(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      // TODO: where this goes next depends on where this screen sits in
      // the nav tree — see chat notes
      console.log('location permission:', status);
      navigation.navigate('Customer');
    } finally {
      setRequesting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imagePlaceholder} >
        <Image source={locationImage} style={styles.image} />
        </View>

      <TouchableOpacity style={styles.button} onPress={handleAccessLocation} disabled={requesting}>
        {requesting ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <>
            <Text style={styles.buttonText}>ACCESS LOCATION</Text>
            <View style={styles.iconCircle}>
              <Ionicons name="location" size={16} color={colors.white} />
            </View>
          </>
        )}
      </TouchableOpacity>

      <Text style={styles.disclaimer}>
        DFOOD WILL ACCESS YOUR LOCATION{'\n'}ONLY WHILE USING THE APP
      </Text>
    </SafeAreaView>
  );
}