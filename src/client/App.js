import React from 'react';
// import { StyleSheet } from 'react-native'
import { createStackNavigator } from 'react-navigation'; 

//navigation screens
import ViewReservations from './navigation/ViewReservations.js';
import MakeReservation from './navigation/MakeReservation.js';
import WelcomeScreen from './navigation/WelcomeScreen.js';

const App = () => (
  <AppStackNavigator />
);

const AppStackNavigator = createStackNavigator({
  Welcome: WelcomeScreen,
  ViewReservations: ViewReservations,
  MakeReservation: MakeReservation
})

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export default App;

