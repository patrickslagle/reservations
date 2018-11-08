// SignIn.js
import React from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  DatePickerIOS,
  Button
} from 'react-native'
import { Calendar } from 'react-native-calendars'

export default class MakeReservation extends React.Component {
  state = {
    name: '',
    hotelName: '',
    dates: {},
    arrivalDate: '',
    departureDate: '',
  }

  onChangeText = (key, value) => {
    console.log(key);
    console.log(value); 
    this.setState({ [key]: value })
  }

  submitReservation = () => {
    const reserveration = {
      'name': this.state.name,
      'hotelName': this.state.hotelName,
      'arrivalDate': this.state.arrivalDate,
      'departureDate': this.state.departureDate
    }
    console.log(reserveration)
  }

  /**
   * @description for every date pressed, dayPress will do one of the following:
   * if there is no arrival date or departure date, it will set an arrival date
   * if there is an arrival date but no departure date, it will set a departure date.
   * if there is an arrival and departure date, it reset the previous set dates, and set just an arrival date.
   * @param {object} dayinfo - contains date info on the date pressed
   */
  dayPress = (dayInfo) => {
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
        <Calendar
          // Handler which gets executed on day press. Default = undefined
          onDayPress={this.dayPress}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'MMM yyyy'}
          // do not switch month when tapping on greyed out day from another month. Default = false
          disableMonthChange={true}
           // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={new Date()}
           // Collection of dates that have to be colored in a special way. Default = {}
          markedDates={
            this.state.dates        
          }
           markingType={'period'}
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