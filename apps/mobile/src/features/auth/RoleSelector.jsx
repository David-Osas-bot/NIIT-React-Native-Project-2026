import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import styles from './RoleSelector.styles.js';
import { roles } from './Roles';

export default function RoleSelectionScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.welcome}>Welcome!</Text>

        <Text style={styles.title}>
          Choose your role
        </Text>

        <Text style={styles.subtitle}>
          Select how you want to use the app
        </Text>

        {roles.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            style={styles.card}
            onPress={() =>
              navigation.navigate(item.route, {
                role: item.role,
              })
            }
          >
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>
                {item.title}
              </Text>

              <Text style={styles.cardSubtitle}>
                {item.description}
              </Text>
            </View>

            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Image
        source={require('../../../assets/role-footer.png')}
        resizeMode="cover"
        style={styles.footer}
      />
    </SafeAreaView>
  );
}