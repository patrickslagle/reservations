import React from 'react';
import { ListItem } from "react-native-elements";

class Reservation extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <ListItem
        title={`${this.props.item.name} (${this.props.item.id})`}
        subtitle={`${this.props.item.hotelName} (${this.props.item.arrivalDate} - ${this.props.item.departureDate})`}
        hideChevron={true}
        containerStyle={{ borderBottomWidth: 0 }}
      />
    )
  }
}

export default Reservation;