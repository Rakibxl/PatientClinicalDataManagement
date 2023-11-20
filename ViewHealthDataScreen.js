import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const ViewHealthDataScreen = ({ route }) => {
  const { patient } = route.params;
  const [healthDataHistory, setHealthDataHistory] = useState([]);

  useEffect(() => {
  const fetchHealthData = async () => {
    try {
      const response = await axios.get(`https://clinicaldatamanagement.onrender.com/patients/${patient.id}`);
      if (response.data && response.data.tests) {
        // Sort the tests array by timestamp in descending order
        const sortedData = response.data.tests.sort((a, b) => {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        setHealthDataHistory(sortedData);
      }
    } catch (error) {
      console.error('Error fetching health data: ', error);
    }
  };

    fetchHealthData();
  }, [patient.id]); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Data History for {patient.name}</Text>
      <FlatList
        data={healthDataHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.dataText}>Date: {new Date(item.timestamp).toLocaleString()}</Text>
            <Text style={styles.dataText}>Blood Pressure: {item.bloodPressure}</Text>
            <Text style={styles.dataText}>Respiratory Rate: {item.respiratoryRate}</Text>
            <Text style={styles.dataText}>Blood Oxygen: {item.bloodOxygen}</Text>
            <Text style={styles.dataText}>Heart Beat Rate: {item.heartBeatRate}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  card: {
    backgroundColor: 'white', 
    borderRadius: 10,
    padding: 20,
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
  dataText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#2c3e50', 
  },
  
});

export default ViewHealthDataScreen;
