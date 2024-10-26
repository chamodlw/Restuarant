import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Invoices = () => {
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState('ALL');
    const [bills, setBills] = useState([]);
    const [expandedBillId, setExpandedBillId] = useState(null);

    const navigateToFeatures = () => {
        navigation.navigate('Features');
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const getCurrentYear = () => {
        return new Date().getFullYear();
    };

    useEffect(() => {
        axios
            .get(`http://192.168.38.44:3200/api/bills/${getCurrentYear()}`)
            .then((response) => {
                console.log('Fetched Data:', response.data.response);
                setBills(response.data.response);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const toggleBillDetails = (id) => {
        setExpandedBillId(expandedBillId === id ? null : id);
    };

    const AllInvoicesContent = () => (
    <View>
        {bills.map((item) => {
            // Split the date_time into date and time
            const [date, time] = item.date_time.split(' '); // Adjust this split based on your date_time format

            return (
                <View key={item.id} style={styles.billCard}>
                    <View style={styles.billHeader}>
                        <Text style={styles.billIdText}>Invoice Num: {item.id}</Text>
                        <Text style={styles.billTotalText}>Total: {item.total}/=</Text>
                        <TouchableOpacity onPress={() => toggleBillDetails(item.id)}>
                            <Icon name={expandedBillId === item.id ? "chevron-up" : "chevron-down"} size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    {expandedBillId === item.id && (
                        <View style={styles.billDetails}>
                            <Text>Date: {date}</Text>
                            <Text>Time: {time}</Text>
                            {item.items.map((subItem) => (
                                <Text key={subItem.id}>
                                    {subItem.name} - {subItem.price}/= x {subItem.quantity}
                                </Text>
                            ))}
                        </View>
                    )}
                </View>
            );
        })}
    </View>
);


    const FilteredInvoicesContent = () => (
        <Text>Filtered Invoices Content</Text>
    );

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.backIcon}>
                    <TouchableOpacity onPress={navigateToFeatures}>
                        <Icon name="arrow-back-circle" size={35} color="black" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>Invoices</Text>
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
    billCard: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        elevation: 2,
    },
    billHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    billIdText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    billTotalText: {
        fontSize: 16,
    },
    billDetails: {
        marginTop: 10,
        paddingLeft: 10,
    },
});

export default Invoices;
