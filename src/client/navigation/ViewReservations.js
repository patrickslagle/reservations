import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { List } from "react-native-elements";
import { queryReservations, queryReservationById } from '../graphql/queries.js'
import SearchQuery from '../components/SearchBar.js'
import Reservation from '../components/Reservation.js'

class ViewReservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      data: [],
    };
  }

  componentDidMount() {
    this.fetchReservations(); 
  }

  /**
   * @description sends a GraphQL query to the server to retrieve the reservation with
   * an ID that matches the searched ID
   */
  fetchReservationById = () => {
    const IPAddress = '192.168.1.78';
    const url = `http://${IPAddress}:4000/reservation`
    const queryString = queryReservationById
    const queryVariables = `{"id": "${this.state.search}"}`
    fetch(`${url}?query=${queryString}&variables=${queryVariables}`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        data: [res.data.reservation],
        error: res.error || null,
        loading: false,
        refreshing: false
      });
    })
    .catch(error => console.log('error', error))
  }

  /**
   * @description sends a GraphQL query to the server to retrieve all reservations
   */
  fetchReservations = () => {
    const IPAddress = '192.168.1.78';
    const url = `http://${IPAddress}:4000/reservations`
    const data = queryReservations
    fetch(`${url}?query=${data}`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        data: res.data.everyReservation,
        error: res.error || null,
        loading: false,
        refreshing: false
      });
    })
    .catch(error => console.log('error', error))
  }

  /**
   * @description creates the line separator between reservations
   */
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "82%",
          backgroundColor: "#CED0CE",
          marginLeft: "5%"
        }}
      />
    );
  };

  /**
   * @description updates search in this.state with every press into the text input
   * @param {String} value - the new value of the text input
   */
  onTextChange = (value) => {
    this.setState({ search: value })
  }

  render() {
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <Reservation 
              item={item}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={<SearchQuery onTextChange={this.onTextChange} fetchReservationById={this.fetchReservationById}/>}
        />
      </List>
    );
  }
}

export default ViewReservations;