import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import RequestQuoteScreen from './screens/RequestQuoteScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import AdminLoginScreen from './screens/AdminLoginScreen';
import AdminDashboardScreen from './screens/AdminDashboardScreen';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Preventivo" component={RequestQuoteScreen} />
        <Stack.Screen name="Appuntamenti" component={AppointmentScreen} />
        <Stack.Screen name="LoginAdmin" component={AdminLoginScreen} />
        <Stack.Screen name="Dashboard" component={AdminDashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}