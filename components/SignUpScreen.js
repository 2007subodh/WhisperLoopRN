import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Dimensions, StatusBar, Animated, KeyboardAvoidingView, Platform
} from 'react-native';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Toast from 'react-native-root-toast';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSignup = async () => {
  if (!email || !password || !confirm) {
    Toast.show('Please fill all fields', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
    });
    return;
  }

  if (password !== confirm) {
    Toast.show('Passwords do not match', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
    });
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    Toast.show('Loop created successfully ✨', {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
    });

    // Redirect to login after a brief pause
    setTimeout(() => {
  navigation.navigate('Login');
}, 200);
  } catch (error) {
    Toast.show(`Signup error: ${error.message}`, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
    });
  }
};
  

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#666" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#666" value={password} onChangeText={setPassword} secureTextEntry />
        <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor="#666" value={confirm} onChangeText={setConfirm} secureTextEntry />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back to Login</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 30 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#00FFFF', marginBottom: 30, textAlign: 'center' },
  input: { backgroundColor: '#111', borderRadius: 12, padding: 18, fontSize: 16, color: '#fff', borderWidth: 1, borderColor: '#333', marginBottom: 20 },
  button: { backgroundColor: '#00FFFF', borderRadius: 12, padding: 18, alignItems: 'center' },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#00FFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
  

export default SignUpScreen;