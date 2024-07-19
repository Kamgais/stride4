import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet , ScrollView} from 'react-native';

const SelectDropdown = ({ options, selectedOption, onSelect }: any) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleOptionSelect = (option: any) => {
    onSelect(option);
    toggleModal();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text>{selectedOption}</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType='slide'
        onRequestClose={toggleModal}
      >
        <ScrollView contentContainerStyle={styles.modalContainer}>
          {options?.map((option: any) => (
            <TouchableOpacity
              key={option}
              style={styles.option}
              onPress={() => handleOptionSelect(option)}
            >
              <Text style={{
                color: 'white',
                fontWeight: 'bold'
              }}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 67,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    paddingHorizontal: 30,
    marginBottom: 10,
    color: '#000000',
     fontFamily: 'Roboto',
     backgroundColor: 'white'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '80%',
  
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: 200,
    alignItems: 'center',
  },
});


export default SelectDropdown
