import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/home';
import CustomerH from './components/customer_home';  // Replace with your actual component
import CashierH from './components/cashier_home';  // Replace with your actual component
import OwnerH from './components/owner_home';  // Replace with your actual component
import Invoice from './components/sub_components/Invoice';  // Replace with your actual component

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="CustomerH" component={CustomerH} />
                <Stack.Screen name="CashierH" component={CashierH} />
                <Stack.Screen name="OwnerH" component={OwnerH} />
                <Stack.Screen name="Invoice" component={Invoice} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
