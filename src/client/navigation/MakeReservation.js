import React from 'react'
import { View, Alert } from 'react-native'
import { addReservationMutation } from '../graphql/mutations.js'
import Calendar from '../components/Calendar.js'
import TxtInput from '../components/TextInput.js'
import Button from '../components/Button.js'

class MakeReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      hotelName: '',
      arrivalDate: null,
      departureDate: null,
      showCalendar: false
    }
  }

  /**
   * @description for every input change, update state
   * @param {String} key - Identifies what key to update in state
   * @param {String} value - The value of the input field
   */
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  /**
   * @description user submitted their dates from Calendar component. Update MakeReservation's
   * arrivalDate and departureDate while also hiding the calendar
   * @param {Number} arrivalDate - the arrival date in milliseconds since January 1, 1970
   * @param {Number} departureDate - the departure date in milliseconds since January 1, 1970
   */
  getDates = (arrivalDate, departureDate) => {
    this.setState({
      arrivalDate, 
      departureDate,
      showCalendar: false
    })
  }

  /**
   * @description sends a GraphQL mutation to the server to add a reservation with the
   * following information from state: name, hotelName, arrivalDate, departureDate. 
   */
  submitReservation = () => {
    // Alert user to fill out form if a portion is incomplete
    if (!this.state.name.length || !this.state.hotelName.length || !this.state.arrivalDate || !this.state.departureDate) {
      Alert.alert(
        'Incomplete Reservation',
        'Please input your name, the hotel name, and your dates requested',
        [{text: 'OK'}],
      )
    } 
    // if form is complete, send information to server to add reservation
    else {
      const IPAddress = '192.168.1.78';
      const url = `http://${IPAddress}:4000/reservation`
      const data = {
        query: addReservationMutation,
        variables: {
          name: this.state.name,
          hotelName: this.state.hotelName,
          arrivalDate: `${new Date(this.state.arrivalDate).toLocaleDateString()}`,
          departureDate: `${new Date(this.state.departureDate).toLocaleDateString()}`
        }
      }
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .catch(error => console.log('error', error))
    }
  }

  /**
   * @description toggles the calendar to show or not
   */
  toggleCalendar = () => {
    this.setState({
      showCalendar: !this.state.showCalendar
    });
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <Calendar
          sendDates={this.getDates}
          showCalendar={this.state.showCalendar}
          toggleCalendar={this.toggleCalendar}
        />
        <TxtInput
          onChangeText={this.onChangeText}
          inputName='name'
          placeholderText='Name'
        />
        <TxtInput
          onChangeText={this.onChangeText}
          inputName='hotelName'
          placeholderText='Hotel Name'
        />
        <Button
          onPress={this.toggleCalendar}
          buttonText='Select Dates'
        />
        <Button
          onPress={this.submitReservation}
          buttonText='Submit Reservation'
        />
      </View>
    )
  }
}

export default MakeReservation;
