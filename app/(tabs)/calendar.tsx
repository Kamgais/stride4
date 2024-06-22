import { View, Text, SafeAreaView, StatusBar, StyleSheet, TextInput} from 'react-native'
import React, { useState } from 'react'
import { Calendar } from 'react-native-calendars'
import Button from '@/components/Button';



export default function CalendarScreen() {
  const [email, setEmail] = useState('');
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
    <View style={styles.container}>
      <Text style={styles.title}>Meine Einträge:</Text>
      <View style={styles.calendar}>
      <Calendar/>
      </View>
        <View style={styles.editBox}>
          <Text style={{fontWeight: 'bold'}}>10.Juli 2024</Text>
          <TextInput
          style={styles.input}
          placeholder="2000"
          placeholderTextColor="#999999"
          value={email}
          onChangeText={setEmail}
          keyboardType="numeric"
          autoCapitalize="none"
          />
         <Button title='Bearbeiten' onPress={() => {}}/>
        </View>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
   paddingVertical: 40,
   justifyContent: 'space-between',
   gap: 20
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  calendar: {
  },
  editBox: {
    height: 180,
    backgroundColor: '#E6E6E6',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 20,
    justifyContent: 'space-around'
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 30,
    marginBottom: 10,
    color: '#000000',
     fontFamily: 'Manrope',
     backgroundColor: 'white'
  },
})