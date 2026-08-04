import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import RoleFormField from "../auth/RoleFormField";
import RoleSocialButton from "../auth/RoleSocialButton";
import { useAuth } from "../auth/authContext";

import styles from "./DriverLoginScreen.styles.js";

export default function DriverForm({ navigation }) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);

      const user = await login(email, password);

      switch (user.role) {
        case "customer":
          navigation.replace("Location");
          break;

        case "driver":
          navigation.replace("DriverHome");
          break;

        case "chef":
          navigation.replace("ChefHome");
          break;

        default:
          navigation.replace("Location");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <RoleFormField
        label="EMAIL"
        icon="mail-outline"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <RoleFormField
        label="PASSWORD"
        icon="lock-closed-outline"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.optionRow}>
        <TouchableOpacity>
          <Text style={styles.remember}>Remember me</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.orangeText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginText}>LOG IN</Text>
        )}
      </TouchableOpacity>

      <View style={styles.signupRow}>
        <Text>Don't have an account?</Text>

        <TouchableOpacity onPress={() => navigation.navigate("DriverSignup")}>
          <Text style={styles.orangeText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.divider}>OR CONTINUE WITH</Text>

      <RoleSocialButton
        provider="Google"
        icon="logo-google"
        iconColor="#EA4335"
      />

      <RoleSocialButton provider="Apple" icon="logo-apple" />
    </View>
  );
}
