import SelectDropdown from '@/components/Select';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';

const options = [    "LG Frankfurt (Oder)",
  "LG Neuruppin",
  "LG Potsdam",
  "LG Cottbus",
  "AG Angermünde",
  "AG Bad Freienwalde (Oder)",
  "AG Beeskow",
  "AG Brandenburg an der Havel",
];

const RegisterScreen = () => {
  const [vorname, setVorname] = useState('');
  const [nachname, setNachname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const router = useRouter();

  const handleSelect = (option: React.SetStateAction<string>) => {
    setSelectedOption(option);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://ec2-16-170-77-0.eu-north-1.compute.amazonaws.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname:vorname,
         lastname: nachname,
          email,
          password,
          court: selectedOption,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Registration successful');
        // Add navigation logic here, if needed
        router.navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const handleLogin = () => {
    router.replace('/login')
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Stride4Health</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text>Persönliche Angaben:</Text>
              <View  style={styles.inputWrapper}>
              <Image
                style={styles.icon}
                source={require('@/assets/images/user.png')}
            />
              <TextInput
                style={styles.input}
                placeholder="Vorname"
                placeholderTextColor="#999999"
                value={vorname}
                onChangeText={setVorname}
                autoCapitalize="none"
              />
              </View>
              <View  style={styles.inputWrapper}>
              <Image
                style={styles.icon}
                source={require('@/assets/images/user.png')}
            />
              <TextInput
                style={styles.input}
                placeholder="Nachname"
                placeholderTextColor="#999999"
                value={nachname}
                onChangeText={setNachname}
                autoCapitalize="none"
              />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text>Email und Password vergeben:</Text>
              <View style={styles.inputWrapper}>
              <Image
                  style={styles.icon}
                  source={require('@/assets/images/user.png')}
              />
              <TextInput
                style={styles.input}
                placeholder="E-Mail"
                placeholderTextColor="#999999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              </View>
              <View style={styles.inputWrapper}>
              <Image
                  style={styles.icon}
                  source={require('@/assets/images/passwrd.png')}
              />
              <TextInput
                style={styles.input}
                placeholder="Password eingeben"
                placeholderTextColor="#999999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              </View>
              <View style={styles.inputWrapper}>
              <Image
                  style={styles.icon}
                  source={require('@/assets/images/passwrd.png')}
              />
              <TextInput
                style={styles.input}
                placeholder="Password wiederholen"
                placeholderTextColor="#999999"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text>Bitte wähle dein Gericht aus:</Text>
              <SelectDropdown
                options={options}
                selectedOption={selectedOption}
                onSelect={handleSelect}
              />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleRegister} disabled={loading}>
              <Text style={styles.loginButtonText}>{loading ? 'Registering...' : 'Register'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.register}>Schon einen Account? <Text style={styles.registerLink}>Login</Text></Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#8BC0DE'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 0,
    paddingTop: 0,
    fontFamily: 'Roboto',
    height: '100%'
  },
  image: {
    paddingTop: 40,
    width: '100%',
    height: '80%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    paddingTop: 40,
    alignItems: 'center',
    marginBottom: 10,
    height: '15%',
    width: '100%',
    backgroundColor: '#8BC0DE'
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
    fontFamily: 'Roboto-Bold'
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Roboto-SemiBold'
  },
  inputContainer: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    marginTop: 0,
    shadowColor: '#000',
    gap: 5,
    fontFamily: 'Roboto'
  },
  inputWrapper: {
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 67,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    paddingHorizontal: 40,
    marginBottom: 10,
    color: '#000000',
     fontFamily: 'Manrope',
     backgroundColor: 'white',
    // paddingLeft:20
    flexDirection:'row',
    alignItems:"center"

  },
  icon: {
    width: 12,
    height: 12,

  },
  input: {
    // height: 50,
    // borderColor: '#CCCCCC',
    // borderWidth: 1,
    // borderRadius: 67,
    // shadowColor: '#000',
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    // paddingHorizontal: 30,
    // marginBottom: 10,
    // color: '#000000',
    // fontFamily: 'Roboto',
    // backgroundColor: 'white'
    paddingLeft:30,
  },
  forgotPassword: {
    color: '#8BC0DE',
    textAlign: 'left',
    marginBottom: 20,
    fontFamily: 'Roboto'
  },
  loginButton: {
    height: 50,
    width: '90%',
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
    fontFamily: 'Roboto'
  },
  register: {
    textAlign: 'left',
    color: '#333333',
  },
  registerLink: {
    color: '#8BC0DE',
    fontFamily: 'Roboto'
  },
});

export default RegisterScreen;
