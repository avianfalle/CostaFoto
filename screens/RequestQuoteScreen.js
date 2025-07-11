import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function RequestQuoteScreen({ navigation }) {
  const [address, setAddress] = useState('');
  const [rooms, setRooms] = useState('');

  const handleSubmit = async () => {
    if (!address || !rooms) return Alert.alert('Compila tutti i campi');
    try {
      await addDoc(collection(db, 'quoteRequests'), {
        address,
        rooms,
        createdAt: serverTimestamp(),
      });
      Alert.alert('Richiesta inviata');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Errore invio');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Indirizzo"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
      <TextInput
        placeholder="Numero stanze"
        value={rooms}
        onChangeText={setRooms}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Invia" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
});