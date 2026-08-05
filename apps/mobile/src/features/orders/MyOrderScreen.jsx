import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; 
import { styles } from './MyOrderScreen.styles';

const BASE_URL = 'https://niit-react-native-project-2026.onrender.com';

export default function MyOrderScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('ongoing');
  
  // Data State
  const [ongoingOrders, setOngoingOrders] = useState([]);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // 1. FETCH ORDERS FROM BACKEND (GET /orders)
  useEffect(() => {
    fetchUserOrders();
  }, []);

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer YOUR_TOKEN_HERE' // Uncomment when token auth is active
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user orders');
      }

      const data = await response.json();
      
      // Assuming your backend returns an array of orders with status fields
      // Filtering them dynamically into ongoing vs history lists
      const ongoing = data.filter(order => order.status !== 'Completed' && order.status !== 'Canceled');
      const history = data.filter(order => order.status === 'Completed' || order.status === 'Canceled');

      setOngoingOrders(ongoing);
      setHistoryOrders(history);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenRateModal = (order) => {
    setSelectedOrder(order);
    setRating(0);
    setReviewText('');
    setIsSubmitted(false);
    setModalVisible(true);
  };

  // 2. SUBMIT REVIEW (POST /reviews)
  const handleSubmitReview = async () => {
    if (rating > 0 && selectedOrder) {
      const reviewPayload = {
        orderId: selectedOrder.id,
        restaurantId: selectedOrder.restaurantId || 'default_restaurant_id', 
        rating: rating,
        comment: reviewText.trim(),
      };

      try {
        const response = await fetch(`${BASE_URL}/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reviewPayload),
        });

        if (!response.ok) {
          throw new Error('Failed to submit review');
        }

        setIsSubmitted(true);
        setTimeout(() => setModalVisible(false), 2000); 
      } catch (error) {
        console.error("Failed to submit review:", error);
      }
    }
  };

  // 3. CANCEL ORDER (PUT /orders/{id}/cancel)
  const handleCancelOrder = async (orderId) => {
    try {
      const response = await fetch(`${BASE_URL}/orders/${orderId}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to cancel order');
      }

      // Refresh orders list after cancellation
      fetchUserOrders();
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  // 4. RE-ORDER HANDLER (GET /orders/{id})
  const handleReorder = async (orderId) => {
    try {
      const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch order details for re-order');
      }

      const orderDetails = await response.json();
      console.log("Fetched order details for re-order:", orderDetails);

      // Since EditCartScreen isn't available, pass order details safely or navigate accordingly
      navigation.navigate('EditCartScreen', { orderData: orderDetails });
    } catch (error) {
      console.error("Error processing re-order:", error);
    }
  };

  const renderOrderCard = (order, isHistory) => (
    <View key={order.id} style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <Text style={styles.categoryText}>{order.category || 'Food'}</Text>
        {isHistory && (
          <Text style={[
            styles.statusText, 
            order.status === 'Completed' ? styles.statusCompleted : styles.statusCanceled
          ]}>
            {order.status}
          </Text>
        )}
      </View>
      <View style={styles.divider} />

      <View style={styles.detailsRow}>
        <View style={styles.imagePlaceholder} />
        <View style={styles.detailsTextContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.restaurantName}>{order.name || order.restaurantName}</Text>
            <Text style={styles.orderNumber}>{order.orderNo || `#${order.id}`}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.priceText}>{order.price}</Text>
            <View style={styles.verticalDivider} />
            {isHistory && (
              <>
                <Text style={styles.metaText}>{order.date}</Text>
                <Text style={styles.bulletPoint}> • </Text>
              </>
            )}
            <Text style={styles.metaText}>{order.itemsCount || order.items || 'Items'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonRow}>
        {!isHistory ? (
          <>
            <TouchableOpacity 
              style={[styles.actionButton, styles.primaryButton]}
              onPress={() => navigation.navigate('TrackingScreen', { orderId: order.id })}
            >
              <Text style={styles.primaryButtonText}>Track Order</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={() => handleCancelOrder(order.id)}
            >
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {order.status !== 'Canceled' && (
              <TouchableOpacity 
                style={[styles.actionButton, styles.secondaryButton]}
                onPress={() => handleOpenRateModal(order)}
              >
                <Text style={styles.secondaryButtonText}>Rate</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              style={[
                styles.actionButton, 
                styles.primaryButton, 
                order.status === 'Canceled' && { flex: 1 } 
              ]}
              onPress={() => handleReorder(order.id)}
            >
              <Text style={styles.primaryButtonText}>Re-Order</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Text style={styles.iconText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'ongoing' && styles.activeTab]} 
          onPress={() => setActiveTab('ongoing')}
        >
          <Text style={[styles.tabText, activeTab === 'ongoing' && styles.activeTabText]}>
            Ongoing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'history' && styles.activeTab]} 
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            History
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FE724C" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
          {activeTab === 'ongoing' 
            ? (ongoingOrders.length > 0 ? ongoingOrders.map(order => renderOrderCard(order, false)) : <Text style={{ textAlign: 'center', color: '#9796A1', marginTop: 20 }}>No ongoing orders</Text>)
            : (historyOrders.length > 0 ? historyOrders.map(order => renderOrderCard(order, true)) : <Text style={{ textAlign: 'center', color: '#9796A1', marginTop: 20 }}>No order history</Text>)
          }
        </ScrollView>
      )}

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.modalOverlay}>
          <View style={modalStyles.modalContent}>
            {isSubmitted ? (
              <View style={modalStyles.thankYouContainer}>
                <Feather name="check-circle" size={60} color="#007AFF" style={{ marginBottom: 16 }} />
                <Text style={modalStyles.thankYouTitle}>Thank You!</Text>
                <Text style={modalStyles.thankYouText}>Your review has been submitted.</Text>
              </View>
            ) : (
              <>
                <View style={modalStyles.modalHeader}>
                  <Text style={modalStyles.modalTitle}>Rate {selectedOrder?.name || selectedOrder?.restaurantName}</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text style={modalStyles.closeText}>✕</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={modalStyles.starsContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => setRating(star)}>
                      <Text style={[modalStyles.star, rating >= star ? modalStyles.starSelected : null]}>
                        ★
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TextInput
                  style={modalStyles.reviewInput}
                  placeholder="Write your review here..."
                  multiline
                  numberOfLines={4}
                  value={reviewText}
                  onChangeText={setReviewText}
                />

                <TouchableOpacity 
                  style={[modalStyles.submitButton, rating === 0 && modalStyles.submitButtonDisabled]}
                  onPress={handleSubmitReview}
                  disabled={rating === 0}
                >
                  <Text style={modalStyles.submitButtonText}>Submit Review</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    minHeight: 300,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeText: {
    fontSize: 20,
    color: '#666',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  star: {
    fontSize: 40,
    color: '#E0E0E0',
    marginHorizontal: 5,
  },
  starSelected: {
    color: '#FFD700',
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#FF6C44', 
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#FFA78F',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  thankYouContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  thankYouTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  thankYouText: {
    fontSize: 16,
    color: '#666',
  },
});