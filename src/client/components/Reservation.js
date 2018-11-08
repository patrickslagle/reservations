import React, {Component} from 'react';
import{
  View,
  StyleSheet,
  Image,
  Text
} from 'react-native';

class Reservation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image 
          source={require('../assets/hotel4.jpg')}
          style={styles.hotelPic}
        />
        <Text>Epic Hotels</Text>
        <Text>Patrick Slagle</Text>
        <Text>Nov 11 - Nov 20</Text>
      </View>
    )
  }
}

export default Reservation;

const styles = StyleSheet.create({
  // input: {
  //   width: 350,
  //   fontSize: 18,
  //   fontWeight: '500',
  //   height: 55,
  //   backgroundColor: '#42A5F5',
  //   margin: 10,
  //   color: 'white',
  //   padding: 8,
  //   borderRadius: 14
  // },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  hotelPic: {
    width: '80%',
    height: '60%'
  },
})