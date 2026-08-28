import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Web placeholder: react-native-maps is native-only, so the live map
// view is not available in the browser build. Swap this for a real
// web map (e.g. Google Maps JS SDK or react-leaflet) later if a web
// tracking view is actually needed.
export default function DeliveryTrackingScreen({ route }) {
    const orderId = route?.params?.orderId;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Delivery Tracking</Text>
            <Text style={styles.message}>
                Live map tracking is available on the mobile app.
            </Text>
            {orderId ? (
                <Text style={styles.orderId}>Order ID: {orderId}</Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
    },
    message: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    orderId: {
        marginTop: 12,
        fontSize: 12,
        color: '#999',
    },
});