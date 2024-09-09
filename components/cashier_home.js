import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
        },
    };

    return (
        <View style={styles.container}>
            <View style={styles.backButton}>
                <TouchableOpacity onPress={navigateToHome}>
                    <Icon name="arrow-back-circle" size={35} color="black" />
                </TouchableOpacity>
                <View style={styles.body}>
                    <View style={styles.body-header}>
                    
                    </View>
                    <View style={styles.body-top}>

                    </View>
                    <View style={styles.body-bottom}>

                    </View>
                </View>
            </View>
        </View>
    );
};

export default Cashier;
