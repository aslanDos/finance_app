import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AuthInput from '@/components/(auth)/AuthInput';

export default function SignUp() {
  const router = useRouter();

  // form states
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Missing fields', 'Please fill all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Invalid email', 'Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak password', 'Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Passwords do not match');
      return;
    }

    // Success
    Alert.alert('Success', 'Account created successfully');
    router.push('/(tabs)');
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
            <Text style={styles.title}>Sign Up</Text>
          </View>

          {/* Inputs */}
          <AuthInput
            label="Username"
            icon="person-outline"
            placeholder="Enter username"
            hint="At least 6 characters: letters, numbers or symbols"
            value={username}
            onChangeText={setUsername}
          />

          <AuthInput
            label="Email"
            icon="mail-outline"
            placeholder="Enter email"
            hint="Please enter a valid email address"
            value={email}
            onChangeText={setEmail}
          />

          <AuthInput
            label="Password"
            icon="lock-closed-outline"
            placeholder="Enter password"
            secure
            hint="At least 6 characters"
            value={password}
            onChangeText={setPassword}
          />

          <AuthInput
            label="Confirm Password"
            icon="lock-closed-outline"
            placeholder="Re-enter password"
            secure
            hint="Passwords must match"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {/* Sign up button */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Create Account</Text>
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
    marginBottom: 40,
  },
  title: {
    color: '#000',
    fontSize: 26,
    fontWeight: '600',
    marginLeft: 15,
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
