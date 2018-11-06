// SignIn.js
import React from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  DatePickerIOS,
  Button
} from 'react-native'

export default class MakeReservation extends React.Component {
  state = {
    name: '',
    hotelName: '',
    arrivalDate: new Date(),
    departureDate: ''
  }

  onChangeText = (key, value) => {
    console.log(key);
    console.log(value); 
    this.setState({ [key]: value })
  }

  setDate(newDate) {
    console.log('dis new date', newDate)
    // this.setState({arrivalDate: newDate})
  }

  submitReservation = () => {
    console.log(this.state)
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Name'
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor='white'
          onChangeText={customerName => this.onChangeText('name', customerName)}
        />
        <TextInput
          style={styles.input}
          placeholder='Hotel Name'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={hotelName => this.onChangeText('hotelName', hotelName)}
        />
        <TextInput
          style={styles.input}
          placeholder='Arrival Date'
          autoCapitalize="none"
          secureTextEntry={true}
          placeholderTextColor='white'
          onChangeText={arrivalDate => this.onChangeText('arrivalDate', arrivalDate)}
        />
        <TextInput
          style={styles.input}
          placeholder='Departure Date'
          autoCapitalize="none"
          secureTextEntry={true}
          placeholderTextColor='white'
          onChangeText={departureDate => this.onChangeText('departureDate', departureDate)}
        />
        <DatePickerIOS
          date={this.state.arrivalDate}
          onDateChange={this.setDate}
        />
        <Button
          title='Submit'
          onPress={this.submitReservation}
        />
      </View>
    )
  }
}

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
    // alignItems: 'center'
  }
})