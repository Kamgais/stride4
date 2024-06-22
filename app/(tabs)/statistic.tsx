import { View, Text, SafeAreaView, StatusBar, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Ranglist from '@/components/RangList'

export default function Statistic() {
  const meinGerichtData = [
    { id: '1', rank: '1.', name: 'Anonymer Luchs', points: '30.000', trend: 'up' },
    { id: '2', rank: '2.', name: 'Anonymer Dachs', points: '29.000', trend: 'down' },
    { id: '3', rank: '3.', name: 'Anonymer Hund', points: '28.000', trend: 'up' },
    { id: '4', rank: '4.', name: 'Anonymer Kater', points: '27.000', trend: 'neutral' },
    { id: '5', rank: '5.', name: 'Anonymer Fuchs', points: '26.000', trend: 'up' },
    { id: '6', rank: '6.', name: 'Anonymer Bär', points: '25.000', trend: 'down' },
    { id: '7', rank: '7.', name: 'Anonymer Wolf', points: '24.000', trend: 'up' },
    { id: '8', rank: '8.', name: 'Anonymer Adler', points: '23.000', trend: 'neutral' },
    { id: '9', rank: '9.', name: 'Anonymer Löwe', points: '22.000', trend: 'down' },
    { id: '10', rank: '10.', name: 'Anonymer Tiger', points: '21.000', trend: 'up' },
  ];

  const alleGerichteData = [
    { id: '1', rank: '1.', name: 'LG Frankfurt (Oder)', points: '90.000', trend: 'neutral' },
    { id: '2', rank: '2.', name: 'LG Neuruppin', points: '89.000', trend: 'neutral' },
    { id: '3', rank: '3.', name: 'LG Potsdam', points: '88.000', trend: 'up' },
    { id: '4', rank: '4.', name: 'LG Cottbus', points: '87.000', trend: 'down' },
    { id: '5', rank: '5.', name: 'LG Berlin', points: '86.000', trend: 'up' },
    { id: '6', rank: '6.', name: 'LG Hamburg', points: '85.000', trend: 'neutral' },
    { id: '7', rank: '7.', name: 'LG München', points: '84.000', trend: 'down' },
    { id: '8', rank: '8.', name: 'LG Stuttgart', points: '83.000', trend: 'up' },
    { id: '9', rank: '9.', name: 'LG Köln', points: '82.000', trend: 'down' },
    { id: '10', rank: '10.', name: 'LG Düsseldorf', points: '81.000', trend: 'neutral' },
    { id: '11', rank: '11.', name: 'LG Leipzig', points: '80.000', trend: 'up' },
    { id: '12', rank: '12.', name: 'LG Dresden', points: '79.000', trend: 'down' },
    { id: '13', rank: '13.', name: 'LG Hannover', points: '78.000', trend: 'neutral' },
    { id: '14', rank: '14.', name: 'LG Bremen', points: '77.000', trend: 'up' },
    { id: '15', rank: '15.', name: 'LG Mainz', points: '76.000', trend: 'down' },
  ];
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
    <View style={styles.container}>
      <Text style={styles.title}>Meine Statistiken</Text>
      <View style={styles. statisticBox}>
        <View>
          <Text style={styles.statisticBoxDetails}>Deine Woche</Text>
          <Text style={{color: '#222222',fontSize: 20, fontWeight: 'bold'}}>25500</Text>
        </View>
        <View>
    
        </View>
      </View>
   
        <Ranglist title="Rangliste: Mein Gericht" data={meinGerichtData} />
        <Ranglist title="Rangliste: Alle Gerichte" data={alleGerichteData} />
  
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

   },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      width: '100%'
    }
})