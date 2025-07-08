import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function RequestQuoteScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = async () => {
    if (!name || !email || !details) {
      Alert.alert('Errore', 'Compila tutti i campi');
      return;
    }
    try {
      await addDoc(collection(db, 'quotes'), { name, email, details, createdAt: new Date() });
      Alert.alert('Successo', 'Richiesta inviata');
      setName(''); setEmail(''); setDetails('');
    } catch (e) {
      console.error(e);
      Alert.alert('Errore', 'Impossibile inviare richiesta');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Richiedi un Preventivo</Text>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Dettagli"
        value={details}
        onChangeText={setDetails}
        multiline
        style={[styles.input, { height: 100 }]}
      />
      <Button title="Invia Richiesta" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginBottom: 12 }
});
