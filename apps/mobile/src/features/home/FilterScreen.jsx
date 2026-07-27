import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { X, Star } from 'lucide-react-native';
import { styles } from './FilterScreen.styles';

const offerOptions = ['Delivery', 'Pick Up', 'Offer', 'Online payment available'];
const deliverTimeOptions = ['10-15 min', '20 min', '30 min'];
const pricingOptions = ['$', '$$', '$$$'];

export default function FilterScreen({ visible, onClose, onApply }) {
  const [selectedOffers, setSelectedOffers] = useState([]);
  const [deliverTime, setDeliverTime] = useState('10-15 min');
  const [pricing, setPricing] = useState('$$');
  const [rating, setRating] = useState(4);

  const toggleOffer = (offer) => {
    setSelectedOffers((prev) =>
      prev.includes(offer) ? prev.filter((o) => o !== offer) : [...prev, offer]
    );
  };

  const handleFilter = () => {
    onApply?.({ offers: selectedOffers, deliverTime, pricing, rating });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.headerRow}>
              <Text style={styles.headerTitle}>Filter your search</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X size={18} color="#374151" />
              </TouchableOpacity>
            </View>

            {/* Offers */}
            <Text style={styles.sectionLabel}>OFFERS</Text>
            <View style={styles.wrapRow}>
              {offerOptions.map((offer) => {
                const active = selectedOffers.includes(offer);
                return (
                  <TouchableOpacity
                    key={offer}
                    onPress={() => toggleOffer(offer)}
                    style={[styles.chip, active && styles.chipActive]}
                  >
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>
                      {offer}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Deliver Time */}
            <Text style={styles.sectionLabel}>DELIVER TIME</Text>
            <View style={styles.wrapRow}>
              {deliverTimeOptions.map((time) => {
                const active = deliverTime === time;
                return (
                  <TouchableOpacity
                    key={time}
                    onPress={() => setDeliverTime(time)}
                    style={[styles.chip, active && styles.chipActive]}
                  >
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Pricing */}
            <Text style={styles.sectionLabel}>PRICING</Text>
            <View style={styles.wrapRow}>
              {pricingOptions.map((price) => {
                const active = pricing === price;
                return (
                  <TouchableOpacity
                    key={price}
                    onPress={() => setPricing(price)}
                    style={[styles.priceCircle, active && styles.priceCircleActive]}
                  >
                    <Text style={[styles.priceText, active && styles.priceTextActive]}>
                      {price}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Rating */}
            <Text style={styles.sectionLabel}>RATING</Text>
            <View style={styles.starRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Star
                    size={28}
                    color="#FB923C"
                    fill={star <= rating ? '#FB923C' : 'transparent'}
                    style={styles.starIcon}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* Filter button */}
            <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
              <Text style={styles.filterButtonText}>FILTER</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}