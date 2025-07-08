import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Benvenuto in Costa Foto</Text>
      <Button
        title="Richiedi Preventivo"
        onPress={() => navigation.navigate('RequestQuote')}
      />
      <Button
        title="Prenota Appuntamento"
        onPress={() => navigation.navigate('Appointment')}
        style={styles.button}
      />
      <Button
        title="Area Agenzia"
        onPress={() => navigation.navigate('AdminLogin')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  button: { marginVertical: 8 }
});