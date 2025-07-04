import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function AdminDashboardScreen() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'quoteRequests'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRequests(data);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Richieste ricevute</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5 }}>
            <Text><Text style={{ fontWeight: 'bold' }}>Indirizzo:</Text> {item.address}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Stanze:</Text> {item.rooms}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Servizio:</Text> {item.service}</Text>
            <Text><Text style={{ fontWeight: 'bold' }}>Inviata:</Text> {item.createdAt?.toDate().toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}