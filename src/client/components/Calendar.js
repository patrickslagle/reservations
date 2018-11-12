import React from 'react';
import { Calendar } from 'react-native-calendars'
import { 
  Modal, 
  StyleSheet, 
  Text, 
  View, 
  Alert
} from 'react-native';
import Button from './Button.js'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'snow'
  },
  datesSelected: {
    textAlign: 'center',
    fontSize: 20,
    padding: 5
  },
})

class ReservationCalendar extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      dates: {},
      arrivalDate: null,
      departureDate: null
    }
  }

  /**
   * @description displays arrival and departure dates above calendar for user to see
   */
  dateTextToDisplay = () => {
    let text = ``
    if (this.state.arrivalDate) {
      text += new Date(this.state.arrivalDate).toLocaleDateString();
    }
    if (this.state.departureDate) {
      text += ` - `
      text += new Date(this.state.departureDate).toLocaleDateString();
    }
    return text; 
  }

  /**
   * @description if the user has selected an arrival and departure date, then send
   * these dates to the parent form. If not, alert user to select dates
   */
  submitDates = () => {
    if (this.state.arrivalDate && this.state.departureDate) {
      this.props.sendDates(this.state.arrivalDate, this.state.departureDate); 
    }
    else {
      Alert.alert(
        'Incomplete Selection',
        'Please select an arrival and departure date',
        [{text: 'OK'}],
      )
    }
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
        departureDate: null,
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
        dates,
        departureDate: dayInfo.timestamp
      })
    }
  }

  render() {
    return (
      <Modal
        visible={this.props.showCalendar}
        style={styles.container}
        presentationStyle="fullScreen"
      >
        <View style={styles.container}>
            <Text style={styles.datesSelected}>
              Dates Selected
            </Text>
            <Text style={styles.datesSelected}>
              {this.dateTextToDisplay()}
            </Text>
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
            onPress={this.props.toggleCalendar}
            buttonText='Cancel'
          />
          <Button
            onPress={this.submitDates}
            buttonText='Submit Dates'
          />
        </View>
      </Modal>
    )
  }
}

export default ReservationCalendar;
