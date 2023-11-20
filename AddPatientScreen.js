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
import axios from 'axios';

const AddPatientScreen = ({ navigation }) => {
  const [name, setFullname] = useState('');
  const [date, setDob] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddPatient = async () => {
    setIsLoading(true);
    const newPatientId = Math.floor(100000 + Math.random() * 900000).toString(); // Generating ID
    const newPatient = {
      id: newPatientId,
      name,
      date,
    };

    try {
      const response = await axios.post('https://clinicaldatamanagement.onrender.com/patients', newPatient);
      if (response.status === 201) {
        navigation.navigate('PatientList');
      }
    } catch (error) {
      Alert.alert('Error', 'There was an error adding the patient.');
      console.error('Error saving patient data: ', error);
    } finally {
      setIsLoading(false);
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
          value={name}
          onChangeText={setFullname}
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Birth (yyyy-mm-dd)"
          value={date}
          onChangeText={setDob}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleAddPatient}
          disabled={isLoading}
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
