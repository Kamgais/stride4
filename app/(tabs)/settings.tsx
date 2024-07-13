import { View, Text, SafeAreaView, StatusBar, StyleSheet, Pressable} from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';




export default function Settings() {
  const router = useRouter();

  const logout = async() => {
    await AsyncStorage.removeItem('user')
    router.navigate('/login')
  }
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
    <View style={styles.container}>
      <Text style={styles.title}>Einstellungen</Text>
      <Pressable style={styles.button} onPress={logout}>
        <Text style={{color: 'white', fontSize: 20 }}>Logout</Text>
      </Pressable>
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
  button: {
    width: 200,
    height: 50,
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})