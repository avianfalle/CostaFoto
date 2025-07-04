import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Benvenuto in Costa Foto</Text>
      <Button title="Richiedi Preventivo" onPress={() => navigation.navigate('RequestQuote')} />
      <Button title="Fissa un Appuntamento" onPress={() => navigation.navigate('Appointment')} />
      <Button title="Accesso Agenzia" onPress={() => navigation.navigate('AdminLogin')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
});
