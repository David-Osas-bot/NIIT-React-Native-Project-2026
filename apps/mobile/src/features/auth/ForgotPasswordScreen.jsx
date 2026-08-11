import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AuthHeader from "./AuthHeader";
import AuthBody from "./AuthBody";
import FormField from "./FormDesign";
import styles from "./ForgotPasswordScreen.styles.js";
import { useAuth } from "./authContext";
import { forgotPassword } from "../../shared/auth";
import { isValidEmail } from "./Validation";

export default function ForgotPasswordScreen({ navigation }) {
  const { forgot } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!isValidEmail(email)) {
      setError("Enter a valid email");
      return;
    }

    try {
      setError("");
      await forgot(email);
      navigation.navigate("Verification", {
        email,
      });
    } catch (err) {
      setError(err.message);
    }
  };
  // const handleSendCode = () => {
  //   // TODO: wire up to real auth once the auth store exists
  //   navigation.navigate('Verification', { email });
  // };

  return (
    <View style={styles.screen}>
      <AuthHeader
        navigation={navigation}
        title="Forgot Password"
        subtitle="Enter your email address to receive a verification code."
      />

      <AuthBody>
        <FormField
          label="EMAIL"
          placeholder="example@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleSend}
          disabled={loading}
        >
          <Text style={styles.primaryButtonText}>
            {loading ? "Sending..." : "SEND CODE"}
          </Text>
        </TouchableOpacity>
      </AuthBody>
    </View>
  );
}
