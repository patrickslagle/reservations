import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native'

export default class ViewReservations extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>View Reservations</Text>
        <Button
          onPress={() => console.log('all')}
          title="View All Reservations"
        />
        <Button
          onPress={() => console.log('specific')}
          title="View Specific Reservation"
        />
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Go Back"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})