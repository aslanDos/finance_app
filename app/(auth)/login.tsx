import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AuthInput from '@/components/(auth)/AuthInput';

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      router.push('/(tabs)');
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <View>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>Login</Text>
          </View>

          {/* Inputs */}
          <AuthInput
            label="Username"
            icon="person-outline"
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />

          <AuthInput
            label="Password"
            icon="lock-closed-outline"
            placeholder="Enter your password"
            secure
            hint="At least 6 characters"
            value={password}
            onChangeText={setPassword}
          />

          {/* Forgot password */}
          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot username or password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    color: '#000',
    fontSize: 26,
    fontWeight: '600',
    marginLeft: 15,
  },
  forgot: {
    color: '#007AFF',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 60,
  },
  button: {
    backgroundColor: '#E53935',
    borderRadius: 25,
    paddingVertical: 15,
    marginBottom: 60,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
