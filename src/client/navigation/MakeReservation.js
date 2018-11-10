import React from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Button
} from 'react-native'
import { addReservationMutation } from '../graphql/mutations.js'
import Calendar from '../components/Calender.js'
class MakeReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      hotelName: '',
      dates: {},
      arrivalDate: '',
      departureDate: '',
      calendar: false
    }
  }

  onChangeText = (key, value) => {
    console.log(key);
    console.log(value); 
    this.setState({ [key]: value })
  }

  submitReservation = () => {
    console.log(this.state)
    const url = 'http://192.168.1.78:4000/reservation'
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
    }).then(res => res.json())
    .then(response => console.log('yasss', JSON.stringify(response)))
    .catch(error => console.log('error', error))
  }

  /**
   * @description for every date pressed, dayPress will do one of the following:
   * if there is no arrival date or departure date, it will set an arrival date
   * if there is an arrival date but no departure date, it will set a departure date.
   * if there is an arrival and departure date, it reset the previous set dates, and set just an arrival date.
   * @param {object} dayinfo - contains date info on the date pressed
   */
  dayPress = (dayInfo) => {
    console.log('DAY PRESS', dayInfo)
    // Either no days selected, or both days selected. Either way, only show the recently selected date.
    if (!Object.keys(this.state.dates).length || Object.keys(this.state.dates).length > 1) {
      this.setState({
        arrivalDate: dayInfo.timestamp,
        departureDate: '',
        dates: {
          [dayInfo.dateString]: {
            textColor: 'white', 
            startingDay: true,
            endingDay: true, 
            color: 'dodgerblue'
          }
        }
      })
    }
    // arrival day selected, but departure date has not been set yet. Set departure date.
    else {
      const dates = {};
      // iterate one day at a time from arrival date to departure date, making a date for each
      // day to mark the range on the calendar. There are 86400000 milliseconds in a day
      for (let i = this.state.arrivalDate; i <= dayInfo.timestamp; i += 86400000) {
        const date = new Date(i).toISOString().slice(0, 10)
        dates[date] = {
          textColor: 'white', 
          startingDay: i === this.state.arrivalDate ? true : false,
          endingDay: i === dayInfo.timestamp ? true : false, 
          color: 'dodgerblue'
        }
      }
      this.setState({
        departureDate: dayInfo.timestamp,
        dates
      })
    }
  }

  renderCalendar(){
    if (!this.state.calendar) return null

    return (
      <Calendar
        dayPress={this.dayPress}
        dates={this.state.dates}
      />
    )
  }

  toggleCalender(){
    this.setState({
      calendar: !this.state.calendar
    })
  }
  
  
  render() {
    console.log(this.state.arrivalDate)
    console.log('IN COMP', this.state.dates)
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onFocus={this.randomFunc}
          placeholder='Name'
          autoCapitalize="words"
          autoCorrect={false}
          placeholderTextColor='black'
          onChangeText={customerName => this.onChangeText('name', customerName)}
        />
        <TextInput
          style={styles.input}
          placeholder='Hotel Name'
          autoCapitalize="words"
          placeholderTextColor='black'
          onChangeText={hotelName => this.onChangeText('hotelName', hotelName)}
        />
        <Button
          onPress={() => this.toggleCalender()}
          title="Dates"
        />
        {this.renderCalendar()}
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
    backgroundColor: 'white',
    margin: 10,
    color: 'white',
    padding: 8,
    borderRadius: 14
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  }
})

export default MakeReservation;
