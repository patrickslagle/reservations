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
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'

export default class MakeReservation extends React.Component {
  state = {
    name: '',
    hotelName: '',
    dates: {
        //  '2018-11-22': {textColor: 'white', startingDay: true, color: '#0070df'},
        // '2018-11-24': {textColor: 'white', endingDay: true, color: '#0070df'},
    },
    arrivalDate: '',
    departureDate: '',
    // arrival: {
    //   date: '',
    //   selected: false,
    //   endDateNotSelected: true,
    //   textColor: 'white',
    //   backgroundColor: 'dodgerblue'
    // },
    // departure: {
    //   date: '',
    //   textColor: 'white',
    //   selected: false,
    //   backgroundColor: 'dodgerblue'
    // },
    // isDateTimePickerVisible: false,
  }

  onChangeText = (key, value) => {
    console.log(key);
    console.log(value); 
    this.setState({ [key]: value })
  }

  submitReservation = () => {
    console.log(this.state)
  }

  // _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  // _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  // _handleDatePicked = (date) => {
  //   console.log('A date has been picked: ', date);
  //   this._hideDateTimePicker();
  // };

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
      // 86400000 milliseconds in a day
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
        departureDate: dayInfo.dateString,
        dates
      })
    }

    //  Object {
      //  "dateString": "2018-11-14",
      //  "day": 14,
      //  "month": 11,
      //  "timestamp": 1542153600000,
      //  "year": 2018,
    //  }
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
{/* https://reactnativeexample.com/a-react-native-datetime-picker-for-android-and-ios/ */}
        {/* <TouchableOpacity onPress={this._showDateTimePicker}>
          <Text>Show DatePicker</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        /> */}
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
            // '2018-11-22': {textColor: 'white', startingDay: true, color: '#0070df'},
            // '2018-11-24': {textColor: 'white', endingDay: true, color: '#0070df'},           
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