import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import PatientListScreen from './PatientListScreen';
import AddPatientScreen from './AddPatientScreen';
import EditPatientScreen from './EditPatientScreen';
import AddHealthDataScreen from './AddHealthDataScreen';
import ViewHealthDataScreen from './ViewHealthDataScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="PatientList"
          component={PatientListScreen}
          options={{ title: 'Patient List' }}
        />
        <Stack.Screen
          name="AddPatient"
          component={AddPatientScreen}
          options={{ title: 'Add Patient' }}
        />
        <Stack.Screen
          name="EditPatient"
          component={EditPatientScreen}
          options={{ title: 'Edit Patient' }}
        />
        {/* Add the new screens to the stack navigator */}
        <Stack.Screen
          name="AddHealthDataScreen"
          component={AddHealthDataScreen}
          options={{ title: 'Add Health Data' }}
        />
        <Stack.Screen
          name="ViewHealthDataScreen"
          component={ViewHealthDataScreen}
          options={{ title: 'View Health Data' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
