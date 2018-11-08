import React from 'react'
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
} from 'react-native'
import Reservation from '../components/Reservation.js'

export default class ViewReservations extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.search}
          placeholder='search reservation by ID'
          placeholderTextColor='rgb(60,60,60)'
        />
        {/* <Button
          onPress={() => console.log('all')}
          title="View All Reservations"
        />
        <Button
          onPress={() => console.log('specific')}
          title="View Specific Reservation"
        /> */}
        <View style={styles.container}>

        <Reservation/>
        <Reservation/>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white'
  },
  search: {
    backgroundColor: 'rgb(240,240,240)',
    width: '96%',
    padding: 10,
    margin: 10,
    color: 'rgb(50,50,50)',
    borderRadius: 5
  },
})