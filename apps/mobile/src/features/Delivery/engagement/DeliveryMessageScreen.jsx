import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from './DeliveryMessageScreen.styles';
import DeliveryBottomNav from '../DeliveryBottomNav';

const BASE_URL = 'https://niit-react-native-project-2026.onrender.com';

export default function DeliveryMessageScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('messages');

  const [messagesList, setMessagesList] = useState([]);
  const [notificationsList, setNotificationsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch conversations and notifications on mount, and poll every 10 seconds
  useEffect(() => {
    fetchAllData();

    const interval = setInterval(() => {
      fetchAllData(false);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const fetchAllData = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);

      const [convRes, notifRes] = await Promise.all([
        fetch(`${BASE_URL}/conversations`, { headers: { 'Content-Type': 'application/json' } }),
        fetch(`${BASE_URL}/notifications`, { headers: { 'Content-Type': 'application/json' } })
      ]);

      if (convRes.ok) {
        const convData = await convRes.json();
        
        const formattedConversations = (convData || []).map(conv => {
          // Identify the other participant (either a chef or a customer)
          const otherParticipant = conv.participants?.find(p => p.role !== 'delivery') || conv.recipient || {};
          
          return {
            id: conv._id || conv.id,
            contactType: otherParticipant.role || 'customer', 
            name: otherParticipant.name || 'User',
            subtitle: otherParticipant.role === 'chef' ? 'Restaurant' : 'Customer',
            message: conv.lastMessage || 'Tap to chat',
            time: conv.lastMessageAt ? new Date(conv.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
            unreadCount: conv.unreadCount || 0,
            online: true, 
            orderId: conv.order || conv.orderId || null,
          };
        });
        setMessagesList(formattedConversations);
      }

      if (notifRes.ok) {
        const notifData = await notifRes.json();
        const formattedNotifications = (notifData || []).map(notif => ({
          id: notif._id || notif.id,
          title: notif.title || 'Order Update',
          body: notif.body || '',
          time: notif.createdAt ? new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent',
          unread: !notif.read,
        }));
        setNotificationsList(formattedNotifications);
      }
    } catch (error) {
      console.error("Error loading delivery inbox data:", error);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  const handleOpenChat = async (item) => {
    try {
      // 1. Tell backend to mark conversation as read
      await fetch(`${BASE_URL}/conversations/${item.id}/read`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });

      // 2. Clear unread badge locally for instant UI response
      setMessagesList((prev) =>
        prev.map((m) => (m.id === item.id ? { ...m, unreadCount: 0 } : m))
      );

      // 3. Navigate to chat
      navigation.navigate('GlobalChatScreen', {
        currentUserType: 'delivery',
        contactType: item.contactType, 
        contactName: item.name,
        orderId: item.orderId,
      });
    } catch (error) {
      console.error("Error opening chat:", error);
    }
  };

  const handleMarkNotificationRead = async (notificationId) => {
    try {
      await fetch(`${BASE_URL}/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });

      setNotificationsList((prev) =>
        prev.map(n => n.id === notificationId ? { ...n, unread: false } : n)
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleMarkAllNotificationsRead = async () => {
    try {
      await fetch(`${BASE_URL}/notifications/read-all`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });

      setNotificationsList((prev) => prev.map(n => ({ ...n, unread: false })));
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'notifications' && styles.activeTab]}
          onPress={() => setActiveTab('notifications')}
        >
          <Text style={[styles.tabText, activeTab === 'notifications' && styles.activeTabText]}>
            Notifications {notificationsList.filter(n => n.unread).length > 0 ? `(${notificationsList.filter(n => n.unread).length})` : ''}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'messages' && styles.activeTab]}
          onPress={() => setActiveTab('messages')}
        >
          <Text style={[styles.tabText, activeTab === 'messages' && styles.activeTabText]}>
            Messages {messagesList.filter((m) => m.unreadCount > 0).length > 0 ? `(${messagesList.filter((m) => m.unreadCount > 0).length})` : ''}
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FE724C" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>

          {activeTab === 'messages' && (
            messagesList.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No messages yet</Text>
              </View>
            ) : (
              messagesList.map((item) => (
                <TouchableOpacity key={item.id} style={styles.chatCard} onPress={() => handleOpenChat(item)}>
                  <View style={styles.avatarContainer}>
                    <View style={styles.avatarPlaceholder} />
                    {item.online && <View style={styles.onlineBadge} />}
                  </View>

                  <View style={styles.chatDetails}>
                    <View style={styles.chatNameRow}>
                      <View style={styles.nameWithRole}>
                        <Text style={styles.chatName}>{item.name}</Text>
                        <View style={[styles.roleBadge, item.contactType === 'chef' ? styles.roleBadgeChef : styles.roleBadgeCustomer]}>
                          <Text style={[styles.roleBadgeText, item.contactType === 'chef' ? styles.roleBadgeTextChef : styles.roleBadgeTextCustomer]}>
                            {item.contactType === 'chef' ? 'Chef' : 'Customer'}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.chatTime}>{item.time}</Text>
                    </View>

                    <View style={styles.chatMessageRow}>
                      <Text style={styles.chatMessage} numberOfLines={1}>{item.message}</Text>
                      {item.unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                          <Text style={styles.unreadText}>{item.unreadCount}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )
          )}

          {activeTab === 'notifications' && (
            notificationsList.length > 0 ? (
              <View>
                {notificationsList.some(n => n.unread) && (
                  <TouchableOpacity onPress={handleMarkAllNotificationsRead} style={{ alignSelf: 'flex-end', marginBottom: 10 }}>
                    <Text style={{ color: '#FE724C', fontWeight: '600', fontSize: 13 }}>Mark all as read</Text>
                  </TouchableOpacity>
                )}
                {notificationsList.map((notif) => (
                  <TouchableOpacity 
                    key={notif.id} 
                    style={[styles.chatCard, { backgroundColor: notif.unread ? '#FFF5F1' : 'transparent' }]}
                    onPress={() => handleMarkNotificationRead(notif.id)}
                  >
                    <View style={styles.chatDetails}>
                      <View style={styles.chatNameRow}>
                        <Text style={styles.chatName}>{notif.title}</Text>
                        <Text style={styles.chatTime}>{notif.time}</Text>
                      </View>
                      <Text style={styles.chatMessage}>{notif.body}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No notifications yet</Text>
              </View>
            )
          )}
        </ScrollView>
      )}

      <DeliveryBottomNav active="messages" />
    </View>
  );
}