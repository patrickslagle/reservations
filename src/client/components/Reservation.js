import React, {Component} from 'react';
import{
  View,
  StyleSheet,
} from 'react-native';

class Reservation extends Component {
  render() {
    return (
      <View style={styles.container}>
      </View>
    )
  }
}

export default Reservation;

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