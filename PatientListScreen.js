import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'; 

const calculateAge = (dob) => {
  console.log(dob);
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  return age;
};

const PatientListScreen = ({ navigation }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchPatients = async () => {
    try {
      const response = await fetch('https://clinicaldatamanagement.onrender.com/patients');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patient data: ', error);
    } finally {
      setLoading(false);
    }
  };

  fetchPatients();
}, []);


  const navigateToAddHealthData = (patient) => {
    //navigate to AddHealthDataScreen
    navigation.navigate('AddHealthDataScreen', { patient });
  };

  const navigateToViewHealthData = (patient) => {
    //navigate to ViewHealthDataScreen
    navigation.navigate('ViewHealthDataScreen', { patient });
  };

return (
    <ImageBackground
      source={require('./assets/PatientClinicalBG.jpeg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Patient List</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.centered} />
        ) : patients.length > 0 ? (
          <FlatList
            data={patients}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.patientItem}>
                <View style={styles.patientInfo}>
                  <Text style={styles.patientId}>ID: {item.id}</Text>
                  <Text style={styles.patientName}>{item.name}</Text>
                  <Text style={styles.patientAge}>Age: {calculateAge(item.date)}</Text>
                </View>
                
                <TouchableOpacity onPress={() => navigateToAddHealthData(item)}>
                  <FontAwesome5 name="notes-medical" size={24} color="green" />
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => navigateToViewHealthData(item)}>
                  <MaterialCommunityIcons name="history" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text style={styles.emptyText}>No patients found. Add a new patient to start.</Text>
        )}
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', 
  },
  patientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white', 
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  patientInfo: {
    flexDirection: 'column',
  },
  patientId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  patientName: {
    fontSize: 18, 
    color: '#34495e', 
  },
  patientAge: {
    fontSize: 16,
    color: '#7f8c8d', 
  },
  addButton: {
    backgroundColor: '#3498db', 
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', 
    bottom: 30,
    right: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 18,
    color: '#95a5a6', 
  },
});

export default PatientListScreen;
