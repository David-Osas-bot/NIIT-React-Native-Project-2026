import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Linking, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './DeliveryHelpSupportScreen.styles';

export default function DeliveryHelpSupportScreen({ navigation }) {
  const [expandedId, setExpandedId] = useState(null);

  // TODO: Point these at your real support channels
  const supportOptions = [
    { id: 'call', icon: 'phone', label: 'Call Support', action: () => Linking.openURL('tel:+2348000000000') },
    { id: 'chat', icon: 'message-circle', label: 'Live Chat', action: () => navigation.navigate('DeliveryChatScreen', { contactType: 'chef', contactName: 'Support Team' }) },
    { id: 'email', icon: 'mail', label: 'Email Us', action: () => Linking.openURL('mailto:support@halallab.co') },
  ];

  const faqs = [
    { id: 'f1', question: 'How do I get paid for deliveries?', answer: 'Every completed delivery adds to your available balance in the Wallet tab. Payouts clear same-day and can be withdrawn to your linked bank account whenever you like.' },
    { id: 'f2', question: 'What if the customer isn\u2019t available at drop-off?', answer: 'Try calling or messaging them from the tracking screen first. If there\u2019s still no response after a few minutes, use the "Report an Issue" option on the delivery so support can step in.' },
    { id: 'f3', question: 'How do I update my vehicle information?', answer: 'Go to Profile, tap EDIT, and update your vehicle details there. Changes are reflected on your public courier profile right away.' },
    { id: 'f4', question: 'Why did a delivery request expire before I could accept it?', answer: 'Requests are time-limited so orders reach another available courier quickly if you\u2019re unable to respond. Staying online with notifications enabled helps you catch them in time.' },
    { id: 'f5', question: 'How is my rating calculated?', answer: 'Your rating is the rolling average of customer and chef feedback from your last 100 deliveries, updated after each completed order.' },
  ];

  const toggleFaq = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.contactRow}>
          {supportOptions.map((option) => (
            <TouchableOpacity key={option.id} style={styles.contactOption} onPress={option.action}>
              <View style={styles.contactIconWrap}>
                <Feather name={option.icon} size={20} color="#FE724C" />
              </View>
              <Text style={styles.contactLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <View style={styles.faqCard}>
          {faqs.map((faq, index) => {
            const isExpanded = expandedId === faq.id;
            return (
              <View key={faq.id} style={[styles.faqItem, index === faqs.length - 1 && { borderBottomWidth: 0 }]}>
                <TouchableOpacity style={styles.faqQuestionRow} onPress={() => toggleFaq(faq.id)}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <Feather name={isExpanded ? 'chevron-up' : 'chevron-down'} size={18} color="#9796A1" />
                </TouchableOpacity>
                {isExpanded && (
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                )}
              </View>
            );
          })}
        </View>

        <TouchableOpacity style={styles.reportButton}>
          <Feather name="flag" size={16} color="#FE724C" style={{ marginRight: 8 }} />
          <Text style={styles.reportButtonText}>Report an Issue with a Delivery</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}