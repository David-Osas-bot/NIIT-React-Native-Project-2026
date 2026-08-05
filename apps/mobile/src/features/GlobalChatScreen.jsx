import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, ActivityIndicator } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const BASE_URL = 'https://niit-react-native-project-2026.onrender.com';

const COLORS = {
  primary: '#FE724C',
  white: '#FFFFFF',
  textDark: '#1A1E26',
  textLight: '#9796A1',
  bgLight: '#F3F4F6',
  incomingBubble: '#F0F3F6',
  chefAvatarBg: '#FFD1BA',
  customerAvatarBg: '#9DA8B6',
  deliveryAvatarBg: '#1A1E26',
};

const GlobalChatScreen = ({ route, navigation }) => {
  const currentUserType = route?.params?.currentUserType || 'delivery'; 
  const contactType = route?.params?.contactType || 'customer';
  const contactName = route?.params?.contactName || 'Customer';
  const orderId = route?.params?.orderId;

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const scrollViewRef = useRef(null);

  // 1. Initialize or find conversation on load, then fetch messages
  useEffect(() => {
    if (orderId) {
      initConversationAndMessages();

      // Poll for new messages every 5 seconds
      const pollInterval = setInterval(() => {
        if (conversationId) {
          fetchMessages(conversationId, false);
        }
      }, 5000);

      return () => clearInterval(pollInterval);
    } else {
      setLoading(false);
    }
  }, [orderId, conversationId]);

  const initConversationAndMessages = async () => {
    try {
      setLoading(true);
      // POST /conversations - Start or find existing 1:1 conversation
      const convResponse = await fetch(`${BASE_URL}/conversations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer YOUR_TOKEN_HERE'
        },
        body: JSON.stringify({
          orderId: orderId,
          recipientType: contactType,
        }),
      });

      if (!convResponse.ok) {
        throw new Error('Failed to initialize conversation');
      }

      const convData = await convResponse.json();
      const activeConvId = convData._id || convData.id;
      setConversationId(activeConvId);

      // Fetch messages for this conversation
      if (activeConvId) {
        await fetchMessages(activeConvId, true);
      }
    } catch (error) {
      console.error("Error setting up conversation:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. GET /conversations/{id}/messages
  const fetchMessages = async (convId, showLoader = false) => {
    try {
      if (showLoader) setLoading(true);
      
      const response = await fetch(`${BASE_URL}/conversations/${convId}/messages`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      
      // Format messages for UI display
      const formattedMessages = (data || []).map(msg => ({
        id: msg._id || msg.id || Math.random().toString(),
        text: msg.text || msg.content,
        sender: (msg.sender === currentUserType || msg.sender === 'me') ? 'me' : 'contact',
        time: new Date(msg.createdAt || Date.now()).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  // 3. POST /conversations/{id}/messages
  const handleSendMessage = async () => {
    if (message.trim() && conversationId) {
      const textPayload = message.trim();
      setMessage(''); // Clear input immediately for snappy UI

      try {
        const response = await fetch(`${BASE_URL}/conversations/${conversationId}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: textPayload,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        // Refresh messages immediately after sending
        await fetchMessages(conversationId, false);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const getRoleLabel = (type) => {
    switch (type) {
      case 'chef': return 'Chef';
      case 'delivery': return 'Delivery Partner';
      case 'customer': return 'Customer';
      default: return 'User';
    }
  };

  const renderAvatarIcon = (type, iconColor) => {
    switch (type) {
      case 'chef':
        return <Ionicons name="restaurant-outline" size={18} color={iconColor} />;
      case 'delivery':
        return <Ionicons name="bicycle-outline" size={18} color={iconColor} />;
      case 'customer':
      default:
        return <Feather name="user" size={18} color={iconColor} />;
    }
  };

  const getAvatarBgColor = (type) => {
    switch (type) {
      case 'chef': return COLORS.chefAvatarBg;
      case 'delivery': return COLORS.deliveryAvatarBg;
      case 'customer':
      default: return COLORS.customerAvatarBg;
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="chevron-left" size={24} color={COLORS.textDark} />
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.headerTitle}>{contactName}</Text>
            <Text style={styles.headerSubtitle}>{getRoleLabel(contactType)}{orderId ? ` · #${orderId}` : ''}</Text>
          </View>
          <TouchableOpacity
            style={styles.headerCallButton}
            onPress={() => navigation.navigate('GlobalCallScreen', { contactType, contactName, orderId })}
          >
            <Feather name="phone" size={18} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <ScrollView 
            ref={scrollViewRef}
            contentContainerStyle={styles.chatScrollContent}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {messages.map((msg) => {
              const isMe = msg.sender === 'me';

              return (
                <View key={msg.id} style={styles.messageWrapper}>
                  <Text style={[styles.timestampText, isMe ? styles.timestampMe : styles.timestampContact]}>
                    {msg.time}
                  </Text>

                  <View style={[styles.messageRow, isMe ? styles.rowMe : styles.rowContact]}>
                    {!isMe && (
                      <View style={[styles.avatarPlaceholder, { backgroundColor: getAvatarBgColor(contactType), marginRight: 12 }]}>
                        {renderAvatarIcon(contactType, contactType === 'chef' ? '#8A5A3B' : '#FFFFFF')}
                      </View>
                    )}

                    <View style={[styles.bubble, isMe ? styles.myBubble : styles.contactBubble]}>
                      <Text style={[styles.messageText, isMe ? styles.myText : styles.contactText]}>
                        {msg.text}
                      </Text>
                    </View>

                    {isMe && (
                      <View style={[styles.avatarPlaceholder, { backgroundColor: getAvatarBgColor(currentUserType), marginLeft: 12 }]}>
                        {renderAvatarIcon(currentUserType, currentUserType === 'chef' ? '#8A5A3B' : '#FFFFFF')}
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Write something..."
              placeholderTextColor={COLORS.textLight}
              value={message}
              onChangeText={setMessage}
            />
          </View>

          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Feather name="send" size={18} color={COLORS.primary} style={{ marginLeft: -2 }} />
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
    paddingTop: Platform.OS === 'android' ? 50 : 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.bgLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  headerSubtitle: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
  headerCallButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.bgLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatScrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  messageWrapper: {
    marginBottom: 20,
  },
  timestampText: {
    fontSize: 11,
    color: COLORS.textLight,
    marginBottom: 6,
  },
  timestampMe: {
    textAlign: 'right',
    marginRight: 50,
  },
  timestampContact: {
    textAlign: 'left',
    marginLeft: 50,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  rowMe: {
    justifyContent: 'flex-end',
  },
  rowContact: {
    justifyContent: 'flex-start',
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    maxWidth: '70%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  myBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  contactBubble: {
    backgroundColor: COLORS.incomingBubble,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  myText: {
    color: COLORS.white,
  },
  contactText: {
    color: COLORS.textDark,
  },
  inputContainer: {
    padding: 20,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgLight,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textDark,
    paddingVertical: 8,
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
});

export default GlobalChatScreen;