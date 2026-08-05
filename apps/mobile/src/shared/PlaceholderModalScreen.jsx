import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import styles from './PlaceholderModalScreen.styles';

// Generic "coming soon" modal used for any route that doesn't have a real
// screen built yet. Register it multiple times in RootNavigator under
// different route names, each with different initialParams — see the
// Settings / ChefReview / Favourite / Notifications / FAQs / UserReviews
// entries there for examples.
const PlaceholderModalScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { title = 'Coming Soon', icon = 'info', message } = route.params || {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerPlaceholder} />
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="x" size={22} color="#1C1C1E" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Feather name={icon} size={32} color="#FF6B35" />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>
          {message || `${title} is coming soon.`}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PlaceholderModalScreen;