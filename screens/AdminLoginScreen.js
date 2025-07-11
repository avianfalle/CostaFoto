import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function AdminLoginScreen({ navigation }) {
  const [pass, setPass] = useState('');
  const handleLogin = () => {
    if (pass === 'YOUR_ADMIN_PASSWORD') {
      navigation.replace('Dashboard');
    } else Alert.alert('Password errata');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={pass}
        onChangeText={setPass}
        style={styles.input}
      />
      <Button title="Accedi" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
});