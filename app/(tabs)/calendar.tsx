import { View, Text, SafeAreaView, StatusBar, StyleSheet, TextInput} from 'react-native'
import React, { useState,useEffect } from 'react'
import { Calendar } from 'react-native-calendars'
import Button from '@/components/Button';
import BottomModalSheet from '@/components/BottomModalSheet';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';


export default function CalendarScreen() {
  const [email, setEmail] = useState('');
  const [currentUser,setCurrentUser] = useState<any>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [trainingsdays, setTrainingsDays] = useState<any[]>([]);
  const [markedDates, setMarkedDates] = useState({})
  const [selected, setSelected] = useState(convertToGermanDate(new Date(Date.now()).toISOString().split('T')[0]));
  const router = useRouter();
  
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


const saveTrainingDay = async (steps:any) => {
  if(trainingsdays.map((e: any) => e.day.split('T')[0]).includes(convertToISODate(selected))) {
    try {
      const response = await fetch(`http://ec2-16-170-77-0.eu-north-1.compute.amazonaws.com/trainingsdays/${trainingsdays.find((e:any) => e.day.split('T')[0] === convertToISODate(selected))?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          steps,
          day: selected,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update training day');
      }
  
      const data = await response.json();
      await getAllTrainingDays()
      alert('Neue Schritte geändert🎉🎉')
      return data;
    } catch (error) {
      console.error('Error updating training day:', error);
      throw error;
    }
  } else {
    try {
      const response = await fetch('http://ec2-16-170-77-0.eu-north-1.compute.amazonaws.com/trainingsdays', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser.id,
          steps,
          day: convertToISODate(selected) ,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create training day');
      }
  
      const data = await response.json();
     await getAllTrainingDays();
     alert('Neue Schritte fehlerfrei eingetragen🎉🎉')
      return data;
    } catch (error) {
      console.error('Error creating training day:', error);
      throw error;
    }
  }

};


  const getAllTrainingDays = async () => {
    try {
      const response = await fetch(`http://ec2-16-170-77-0.eu-north-1.compute.amazonaws.com/trainingsdays/${currentUser?.id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch training days');
      }
  
      const data = await response.json();
      console.log(data)
      setTrainingsDays(data)
      setMarkedDates(buildSelectedDates(data));
      return data;
    } catch (error) {
      console.error('Error fetching training days:', error);
      throw error;
    }
  };

  function convertToGermanDate(dateStr: string) {
    let [year, month, day] = dateStr.split('-');
    return `${day}.${month}.${year}`;
  }

  function convertToISODate(germanDateStr:string) {
    let [day, month, year] = germanDateStr.split('.');
    return `${year}-${month}-${day}`;
  }

  const handleSelected = (event:string) => {
    const newFormat = convertToGermanDate(event);
    setSelected(newFormat);
  }
  
  const buildSelectedDates = (trainingsdays:any) => {
    let dates:any = {};
    trainingsdays.forEach((day:any) => {
      const dateString = new Date(day.day).toISOString().split('T')[0];
      dates[dateString] = {selected: true, marked: true};
    });
    return dates;
  };

  useEffect(() => {
    getLocalUser()
  },[])

  useEffect(() => {
    if(currentUser){
      getAllTrainingDays()
    }
   
  },[currentUser])
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
    <View style={styles.container}>
      <Text style={styles.title}>Meine Einträge:</Text>
      <View style={styles.calendar}>
      <Calendar
       onDayPress={(day: any) => {
        handleSelected(day.dateString);
      }}
      markedDates={{
        [convertToISODate(selected)]: {selected: true},
        ...markedDates
      }
       
      }
      />
      </View>
        <View style={styles.editBox}>
          <Text style={{fontWeight: 'bold'}}>{selected}</Text>
          <TextInput
          style={styles.input}
          placeholder={trainingsdays.map((e: any) => e.day.split('T')[0]).includes(convertToISODate(selected)) ? `${trainingsdays.find((e:any) => e.day.split('T')[0] === convertToISODate(selected))?.steps?.toLocaleString('en-US')}` : 'Gib deine Schritte ein'}
          placeholderTextColor="#999999"
          value={email}
          onChangeText={setEmail}
          keyboardType="numeric"
          autoCapitalize="none"
          editable={false}
          />
         <Button title='Bearbeiten' onPress={toggleModal}/>
        </View>
    </View>
    <Modal 
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        style={styles.modal}
      >
        <BottomModalSheet title='Gib deine Schritte ein :' toggleModal={toggleModal} value={trainingsdays.map((e: any) => e.day.split('T')[0]).includes(convertToISODate(selected)) ? trainingsdays.find((e:any) => e.day.split('T')[0] === convertToISODate(selected))?.steps : 0} setValue={saveTrainingDay} />
      </Modal>
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
     fontFamily: 'Roboto',
     backgroundColor: 'white'
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
})