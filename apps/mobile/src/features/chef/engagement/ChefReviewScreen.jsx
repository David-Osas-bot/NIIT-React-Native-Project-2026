import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from './ChefReviewScreen.styles';

const BASE_URL = 'https://niit-react-native-project-2026.onrender.com';

export default function ChefReviewScreen({ route, navigation }) {
  const restaurantId = route?.params?.restaurantId || 'default_restaurant_id';

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurantReviews();
  }, [restaurantId]);

  const fetchRestaurantReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/reviews/restaurant/${restaurantId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await response.json();
      
      const formattedReviews = (data || []).map(rev => ({
        id: rev._id || rev.id,
        date: rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : 'Recent',
        title: rev.title || 'Customer Review',
        rating: rev.rating || 5,
        comment: rev.comment || '',
      }));

      setReviews(formattedReviews);
    } catch (error) {
      console.error("Error loading reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={[styles.star, i <= rating ? styles.starFilled : styles.starEmpty]}>
          ★
        </Text>
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation?.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reviews</Text>
        <View style={styles.headerSpacer} />
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FE724C" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContainer}>
          {reviews.length === 0 ? (
            <View style={{ alignItems: 'center', marginTop: 50 }}>
              <Text style={{ color: '#9CA3AF', fontSize: 16 }}>No reviews yet.</Text>
            </View>
          ) : (
            reviews.map((review) => (
              <View key={review.id} style={styles.reviewRow}>
                <View style={styles.avatarPlaceholder} />

                <View style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.dateText}>{review.date}</Text>
                    <TouchableOpacity>
                      <Text style={styles.optionsDots}>•••</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.reviewTitle}>{review.title}</Text>

                  <View style={styles.starsContainer}>
                    {renderStars(review.rating)}
                  </View>

                  <Text style={styles.reviewComment}>{review.comment}</Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}