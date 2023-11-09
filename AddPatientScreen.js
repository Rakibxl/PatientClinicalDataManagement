import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPatientScreen = ({ navigation }) => {
  const [fullname, setFullname] = useState('');
  const [dob, setDob] = useState('');

  const handleAddPatient = async () => {
    const newPatientId = Math.floor(100000 + Math.random() * 900000).toString(); // Generating ID
    const newPatient = {
      id: newPatientId,
      fullname,
      dob,
    };

    try {
      // Getting the existing patient data from storage or initialize an empty array
      const existingPatients = JSON.parse(await AsyncStorage.getItem('patients')) || [];

      // Adding the new patient to the list of existing patients
      existingPatients.push(newPatient);

      // Saving the updated patient list to AsyncStorage
      await AsyncStorage.setItem('patients', JSON.stringify(existingPatients));

      navigation.navigate('PatientList');
    } catch (error) {
      Alert.alert('Error', 'There was an error adding the patient.');
      console.error('Error saving patient data: ', error);
    }
  };

  return (
    <ImageBackground
      source={require('./assets/PatientClinicalBG.jpeg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Add New Patient</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullname}
          onChangeText={setFullname}
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (yyyy-mm-dd)"
          value={dob}
          onChangeText={setDob}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleAddPatient}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddPatientScreen;
