import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import Ranglist from '@/components/RangList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { WeeklyChart } from '.';

const Statistic = () => {
  const [userRanking, setUserRanking] = useState([]);
  const [courtRanking, setCourtRanking] = useState([]);
  const [trainingsWeek, setTrainingsWeek] = useState([]);
  const [currentUser, setCurrentUser] = useState<any>();
  const [refreshing,setRefreshing] = useState(false);
  const router = useRouter();



  const getTrainingDaysForCurrentWeek = async () => {
    try {
      const response = await fetch(`http://ec2-16-170-77-0.eu-north-1.compute.amazonaws.com/trainingsdays/${currentUser?.id}/current-week`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch training days');
      }
  
      const data = await response.json();
      setTrainingsWeek(data);
      return data;
    } catch (error) {
      console.error('Error fetching training days:', error);
      throw error;
    }
  };
  const fetchUserRanking = async () => {
    try {
      const response = await fetch('http://ec2-16-170-77-0.eu-north-1.compute.amazonaws.com/statistics/userRankingByCourt/'+currentUser?.id);
      if (!response.ok) {
        throw new Error('Failed to fetch user ranking data');
      }
      const data = await response.json();
      setUserRanking(data);
    } catch (error) {
      console.error('Error fetching user ranking:', error);
    }
  };

  const fetchCourtRanking = async () => {
    try {
      const response = await fetch('http://ec2-16-170-77-0.eu-north-1.compute.amazonaws.com/statistics/courtRanking');
      if (!response.ok) {
        throw new Error('Failed to fetch court ranking data');
      }
      const data = await response.json();
      setCourtRanking(data);
    } catch (error) {
      console.error('Error fetching court ranking:', error);
    }
  };

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

  useEffect(() => {
    // Function to fetch user ranking data
   

    // Function to fetch court ranking data
   

    
    fetchCourtRanking();
    getLocalUser();
  }, []);


  useEffect(() => {
    if(currentUser){
   getTrainingDaysForCurrentWeek()
   fetchUserRanking();
    }
  },[currentUser])

  // Sample data placeholders for illustration
  const meinGerichtData = [
    { id: '1', rank: '1.', name: 'Anonymer Luchs', points: '30.000', trend: 'up' },
    { id: '2', rank: '2.', name: 'Anonymer Dachs', points: '29.000', trend: 'down' },
    { id: '3', rank: '3.', name: 'Anonymer Hund', points: '28.000', trend: 'up' },
    // Add more as needed...
  ];

  const alleGerichteData = [
    { id: '1', rank: '1.', name: 'LG Frankfurt (Oder)', points: '90.000', trend: 'neutral' },
    { id: '2', rank: '2.', name: 'LG Neuruppin', points: '89.000', trend: 'neutral' },
    { id: '3', rank: '3.', name: 'LG Potsdam', points: '88.000', trend: 'up' },
    // Add more as needed...
  ];


  const loadData = async() => {
    await fetchUserRanking()
    await fetchCourtRanking();
    await getTrainingDaysForCurrentWeek()
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData}/>}>
        <Text style={styles.title}>Meine Statistiken</Text>
        <View style={styles.statisticBox}>
          <View>
            <Text style={styles.statisticBoxDetails}>Deine Woche</Text>
            <Text style={{ color: '#222222', fontSize: 20, fontWeight: 'bold' }}>{trainingsWeek.map((e:any) => e.steps).reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</Text>
          </View>
          {/* Additional elements can be added here */}
          <View>
            <WeeklyChart data={trainingsWeek}/>
          </View>
        </View>

        {/* Display user ranking */}
      
        <Ranglist title="Rangliste: Mein Gericht" data={userRanking} type='users' />

        {/* Display court ranking */}
        <Ranglist title="Rangliste: Alle Gerichte" data={courtRanking} type='courts' />

      </ScrollView>
    </SafeAreaView>
  );
};

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
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
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
});

export default Statistic;
