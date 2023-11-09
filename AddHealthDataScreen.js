import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddHealthDataScreen = ({ route, navigation }) => {
  const { patient } = route.params;
  const [bloodPressure, setBloodPressure] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [bloodOxygen, setBloodOxygen] = useState('');
  const [heartBeatRate, setHeartBeatRate] = useState('');

  const handleSaveData = async () => {
    // logging to the console
    console.log({
      patientId: patient.id,
      bloodPressure,
      respiratoryRate,
      bloodOxygen,
      heartBeatRate,
      timestamp: new Date().toISOString()
    });

  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Add Health Data for {patient.fullname}</Text>
        <TextInput
          placeholder="Blood Pressure"
          value={bloodPressure}
          onChangeText={setBloodPressure}
          style={styles.input}
        />
        <TextInput
          placeholder="Respiratory Rate"
          value={respiratoryRate}
          onChangeText={setRespiratoryRate}
          style={styles.input}
        />
        <TextInput
          placeholder="Blood Oxygen"
          value={bloodOxygen}
          onChangeText={setBloodOxygen}
          style={styles.input}
        />
        <TextInput
          placeholder="Heart Beat Rate"
          value={heartBeatRate}
          onChangeText={setHeartBeatRate}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleSaveData}>
          <Text style={styles.buttonText}>Save Health Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7', 
  },
  card: {
    backgroundColor: 'white', 
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', 
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5, 
  },
  button: {
    backgroundColor: '#3498db', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
});

export default AddHealthDataScreen;
