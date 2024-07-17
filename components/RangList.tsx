// components/Rangliste.js
import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';


const Ranglist = ({ title, data, type }: any) => {
const [currentUser, setCurrentUser] = useState<any>();
const router = useRouter();

const getLocalUser = async() => {
  try {
    const user = await AsyncStorage.getItem('user');
    if(!user) {
      router.navigate('/login')
    } else {
      setCurrentUser(JSON.parse(user!))
      
    }
  } catch (error) {
    console.log(error)
  }
}

function generateRandomNameFromString(inputStr:string, nameLength:number) {
  let characters = inputStr.split('');
  let result = 'Anonymer ';
  for (let i = 0; i < nameLength; i++) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }
  return result;
}


useEffect(() => {
getLocalUser()

if(type === 'courts') {
  data.reverse()
}
},[data])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={{
          display: 'flex',
          width: '100%',
          height: 20,
          backgroundColor: '#2ed573',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 5
        }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>{data.findIndex((e:any) => e?.firstname === currentUser?.firstname || e?.place === currentUser?.court)+1}</Text>
          <Text style={{color: 'white', fontWeight: 'bold'}}>{data.find((e:any) => e?.firstname === currentUser?.firstname || e?.place === currentUser?.court)?.firstname || data.find((e:any) => e?.firstname === currentUser?.firstname || e?.place === currentUser?.court)?.place}</Text>
          <Text style={{color: 'white', fontWeight: 'bold'}}>{data.find((e:any) => e?.firstname === currentUser?.firstname || e?.place === currentUser?.court)?.totalSteps}</Text>
        </View>
        {
          !data ? <ActivityIndicator size='large' color="#1e90ff"/> : (
            <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.rank}>{index+1}</Text>
                <Text style={styles.name}>{item.place || generateRandomNameFromString(item.firstname, 10)}</Text>
                <Text style={styles.points}>{item.totalSteps}</Text>
                <Text style={index === 0 ? styles.trendUp : styles.trendDown}>
                  {index  === 0 ? '▲' : '▼'}
                </Text>
              </View>
            )}
          />
          )
        }
     
     
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
