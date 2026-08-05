import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import AuthHeader from "./AuthHeader";
import AuthBody from "./AuthBody";
import FormField from "./FormDesign";
import styles from "./SignupScreen.styles.js";
import { useAuth } from './authContext';
import { isValidEmail, isValidPassword } from "./Validation";
import api from "../../shared/api";
import { register } from "../../shared/authToken.js";


const Roles = [
  { key: "customer", label: "Customer" },
  { key: "driver", label: "Driver" },
  { key: "chef", label: "Chef" },
];


export default function SignupScreen({ navigation }) {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [role, setRole] = useState("customer");


  const handleSignup = async () => {
    if (!isValidEmail(email)) {
      setError("Enter a valid email address");
      return;
    }
    if (!isValidPassword(password)) {
      setError(
        "Password must be at least 8 characters, with a letter and a number",
      );
      return;
    }
    if (confirmPassword !== password) {
      setError("Passwords don't match");
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      await register(name, email, password);
      navigation.replace("Login");
    } catch (err) {
      setError(err.message);
      // navigation.navigate("Login");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.screen}>
      <AuthHeader
        navigation={navigation}
        title="Sign Up"
        subtitle="Please sign up to get started"
      />

      <AuthBody>
        <FormField
          label="NAME"
          placeholder="John doe"
          value={name}
          onChangeText={setName}
        />
        <FormField
          label="EMAIL"
          placeholder="example@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.roleLabel}>SELECT ROLE</Text>
        <View style={styles.roleContainer}>
          {Roles.map((r) => (
            <TouchableOpacity
              key={r.key}
              style={[styles.roleButton, role === r.key && styles.selectedRole]}
              onPress={() => setRole(r.key)}
            >
              <Text style={[styles.roleButtonText, role === r.key && styles.roleButtonTextSelected]}>
                {r.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FormField
          label="PASSWORD"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <FormField
          label="RE-TYPE PASSWORD"
          placeholder="••••••••"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        </AuthBody>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleSignup}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color={"#ffffff"} />
          ) : (
            <Text style={styles.primaryButtonText}>SIGN UP</Text>
          )}
        </TouchableOpacity>
    </View>
  );
}
