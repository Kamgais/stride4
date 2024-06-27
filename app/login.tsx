import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLogin = async () => {
    // Reset error state
    setError('');

    // Basic validation
    if (!email) {
      setError('E-Mail is required');
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'E-Mail is required',
      });
      return;
    }
    if (!password) {
      setError('Password is required');
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Password is required',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        email,
        password,
      });
      // Handle successful login
      console.log(response.data);
      // Redirect or save token
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Welcome back!',
      });
    } catch (error) {
      console.error(error);
      // Handle login error
      setError('Invalid email or password');
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'Invalid email or password',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    router.replace('/register');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <Toast />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.circle} />
          <Text style={styles.title}>Stride4Health</Text>
          <Text style={styles.subtitle}>Sammle deine Schritte und bringe dich und dein Gericht an die Spitze!</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="E-Mail"
            placeholderTextColor="#999999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {error.includes('E-Mail') && <Text style={styles.errorText}>{error}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Passwort"
            placeholderTextColor="#999999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error.includes('Password') && <Text style={styles.errorText}>{error}</Text>}
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Passwort vergessen?</Text>
          </TouchableOpacity>
          {error && !error.includes('E-Mail') && !error.includes('Password') && (
            <Text style={styles.errorText}>{error}</Text>
          )}
          {loading ? (
            <ActivityIndicator size="large" color="#87CEFA" />
          ) : (
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.register}>Noch keinen Account? <Text style={styles.registerLink}>Register</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#8BC0DE',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingTop: 0,
    fontFamily: 'Manrope',
    height: '100%',
  },
  header: {
    paddingTop: 40,
    alignItems: 'center',
    marginBottom: 40,
    height: '50%',
    width: '100%',
    backgroundColor: '#8BC0DE',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#C4C4C4',
    marginBottom: 20,
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    fontFamily: 'Manrope-Bold',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Manrope-SemiBold',
  },
  inputContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
    padding: 20,
    marginTop: 0,
    shadowColor: '#000',
    fontFamily: 'Manrope',
  },
  input: {
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 67,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    paddingHorizontal: 30,
    marginBottom: 10,
    color: '#000000',
    fontFamily: 'Manrope',
    backgroundColor: 'white',
  },
  forgotPassword: {
    color: '#8BC0DE',
    textAlign: 'left',
    marginBottom: 20,
    fontFamily: 'Manrope',
  },
  loginButton: {
    height: 50,
    backgroundColor: '#87CEFA',
    borderRadius: 67,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Manrope',
  },
  register: {
    textAlign: 'left',
    color: '#333333',
  },
  registerLink: {
    color: '#8BC0DE',
    fontFamily: 'Manrope',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
