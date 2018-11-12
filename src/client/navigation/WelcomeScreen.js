import React, {Component} from 'react';
import{
  View,
  StyleSheet,
  Button
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
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