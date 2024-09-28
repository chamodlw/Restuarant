import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const Foods = ({ category }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .get('http://10.10.27.146:3200/api/items')
            .then((response) => {
                console.log('Fetched Data'); // Log fetched data
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

    const renderItem = ({ item }) => {
        const avatarLetters = getAvatarLetter(item.name);
        const avatarFontSize = avatarLetters.length === 1 ? 20 : 17; // Adjust font size based on number of letters

        return (
            <View style={styles.itemContainer}>
                <View style={styles.avatar}>
                    <Text style={[styles.avatarLetter, { fontSize: avatarFontSize }]}>
                        {avatarLetters}
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.itemText1}>{item.id}</Text>
                    <Text style={styles.itemText2}>{item.name}</Text>
                </View>
            </View>
        );
    };

    // Map custom categories like 'Food' and 'Drinks' to actual categories like 'bun' and 'juice'
    const filteredItems = category === 'All' 
        ? items 
        : category === 'Food' 
        ? items.filter(item => item.category === 'bun') 
        : category === 'Drinks' 
        ? items.filter(item => item.category === 'juice') 
        : items.filter(item => item.category === category); // Fallback for other categories

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {category === 'All' ? 'All Items' : `${category} Items`}
            </Text>
            {filteredItems.length > 0 ? (
                <FlatList
                    data={filteredItems}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    numColumns={4} // Display 4 items in a single row
                />
            ) : (
                <Text style={styles.emptyText}>No items available</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
    },
    itemContainer: {
        flex: 1,
        margin: 5,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
    },
    avatar: {
        width: 35,
        height: 35,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        borderRadius: 30,
        backgroundColor: '#BA2F2F',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarLetter: {
        color: 'white',
        fontWeight: 'bold',
    },
    itemText1: {
        fontSize: 10,
        marginTop: 3,
        textAlign: 'center',
    },
    itemText2: {
        fontSize: 12,
        textAlign: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
});

export default Foods;
