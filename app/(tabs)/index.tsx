import { View, Text, StyleSheet, SafeAreaView, StatusBar, Pressable, Dimensions, ScrollView, RefreshControl, ActivityIndicator} from 'react-native'
import React, {useState, useEffect} from 'react'
import Svg, { Circle } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';
import {  LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomModalSheet from '@/components/BottomModalSheet';
import Modal from 'react-native-modal';
import { useRouter } from 'expo-router';

export const WeeklyChart = ({ data }:any) => {
  return (
    <LineChart
      data={{
        labels: data.map((e:any) => e.day.split("T")[0]),
        datasets: [
          {
            data: data.map((e:any) => e.steps),
          },
        ],
      }}
      width={250} // from react-native
      height={80}
      withInnerLines={false}
      withVerticalLines={false}
      yAxisInterval={1}
      yAxisLabel=" "
      yLabelsOffset={9999}
      chartConfig={{
        backgroundColor: "#ffffff",
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(127, 179, 213, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        propsForDots: {
          r: "0",
          strokeWidth: "2",
          stroke: "#7FB3D5",
        },
        propsForBackgroundLines: {
          strokeDasharray: "", // solid lines
        },
        style: {
          borderRadius: 16,
        },
      }}
      bezier
      style={{
        marginVertical: 0,
        borderRadius: 16,
      }}
    />
  );
};





const CircularProgress = ({ size, strokeWidth, percentage, goal, toggleModal, steps }:any) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.center}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#E6E6E6"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="#7FB3D5"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
        />
      </Svg>
      <View style={styles.absoluteCenter}>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4}}>
          <Text style={styles.goal}> Dein Tagesziel: {goal?.toLocaleString('en-US')} </Text>
          <Pressable onPress={toggleModal}>
        <MaterialIcons name="edit" size={20} color="black" />
        </Pressable>
        </View>
        <Text style={styles.steps}>{steps?.toLocaleString('en-US')}</Text>
      </View>
    </View>
  );
};


export default function DashboardScreen() {
  const [steps, setSteps] = useState(0);
  const [trainingsWeek, setTrainingsWeek] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [refreshing,setRefreshing] = useState(false);
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>();
  const goal = currentUser?.dailyGoal || 1000
  const percentage = (steps / goal) * 100;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
const getTodaySteps = async () => {
    try {
      const response = await fetch(`http://ec2-16-170-77-0.eu-north-1.compute.amazonaws.com/trainingsdays/${currentUser?.id}/today`, {
        method: 'GET',
      });
  
      if (!response.ok) {
       setSteps(0)
      }
     
      const data = await response.json();
   
      setSteps(data.steps);
      
     
    } catch (error) {
     setSteps(0)
    }
  };
  useEffect(() => {
   getLocalUser()
  
  },[])

  useEffect(() => {
    if(currentUser) {
      getTodaySteps()
      getTrainingDaysForCurrentWeek()
    }
   
  },[currentUser])


   const updateDailyGoal = async (newDailyGoal:number) => {
    try {
      const response = await fetch(`http://ec2-16-170-77-0.eu-north-1.compute.amazonaws.com/profiles/${currentUser?.id}/daily-goal?dailyGoal=${newDailyGoal}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to update daily goal');
      }
  
      const data = await response.json();
      await AsyncStorage.setItem('user', JSON.stringify(data));
      const user = await AsyncStorage.getItem('user');
      setCurrentUser(JSON.parse(user!))
      alert('Daily Goal successfull updated !!!')
      return data;
    } catch (error) {
      alert('Error updating daily goal')
      console.error('Error updating daily goal:', error);
      throw error;
    }
  };

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

  const loadData = async() => {
   await getLocalUser()
   await getTodaySteps()
   await getTrainingDaysForCurrentWeek()
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {refreshing ? <ActivityIndicator size='large' color="#1e90ff"/> : null}
    <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData}/>}>
      
      <Text style={styles.title}>Hallo, {currentUser?.firstname}</Text>
      <Text style={styles.subtitle}>Deine heutigen Schritte liegen bei:</Text>

      {/* <View style={styles.circularProgress}>
        <Text style={styles.circularProgressText}>Dein Tagesziel: 10.000</Text>
        <Text style={styles.circularProgressStep}>7500</Text>
      </View> */}
       <CircularProgress size={300} strokeWidth={15} steps={steps} percentage={percentage} goal={0 || currentUser?.dailyGoal} toggleModal={toggleModal}/>
      <View style={styles. statisticBox}>
        {
          trainingsWeek ? (
            <>
            <View>
          <Text style={styles.statisticBoxDetails}>Deine Woche</Text>
          <Text style={{color: '#222222',fontSize: 20, fontWeight: 'bold'}}>{trainingsWeek.map((e:any) => e.steps).reduce((accumulator, currentValue) => accumulator + currentValue, 0)?.toLocaleString('en-US')}</Text>
        </View>
        <View>
        <WeeklyChart data={trainingsWeek} />
        </View>
        </>
          ) : (
            <ActivityIndicator/>
          )
        }
      </View>
      {/* <WeeklyChart data={weeklyData} /> */}
    </ScrollView>
    <Modal 
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        style={styles.modal}
      >
        <BottomModalSheet title='Gib dein Tagesziel ein :' toggleModal={toggleModal} value={currentUser?.dailyGoal} setValue={updateDailyGoal} />
      </Modal>
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
    padding: 30,
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
   center: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  absoluteCenter: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    gap:20
  },
  steps: {
    fontSize: 58,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  goal: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  weeklyChart: {
    marginTop: 30,
    alignItems: 'center',
  },
  weeklyText: {
    fontSize: 16,
    marginBottom: 10,
  },
  weeklySteps: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
})