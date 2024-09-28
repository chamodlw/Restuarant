import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider as PaperProvider, DataTable } from 'react-native-paper';

const Selected = ({ selectedItem }) => {
    const [items, setItems] = useState([]);

    // Add the new item to the list of items, ensuring no duplicate items
    const addItem = (item) => {
        if (item && !items.some(existingItem => existingItem.id === item.id)) {
            setItems([...items, item]);
        }
    };

    // Call addItem whenever a new selected item is received
    React.useEffect(() => {
        addItem(selectedItem);
    }, [selectedItem]);

    return (
        <View>
            <View>
                <Text style={styles.title}>Invoice</Text>
            </View>
            <PaperProvider>
                <View style={styles.container}>
                    {items.length > 0 ? (
                        <DataTable>
                            <DataTable.Header style={styles.header}>
                                <DataTable.Title>
                                    <Text style={styles.headertext}>ID</Text>
                                </DataTable.Title>
                                <DataTable.Title>
                                    <Text style={styles.headertext}>Name</Text>
                                </DataTable.Title>
                                <DataTable.Title numeric>
                                    <Text style={styles.headertext}>Price</Text>
                                </DataTable.Title>
                                <DataTable.Title numeric>
                                    <Text style={styles.headertext}>Qty</Text>
                                </DataTable.Title>
                            </DataTable.Header>

                            {items.map((item, index) => (
                                <DataTable.Row key={index} style={styles.row}>
                                    <DataTable.Cell style={{ flex: 0.8 }}>{item.id}</DataTable.Cell>
                                    <DataTable.Cell style={{ flex: 1.3 }}>{item.name}</DataTable.Cell>
                                    <DataTable.Cell numeric>{item.price}</DataTable.Cell>
                                    <DataTable.Cell numeric>5</DataTable.Cell>
                                </DataTable.Row>
                            ))}
                        </DataTable>
                    ) : (
                        <Text style={styles.itemText}>No item selected</Text>
                    )}
                </View>
            </PaperProvider>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 'auto', // Adjust height to auto to accommodate content
        justifyContent: 'center',
        marginTop: 10,
        marginHorizontal: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
    },
    headertext: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    header: {
        minHeight: 50,
        backgroundColor: '#f0a288',
    },
    row: {
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'monospace',
        fontWeight: 'bold',
    },
    itemText: {
        fontSize: 18,
        textAlign: 'center',
    },
});

export default Selected;
