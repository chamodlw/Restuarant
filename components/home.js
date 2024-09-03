import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();

    const handleNavigation = (screen) => {
        navigation.navigate(screen);
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/bun-circled.png')} // Local image path
                style={styles.image}
                resizeMode="contain"
            />
            <View style={styles.overlay}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNavigation('Customer')}
                >
                    <Text style={styles.buttonText}>Customer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNavigation('Cashier')}
                >
                    <Text style={styles.buttonText}>Cashier</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleNavigation('Owner')}
                >
                    <Text style={styles.buttonText}>Owner</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#650E0E', // Full background color
    },
    image: {
        flex: 1,
        marginTop: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '90%', // Occupies the top half of the screen
    },
    overlay: {
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
    },
    button: {
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: '#ff6f61',
        padding: 10,
        borderRadius: 8,
        minWidth: '75%',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Home;
