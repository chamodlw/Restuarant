import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-paper';

const Cashier = ({ navigation }) => {
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
            backgroundColor: 'grey',
        },
        backButton: {
            marginTop: '10%',
            marginLeft: '4%',
        },
        body: {
            padding: 20,
        },
        body_header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
        },
        button: {
            flex: 1,
            marginHorizontal: 5,
            borderColor: '#BA2F2F'
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
                            labelStyle={{ color: '#BA2F2F' }}
                            theme={{ colors: { primary: 'red' } }}
                        >
                            All
                        </Button>
                        <Button 
                            mode="outlined" 
                            style={styles.button}
                            labelStyle={{ color: '#BA2F2F' }}
                            theme={{ colors: { primary: 'red' } }}
                        >
                            Food
                        </Button>
                        <Button 
                            mode="outlined" 
                            style={styles.button}
                            labelStyle={{ color: '#BA2F2F' }}
                            theme={{ colors: { primary: 'red' } }}
                        >
                            Drinks
                        </Button>
                    </View>
                    <View style={styles.body_top}>
                        <Text>Top</Text>
                    </View>
                    <View style={styles.body_bottom}>
                        <Text>Bottom</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Cashier;
