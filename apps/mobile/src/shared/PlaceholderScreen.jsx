import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Generic placeholder for menu screens that aren't built yet.
// Pass title, icon, and mockItems via route.params (or Stack.Screen initialParams).
// Swap this out screen-by-screen once the real design/data is ready —
// nothing else in the app needs to change since the route name stays the same.
export default function PlaceholderScreen({ route, navigation }) {
  const { title = 'Coming Soon', icon = 'info', mockItems = [] } = route.params || {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#E5E5E5',
          backgroundColor: '#FFFFFF',
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
          <Feather name="arrow-left" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '600' }}>{title}</Text>
      </View>

      <ScrollView style={{ flex: 1, padding: 16 }}>
        {mockItems.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 60 }}>
            <Feather name={icon} size={40} color="#CCC" />
            <Text style={{ marginTop: 12, color: '#999' }}>
              No {title.toLowerCase()} yet — placeholder screen
            </Text>
          </View>
        ) : (
          mockItems.map((item, index) => (
            <View
              key={index}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                padding: 14,
                marginBottom: 10,
              }}
            >
              <Text style={{ fontWeight: '600', marginBottom: 4 }}>{item.title}</Text>
              {item.subtitle ? (
                <Text style={{ color: '#777', fontSize: 13 }}>{item.subtitle}</Text>
              ) : null}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}