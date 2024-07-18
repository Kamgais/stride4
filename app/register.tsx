import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';



// Predefined list of items
const items = [
  { label: 'OLG Brandenburg a. d. Havel', value: 'OLG Brandenburg a. d. Havel' },
  { label: 'LG Frankfurt (Oder)', value: 'LG Frankfurt (Oder)' },
  { label: 'LG Neuruppin', value: 'LG Neuruppin' },
  { label: 'LG Potsdam', value: 'LG Potsdam' },
  { label: 'LG Cottbus', value: 'LG Cottbus' },
  { label: 'AG Angermünde', value: 'AG Angermünde' },
  { label: 'AG Bad Freienwalde (Oder)', value: 'AG Bad Freienwalde (Oder)' },
  { label: 'AG Beeskow', value: 'AG Beeskow' },
  { label: 'AG Brandenburg a. d. Havel', value: 'AG Brandenburg a. d. Havel' },
  { label: 'AG Cottbus', value: 'AG Cottbus' },
  { label: 'AG Eberswalde', value: 'AG Eberswalde' },
  { label: 'AG Eisenhüttenstadt', value: 'AG Eisenhüttenstadt' },
  { label: 'AG Fürstenwalde/Spree', value: 'AG Fürstenwalde/Spree' },
  { label: 'AG Königs Wusterhausen', value: 'AG Königs Wusterhausen' },
  { label: 'AG Luckenwalde', value: 'AG Luckenwalde' },
  { label: 'AG Nauen', value: 'AG Nauen' },
  { label: 'AG Neuruppin', value: 'AG Neuruppin' },
  { label: 'AG Oranienburg', value: 'AG Oranienburg' },
  { label: 'AG Perleberg', value: 'AG Perleberg' },
  { label: 'AG Potsdam', value: 'AG Potsdam' },
  { label: 'AG Rathenow', value: 'AG Rathenow' },
  { label: 'AG Schwedt/Oder', value: 'AG Schwedt/Oder' },
  { label: 'AG Senftenberg', value: 'AG Senftenberg' },
  { label: 'AG Strausberg', value: 'AG Strausberg' },
  { label: 'AG Templin', value: 'AG Templin' },
  { label: 'AG Wittstock/Dosse', value: 'AG Wittstock/Dosse' },
  { label: 'AG Wittenberge', value: 'AG Wittenberge' },
  { label: 'AG Zossen', value: 'AG Zossen' },
];

const image = { uri: "@/assets/images/bg.png" };


const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   // [selectedOption, setSelectedOption] = useState(options[0]);
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelect = (option: React.SetStateAction<string>) => {
    // setSelectedOption(option);
  };

  

  

  const handleLogin = () => {
    // Add login logic here
  };

  const handleRegister = () => {
    // Add register navigation logic here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
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
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
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
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
              />
            </View>
          </View>
            <View style={styles.inputContainer}>
              <Text>Bitte wähle dein Gericht aus:</Text>
              <View style={styles.inputWrapper}>
                <Image
                    style={styles.icon}
                    source={require('@/assets/images/city.png')}
               />
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    style={styles.picker}
                >
                  <Picker.Item label="- bitte wählen - " value="" />
                  {items.map((item, index) => (
                      <Picker.Item key={index} label={item.label} value={item.value} />
                  ))}
                </Picker>
              </View>

            </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.register}>Schon einen Account? <Text style={styles.registerLink}>Login</Text></Text>
          </TouchableOpacity>
      </View>
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
    fontFamily: 'Manrope',
    height: '100%'
  },

  image: {
    paddingTop: 40,
    width: '100%',
    height: '80%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    
    //backgroundColor: 'black'
   // height: '50%'
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
    fontFamily: 'Manrope-Bold'
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
     fontFamily: 'Manrope-SemiBold'
  },
  inputContainer: {
    width: '100%',
    backgroundColor: 'white',
  //  borderRadius: 10,
  paddingHorizontal: 20,
    marginTop: 0,
    shadowColor: '#000',
    gap: 5,
  //  shadowOffset: { width: 0, height: 2 },
  //  shadowOpacity: 0.2,
  //  shadowRadius: 10,
  //  elevation: 5,
     fontFamily: 'Manrope'
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
  forgotPassword: {
    color: '#8BC0DE',
    textAlign: 'left',
    marginBottom: 20,
     fontFamily: 'Manrope'
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
     fontFamily: 'Manrope'
  },
  register: {
    textAlign: 'left',
    color: '#333333',
  },
  registerLink: {
    color: '#8BC0DE',
     fontFamily: 'Manrope'
  },
  icon: {
    width: 12,
    height: 12,

  },
  input:{
    paddingLeft:40,
  },
  picker:{
    paddingLeft:340,
  }
});

export default RegisterScreen;

