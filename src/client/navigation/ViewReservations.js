import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import { queryReservations, queryReservationById } from '../graphql/queries.js'
import SearchQuery from '../components/searchBar.js'
//https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
//https://medium.freecodecamp.org/how-to-build-a-react-native-flatlist-with-realtime-searching-ability-81ad100f6699
//https://react-native-training.github.io/react-native-elements/docs/0.19.1/lists.html#hidechevron
class ViewReservations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    // this.makeRemoteRequest();
    this.fetchReservations(); 
  }

  fetchReservationById = () => {
    const url = 'http://192.168.1.78:4000/reservation/id'
    const queryString = queryReservationById
    const queryVariables = `{"id": "${this.state.search}"}`
    fetch(`${url}?query=${queryString}&variables=${queryVariables}`)
    .then(res => res.json())
    .then(res => {
      console.log('res.data', res.data.reservation)
      this.setState({
        data: [res.data.reservation],
        error: res.error || null,
        loading: false,
        refreshing: false
      });
    })
    .catch(error => console.log('error', error))
  }

  fetchReservations = () => {
    const url = 'http://192.168.1.78:4000/reservations'
    const data = queryReservations
    fetch(`${url}?query=${data}`)
    .then(res => res.json())
    .then(res => {
      console.log(res.data)
      this.setState({
        data: res.data.everyReservation,
        error: res.error || null,
        loading: false,
        refreshing: false
      });
    })
    .catch(error => console.log('error', error))
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res.results);
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    // this.setState(
    //   {
    //     page: 1,
    //     seed: this.state.seed + 1,
    //     refreshing: true
    //   },
    //   () => {
    //     this.makeRemoteRequest();
    //   }
    // );
  };

  handleLoadMore = () => {
    // this.setState(
    //   {
    //     page: this.state.page + 1
    //   },
    //   () => {
    //     this.makeRemoteRequest();
    //   }
    // );
  };

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

  search = (value) => {
    this.setState({ search: value })
    console.log('hi', value)
  }

  renderHeader = () => {
    return (
    <SearchBar 
      placeholder="Search Reservation" 
      onChangeText={letter => this.search(letter)}
      onSubmitEditing={this.fetchReservationById}
      returnKeyType='search'
      round 
    />
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              title={`${item.name} (${item.id})`}
              subtitle={`${item.hotelName} (${item.arrivalDate} - ${item.departureDate})`}
              hideChevron={true}
              containerStyle={{ borderBottomWidth: 0 }}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={<SearchQuery search={this.search} fetchReservationById={this.fetchReservationById}/>}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
      </List>
    );
  }
}

export default ViewReservations;