import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

const Selected = () => {
    return (
        <View>
            <View>
                <Text style={styles.title}>Invoice</Text>
            </View>
            <PaperProvider>
                <View style={styles.container}>
                </View>
            </PaperProvider>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
    },
});

export default Selected;