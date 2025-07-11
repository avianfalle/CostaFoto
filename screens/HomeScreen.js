import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Richiedi Preventivo"
        onPress={() => navigation.navigate('Preventivo')}
      />
      <Button
        title="Visualizza Appuntamenti"
        onPress={() => navigation.navigate('Appuntamenti')}
      />
      <Button
        title="Area Amministratore"
        onPress={() => navigation.navigate('LoginAdmin')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 20,
  },
});