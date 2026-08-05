import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Switch, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './DeliverySettingsScreen.styles';

export default function DeliverySettingsScreen({ navigation }) {
  // TODO: Persist these to your backend/user preferences store instead of local state
  const [pushEnabled, setPushEnabled] = useState(true);
  const [newRequestAlerts, setNewRequestAlerts] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [autoAccept, setAutoAccept] = useState(false);

  const switchProps = {
    trackColor: { false: '#E3E5E9', true: '#FFD3C2' },
  };

  const handleLogout = () => {
    // TODO: clear auth session/token, then reset navigation to your auth stack
    navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] });
  };

  const handleDeleteAccount = () => {
    // TODO: show a confirmation dialog before calling your account deletion endpoint
    console.log('Delete account requested');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.card}>
          <View style={styles.toggleRow}>
            <View>
              <Text style={styles.toggleLabel}>Push Notifications</Text>
              <Text style={styles.toggleSubtitle}>Get notified about orders and messages</Text>
            </View>
            <Switch value={pushEnabled} onValueChange={setPushEnabled} thumbColor={pushEnabled ? '#FE724C' : '#FFFFFF'} {...switchProps} />
          </View>

          <View style={styles.toggleRow}>
            <View>
              <Text style={styles.toggleLabel}>New Request Alerts</Text>
              <Text style={styles.toggleSubtitle}>Alert me when a chef needs a courier</Text>
            </View>
            <Switch value={newRequestAlerts} onValueChange={setNewRequestAlerts} thumbColor={newRequestAlerts ? '#FE724C' : '#FFFFFF'} {...switchProps} />
          </View>

          <View style={[styles.toggleRow, { borderBottomWidth: 0 }]}>
            <View>
              <Text style={styles.toggleLabel}>Sound Alerts</Text>
              <Text style={styles.toggleSubtitle}>Play a sound for new requests</Text>
            </View>
            <Switch value={soundAlerts} onValueChange={setSoundAlerts} thumbColor={soundAlerts ? '#FE724C' : '#FFFFFF'} {...switchProps} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Delivery Preferences</Text>
        <View style={styles.card}>
          <View style={[styles.toggleRow, { borderBottomWidth: 0 }]}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.toggleLabel}>Auto-Accept Orders</Text>
              <Text style={styles.toggleSubtitle}>Automatically accept requests within your radius</Text>
            </View>
            <Switch value={autoAccept} onValueChange={setAutoAccept} thumbColor={autoAccept ? '#FE724C' : '#FFFFFF'} {...switchProps} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.linkRow}>
            <Text style={styles.linkLabel}>Change Password</Text>
            <Feather name="chevron-right" size={18} color="#9796A1" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkRow}>
            <Text style={styles.linkLabel}>Change Phone Number</Text>
            <Feather name="chevron-right" size={18} color="#9796A1" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.linkRow, { borderBottomWidth: 0 }]} onPress={handleDeleteAccount}>
            <Text style={styles.linkLabelDanger}>Delete Account</Text>
            <Feather name="chevron-right" size={18} color="#FF3B30" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>About</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.linkRow}>
            <Text style={styles.linkLabel}>Terms of Service</Text>
            <Feather name="chevron-right" size={18} color="#9796A1" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkRow}>
            <Text style={styles.linkLabel}>Privacy Policy</Text>
            <Feather name="chevron-right" size={18} color="#9796A1" />
          </TouchableOpacity>
          <View style={[styles.linkRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.linkLabel}>App Version</Text>
            <Text style={styles.versionText}>1.0.0</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}