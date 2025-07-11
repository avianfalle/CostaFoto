import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function AdminDashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard Amministratore</Text>
      <Button title="Esci" onPress={() => navigation.replace('Home')} />
      {/* qui ulteriori funzioni di gestione */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  header: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
});