import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function RequestQuoteScreen() {
  const [address, setAddress] = useState('');
  const [rooms, setRooms] = useState('');
  const [service, setService] = useState('');

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, 'quoteRequests'), {
        address,
        rooms,
        service,
        createdAt: Timestamp.now(),
      });
      Alert.alert('Richiesta inviata!', 'Riceverai presto un preventivo.');
      setAddress('');
      setRooms('');
      setService('');
    } catch (error) {
      Alert.alert('Errore', 'Impossibile inviare la richiesta.');
      console.error(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Richiedi un Preventivo</Text>
      <TextInput placeholder="Indirizzo dell'immobile" value={address} onChangeText={setAddress} style={{ borderBottomWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Numero stanze" keyboardType="numeric" value={rooms} onChangeText={setRooms} style={{ borderBottomWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Tipo di servizio (foto, drone...)" value={service} onChangeText={setService} style={{ borderBottomWidth: 1, marginBottom: 10 }} />
      <Button title="Invia richiesta" onPress={handleSubmit} />
    </View>
  );
}