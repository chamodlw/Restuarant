import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider, DataTable } from 'react-native-paper';
import { Image } from 'react-native';
import img3 from '../../assets/menusymbol.png';
import { useNavigation } from '@react-navigation/native';

const Selected = ({ selectedItem }) => {
    const [items, setItems] = useState([]);
    const [intervalId, setIntervalId] = useState(null); // To hold the interval ID for long press

    // Add the new item to the list of items, ensuring no duplicate items
    const addItem = (item) => {
        if (item && !items.some(existingItem => existingItem.id === item.id)) {
            // Add quantity field for each item with a default value of 1
            setItems([...items, { ...item, quantity: 1 }]);
        }
    };

    // Call addItem whenever a new selected item is received
    useEffect(() => {
        addItem(selectedItem);
    }, [selectedItem]);

    // Increment quantity
    const incrementQuantity = (index) => {
        const updatedItems = [...items];
        updatedItems[index].quantity += 1;
        setItems(updatedItems);
    };

    // Decrement quantity (remove item if it reaches 0)
    const decrementQuantity = (index) => {
        const updatedItems = [...items];
        if (updatedItems[index].quantity > 1) {
            updatedItems[index].quantity -= 1;
        } else {
            updatedItems.splice(index, 1); // Remove the item when quantity is 0
        }
        setItems(updatedItems);
    };

    // Handle long press for incrementing/decrementing quantity
    const handleLongPress = (index, action) => {
        const interval = setInterval(() => {
            if (action === 'increment') {
                incrementQuantity(index);
            } else if (action === 'decrement') {
                decrementQuantity(index);
            }
        }, 450); // Adjust the interval time for speed of increment/decrement
        setIntervalId(interval);
    };

    // Clear interval when the touch is released
    const handlePressOut = () => {
        clearInterval(intervalId);
        setIntervalId(null);
    };

    // Calculate total bill value
    const getTotalBill = () => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const navigation = useNavigation(); // Use navigation

    const printInvoice = () => {
        const total = getTotalBill(); // Get total price
        // Navigate to the Invoice screen and pass the items and total price
        navigation.navigate('Invoice', {
            items: items,
            total: total
        });
    };

    return (
        <View>
            <View>
                <Text style={styles.title}>Invoice</Text>
            </View>
            <PaperProvider>
                <View style={styles.container}>
                    {items.length > 0 ? (
                        <DataTable style={styles.table}> 
                            <DataTable.Header style={styles.header}>
                                <DataTable.Title style={{ flex: 0.8 }}>
                                    <Text style={styles.headertext}>ID</Text>
                                </DataTable.Title>
                                <DataTable.Title style={{ flex: 1.3 }}>
                                    <Text style={styles.headertext}>Name</Text>
                                </DataTable.Title>
                                <DataTable.Title numeric style={{ flex: 1.2 }}>
                                    <Text style={styles.headertext}>Price</Text>
                                </DataTable.Title>
                                <DataTable.Title numeric style={{ flex: 1.3 ,paddingRight:5}}>
                                    <Text style={styles.headertext}>Qty</Text>
                                </DataTable.Title>
                            </DataTable.Header>

                            {items.map((item, index) => (
                                <DataTable.Row key={index} style={styles.row}>
                                    <DataTable.Cell style={{ flex: 0.8 }}>{item.id}</DataTable.Cell>
                                    <DataTable.Cell style={{ flex: 1.3 }}>{item.name}</DataTable.Cell>
                                    <DataTable.Cell numeric style={{ flex: 0.8 }}>{item.price}</DataTable.Cell>
                                    <DataTable.Cell numeric style={{ flex: 1.5 }}>
                                        <View style={styles.quantityContainer}>
                                            <TouchableOpacity
                                                onPress={() => decrementQuantity(index)}
                                                onPressIn={() => handleLongPress(index, 'decrement')}
                                                onPressOut={handlePressOut}
                                                style={styles.button}
                                            >
                                                <Text style={styles.buttonText}>-</Text>
                                            </TouchableOpacity>
                                            <Text style={styles.quantityText}>{item.quantity}</Text>
                                            <TouchableOpacity
                                                onPress={() => incrementQuantity(index)}
                                                onPressIn={() => handleLongPress(index, 'increment')}
                                                onPressOut={handlePressOut}
                                                style={styles.button}
                                            >
                                                <Text style={styles.buttonText}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </DataTable.Cell>
                                </DataTable.Row>
                            ))}

                            {/* Total bill row */}
                            <DataTable.Row style={styles.totalRow}>
                                <DataTable.Cell style={{ flex: 2.1 }}>
                                    <Text style={styles.totalText}>Total</Text>
                                </DataTable.Cell>
                                <DataTable.Cell numeric style={{ flex: 2.5 }}>
                                    <Text style={styles.totalText}>Rs. {getTotalBill()}</Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>
                    ) : (
                        <View style={styles.emptyimg}>
                            <Image
                                source={img3}
                                style={{ width: 200, height: 220 }}
                            />
                        </View>
                    )}
                </View>
            </PaperProvider>
            <View>
                <TouchableOpacity style={styles.submitButton} onPress={printInvoice}>
                    <Text style={styles.submitButtonText}>Print Invoice</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    submitButton: {
        backgroundColor: '#f0a288',
        borderRadius: 8,
        padding: 8,
        alignItems: 'center',
        marginVertical: 20,
        marginHorizontal: 15,
    },
    submitButtonText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: 'white',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    container: {
        height: 'auto',
        justifyContent: 'center',
        marginTop: 10,
        marginHorizontal: 15,
        
    },
    headertext: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
    },
    table: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
    },
    header: {
        minHeight: 50,
        backgroundColor: '#ddd',
    },
    row: {
        backgroundColor: '#f9f9f9',
    },
    title: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'monospace',
        fontWeight: 'bold',
    },
    itemText: {
        fontSize: 18,
        textAlign: 'center',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        paddingHorizontal: 10,
        backgroundColor: '#ddd',
        borderRadius: 8,
        marginHorizontal: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantityText: {
        
        fontSize: 15,
        fontWeight: 'bold',
    },
    emptyimg: {
        paddingVertical: 20,
        backgroundColor: 'white',
        marginHorizontal: '10%',
        alignItems: 'center', 
        marginTop: 30,
        marginBottom: 30,
        borderRadius: 300,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
    },
    totalRow: {
        backgroundColor: '#ddd',
    },
    totalText: {
        marginHorizontal: 5,
        fontSize: 17,
        fontWeight: 'bold',
    }
});

export default Selected;
