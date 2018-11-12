import React from 'react';
import { SearchBar } from "react-native-elements";

class SearchQuery extends React.PureComponent {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <SearchBar 
        placeholder="Search Reservation" 
        onChangeText={text => this.props.onTextChange(text)}
        onSubmitEditing={this.props.fetchReservationById}
        returnKeyType='search'
        round 
      />
    )
  }
}

export default SearchQuery;
