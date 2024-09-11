import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const Foods = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .get('http://10.10.27.146:3200/api/items')
            .then((response) => {
                console.log('Fetched Data:', response.data); // Log the response data
                setItems(response.data); // Set the fetched data to state
            })
            .catch((error) => {
                console.error('Error fetching data:', error); // Log any errors
            });
    }, []);

    useEffect(() => {
        console.log('Items state updated:', items); // Log the updated state
    }, [items]);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>ID: {item.id}</Text>
            <Text style={styles.itemText}>Name: {item.name}</Text>
            <Text style={styles.itemText}>Category: {item.category}</Text>
            <Text style={styles.itemText}>Price: ${item.price}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Top Content</Text>
            {items.length > 0 ? (
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            ) : (
                <Text style={styles.emptyText}>No items available</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    itemContainer: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    itemText: {
        fontSize: 18,
    },
    emptyText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
});

export default Foods;
