import React, { useState } from 'react'
import BottomModalSheet from '@/components/BottomModalSheet'
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';

export default function AddTraningsStep() {
  const [isModalVisible, setModalVisible] = useState(true);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <Modal 
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        style={styles.modal}
      >
        <BottomModalSheet toggleModal={toggleModal} />
      </Modal>
  )
}


const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
})