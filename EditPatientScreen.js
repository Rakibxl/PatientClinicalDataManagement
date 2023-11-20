import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditPatientScreen = ({ route, navigation }) => {
  const { patientToEdit } = route.params;
  const [fullname, setFullname] = useState(patientToEdit.fullname);
  const [dob, setDob] = useState(patientToEdit.dob);

  const handleEditPatient = async () => {
    try {
      let existingPatients = JSON.parse(await AsyncStorage.getItem('patients')) || [];
      const patientIndex = existingPatients.findIndex(p => p.id === patientToEdit.id);

      if (patientIndex !== -1) {
        existingPatients[patientIndex] = { ...existingPatients[patientIndex], fullname, dob };
        await AsyncStorage.setItem('patients', JSON.stringify(existingPatients));
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Patient not found.');
      }
    } catch (error) {
      console.error('Error updating patient data:', error);
      Alert.alert('Error', 'There was an error updating the patient.');
    }
  };


const handleDeletePatient = async () => {
  try {
    let existingPatients = JSON.parse(await AsyncStorage.getItem('patients')) || [];
    // Log for debugging
    console.log('Existing patient IDs:', existingPatients.map(p => p.id));

    
    const updatedPatients = existingPatients.filter(p => p.id !== patientToEdit.id);

  
    console.log('Remaining patient IDs:', updatedPatients.map(p => p.id));

    await AsyncStorage.setItem('patients', JSON.stringify(updatedPatients));

    navigation.navigate('PatientList'); 
  } catch (error) {
    console.error('Error deleting patient data:', error);
    Alert.alert('Error', 'There was an error deleting the patient.');
  }
};

  return (
    <ImageBackground
      source={require('./assets/PatientClinicalBG.jpeg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Edit Patient Details</Text>
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
          style={[styles.button, styles.saveButton]}
          onPress={handleEditPatient}
        >
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => {
            Alert.alert(
              'Confirm Delete',
              'Are you sure you want to delete this patient?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: handleDeletePatient },
              ],
              { cancelable: false }
            );
          }}
        >
          <Text style={styles.buttonText}>Delete Patient</Text>
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
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#3498db', 
  },
  deleteButton: {
    backgroundColor: '#e74c3c', 
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditPatientScreen;
