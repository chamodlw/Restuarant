import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Invoices = () => {
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState('ALL');
    const navigateToFeatures = () => {
        navigation.navigate('Features');
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const AllInvoicesContent = () => (
        <View>
            <Text>All Invoices Content</Text>
        </View>
    );

    const FilteredInvoicesContent = () => (
        <View>
            <Text>Filtered Invoices Content</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.backIcon}>
                    <TouchableOpacity onPress={navigateToFeatures}>
                        <Icon name="arrow-back-circle" size={35} color="black" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>Sales Reports</Text>
            </View>
            
            <View style={styles.body}>
                <View style={styles.switchBar}>
                    <TouchableOpacity
                        style={[
                            styles.switchOption,
                            selectedOption === 'ALL' && styles.activeOption,
                        ]}
                        onPress={() => setSelectedOption('ALL')}
                    >
                        <Text style={styles.switchText}>ALL INVOICES</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.switchOption,
                            selectedOption === 'FILTER' && styles.activeOption,
                        ]}
                        onPress={() => setSelectedOption('FILTER')}
                    >
                        <Text style={styles.switchText}>FILTER BY DATE</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.contentContainer}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                        {selectedOption === 'ALL' ? <AllInvoicesContent /> : <FilteredInvoicesContent />}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: '10%',
        flex: 1,
        backgroundColor: '#BA2F2F',
    },
    topContainer: {
        paddingHorizontal: '3%',
        flexDirection: 'row',
        marginBottom: '5%',
    },
    backIcon: {
        marginRight: '3%',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'monospace',
    },
    body: {
        paddingBottom: '15%',
        paddingHorizontal: '2%',
        paddingTop: '1%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flex: 1,
        backgroundColor: '#f0a288',
    },
    switchBar: {
        paddingHorizontal: '4%',
        backgroundColor: '#f0a288',
        padding: 5,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
    switchOption: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: '#f0a288',
        alignItems: 'center',
        marginHorizontal: 5,
        borderRadius: 20,
        borderColor: '#000000',
        borderWidth: 1,
    },
    activeOption: {
        backgroundColor: '#BA2F2F',
    },
    switchText: {
        color: 'white',
        fontWeight: 'bold',
    },
    contentContainer: {
        marginTop: 20,
    },
});

export default Invoices;