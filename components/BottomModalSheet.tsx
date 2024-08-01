import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';



type Props = {
  toggleModal: () => void,
  setValue: (value:number) => Promise<void>,
  value: number,
  title: string
}
const BottomModalSheet = ({ toggleModal, setValue , value, title }: Props) => {
  const [input, setInput] = useState(value?.toLocaleString('en-US'))
  const handleSubmit = async() => {
   await setValue(Number(input))
    toggleModal()
  }


  return (
    <KeyboardAvoidingView behavior={"padding"}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          style={styles.input}
          value={input.toString()}
          placeholder={input?.toString()}
          onChangeText={setInput}
          keyboardType="numeric"
          maxLength={6}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <AntDesign name="pluscircleo" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 30,
    right: 30
  },
  addButtonText: {
    fontSize: 18,
  },
});

export default BottomModalSheet;
