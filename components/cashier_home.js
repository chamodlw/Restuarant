import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';
import Foods from './sub_components/foods';
import Selected from './sub_components/selected';

const Cashier = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Function to handle category selection
    const Click_Category = (category) => {
        setSelectedCategory(category);
        // You can add any additional logic here if needed for each category
        console.log(`Selected Category: ${category}`);
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
            paddingTop: 10,
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
        body_top: {
            // Add styles as needed
        },
        body_bottom: {
            // Add styles as needed
        },
    };

    return (
        <View style={styles.container}>
            <View style={styles.backButton}>
                <TouchableOpacity onPress={navigateToHome}>
                    <Icon name="arrow-back-circle" size={35} color="black" />
                </TouchableOpacity>
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
                        <Foods category={selectedCategory}/> 
                    </View>
                    <View style={styles.body_bottom}>
                        <Selected/>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Cashier;
