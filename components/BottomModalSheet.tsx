import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

const BottomModalSheet = ({ toggleModal }: any) => {
  const [stepGoal, setStepGoal] = useState('10.000');

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Dein Tagesziel:</Text>
        <TextInput
          style={styles.input}
          value={stepGoal}
          onChangeText={setStepGoal}
          keyboardType="numeric"
          maxLength={6}
        />
        <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
          <Text style={styles.addButtonText}>OK</Text>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    width: '80%',
    textAlign: 'center',
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    fontSize: 18,
  },
});

export default BottomModalSheet;
