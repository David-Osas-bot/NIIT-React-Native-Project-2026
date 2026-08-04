import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./ChefLogin.styles.js";

export default function ChefHeader({ navigation }) {
  return (
    <View style={styles.headerContent}>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={22} color={'#1C1C1E'} />
        </TouchableOpacity>
      </View>
<View style={styles.headerText}>
      <Text style={styles.title}>
        <Text style={styles.orange}>Driver</Text> Log In
      </Text>

      <Text style={styles.subtitle}>
        Welcome back! Please sign in{"\n"}
        to your account
      </Text>
      </View>
    </View>
  );
}
