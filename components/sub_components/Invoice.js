import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const Invoice = () => {
    const route = useRoute();
    const { items, total } = route.params; // Get items and total from navigation params

    return (
        <View style={styles.invoiceContainer}>
            <Text style={styles.restaurantName}>Street Burger Hut</Text>
            <Text>No.11/A, Colombo 07</Text>
            <Text>Phone: +94 76 261 9592</Text>
            <Text style={styles.invoiceTitle}>Invoice</Text>

            <View style={styles.invoiceDetails}>
                {items.map((item, index) => (
                    <View key={index} style={styles.itemRow}>
                        <Text>{item.name}</Text>
                        <Text>Qty: {item.quantity}</Text>
                        <Text>Price: {item.price}</Text>
                        <Text>Total: {item.quantity * item.price}</Text>
                    </View>
                ))}
            </View>

            <Text style={styles.totalText}>Total: Rs. {total}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    invoiceContainer: {
        padding: 20,
    },
    restaurantName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    invoiceTitle: {
        fontSize: 20,
        marginVertical: 10,
    },
    invoiceDetails: {
        marginTop: 20,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
});

export default Invoice;
