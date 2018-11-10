import React from 'react';
// import { StyleSheet } from 'react-native'
import { createStackNavigator } from 'react-navigation'; 
// import { AppRegistry } from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

//navigation screens
import ViewReservations from './navigation/ViewReservations.js';
import MakeReservation from './navigation/MakeReservation.js';
import WelcomeScreen from './navigation/WelcomeScreen.js';

const client = new ApolloClient({
  uri: 'http://192.168.0.161:4000/graphql'
});

const App = () => (
  <ApolloProvider client={client}>
    <AppStackNavigator />
  </ApolloProvider>
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

