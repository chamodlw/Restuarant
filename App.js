import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './components/home';
import CustomerH from './components/customer_home';
import CashierH from './components/cashier_home';
import OwnerH from './components/owner_home';
import Invoice from './components/sub_components/Invoice';
import Features from './components/sub_components/features';
import Reports from './components/sub_components/reports';
import Invoices from './components/sub_components/invoices';

const Stack = createStackNavigator();

const App = () => {
    const [fontLoaded, setFontLoaded] = useState(false);

    // Load fonts asynchronously
    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                ...Ionicons.font,
            });
            setFontLoaded(true);
        }
        loadFonts();
    }, []);

    if (!fontLoaded) {
        // Display a loading indicator until fonts are loaded
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="CustomerH" component={CustomerH} />
                <Stack.Screen name="CashierH" component={CashierH} />
                <Stack.Screen name="OwnerH" component={OwnerH} />
                <Stack.Screen name="Invoice" component={Invoice} />
                <Stack.Screen name="Features" component={Features} />
                <Stack.Screen name="Reports" component={Reports} />
                <Stack.Screen name="Invoices" component={Invoices} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
