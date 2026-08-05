import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const COLORS = {
  primary: '#FE724C',
  endCall: '#FF3B30',
  white: '#FFFFFF',
  textDark: '#1A1E26',
  textLight: '#9796A1',
  bgLight: '#F3F4F6',
  callBackdrop: '#4A5C72',
  avatarBg: '#9DA8B6',
};

// Global call screen handling Chef, Delivery, and Customer interfaces
export default function GlobalCallScreen({ route, navigation }) {
  // Expect 'chef' | 'customer' | 'delivery'
  const contactType = route?.params?.contactType || 'customer';
  const contactName = route?.params?.contactName || 'Unknown';

  const [callStatus, setCallStatus] = useState('connecting'); // 'connecting' | 'active' | 'ended'
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [duration, setDuration] = useState(0);

  const durationInterval = useRef(null);

  useEffect(() => {
    // TODO: Replace with your actual VoIP connection logic (Twilio, Agora, WebRTC, etc.)
    const connectTimer = setTimeout(() => {
      setCallStatus('active');
    }, 2200);

    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    if (callStatus === 'active') {
      durationInterval.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(durationInterval.current);
  }, [callStatus]);

  const formatDuration = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleEndCall = () => {
    clearInterval(durationInterval.current);
    setCallStatus('ended');
    // TODO: Disconnect backend call session here
    navigation.goBack();
  };

  const statusText = callStatus === 'connecting' ? 'Connecting.......' : formatDuration(duration);

  // Helper function to format the label based on interface
  const getRoleLabel = () => {
    switch (contactType) {
      case 'chef': return 'Chef';
      case 'delivery': return 'Delivery Partner';
      case 'customer': return 'Customer';
      default: return 'Caller';
    }
  };

  // Helper function to dynamically render the correct icon
  const renderAvatarIcon = () => {
    switch (contactType) {
      case 'chef':
        return <Ionicons name="restaurant-outline" size={32} color={COLORS.white} />;
      case 'delivery':
        return <Feather name="truck" size={32} color={COLORS.white} />;
      case 'customer':
      default:
        return <Feather name="user" size={32} color={COLORS.white} />;
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.backdrop}>
        <View style={styles.backdropContent}>
          <Text style={styles.backdropRole}>{getRoleLabel()}</Text>
        </View>
      </SafeAreaView>

      <View style={styles.sheet}>
        <View style={styles.avatarPlaceholder}>
          {renderAvatarIcon()}
        </View>

        <Text style={styles.contactName}>{contactName}</Text>
        <Text style={styles.statusText}>{statusText}</Text>

        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={[styles.controlButton, isMuted && styles.controlButtonActive]}
            onPress={() => setIsMuted(!isMuted)}
          >
            <Feather name={isMuted ? 'mic-off' : 'mic'} size={20} color={isMuted ? COLORS.white : COLORS.textDark} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.endCallButton} onPress={handleEndCall}>
            <Feather name="phone" size={26} color={COLORS.white} style={{ transform: [{ rotate: '135deg' }] }} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, isSpeakerOn && styles.controlButtonActive]}
            onPress={() => setIsSpeakerOn(!isSpeakerOn)}
          >
            <Feather name="volume-2" size={20} color={isSpeakerOn ? COLORS.white : COLORS.textDark} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backdrop: {
    flex: 1,
    backgroundColor: COLORS.callBackdrop,
  },
  backdropContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60,
  },
  backdropRole: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1,
  },
  sheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 40,
    paddingBottom: 50,
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.avatarBg,
    marginBottom: 18,
    // Fix: Flexbox layout perfectly centers any icon you drop inside
    justifyContent: 'center', 
    alignItems: 'center',
  },
  contactName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 40,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.bgLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 18,
  },
  controlButtonActive: {
    backgroundColor: COLORS.textDark,
  },
  endCallButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.endCall,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.endCall,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});