import { View, Text, SafeAreaView, StatusBar, StyleSheet} from 'react-native'
import React from 'react'




export default function Settings() {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
    <View style={styles.container}>
      <Text style={styles.title}>Einstellungen</Text>
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
})