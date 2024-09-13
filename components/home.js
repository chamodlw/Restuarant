import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Animated, TextInput, Modal } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const Home = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const animationRef = useRef(null);
    const [hideElements, setHideElements] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [screenToNavigate, setScreenToNavigate] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const opacity = useRef(new Animated.Value(1)).current;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const handleNavigation = (screen) => {
        if (screen === 'Customer') {
            playAnimationAndNavigate(screen);
        } else {
            setScreenToNavigate(screen);
            setShowModal(true);
        }
    };

    const validateAndNavigate = () => {
        let isValid = false;
    
        if (screenToNavigate === 'Cashier' && password === 'As') {
            isValid = true;
        } else if (screenToNavigate === 'Owner' && username === 'chamod' && password === '9090') {
            isValid = true;
        } else {
            alert('Invalid credentials');
        }
    
        if (isValid) {
            // Clear the fields
            setUsername('');
            setPassword('');
            setShowModal(false);
    
            // Navigate to the respective screen with animation
            playAnimationAndNavigate(screenToNavigate);
        }
    };
    

    const playAnimationAndNavigate = (screen) => {
        if (animationRef.current) {
            animationRef.current.play();
        }

        Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            setHideElements(true); // Hide elements after animation
            setTimeout(() => {
                navigation.navigate(screen + 'H');
            }, screen === 'Customer' ? 3000 : screen === 'Cashier' ? 500 : screen === 'Owner' ? 1000 : 0);
        });
    };

    useEffect(() => {
        if (isFocused) {
            setHideElements(false); // Reset visibility when screen is focused
            opacity.setValue(1); // Reset opacity
        }
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <ImageBackground
                    source={require('../assets/bordered.png')}
                    style={styles.image}
                    resizeMode="contain"
                >
                    <Text style={styles.title}>STREET BURGER HUT</Text>
                </ImageBackground>
            </View>
            <View style={styles.bottomContainer}>
                {!hideElements && (
                    <Animated.View style={[styles.overlay, { opacity }]}>
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
                    </Animated.View>
                )}
                <LottieView
                    ref={animationRef}
                    source={require('../assets/animation_buns.json')}
                    loop={false}
                    style={styles.animation}
                />
            </View>

            <Modal
                transparent={true}
                visible={showModal}
                animationType="slide"
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {screenToNavigate === 'Owner' && (
                            <TextInput
                                placeholder="Username"
                                style={styles.input}
                                value={username}
                                onChangeText={setUsername}
                            />
                        )}
                        <TextInput
                            placeholder="Password"
                            style={styles.input}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={validateAndNavigate}
                        >
                            <Text style={styles.modalButtonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#650E0E',
    },
    topContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    image: {
        marginTop: '20%',
        width: '100%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginTop: '58%',
        color: 'white',
        fontSize: 27,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    overlay: {
        paddingTop: '15%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        flex: 0.85,
    },
    button: {
        width: '65%',
        backgroundColor: '#BA2F2F',
        padding: 12,
        borderRadius: 10,
        marginVertical: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    animation: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, // Ensures the animation is behind the buttons
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
    modalButton: {
        width: '100%',
        padding: 12,
        backgroundColor: '#BA2F2F',
        borderRadius: 5,
        alignItems: 'center',
    },
    modalButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Home;
