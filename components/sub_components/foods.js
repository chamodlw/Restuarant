import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';

const Foods = ({ category, onItemPress }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .get('http://192.168.45.44:3200/api/items')
            .then((response) => {
                console.log('Fetched Data');
                setItems(response.data.response);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const getAvatarLetter = (name) => {
        const words = name.split(' ');
        if (words.length > 1) {
            return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
        }
        return name.charAt(0).toUpperCase();
    };

    const handleItemPress = (item) => {
        console.log('add new one', item);
        onItemPress(item); // Pass the clicked item to parent
    };

    const filteredItems = category === 'All' 
        ? items 
        : category === 'Food' 
        ? items.filter(item => item.category === 'bun') 
        : category === 'Drinks' 
        ? items.filter(item => item.category === 'juice') 
        : items.filter(item => item.category === category);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {category === 'All' ? 'All Items' : `${category} Items`}
            </Text>
            {filteredItems.length > 0 ? (
                <ScrollView>
                    {filteredItems.reduce((rows, item, index) => {
                        if (index % 3 === 0) rows.push([]); // Start a new row
                        rows[rows.length - 1].push(
                            <Pressable 
                                key={item.id.toString()} 
                                style={styles.itemContainer} 
                                onPress={() => handleItemPress(item)}
                            >
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarLetter}>
                                        {getAvatarLetter(item.name)}
                                    </Text>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.itemText1}>{item.name.includes(' ') ? item.name.split(' ').join('\n') : item.name}</Text>
                                    <Text style={styles.itemText2}>{item.price}/=</Text>
                                </View>
                            </Pressable>
                        );
                        return rows;
                    }, []).map((row, rowIndex) => (
                        <View key={rowIndex} style={[styles.rowContainer, row.length < 3 && styles.centerRow]}>
                            {row}
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <Text style={styles.emptyText}>Street Burger Hut</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        color: 'white',
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'monospace',
        fontWeight: 'bold',
    },
    rowContainer: {
        flexDirection: 'row', // Set to row for horizontal layout
        justifyContent: 'space-between', // Space out items evenly
        marginBottom: 10, // Add margin for spacing between rows
    },
    centerRow: {
        justifyContent: 'center', // Center align if less than 3 items
        gap: 20, // Add gap between items
        
    },
    itemContainer: {
        width: '30%', // Set to 30% to fit three items in a row
        flexDirection: 'row', // Ensure items are laid out in a row
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black',
    },
    avatar: {
        width: 28,
        height: 28,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 30,
        backgroundColor: '#BA2F2F',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarLetter: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15, // Default size
    },
    textContainer: {
        marginLeft: 10, // Add margin for spacing
    },
    itemText1: {
        fontSize: 9,
    },
    itemText2: {
        fontSize: 12,
    },
    emptyText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
});

export default Foods;
