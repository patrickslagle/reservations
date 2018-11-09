import { gql } from 'apollo-boost';

const addReservationMutation = gql`
  mutation($name: String!, $hotelName: String!, $arrivalDate: String!, $departureDate: String!) {
    addReservation(name: $name, hotelName: $hotelName, arrivalDate: $arrivalDate, departureDate: $departureDate) {
      id
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`

const updateReservationMutation = gql`
  mutation($id: String!, $name: String!, $hotelName: String!, $arrivalDate: String!, $departureDate: String!) {
    updateReservation(id: $id, name: $name, hotelName: $hotelName, arrivalDate: $arrivalDate, departureDate: $departureDate) {
      id
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`

const deleteReservationMutation = gpq`
  mutation($id: String!){
    deleteReservation(id: $id){
      id
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`

export {
  addReservationMutation,
  updateReservationMutation,
  deleteReservationMutation,
};