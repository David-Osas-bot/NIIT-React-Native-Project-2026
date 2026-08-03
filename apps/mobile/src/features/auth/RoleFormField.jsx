import React, { useState } from "react";
import { View,Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./RoleFormField.styles.js";

export default function RoleFormField({
  label,
  icon,
  secureTextEntry,
  ...inputProps
}) {
  const [hidden, setHidden] = useState(secureTextEntry);

  return (
    <View style={styles.field}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.wrap}>
        <Ionicons
          name={icon}
          size={18}
          color={'#94A3B8'}
          style={styles.leftIcon}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={'#94A3B8'}
          secureTextEntry={hidden}
          {...inputProps}
        />
        {secureTextEntry ? (
          <TouchableOpacity
            onPress={() => setHidden(!hidden)}
            style={styles.rightIconTouch}
          >
            <Ionicons
              name={hidden ? "eye-off-outline" : "eye-outline"}
              size={18}
              color={'#94A3B8'}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.rightIconTouch}>
            <Ionicons name="person-outline" size={18} color={'#94A3B8'} />
          </View>
        )}
      </View>
    </View>
  );
}
