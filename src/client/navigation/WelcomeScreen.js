import React, {Component} from 'react';
import{
  View,
  StyleSheet,
  Button
} from 'react-native';

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button title="View Reservations"
          onPress={() => this.props.navigation.navigate('ViewReservations')} />
        <Button title="Make Reservation"
          onPress={() => this.props.navigation.navigate('MakeReservation')} />
      </View>
    )
  }
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  input: {
    width: 350,
    fontSize: 18,
    fontWeight: '500',
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    color: 'white',
    padding: 8,
    borderRadius: 14
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})