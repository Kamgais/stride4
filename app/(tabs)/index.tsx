import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'



export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
    <View style={styles.container}>
      
      <Text style={styles.title}>Hallo, Max!</Text>
      <Text style={styles.subtitle}>Deine heutigen Schritte liegen bei:</Text>

      <View style={styles.circularProgress}>
        <Text style={styles.circularProgressText}>Dein Tagesziel: 10.000</Text>
        <Text style={styles.circularProgressStep}>7500</Text>
      </View>
      <View style={styles. statisticBox}>
        <View>
          <Text style={styles.statisticBoxDetails}>Deine Woche</Text>
          <Text style={{color: '#222222',fontSize: 20, fontWeight: 'bold'}}>25500</Text>
        </View>
        <View>
    
        </View>
      </View>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
   paddingHorizontal: 10,
   paddingVertical: 40,
   gap: 20,
   alignItems: 'center'
   
  },
  title: {
    fontSize: 50,
    width: '100%',
    fontWeight: 'condensedBold'
  },
  subtitle: {
    fontSize: 25,
    width: '80%',
    alignSelf: 'flex-start',
    paddingVertical: 10,
    fontWeight: 'condensedBold'
  },
   safeArea: {
    
   },
   circularProgress: {
    width: 300,
    height: 300,
    borderWidth: 15,
    borderRadius: 999,
    borderColor: '#8BC0DE',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40
   },
   circularProgressText: {
    fontSize: 20,
    fontWeight: 'condensedBold'
   },
   circularProgressStep: {
    fontSize: 60,
    fontWeight: 'bold'
   },
   statisticBox: {
    width: '100%',
    height: 95,
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 20,
    justifyContent: 'center'
   },
   statisticBoxDetails: {
    color: '#858585',
    fontSize: 18
   },
   statisticBoxGraph: {

   }
})