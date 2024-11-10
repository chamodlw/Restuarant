import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import { shareAsync } from 'expo-sharing';
import ViewShot from 'react-native-view-shot';
import img3 from '../../assets/bun-circled.png';
import axios from 'axios';

const Invoice = () => {
    const route = useRoute();
    const { items, total } = route.params; // Get items and total from navigation params
    const viewShotRef = useRef();
    const [id, setId] = useState([]);

    useEffect(() => {
        axios
            .get('http://192.168.101.44:3200/api/billundermaxid')
            .then((response) => {
                const billId = response.data.response.id; // Extract the 'id' field
                setId(billId + 1);
                console.log('max id:', billId);  // Display the 'id' only
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    

    const handleShare = async () => {
        try {
            // Capture the screenshot
            const uri = await viewShotRef.current.capture();
            
            // Data to be sent to the database
            const billData = {
                id: id, // Bill ID
                date_time: new Date(), // Current date and time
                items: items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
                total: total, // Total price
            };
            
            // POST request to save the bill data
            await axios.post('http://192.168.101.44:3200/api/addbill', billData)
                .then((response) => {
                    console.log('Bill added successfully:', id);   
                })
                .catch((error) => {
                    console.error('Error adding bill:', error);
                });
    
            // Share the captured image
            await shareAsync(uri, {
                mimeType: 'image/jpeg',
                dialogTitle: 'Share this invoice',
                UTI: 'public.jpeg',
            });
        } catch (error) {
            console.error("Error sharing screenshot or saving bill:", error);
        }
    };
    

    return (
        <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true} // Show scroll indicator
        >
            <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 1 }}>
                <View style={styles.invoiceContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Image
                            source={img3}
                            style={{ width: 65, height: 65, marginRight: '5%', marginLeft: '3%' }}
                        />
                        <View>
                            <Text style={styles.restaurantName}>Street Burger Hut</Text>
                            <Text style={styles.addressText}>No.11/A, Colombo 07</Text>
                            <Text style={styles.phoneText}>Phone: +94 76 261 9592</Text>
                        </View>
                    </View>
                    <Text style={styles.dateText}>Invoice No: SBH-{id}</Text>
                    <Text style={styles.dateText}>Date: {moment().format('Do MMMM YYYY')}</Text>
                    <Text style={styles.dateText}>Time: {moment().format('h:mm:ss a')}</Text>

                    <View style={styles.tableHeader}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black', flex: 0.5, marginLeft: 6 }}>Item</Text>
                        <Text style={styles.tableHeaderText}>Price (Rs.)</Text>
                        <Text style={styles.tableHeaderText}>Qty</Text>
                        <Text style={styles.tableHeaderText}>Total (Rs.)</Text>
                    </View>

                    <View style={styles.invoiceDetails}>
                        {items.map((item, index) => (
                            <View key={index} style={styles.itemRow}>
                                <Text style={{ fontSize: 16, color: 'black', flex: 0.5 ,marginLeft:4}}>{item.name}</Text>
                                <Text style={{ fontSize: 16, color: 'black', flex: 0.3 }}>{item.price}</Text>
                                <Text style={{ fontSize: 16, color: 'black', flex: 0.3 }}>{item.quantity}</Text>
                                <Text style={styles.tableCell}>{item.quantity * item.price}</Text>
                            </View>
                        ))}
                    </View>

                    <Text style={styles.totalText}>Total: Rs. {total}</Text>
                </View>
            </ViewShot>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.submitButton} onPress={handleShare}>
                    <Text style={styles.submitButtonText}>Print/Share Invoice</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    submitButton: {
        backgroundColor: '#f0a288',
        borderRadius: 8,
        padding: 8,
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 2,
        width: '100%',
    },
    submitButtonText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: 'white',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: '#fff5e6', // Background for scrollable view
    },
    scrollContent: {
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    invoiceContainer: {
        backgroundColor: '#fff5e6',
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
    dateText: {
        marginLeft: '3%',
        fontSize: 16,
        color: '#e64a19',
        marginBottom: '1%',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f0a288',
        paddingVertical: 8,
        paddingHorizontal: 5,
        marginBottom: 5,
        marginTop: 10,
    },
    tableHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    invoiceDetails: {
        marginTop: 10,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        backgroundColor: '#fff3e0',
        paddingVertical: 8,
        paddingHorizontal: 5,
        borderRadius: 5,
    },
    tableCell: {
        fontSize: 16,
        color: 'black',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 15,
        marginRight: 8,
        textAlign: 'right',
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default Invoice;
