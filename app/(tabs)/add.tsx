import React, { useState, useEffect } from 'react'
import BottomModalSheet from '@/components/BottomModalSheet'
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function AddTraningsStep() {
  const [isModalVisible, setModalVisible] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>();
  const [trainingsToday, setTrainingsToday] = useState<any>();
  const router = useRouter()
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

  useEffect(() => {
    getLocalUser()
   },[])

   useEffect(() => {
    if(currentUser) {
      getToday()
    }
   },[currentUser])


  

   const updateTrainingDay = async (steps:any) => {
    if(!trainingsToday.id) {
      
    }
    try {
      const response = await fetch(`http://ec2-16-170-77-0.eu-north-1.compute.amazonaws.com/trainingsdays/${trainingsToday.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          steps,
          day: trainingsToday.day,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update training day');
      }
  
      const data = await response.json();
      alert("Deine heutigen Schritte fehlerfrei eingetragen🎊")
      router.navigate('/')
      return data;
    } catch (error) {
      console.error('Error updating training day:', error);
      throw error;
    }
  };

  const getToday = async () => {
    try {
      const response = await fetch(`http://ec2-16-170-77-0.eu-north-1.compute.amazonaws.com/trainingsdays/${currentUser?.id}/today`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
       setTrainingsToday({
        steps: 0
       })
       return ;
      }
  
      const data = await response.json();
      console.log(data)
      setTrainingsToday(data);
    } catch (error) {
      console.error('Error fetching today\'s steps:', error);
      throw error;
    }
  };

  return (
    <Modal 
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        style={styles.modal}
      >
        <BottomModalSheet title="Gib deine heutigen Schritte :" toggleModal={toggleModal} value={trainingsToday?.steps ||0} setValue={updateTrainingDay}/>
      </Modal>
  )
}


const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
})