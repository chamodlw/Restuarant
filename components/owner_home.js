import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Owner = ({ navigation }) => {
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
    };

    return (
        <View style={styles.container}>
            <View style={styles.backButton}>
                <TouchableOpacity onPress={navigateToHome}>
                    <Icon name="arrow-back-circle" size={35} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Owner;