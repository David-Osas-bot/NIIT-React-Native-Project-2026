import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DriverHeader from "./ChefHeader.jsx";
import RoleFormField from "./RoleFormField";
import styles from "./ChefLogin.styles.js";
import RoleSocialButton from "./RoleSocialButton";
import {login} from "../../shared/auth.js";
import { isValidEmail, isValidPassword } from "./Validation.js";
import { useAuth } from "./authContext.jsx";
import api from "../../shared/api.js";

export default function ChefLoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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
        // navigation.replace("DriverHome");
        navigation.replace("Delivery");
          break;

        case "chef":
          // navigation.replace("ChefMenu");
          navigation.replace("Chef");
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
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ImageBackground
        source={require("../../../assets/chef-header.png")}
        resizeMode="cover"
        style={styles.header}
      >
        <DriverHeader navigation={navigation} />
      </ImageBackground>
      <View style={styles.card}>
        <RoleFormField
          label="EMAIL"
          icon="mail-outline"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!submitting}
        />
        <RoleFormField
          label="PASSWORD"
          icon="lock-closed-outline"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!submitting}
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

        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR </Text>
          <View style={styles.line} />
        </View>

        <RoleSocialButton
          provider="Google"
          icon="logo-google"
          iconColor="#EA4335"
          onPress={() => {}}
        />

        <RoleSocialButton
          provider="Apple"
          icon="logo-apple"
          iconColor="#000"
          onPress={() => {}}
        />
      </View>

      <Image
        source={require("../../../assets/login-footer.png")}
        style={styles.footer}
        resizeMode="cover"
      />
    </SafeAreaView>
  );
}
