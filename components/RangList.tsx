// components/Rangliste.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';


const Ranglist = ({ title, data }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.rank}>{item.rank}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.points}>{item.points}</Text>
            <Text style={item.trend === 'up' ? styles.trendUp : styles.trendDown}>
              {item.trend === 'up' ? '▲' : '▼'}
            </Text>
          </View>
        )}
      />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: '100%',
    height: 190
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  rank: {
    fontSize: 16,
    width: 30,
  },
  name: {
    fontSize: 16,
    flex: 1,
  },
  points: {
    fontSize: 16,
    width: 60,
    textAlign: 'right',
  },
  trendUp: {
    fontSize: 16,
    color: 'green',
    width: 20,
    textAlign: 'center',
  },
  trendDown: {
    fontSize: 16,
    color: 'red',
    width: 20,
    textAlign: 'center',
  },
});

export default Ranglist;
