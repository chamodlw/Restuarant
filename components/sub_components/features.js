import React, { useLayoutEffect } from 'react';
import { Text , View, StyleSheet, ImageBackground ,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Features = () => {
    const navigation = useNavigation();

    const Invoices = () => {
        navigation.navigate('Invoices');
    };

    const Reports = () => {
        navigation.navigate('Reports');
    };

    // Use useLayoutEffect to hide the header
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <ImageBackground
                    source={require('../../assets/bordered.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.title}>
                <Text style={styles.titleText}>Advanced Features</Text>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.buttonSection}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={Invoices}
                    >
                        <Text style={styles.buttonText}>Invoices</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={Reports}
                    >
                        <Text style={styles.buttonText}>Sales Reports</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        minWidth: 250,
        maxWidth: 300,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        margin: '4%',
        borderRadius: 30,
        borderColor: '#000000',  // Solid black border
        borderWidth: 1.5,          // Thickness of the border
        backgroundColor: '#f0a288',
    },
    buttonSection: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#650E0E', // Overall background color
    },
    topContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#650E0E', // Background color for the top section
        height: '40%', // Set fixed height for the top section
    },
    bottomContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 500, // Set fixed height for the bottom section
    },
    title: {
        backgroundColor: '#650E0E', // Background color for the title section
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 80// Set fixed height for the title section
    },
    titleText: {
        color: 'white',
        fontSize: 27,
        fontFamily: 'monospace',
        fontWeight: 'bold',
    },
    image: {
        marginTop: '27%',
        width: 200, // Set fixed width for the image
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
});

export default Features;
