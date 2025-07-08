import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TextInput, Alert, Platform, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri, ResponseType } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function AppointmentScreen() {
  const [events, setEvents] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const [name, setName] = useState('');
  const [dateTime, setDateTime] = useState('');

  const calendarId = 'avianfalle@gmail.com';
  const apiKey = 'YOUR_API_KEY_HERE';

  const redirectUri = makeRedirectUri({
    native: 'costafoto://redirect',
    useProxy: Platform.select({ web: true, default: false }),
  });
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'YOUR_ANDROID_CLIENT_ID',
    scopes: ['https://www.googleapis.com/auth/calendar.events', 'email'],
    redirectUri,
    responseType: ResponseType.Token,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      setUserToken(response.params.access_token);
      Alert.alert('Successo', 'Accesso Google riuscito');
    }
  }, [response]);

  useEffect(() => {
    if (!userToken) return;
    (async () => {
      try {
        const now = new Date().toISOString();
        const res = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${now}`,
          { headers: { Authorization: `Bearer ${userToken}` } }
        );
        const json = await res.json();
        setEvents(json.items || []);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [userToken]);

  const createEvent = async () => {
    if (!userToken) return Alert.alert('Errore', 'Accedi prima con Google');
    if (!name || !dateTime) return Alert.alert('Errore', 'Compila tutti i campi');
    try {
      const event = {
        summary: `Prenotazione - ${name}`,
        start: { dateTime, timeZone: 'Europe/Rome' },
        end: { dateTime: new Date(new Date(dateTime).getTime() + 30*60000).toISOString(), timeZone: 'Europe/Rome' }
      };
      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
        { method: 'POST', headers: { Authorization: `Bearer ${userToken}`, 'Content-Type': 'application/json' }, body: JSON.stringify(event) }
      );
      const json = await res.json();
      if (json.id) Alert.alert('Successo', 'Appuntamento creato');
      else throw new Error('Errore API');
    } catch (e) {
      console.error(e);
      Alert.alert('Errore', 'Impossibile creare evento');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prossimi Appuntamenti</Text>
      <FlatList
        data={events}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>{item.summary}</Text>
            <Text>{item.start?.dateTime || item.start?.date}</Text>
          </View>
        )}
      />
      <Text style={styles.title}>Nuovo Appuntamento</Text>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Data/Ora (2025-07-05T15:00:00)" value={dateTime} onChangeText={setDateTime} style={styles.input} />
      <Button title="Accedi con Google" disabled={!request} onPress={() => promptAsync()} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Crea Appuntamento" onPress={createEvent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginBottom: 12 },
  eventItem: { marginBottom: 10 },
  eventTitle: { fontWeight: 'bold' }
});
