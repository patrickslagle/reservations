import React from 'react';
import { Calendar } from 'react-native-calendars'
import {Modal, Button, StyleSheet, Text, TouchableHighlight, View, Alert} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'snow'
  },
  input: {
    color: 'red'
  }
})


class ReservationCalendar extends React.PureComponent {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Modal
        visible={true}
        style={styles.container}
        presentationStyle="fullScreen"
      >
        <View style={styles.container}>
          <Calendar
            // Handler which gets executed on day press. Default = undefined
            onDayPress={this.props.dayPress}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'MMM yyyy'}
            // do not switch month when tapping on greyed out day from another month. Default = false
            disableMonthChange={true}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={new Date()}
            // Collection of dates that have to be colored in a special way. Default = {}
            markedDates={
              this.props.dates        
            }
            markingType={'period'}
          />
        </View>
      </Modal>
    )
  }
}

export default ReservationCalendar;
