
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function AdminDashboardScreen() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    (async () => {
      const snapshot = await getDocs(collection(db, 'quotes'));
      setQuotes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Richieste Preventivo</Text>
      <FlatList
        data={quotes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}: {item.details}</Text>
          </View>
        )}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  item: { padding: 8, borderBottomWidth: 1, borderColor: '#eee' },
});
