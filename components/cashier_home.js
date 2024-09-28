import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';
import Foods from './sub_components/foods';
import Selected from './sub_components/selected';

const Cashier = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedItem, setSelectedItem] = useState(null); // State to track selected item

    // Function to handle category selection
    const Click_Category = (category) => {
        setSelectedCategory(category);
        console.log(`Selected Category: ${category}`);
    };

    // Function to handle item selection from Foods component
    const handleItemSelection = (item) => {
        setSelectedItem(item);
        console.log('Selected item in parent:', item); // Log selected item in parent
    };

    const navigateToHome = () => {
        navigation.navigate('Home');
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const styles = {
        container: {
            flex: 1,
            backgroundColor: '#cd4a30',
        },
        backButton: {
            marginTop: '10%',
            marginLeft: '2%',
        },
        body: {
            paddingTop: 8,
            paddingRight: 10,
        },
        body_header: {
            marginHorizontal: 23,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 2,
            gap: 1,
        },
        button: {
            flex: 1,
            marginHorizontal: 5,
            borderColor: '#000000',
            backgroundColor: '#f0a288',
        },
        body_top: {},
        body_bottom: {
            marginBottom: '8%',
        },
    };

    return (
        <View style={styles.container}>
            <View style={styles.backButton}>
                <TouchableOpacity onPress={navigateToHome}>
                    <Icon name="arrow-back-circle" size={35} color="black" style={{ marginLeft: '3%' }} />
                </TouchableOpacity>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                    <View style={styles.body}>
                        <View style={styles.body_header}>
                            <Button
                                mode="outlined"
                                style={styles.button}
                                labelStyle={{ color: '#000000' }}
                                theme={{ colors: { primary: 'red' } }}
                                onPress={() => Click_Category('All')}
                            >
                                All
                            </Button>
                            <Button
                                mode="outlined"
                                style={styles.button}
                                labelStyle={{ color: '#000000' }}
                                theme={{ colors: { primary: 'red' } }}
                                onPress={() => Click_Category('Food')}
                            >
                                Food
                            </Button>
                            <Button
                                mode="outlined"
                                style={styles.button}
                                labelStyle={{ color: '#000000' }}
                                theme={{ colors: { primary: 'red' } }}
                                onPress={() => Click_Category('Drinks')}
                            >
                                Drinks
                            </Button>
                        </View>
                        <View style={styles.body_top}>
                            <Foods category={selectedCategory} onItemPress={handleItemSelection} />
                        </View>
                        <View style={styles.body_bottom}>
                            <Selected selectedItem={selectedItem} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default Cashier;
