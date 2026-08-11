import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import AuthHeader from "./AuthHeader";
import AuthBody from "./AuthBody";
import FormField from "./FormDesign";
import SocialRow from "./SocialRow";
import styles from "./LoginScreen.styles.js";
import api from "../../shared/api";
import { useAuth } from "./authContext";
import { isValidEmail, isValidPassword } from "./Validation";

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      setError("Enter a valid email");
      return;
    }
    if (!isValidPassword(password)) {
      setError("Invalid password");
      return;
    }

    setError("");
    setSubmitting(true);

    try {
      const data = await login(email, password);

      switch (data.user.role) {
        case "customer":
          navigation.replace("Location");
          break;

        case "driver":
          navigation.replace("Location");
          break;

        case "chef":
          navigation.replace("Location");
          break;

        default:
          setError("Unknown user role.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.screen}>
      <AuthHeader
        navigation={navigation}
        title="Log In"
        subtitle="Please sign in to your existing account"
      />
      <AuthBody>
        <FormField
          label="EMAIL"
          placeholder="example@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <FormField
          label="PASSWORD"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.optionsRow}>
          <TouchableOpacity
            style={styles.rememberRow}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View
              style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
            >
              {rememberMe && <Text style={styles.tickText}>✔</Text>}
            </View>
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.link}>Forgot Password</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleLogin}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.primaryButtonText}>LOG IN</Text>
          )}
        </TouchableOpacity>

        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.link}>SIGN UP</Text>
          </TouchableOpacity>
        </View>

        <SocialRow />
      </AuthBody>
    </View>
  );
}