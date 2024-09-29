import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import { Image } from 'react-native';
import img3 from '../../assets/bun-circled.png';

const Invoice = () => {
    const route = useRoute();
    const { items, total } = route.params; // Get items and total from navigation params

    return (
        <View style={styles.invoiceContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Image
                    source={img3} // Replace with your image URL
                    style={{ width: 65, height: 65, marginRight: '5%', marginLeft: '3%'  }}
                />
                <View>
                    <Text style={styles.restaurantName}>Street Burger Hut</Text>
                    <Text style={styles.addressText}>No.11/A, Colombo 07</Text>
                    <Text style={styles.phoneText}>Phone: +94 76 261 9592</Text>
                </View>
            </View>
            <Text style={styles.dateText}>Date: {moment().format('Do MMMM YYYY')}</Text>
            <Text style={styles.dateText}>Time: {moment().format('h:mm:ss a')}</Text>

            <View style={styles.tableHeader}>
                <Text style={{fontSize: 16,fontWeight: 'bold',color: '#e65100',flex:0.5}}>Item</Text>
                <Text style={styles.tableHeaderText}>Price (Rs.)</Text>
                <Text style={styles.tableHeaderText}>Qty</Text>
                <Text style={styles.tableHeaderText}>Total (Rs.)</Text>
            </View>

            <View style={styles.invoiceDetails}>
                {items.map((item, index) => (
                    <View key={index} style={styles.itemRow}>
                        <Text style={{fontSize: 16,color: '#d84315',flex:0.5}}>{item.name}</Text>
                        <Text style={{fontSize: 16,color: '#d84315',flex:0.3}}>{item.price}</Text>
                        <Text style={{fontSize: 16,color: '#d84315',flex:0.3}}>{item.quantity}</Text>
                        <Text style={styles.tableCell}>{item.quantity * item.price}</Text>
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
        backgroundColor: '#fff5e6', // Light orange background
    },
    restaurantName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#e65100', // Red-orange color
        marginBottom: 5,
    },
    addressText: {
        fontSize: 16,
        color: '#ff7043',
    },
    phoneText: {
        fontSize: 16,
        color: '#ff7043',
        marginBottom: 10,
    },
    invoiceTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ff6d00',
        marginVertical: 10,
    },
    dateText: {
        fontSize: 16,
        color: '#e64a19',
        marginBottom: '1%',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffccbc', // Lighter red-orange
        paddingVertical: 8,
        paddingHorizontal: 5,
        marginBottom: 5,
        marginTop: 5,
    },
    tableHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#e65100',
    },
    invoiceDetails: {
        marginTop: 10,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        backgroundColor: '#fff3e0', // Very light orange
        paddingVertical: 8,
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    tableCell: {
        fontSize: 16,
        color: '#d84315',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#bf360c',
        marginTop: 20,
        textAlign: 'right',
    },
});

export default Invoice;
