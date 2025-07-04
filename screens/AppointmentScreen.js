import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TextInput, Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, ResponseType } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function AppointmentScreen() {
  const [events, setEvents] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const [name, setName] = useState('');
  const [dateTime, setDateTime] = useState('');

  const calendarId = 'avianfalle@gmail.com';
  const apiKey = 'AIzaSyCz1u2kHXFuRHX3drRG3oQG677XvvoSkpw';

  const redirectUri = makeRedirectUri({
    native: 'costafoto://redirect',
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '610280230360-2rdelootr8i08hb22t547b72a1aagkv2.apps.googleusercontent.com',
    scopes: ['https://www.googleapis.com/auth/calendar.events', 'email'],
    redirectUri,
    responseType: ResponseType.Token,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      setUserToken(access_token);
      alert('Accesso Google riuscito!');
    }
  }, [response]);

  useEffect(() => {
    const fetchEvents = async () => {
      const now = new Date().toISOString();
      const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${now}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setEvents(data.items || []);
      } catch (error) {
        console.error('Errore nel recupero eventi calendario:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleCreateEvent = async () => {
    if (!userToken) return alert('Devi accedere con Google prima di prenotare.');
    if (!name || !dateTime) return alert('Inserisci nome e data/ora.');

    try {
      const event = {
        summary: `Prenotazione - ${name}`,
        start: {
          dateTime,
          timeZone: 'Europe/Rome',
        },
        end: {
          dateTime: new Date(new Date(dateTime).getTime() + 30 * 60 * 1000).toISOString(),
          timeZone: 'Europe/Rome',
        },
      };

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        }
      );

      const data = await response.json();
      if (data.id) {
        Alert.alert('Prenotazione creata con successo!');
        setName('');
        setDateTime('');
      } else {
        console.error('Errore:', data);
        alert('Errore nella creazione evento');
      }
    } catch (err) {
      console.error(err);
      alert('Errore nella richiesta');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Prossimi appuntamenti</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.summary}</Text>
            <Text>{item.start?.dateTime || item.start?.date}</Text>
          </View>
        )}
      />
      <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Prenota un nuovo appuntamento</Text>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginVertical: 5, padding: 8 }}
      />
      <TextInput
        placeholder="Data e ora (es: 2025-07-05T15:00:00)"
        value={dateTime}
        onChangeText={setDateTime}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Accedi con Google" disabled={!request} onPress={() => promptAsync()} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Crea prenotazione" onPress={handleCreateEvent} />
    </View>
  );
}