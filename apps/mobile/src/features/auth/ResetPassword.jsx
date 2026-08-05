import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import AuthHeader from "./AuthHeader";
import AuthBody from "./AuthBody";
import FormField from "./FormDesign";

import styles from "./ResetPassword.styles.js";

import { resetPassword } from "../../shared/authToken";
import {
  isValidPassword,
} from "./Validation";

export default function ResetPassword({ navigation, route }) {
  const { email, otp } = route.params;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!isValidPassword(password)) {
      setError(
        "Password must contain at least 8 characters with letters and numbers."
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await resetPassword(email, otp, password);

      navigation.replace("Login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <AuthHeader
        navigation={navigation}
        title="Reset Password"
        subtitle="Create your new password"
      />

      <AuthBody>

        <FormField
          label="NEW PASSWORD"
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <FormField
          label="CONFIRM PASSWORD"
          placeholder="••••••••"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {error ? (
          <Text style={styles.error}>
            {error}
          </Text>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleReset}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              RESET PASSWORD
            </Text>
          )}
        </TouchableOpacity>

      </AuthBody>
    </View>
  );
}